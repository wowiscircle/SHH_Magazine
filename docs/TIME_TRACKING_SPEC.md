# Time Tracking Specification

## 1. Two Time Models

使用者要知道兩件不同的事：

1. 什麼時間 QR 導入？
2. 掃進去後互動多久？

不可用同一個 timestamp 取代。

## 2. QR Entry Time

當 `/q/[qrId]` 收到 HTTP request 時記錄：

```text
entry_id
qr_id
qr_type
creative_id
placement_id
issue_id
qr_entry_at_utc
```

Storage：UTC。Display：Asia/Taipei。

`qr_entry_at` = QR Router 收到 request 的時間，是網站能可靠取得、最接近掃碼瞬間的 server/edge timestamp。

不可宣稱取得手機相機辨識 QR pattern 的 exact decode timestamp，因為 decode 發生在手機端、開啟 URL 之前。

## 3. Interaction Session

內容頁建立匿名 session：

```text
session_id
entry_id
session_started_at
first_content_view_at
last_engaged_at
session_ended_at
active_engagement_seconds
elapsed_session_seconds
```

## 4. Active Engagement

只在使用者可能真的閱讀時累積。

條件建議：頁面 visible + recent activity within idle threshold；activity 可由 scroll、pointer、touch、keyboard、page navigation 更新。

MVP 建議 idle threshold = 30 seconds。

超過 30 秒無有效活動就暫停 active engagement，重新互動後繼續。

## 5. Heartbeat

MVP 可每 15 秒 best-effort 發送 `engagement_heartbeat`：

```text
session_id
entry_id
active_engagement_seconds
current_page
issue_id
creative_id
placement_id
```

Heartbeat failure 不可影響 Reader。

## 6. Page Lifecycle

使用 `visibilitychange`、`pagehide`，不要只依賴 `beforeunload`。`sendBeacon` 可做 best-effort final flush。

## 7. Admin Time Buckets

支援：Hourly、2-hour buckets、Weekday。

Primary heatmap：Placement × Hour。

Secondary：Weekday × Hour、Creative × Hour。

Heatmap metric 可切換：QR Entries / Read Start / Active Engagement Median。

## 8. Privacy

不要透過 timestamp + identifiers 反推個人。Admin 預設呈現 aggregated data；raw event debug 只在 protected Admin Debug 顯示。

## 9. Pilot Acceptance

必須能 Demo：不同 placement 在不同時間的 QR entry、Placement × Hour heatmap、Reader read_start、active engagement 累積與 Admin interaction duration。
