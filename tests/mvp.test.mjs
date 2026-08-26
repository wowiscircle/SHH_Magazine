import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const loadJson = async (name) => JSON.parse(await readFile(new URL(`../data/${name}`, import.meta.url)));

test("latest published issue is metadata-driven and demo months are present", async () => {
  const issues = await loadJson("issues.demo.json");
  const published = issues.filter((issue) => issue.status === "published").sort((a, b) => b.publish_date.localeCompare(a.publish_date));
  assert.equal(published[0].issue_id, "2026-08");
  assert.deepEqual(new Set(issues.map((issue) => issue.issue_id)), new Set(["2026-06", "2026-07", "2026-08"]));
});

test("QR registry provides all required route types and unique IDs", async () => {
  const routes = await loadJson("qr-routes.demo.json");
  assert.deepEqual(new Set(routes.map((route) => route.qr_type)), new Set(["placement", "creative_placement", "print_content"]));
  assert.equal(new Set(routes.map((route) => route.qr_id)).size, routes.length);
  const creativeRoutes = routes.filter((route) => route.qr_type === "creative_placement");
  assert.equal(new Set(creativeRoutes.map((route) => route.creative_id)).size, 1);
  assert.equal(new Set(creativeRoutes.map((route) => route.placement_id)).size, creativeRoutes.length);
});

test("registration destinations use the official HTTPS host", async () => {
  const routes = await loadJson("qr-routes.demo.json");
  for (const route of routes.filter((item) => item.destination_type === "registration")) {
    const url = new URL(route.destination);
    assert.equal(url.protocol, "https:");
    assert.ok(url.hostname === "shh.tmu.edu.tw" || url.hostname.endsWith(".shh.tmu.edu.tw"));
  }
});

test("admin authentication fails closed when credentials are absent", async () => {
  const middleware = await readFile(new URL("../middleware.ts", import.meta.url), "utf8");
  assert.match(middleware, /if \(!user \|\| !password\).*503/);
  assert.doesNotMatch(middleware, /localStorage|searchParams.*password/);
});
