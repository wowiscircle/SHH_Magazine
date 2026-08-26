# Admin Analytics Specification

## Route

```text
/admin
```

Same origin as public site, protected.

## Overview KPI

- QR Entries
- Sessions
- Users
- Start Reading Rate
- 50% Read Rate
- Completion Rate
- Median Active Engagement
- Outbound Registration

Filters：Date Range / Issue / Creative / Placement / Channel。

## Creative × Placement

核心比較：

| Creative | Placement | QR Entries | Read Start | Read 50% | Active Engagement |
|---|---|---:|---:|---:|---:|

## Time Analysis

Primary visualization：

```text
Placement × Hour Heatmap
```

X = hour/time bucket；Y = placement。

Cell metric 可切換：QR Entries / Read Start / Median Active Engagement。

Secondary：Weekday × Hour、Daily QR Trend、Creative × Time、Interaction Duration Distribution。

## System Health

- Unknown QR
- Reader Error
- Missing PDF
- Failed outbound allowlist
- Analytics unavailable

## Tracking Debug

頁面最下方，預設收合：

```text
[ 展開 Tracking Debug ▾ ]
```

只在 `ADMIN_ANALYTICS_DEBUG=true` 顯示。

Raw debug 可顯示 timestamp、event、entry_id、session_id、qr_id、creative_id、placement_id、issue_id、active engagement。

## Public Separation

公開 navbar/footer 不放 Admin link；public bundle/UI 不 render dashboard/debug 元件。

## Access

Pilot 可使用 hosting-level protection 或 server-side simple access gate；不可依賴隱藏 URL、client-side hardcoded password、query string password 或 localStorage password。

正式版未來可接 GWS / SSO / RBAC。
