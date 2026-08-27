import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";

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
  assert.match(middleware, /if \(!user \|\| !password\)[\s\S]*status: 503/);
  assert.doesNotMatch(middleware, /localStorage|searchParams.*password/);
});

test("public navigation does not expose admin or analytics UI", async () => {
  const files = ["../components/PublicHeader.tsx", "../components/PublicFooter.tsx"];
  const source = (
    await Promise.all(
      files.map((file) => readFile(new URL(file, import.meta.url), "utf8")),
    )
  ).join("\n");
  assert.doesNotMatch(source, /\/admin|Tracking Debug|QR Entries/);
});

test("QR attribution is preserved from issue landing to reader", async () => {
  const issuePage = await readFile(
    new URL("../app/issues/[issueId]/page.tsx", import.meta.url),
    "utf8",
  );
  const readerPage = await readFile(
    new URL("../app/read/[issueId]/page.tsx", import.meta.url),
    "utf8",
  );
  assert.match(issuePage, /safeEntryId\(searchParams\.entry_id\)/);
  assert.match(issuePage, /entry_id=\$\{entryId\}/);
  assert.match(readerPage, /entryId=\{safeEntryId\(searchParams\.entry_id\)\}/);
});

test("engagement pauses while hidden or idle and flushes on pagehide", async () => {
  const hook = await readFile(
    new URL("../hooks/useEngagementTracking.ts", import.meta.url),
    "utf8",
  );
  assert.match(hook, /!document\.hidden/);
  assert.match(hook, /30_000/);
  assert.match(hook, /15_000/);
  assert.match(hook, /visibilitychange/);
  assert.match(hook, /pagehide/);
});

test("TypeScript resolves the @ alias from the project root", async () => {
  const tsconfig = JSON.parse(
    await readFile(new URL("../tsconfig.json", import.meta.url), "utf8"),
  );
  assert.equal(tsconfig.compilerOptions.baseUrl, ".");
  assert.deepEqual(tsconfig.compilerOptions.paths, { "@/*": ["./*"] });
});

test("all demo issues include a readable PDF and generated cover", async () => {
  for (const issueId of ["2026-06", "2026-07", "2026-08"]) {
    const pdfUrl = new URL(`../public/demo/issues/${issueId}.pdf`, import.meta.url);
    const coverUrl = new URL(`../public/demo/covers/${issueId}.jpg`, import.meta.url);
    const [pdf, cover, pdfStat, coverStat] = await Promise.all([
      readFile(pdfUrl),
      readFile(coverUrl),
      stat(pdfUrl),
      stat(coverUrl),
    ]);

    assert.equal(pdf.subarray(0, 4).toString(), "%PDF");
    assert.deepEqual([...cover.subarray(0, 3)], [0xff, 0xd8, 0xff]);
    assert.ok(pdfStat.size > 100_000);
    assert.ok(coverStat.size > 50_000);
  }
});

test("issue cards use large dates, secondary themes, and visible cover shadows", async () => {
  const issues = await loadJson("issues.demo.json");
  const expectedHeadlines = {
    "2026-06": "影像的監控者 影像醫學部",
    "2026-07": "雙和18 幸福醫家－院慶特輯",
    "2026-08": "明承經典 燦動非凡",
  };
  assert.deepEqual(
    Object.fromEntries(issues.map((issue) => [issue.issue_id, issue.homepage_headline])),
    expectedHeadlines,
  );

  const [home, archive, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/issues/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.match(home, /<strong>\{issue\.year\} 年 \{String\(issue\.month\)/);
  assert.match(home, /<span>\{issue\.homepage_headline\}/);
  assert.match(archive, /<strong>\{i\.year\} 年 \{String\(i\.month\)/);
  assert.match(archive, /<span>\{i\.homepage_headline\}<\/span>/);
  assert.match(css, /\.cover-small\{box-shadow:(?!none)/);
});

test("verified practical-information pages are configured for every issue", async () => {
  const issues = await loadJson("issues.demo.json");
  for (const issue of issues) {
    assert.equal(issue.outpatient_page, 10);
    assert.equal(issue.shuttle_page, 17);
  }

  const home = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(home, /實際頁碼將由編輯 metadata 提供/);
});

test("the issue archive provides a visible return-home button", async () => {
  const archive = await readFile(
    new URL("../app/issues/page.tsx", import.meta.url),
    "utf8",
  );
  assert.match(archive, /className="button secondary" href="\/"/);
  assert.match(archive, /返回首頁/);
});

test("desktop reader zoom scales beyond its default maximum width", async () => {
  const [reader, css] = await Promise.all([
    readFile(new URL("../components/PdfReader.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(reader, /className="pdf-scroll"/);
  assert.match(reader, /maxWidth: `\$\{scale \* 760\}px`/);
  assert.match(reader, /overflowX: "auto"/);
  assert.match(css, /\.pdf-pages\{max-width:760px/);
});
