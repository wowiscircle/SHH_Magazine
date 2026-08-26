# QR Tracking Specification

## Core Model

```text
Creative
×
Placement
×
QR
×
Issue
```

## Placement

代表內容實際曝光的院內點位，例如：

```text
STORY   故事館
OPD01   一樓門診
ELEV-A  A棟電梯
```

目前約 7–8 個公播地點。

## Creative

代表「看到什麼內容」。

Example：

```text
creative_id = C-202609-003
```

同一 Creative 到不同點位，`creative_id` 不變。

## QR Types

### Placement QR

螢幕旁固定 QR，主要導最新一期總入口，可長期不換。

### Creative × Placement QR

同一內容不同點位使用不同 QR：

```text
/q/c-202609003-story
/q/c-202609003-opd
/q/c-202609003-elev
```

共同：

```text
creative_id = C-202609-003
```

不同：

```text
placement_id
qr_id
```

這是比較「同一內容在哪個地點最有效」的必要做法。

### Print Content QR

紙本文章 QR：

```text
/q/a-202609-doc01
```

追蹤後導官方醫師掛號頁。

## Identical QR Limitation

完全相同 QR 圖樣代表相同 URL；若在同一醫院不同地點使用相同 URL，網站無法可靠知道是在哪個實體點位掃描。

因此：

> Same Creative + Different Placement = Different QR ID.

QR 可由系統批次產生，不要求設計師手動逐一建立。

## QR Registry

至少包含：

```text
qr_id
qr_type
creative_id
placement_id
issue_id
channel
destination_type
destination
active
```

## Historical Integrity

已正式使用的 `qr_id` 不可重新分配給另一個內容，避免歷史報表被污染。

## Router Security

禁止 open redirect：

```text
/q?id=x&url=https://anything.example
```

destination 必須來自可信 mapping；外部掛號 destination 必須符合官方 allowlist。
