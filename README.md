# SHH Magazine

雙和醫訊數位閱讀暨 QR 成效追蹤平台（Pilot）。

## Source of truth

本 GitHub repository 是本專案唯一 source of truth。後續規格、Mockup、程式碼與 Action Items 均以 `main` 為準，不再以聊天中產生的 ZIP 版本作為主版本。

## Pilot 目標

2026/09–10 先進行真實場域 Pilot，累積兩個月資料，再於 2026/11 評估是否正式交資訊室部署。

核心流程：

```text
線下曝光
→ QR Entry
→ 對應內容
→ Mobile Reader / 醫師掛號頁
→ Engagement Analytics
→ Admin 分析
```

## 架構原則

> One App / One Deployment / One Domain

正式預期：

```text
magazine.shh.tmu.edu.tw
├── /                  Public
├── /issues            Public
├── /read/*            Public
├── /q/*               Public QR Router
└── /admin             Protected Admin
```

公開網站不顯示 Tracking、Analytics Debug 或 Admin 入口；`/admin` 為同一套 Next.js App 內的 protected route。

## Brand

統一品牌色：`#009fa8`

## Start here

1. 讀 `docs/START_HERE.md`
2. 讀 `CODEX.md`
3. 讀 `docs/` 全部產品／追蹤／Reader／部署規格
4. Mockup 在 `mockup/`
5. 執行任務依 `ACTION_ITEMS.md`

## Codex

Codex 每次開始工作前先：

```text
git pull
→ read CODEX.md + docs
→ implement
→ npm run lint
→ npm run build
→ commit / push
```
