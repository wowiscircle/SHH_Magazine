# CMS Schema

## Goal

正式版以 Google Sheet 作為輕量 Editorial CMS；Pilot 先用相同 schema 的 local JSON，避免 Google Sheet / Apps Script 成為民眾閱讀 critical path。

## Issue Fields

| Field | Required | Example |
|---|---|---|
| issue_id | yes | 2026-09 |
| year | yes | 2026 |
| month | yes | 9 |
| publish_date | yes | 2026-09-01 |
| status | yes | draft / published / archived |
| issue_number | no | 228 |
| cover_image | yes | URL/path |
| pdf_url | yes | official URL |
| local_pdf_path | pilot | /demo/issues/2026-09.pdf |
| cover_title | no | 封面原始主題 |
| homepage_headline | yes | 首頁主標 |
| homepage_summary | yes | 40–100 字 |
| outpatient_page | yes | actual page |
| shuttle_page | yes | actual page |
| updated_at | yes | ISO datetime |

## Feature Fields

每期 2–4 筆：

```text
feature_id
issue_id
order
title
summary
image (optional)
target_type = reader / outbound / issue
target_page
target_url
```

## Google Sheet Tabs

建議：

```text
Issues
Features
Placements
Creatives
QR_Routes
```

Analytics 不寫進 Editorial CMS Sheet。

## Publish Rules

只有 `published` 可以進 Latest Issue。

Publish 前至少驗證：

- issue_id format
- cover exists
- PDF exists
- homepage_headline exists
- outpatient/shuttle page >= 1
- page numbers <= PDF page count when available

## Workflow

```text
資訊室照舊上傳官方 PDF
→ 多媒體組填 metadata
→ Preview
→ Published
→ website sync / snapshot
```

正式版 sync 必須採 last-known-good：新資料驗證失敗時保留上一版正常 snapshot。
