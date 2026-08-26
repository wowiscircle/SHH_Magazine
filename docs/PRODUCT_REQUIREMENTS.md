# Product Requirements

## 1. Product Vision

建立「雙和醫訊」的數位閱讀入口 + QR Routing + Content Analytics，而不是單純 PDF Archive。

核心流程：

```text
Exposure
→ QR Entry
→ Contextual Destination
→ Reading / Registration
→ Engagement Analytics
```

## 2. Public Experience

首頁包含：

- Latest Issue
- 實際當期封面
- `homepage_headline`
- `homepage_summary`
- 2–4 個本期焦點
- 開始閱讀
- 門診時刻表
- 接駁車資訊
- 歷期醫訊

公開頁面不得出現任何管理／Tracking UI。

## 3. Admin Experience

`/admin` 為 protected route，主要區塊：Overview KPI、Creative × Placement、Placement Performance、Creative Performance、Time Analysis、Issue Performance、System Health、Tracking Debug。

## 4. QR Journeys

### Placement QR

螢幕旁固定 QR → 最新一期總入口。主要追蹤點位成效，可長期使用。

### Creative × Placement QR

每張公播素材自己的 QR。相同內容跨不同播放地點時，共用 `creative_id`，但每個地點使用不同 `placement_id` 與 `qr_id`，以比較同一內容在不同地點的效果。

### Print Content QR

紙本醫訊文章 QR → QR Router 記錄導入 → 官方醫師掛號頁。

只能稱 `outbound_registration`，不可宣稱完成掛號，除非未來官網 analytics 能確認。

## 5. Latest Issue

Latest Issue 由 metadata 決定：

```text
status = published
ORDER BY publish_date DESC
LIMIT 1
```

不要用 current month 判斷。

## 6. Homepage Features

每期可維護 2–4 個焦點：

```text
title
summary
image (optional)
target_type
target_page / target_url
```

不需要重新撰寫完整文章。

## 7. Outpatient / Shuttle

門診表與接駁資訊隨每月醫訊更新一次。

提供：

```text
/latest/outpatient
/latest/shuttle
```

導向最新一期對應 Reader page；不取代官網即時門診查詢。

## 8. Reader

Mobile-first PDF.js Reader：單頁、垂直連續捲動、fit-width、lazy render、指定頁直達。

## 9. Time Tracking

分開記錄：

- QR Entry Time：Router 收到 request 的時間
- Interaction Period：使用者進站後的匿名有效互動時間

## 10. Pilot

Demo：2026/06、07、08。

Pilot：2026/09–10，全數約 7–8 個公播點位一起切入新版 QR。

2026/11 依數據評估正式 Production。

## 11. MVP Out of Scope

- 登入式個人化
- 繼續上次閱讀
- AI PDF 轉 HTML
- 完整 Admin CMS Editor
- HIS / 病歷系統
- 病患個資
- 真實掛號完成追蹤
