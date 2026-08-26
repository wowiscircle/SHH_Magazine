# SEO & Social Sharing

## Scope

MVP SEO 只針對 Homepage、Issue landing pages、Archive。Reader 不作主要 SEO content。

## Issue Metadata

Example title：

```text
雙和醫訊 2026年09月號｜雙和醫院
```

Description 使用 `homepage_summary`。

## Open Graph

Issue page 使用：cover image、issue headline、summary、canonical URL，方便 LINE / Facebook / Messaging 分享。

## Sitemap

Include public landing pages：

```text
/
/issues
/issues/[issueId]
```

Do not index：

```text
/q/*
/admin
```

Reader 可使用 `noindex, follow`，正式 Production 前再確認策略。

## Canonical

每一期只有一個 canonical URL；不要讓 QR attribution query 形成重複頁面。

## Future

若未來將精選文章轉成 HTML，可再做 article-level SEO；MVP 不要求每篇 PDF 文章 HTML 化。
