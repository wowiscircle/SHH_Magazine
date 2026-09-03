# QR 導入追蹤串接：Google Apps Script → Google Sheet

這份文件提供給接手同事與 Codex。目標是把現有網站的 QR 導入事件可靠寫入既有 Google Sheet，不重建另一套系統。

## 正確用詞

目前只有 QR 入口請求次數，沒有可信的螢幕曝光分母，因此：

- 使用「QR 導入量」、「QR 互動量」或「點位導入占比」。
- 不使用「掃碼率」。
- `qr_entry_at_utc` 是網站收到 `/q/[qrId]` 請求的時間，不是手機相機辨識 QR 圖樣的時間。

只有未來取得可信曝光數，才能定義「QR 導入量 ÷ 曝光量」。

## 運作原理

```text
每個點位／素材使用唯一 QR URL
→ 民眾手機開啟 /q/[qrId]
→ 網站查詢可信的 QR mapping
→ 產生匿名 entry_id 與伺服器 UTC 時間
→ 建立 qr_entry 事件
→ POST JSON 到 ANALYTICS_ENDPOINT
→ Google Apps Script doPost() 驗證並寫入 Google Sheet
→ 網站立即導向醫訊或官方掛號頁
```

進入醫訊後，Reader 的閱讀開始、進度與互動時間會送到 `/api/events`，再經由同一個 `ANALYTICS_ENDPOINT` 寫入事件表。

目前 repo 已完成事件產生與通用 HTTP 轉送器，但沒有包含既有 Apps Script 原始碼、Sheet ID 或欄位 mapping。`ANALYTICS_ENDPOINT` 未正確設定時，閱讀與跳轉仍正常，但資料不會保存。

## 開始前，請提供給 Codex 的資料

### A. 既有 Google 串接（必要）

1. 既有 Apps Script 原始碼，例如 `Code.gs`；先移除程式中的密碼、Token 與個資。
2. 已部署的 Apps Script Web App URL。只放入 Vercel 環境變數，不寫進 repo 或文件。
3. 目標 Google Sheet 連結、Spreadsheet ID，以及要寫入的工作表名稱。
4. 工作表第一列的完整欄位名稱與一至兩列去識別化範例資料。
5. Apps Script Web App 的部署方式與存取範圍，例如由誰執行、哪些呼叫者可以存取。
6. 現有驗證方式。若 Apps Script 需要共用 Token，請說明欄位／參數格式，但不要把 Token 貼到 GitHub。
7. 一個可安全測試的 Sheet 或測試工作表，避免測試事件混入正式資料。

### B. QR 業務資料（正式啟用前必要）

1. 最終點位清單：`placement_id`、名稱、位置說明、channel。
2. 最終素材清單：`creative_id`、名稱、期別與目的地類型。
3. Creative x Placement 對照表：每個素材實際出現在哪些點位。
4. 每個 QR 的永久 `qr_id` 與目的地。
5. 正式期刊 metadata、PDF、封面、門診頁碼及接駁車頁碼。
6. 紙本文章要導向的已核准官方醫師掛號 URL。

已印製或公開使用的 `qr_id` 不可重新分配給另一個點位或素材。

## 建議的 Events 工作表欄位

先採用 append-only 原始事件表，不要一開始就在 Apps Script 裡做複雜報表：

```text
received_at_utc
event
entry_id
session_id
qr_id
qr_type
creative_id
placement_id
issue_id
channel
destination_type
qr_entry_at_utc
active_engagement_seconds
elapsed_session_seconds
page
final
```

欄位可依既有 Sheet 調整，但 Apps Script、網站 payload 與 Sheet 標題列必須建立明確 mapping。不要收集姓名、電話、病歷號、IP 或其他可識別個人的資料。

## 同事與 Codex 的執行順序

### 第一階段：只完成可靠寫入

1. 先讀現有 `app/q/[qrId]/route.ts`、`app/api/events/route.ts`、`lib/tracking.ts` 與 Apps Script。
2. 對照網站事件 JSON、Apps Script `doPost()` 與 Sheet 欄位，列出不一致，不要先改程式。
3. 確認 Apps Script 能快速回傳明確的成功／失敗 JSON，並處理同時寫入與錯誤紀錄。
4. 確認驗證機制。現在網站轉送器沒有附帶驗證 Token；若既有 Script 要求 Token，需新增伺服器端環境變數與傳送邏輯。
5. 改善 QR Router 的背景寫入可靠性。現在採 best-effort 且 timeout 為 800ms；應使用目前 Hosting 支援的背景工作／可靠佇列方式，或提出經量測可接受的短暫等待方案，同時維持追蹤失敗不阻擋跳轉。
6. 使用測試 QR 送出一筆 `qr_entry`，確認 Sheet 只新增預期資料。
7. 再測試 `read_start` 與一筆 `engagement_heartbeat`，確認同一 `entry_id` 能串起 QR 與閱讀事件。
8. 記錄測試時間、QR ID、Sheet 列號與結果，但不要把秘密值寫入 repo。

### 第二階段：再接 Admin 報表

1. 先定義原始事件如何彙整成 QR 導入量、閱讀起始率、閱讀深度與互動時間。
2. 決定 Admin 經由 Apps Script 查詢、排程快照或其他後端資料層讀取；瀏覽器不可直接拿 Sheet 或 Apps Script 的秘密。
3. 以真實查詢替換 `/admin` 的 Demo data。
4. 驗證 UTC 轉 Asia/Taipei、點位／素材篩選及錯誤率。

## 上線驗收

- 使用 Preview 環境與測試 Sheet 先驗證，再修改 Production 環境變數。
- 同一支測試 QR 連續操作數次，Sheet 的筆數、`entry_id` 與時間皆正確。
- QR 導入追蹤失敗時，使用者仍能進入正確內容。
- 未知 QR 與不合規的外部網址仍被安全處理。
- 375/390px 手機能完成掃 QR、導向、閱讀與指定頁碼操作。
- 不把 Apps Script URL、Spreadsheet ID、Token、帳密或 `.env` 值提交到 Git。
- 正式 QR ID 與目的地經人工複核後才可印製或發布。

## 給 Codex 的開始指令

```text
請先閱讀 docs/QR_ANALYTICS_SETUP.md，並只做串接盤點，不要修改或部署。
請逐項告訴我還缺哪些 Apps Script、Google Sheet、欄位、驗證方式與 QR 業務資料。
拿到資料後，先提出「事件 payload → Apps Script → Sheet 欄位」對照表與測試計畫，經我確認後再實作。
沒有曝光分母時，一律使用 QR 導入量，不要稱為掃碼率。
```
