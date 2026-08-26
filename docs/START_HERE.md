# SHH Magazine Pilot — Start Here

## 產品

雙和醫訊數位閱讀暨 QR 成效追蹤平台。

## 架構凍結

> One App / One Deployment / One Domain

正式預期：

```text
https://magazine.shh.tmu.edu.tw
├── /                         Public
├── /issues                   Public
├── /issues/[issueId]         Public
├── /read/[issueId]           Public
├── /q/[qrId]                 Public QR Router
├── /latest/outpatient        Public
├── /latest/shuttle           Public
└── /admin                    Protected Admin
```

不建立第二個 Admin 網站、不需要第二個 domain。

## Public / Admin Separation

一般民眾不可看到 Tracking Demo、Analytics Debug、QR Matrix、Admin Dashboard 或管理者入口。

`/admin` 才顯示 KPI、Creative × Placement、Placement Performance、Time Analysis、Issue Performance、System Health 與 Tracking Debug；`/admin` 必須有 access protection。

## 時間分析

每次 QR 導入保留兩種不同時間概念。

### QR Entry Time

QR Router `/q/[qrId]` 收到 request 的時間，是網站能可靠取得、最接近掃碼瞬間的時間。

```text
entry_id
qr_entry_at_utc
qr_entry_at_local (derived)
timezone = Asia/Taipei
```

網站無法取得手機相機真正 decode QR 的 exact timestamp，因此產品與報表用詞使用「QR 導入時間」。

### Interaction Period

```text
session_started_at
first_content_view_at
last_engaged_at
active_engagement_seconds
elapsed_session_seconds
```

`active_engagement_seconds` 與 `elapsed_session_seconds` 不可混為一談。

## Admin Time Analysis

- Placement × Hour Heatmap
- Weekday × Hour Heatmap
- Daily QR Trend
- Creative × Time
- Session Interaction Duration

篩選：date range / issue / creative / placement / channel。

## Pilot Timeline

Demo：2026-06、2026-07、2026-08。

Pilot：2026-09、2026-10。

2026-11 再決定正式資訊室部署。

## 文件閱讀順序

1. `docs/PRODUCT_REQUIREMENTS.md`
2. `docs/CMS_SCHEMA.md`
3. `docs/QR_TRACKING_SPEC.md`
4. `docs/READER_SPEC.md`
5. `docs/ADMIN_SPEC.md`
6. `docs/ANALYTICS_SPEC.md`
7. `docs/TIME_TRACKING_SPEC.md`
8. `docs/SYSTEM_ARCHITECTURE.md`
9. `docs/PILOT_DEPLOYMENT.md`
10. `docs/SECURITY_PRIVACY.md`
11. `docs/SEO_SHARING.md`
12. `docs/UI_DESIGN_SPEC.md`
13. `CODEX.md`
14. `ACTION_ITEMS.md`
