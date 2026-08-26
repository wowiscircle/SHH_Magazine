# Analytics Specification

## Core Events

```text
qr_entry
qr_unknown
issue_view
read_start
read_25
read_50
read_75
read_90
read_complete
engagement_heartbeat
page_jump
section_jump
pdf_download
outbound_registration
reader_error
```

## QR Entry Event

Must contain：

```text
entry_id
qr_id
qr_type
creative_id
placement_id
issue_id
channel
destination_type
qr_entry_at_utc
```

Admin 顯示時間轉為 `Asia/Taipei`。

## Interaction Context

QR 之後的事件盡量保留：

```text
entry_id
session_id
creative_id
placement_id
issue_id
```

建立匿名 attribution，不做身份辨識。

## Engagement Metrics

分開追：

```text
active_engagement_seconds
elapsed_session_seconds
```

不可當成同一數值。

## KPI

- QR Entries
- Sessions
- Users（匿名近似統計）
- Start Reading Rate
- 50% Read Rate
- Completion Rate
- Median Active Engagement
- Outbound Registration

## Time Analytics

- QR Entries by hour
- QR Entries by weekday
- Placement × Hour
- Creative × Hour
- Daily trend
- Median Active Engagement by placement
- Median Active Engagement by creative

## Scan-rate Naming

若沒有曝光分母，不稱「掃碼率」。使用：QR 導入量、QR 互動量、點位導入占比。

若未來有可信曝光分母，再定義 QR interaction / exposure ratio。

## Public UI

Public pages never display analytics counters/debug UI。

## Failure Principle

```text
track() failure
≠ reader failure
≠ redirect failure
```
