# Mobile PDF Reader Specification

## Goal

手機掃碼後直接舒適閱讀雙和醫訊，不依賴瀏覽器原生 PDF viewer。

## Primary Model

```text
Single page
Vertical continuous scroll
Fit width
```

不要：Flipbook、Mobile double-page、iframe/browser-native PDF viewer 作為主要體驗。

## Engine

使用 `pdfjs-dist`，worker 由專案控制。

## Performance

30+ 頁刊物不可一次 render 全部高解析 canvas。

使用 IntersectionObserver / equivalent lazy strategy，只保持 current page 與鄰近頁面。

## Routes

```text
/read/2026-09
/read/2026-09?page=6
/latest/outpatient
/latest/shuttle
```

Semantic route 解析 latest published issue 後再導對應頁。

## Table-heavy Pages

門診表：fit-width default、zoom + / - / reset，放大後允許 page container 內水平移動。

## Tracking

```text
read_start
read_25
read_50
read_75
read_90
read_complete
page_jump
section_jump
reader_error
pdf_download
```

每個 milestone 每匿名 session 一次。

另外依 `TIME_TRACKING_SPEC.md` 累積 active engagement。

## Failure UI

不可顯示 Google Drive raw error、stack trace 或 PDF.js exception。

提供品牌化 fallback：Retry、回本期、回歷期、原始 PDF（若可用）。

## MVP Exclusion

暫不做「記住上次看到哪」。Pilot 後再評估。
