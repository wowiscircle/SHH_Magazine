# Action Items

## 現在

- [ ] Clone / pull `wowiscircle/SHH_Magazine`
- [ ] 用 VS Code 開 repo
- [ ] Codex 先讀 `README.md`、`CODEX.md`、`docs/`
- [ ] 讓 Codex 初始化 Next.js App
- [ ] `npm run lint`
- [ ] `npm run build`

## Demo / Public QA

- [ ] Public 首頁沒有 Tracking Demo
- [ ] Public Footer 沒有 Admin 入口
- [ ] `/admin` 需要驗證
- [ ] Public / Admin 使用同一 domain
- [ ] Tracking failure 不影響 QR redirect
- [ ] Tracking failure 不影響 Reader

## Time Tracking QA

- [ ] 每個 QR Entry 有 `qr_entry_at_utc`
- [ ] Admin 顯示 Asia/Taipei
- [ ] 每個 entry 有 opaque `entry_id`
- [ ] Reader 建立匿名 session
- [ ] Active engagement idle 時停止
- [ ] Page hidden 時停止
- [ ] 回來後可繼續累積
- [ ] Admin 有 Placement × Hour Heatmap
- [ ] Admin 可看 Median Active Engagement
- [ ] Tracking Debug 預設收合

## 9 月 Pilot 前需要提供

### 1. 7–8 個公播點位

```text
placement_id
location_name
description
```

### 2. 9 月 Creative

```text
creative_id
creative_name
issue_id
destination
```

### 3. Creative × Placement Matrix

標記每一張素材實際播放在哪些點位，讓系統批次產生不同 QR。

### 4. 紙本文章掛號 URL

只使用官方醫師掛號頁。

### 5. Pilot Hosting

確認 HTTPS、穩定 URL、不連院內內網、不含敏感資料。

### 6. Analytics

建立 GA4 Test Property 或先以 debug adapter 驗證事件。

## Pilot 後（2026/11）

分析：點位 QR 導入、時段熱區、星期差異、同 Creative 跨點位表現、Median Active Engagement、Reader 深度、掛號頁 outbound、Error rate。

再決定正式 Production、官方子網域、Google Sheet CMS、正式 Analytics 整合，以及是否加入「繼續上次閱讀」。
