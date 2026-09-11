const assert = require("node:assert/strict");
globalThis.AsyncLocalStorage ??= require("node:async_hooks").AsyncLocalStorage;
const { mkdtempSync, symlinkSync, rmSync } = require("node:fs");
const { tmpdir } = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const { NextRequest } = require("next/server");
// This installed release still exports the matcher helper under its old name.
const { unstable_doesMiddlewareMatch: unstable_doesProxyMatch } = require("next/experimental/testing/server");

const root = path.resolve(__dirname, "..");
const output = mkdtempSync(path.join(tmpdir(), "locale-proxy-"));
try {
  execFileSync(path.join(root, "node_modules/.bin/tsc"), [
    "--ignoreConfig", "proxy.ts", "--outDir", output, "--module", "Node16",
    "--moduleResolution", "Node16", "--target", "ES2020", "--skipLibCheck", "--esModuleInterop",
  ], { cwd: root, stdio: "inherit" });
  symlinkSync(path.join(root, "node_modules"), path.join(output, "node_modules"), "dir");
  const { proxy, config } = require(path.join(output, "proxy.js"));
  const cases = [
    ["/en?utm_source=test", { "cf-ipcountry": "GE" }, "/ka?utm_source=test"],
    ["/ka", { "cf-ipcountry": "US", "accept-language": "ka" }, "/en"],
    ["/ka", { "cf-ipcountry": "RU" }, "/en"],
    ["/en", { "x-real-ip": "2.57.60.1" }, "/ka"],
    ["/en", { "x-real-ip": "::ffff:2.57.60.1" }, "/ka"],
    ["/en", { "x-forwarded-for": "2.57.60.1, 10.0.0.1" }, "/ka"],
    ["/ka", { "x-real-ip": "8.8.8.8", "accept-language": "ka" }, "/en"],
    ["/en", { "cf-ipcountry": "GE", cookie: "locale=en" }, "/ka"],
    ["/en", { "cf-ipcountry": "GE", cookie: "locale-preference=en" }, "/ka"],
    ["/ka", { "cf-ipcountry": "US", cookie: "locale-preference=ru" }, "/en"],
    ["/ka?gclid=test&gbraid=abc&wbraid=def&utm_source=google", { "x-vercel-ip-country": "US", cookie: "locale-preference=ka; locale=ka" }, "/en?gclid=test&gbraid=abc&wbraid=def&utm_source=google"],
    ["/ka", { "x-vercel-ip-country": "US", "accept-language": "ka-GE,ka;q=0.9", cookie: "locale-preference=ka" }, "/en"],
    ["/ka", { "x-vercel-ip-country": "US", "cf-ipcountry": "GE" }, "/en"],
    ["/ka?lang=ka", { "x-vercel-ip-country": "US" }, null],
    ["/ka?lang=en&gclid=test", { "x-vercel-ip-country": "GE" }, "/en?lang=en&gclid=test"],
    ["/ka?lang=invalid", { "x-vercel-ip-country": "US" }, "/en?lang=invalid"],
    ["/ru?lang=ru", { "x-vercel-ip-country": "US" }, null],
    ["/en", { "cf-ipcountry": "GE", cookie: "locale-preference=bad" }, "/ka"],
    ["/ka", { "cf-ipcountry": "GE" }, null],
    ["/en", { "cf-ipcountry": "US" }, null],
    ["/en/services?ref=1", { "x-vercel-ip-country": "GE" }, "/ka/services?ref=1"],
    ["/en", { "cf-ipcountry": "XX", "x-vercel-ip-country": "GE" }, "/ka"],
    ["/ka", { "x-real-ip": "127.0.0.1" }, null],
    ["/ka", { "x-real-ip": "2001:db8::1" }, null],
    ["/ka", {}, null],
    ["/", {}, "/en"],
    ["/", { "cf-ipcountry": "GE" }, "/ka"],
  ];
  for (const [url, headers, expected] of cases) {
    const response = proxy(new NextRequest(`https://example.com${url}`, { headers }));
    assert.equal(response.headers.get("location"), expected ? `https://example.com${expected}` : null, JSON.stringify({ url, headers }));
    assert.equal(response.headers.get("set-cookie"), null);
    assert.equal(response.headers.get("cache-control"), "private, no-store");
    if (expected) {
      assert.equal(response.status, 307);
      assert.equal(response.headers.get("cache-control"), "private, no-store");
      assert.equal(proxy(new NextRequest(`https://example.com${expected}`, { headers })).headers.get("location"), null, "redirect loop");
    }
  }
  for (const url of ["/api/test", "/_next/static/chunk.js", "/img/truck.jpg", "/icon.png", "/robots.txt", "/sitemap.xml"]) {
    assert.equal(unstable_doesProxyMatch({ config, nextConfig: {}, url }), false, url);
  }
  for (const url of ["/", "/ka", "/en", "/ru", "/en/services"]) {
    assert.equal(unstable_doesProxyMatch({ config, nextConfig: {}, url }), true, url);
  }
  console.log(`Passed ${cases.length} redirect scenarios and 11 route matcher checks.`);
} finally {
  rmSync(output, { recursive: true, force: true });
}
