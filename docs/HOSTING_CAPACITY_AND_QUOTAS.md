# Vercel Hosting、流量與 Google 配額估算

最後核對：2026-09-03（Asia/Taipei）

這份文件提供給專案交接、Pilot 容量規劃與正式上線決策。數字分成「官方限制」與「本專案估算」；估算不是保證額度，也不是實際流量報表。

## 先說結論

- 目前 `shh10/shh-magazine` 使用啟用中的 Vercel Hobby 免費方案，免費方案沒有固定到期日。
- Hobby 並非無限量。此專案最可能先遇到的是 PDF 的 `Fast Data Transfer` 100 GB／月，而不是 Function 100 萬次／月。
- 以目前三期 PDF、70% QR 訪客進入閱讀器估算，每日 100／300／500 次 QR 導入，月傳輸量約為 17–25／52–74／87–123 GB。
- Google Apps Script 的單次執行與同時執行限制，在上述平均流量下通常不是第一個瓶頸；Google Sheet 的 1,000 萬儲存格總上限反而需要預先規劃封存。
- Vercel Hobby 官方限制為個人、非商業用途。院方正式公開服務若由受薪員工或委外人員製作或維護，依官方文字可能不符合 Hobby。Demo 可先沿用 Hobby；正式印製 QR Code 並長期對外前，建議改用 Pro 或取得 Vercel Support 的書面確認。
- 目前尚未取得既有 Apps Script 原始碼，因此 Google 部分以「每個事件呼叫一次 `doPost()` 並新增一列」估算。拿到 Script 後必須重新核對。

## 目前檔案大小

| 資產 | 大小 |
| --- | ---: |
| 2026-06 PDF | 3.87 MB |
| 2026-07 PDF | 9.47 MB |
| 2026-08 PDF | 4.83 MB |
| 三期 PDF 平均 | 6.05 MB |
| 三張封面合計 | 0.97 MB |
| PDF.js worker | 1.38 MB（傳輸時可能壓縮） |

瀏覽器可能採分段下載、HTTP 壓縮及快取，因此一次閱讀不一定完整傳輸整份 PDF；但 QR 使用情境多為新訪客第一次開啟，不應把瀏覽器快取當成容量保證。

## Vercel Hobby 官方限制

截至本文件核對日，與本專案最相關的 Hobby 使用指引如下：

| 資源 | Hobby 指引 |
| --- | ---: |
| Fast Data Transfer | 最高約 100 GB／月 |
| Fast Origin Transfer | 最高約 10 GB／月 |
| Function Invocations | 最高約 1,000,000 次／月 |
| Active CPU | 最高約 4 CPU-hours／月 |
| Provisioned Memory | 最高約 360 GB-hours／月 |
| Deployments | 100 次／日 |

Hobby 沒有付費帳期。多數資源超過限制後，相關功能可能暫停，並可能需要等 30 天才能再次使用；不是在沒有升級的情況下自動無限加購。

官方來源：

- [Vercel Hobby Plan](https://vercel.com/docs/plans/hobby)
- [Vercel Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines)
- [Vercel Pricing](https://vercel.com/pricing)

Vercel 可能調整方案與配額，正式上線前應重新查看上述頁面。

## PDF 流量估算

### 規劃假設

以下不是現有實測數據，而是容量規劃用假設：

1. 每月以 30 天計算。
2. QR 導入者中，70% 會進入 PDF 閱讀器。這只是規劃值，正式資料上線後要用真實 `read_start ÷ qr_entry` 替換。
3. 一般混合期別：PDF 平均 6.05 MB，加上 Reader JavaScript、PDF worker、頁面與封面等首次載入成本。
4. 高傳輸情境：訪客主要閱讀最大的 2026-07 PDF（9.47 MB）。
5. 不把快取節省算入安全容量。

### 估算結果

| 每日 QR 導入 | 每月 QR 導入 | 一般期別組合 | 大檔期別為主 |
| ---: | ---: | ---: | ---: |
| 100 | 3,000 | 約 17 GB | 約 25 GB |
| 300 | 9,000 | 約 52 GB | 約 74 GB |
| 500 | 15,000 | 約 87 GB | 約 123 GB |

算法摘要：每次 QR 導入先預留約 0.5 MB 的頁面／封面成本，再加上 `70% ×（PDF + 約 1.5 MB Reader 資產）`。這是刻意偏保守的初估，實際值要以 Vercel Usage 為準。

容量判讀：

- 每日約 100–250 次：Hobby 的流量空間通常足以支援 Pilot，但仍需每週監控。
- 每日約 250–350 次：進入觀察區，期別檔案大小與真實閱讀比例會明顯影響結果。
- 每日超過約 350 次，或短期宣傳可能爆量：不要只依賴 Hobby；應在活動前升級或將 PDF 移到經院方核准、可擴充的檔案/CDN 服務。
- 監控建議：Fast Data Transfer 達 50% 時檢查趨勢，達 70% 時決定升級或降低資產流量，不要等到 100% 才處理。

## 每次 QR 導入會產生多少事件

目前程式的事件模型不是「一次 QR 導入只寫一列」。成功進入閱讀流程時可能包含：

```text
qr_entry                         1 筆
read_start                       1 筆
engagement_heartbeat             每 15 秒 1 筆
離頁／隱藏時 final heartbeat      約 1 筆，實際可能多於一次
read_25/50/75/90/read_complete   最多 5 筆
```

一般閱讀情境採以下假設：

- 70% QR 訪客進入閱讀器。
- 平均停留 3 分鐘，產生 12 筆定時 heartbeat。
- 平均觸發 3 筆閱讀里程碑。
- 每位 Reader 約產生 `1 read_start + 12 heartbeat + 1 final + 3 progress = 17` 筆 client events。
- 換算每次 QR 導入平均事件數：`1 qr_entry + 70% × 17 = 12.9`，規劃時可抓 13 筆；保守壓力測試可抓 20 筆。

`visibilitychange`、`pagehide`、重複切換分頁或較長閱讀都可能增加事件數。

## Vercel Function 與 Google 寫入量估算

每次 `/q/[qrId]` 是一次 Vercel Function 請求；每個 `/api/events` 也是一次，並會再由 Vercel 向 Apps Script 發送一個 POST。以下只估追蹤相關呼叫，不含其他可能採動態渲染的頁面請求。

| 每日 QR 導入 | 每月 QR 導入 | 每月 Reader | 每月事件／Sheet 新增列 | 平均 Apps Script 執行／分鐘 |
| ---: | ---: | ---: | ---: | ---: |
| 100 | 3,000 | 2,100 | 約 38,700 | 約 0.9 |
| 300 | 9,000 | 6,300 | 約 116,100 | 約 2.7 |
| 500 | 15,000 | 10,500 | 約 193,500 | 約 4.5 |

即使保守抓每次 QR 導入 20 次 Function，Vercel 的 100 萬次約可容納每月 50,000 次、每日約 1,667 次 QR 導入。依目前 PDF 大小，通常會先接近 100 GB 傳輸量。

## Google Apps Script 配額怎麼看

Google 官方目前列出的相關限制：

| 項目 | Consumer／Google Workspace |
| --- | ---: |
| Script runtime | 每次執行最多 6 分鐘 |
| Simultaneous executions per user | 每位使用者同時 30 次 |
| Simultaneous executions per script | 每支 Script 同時 1,000 次 |
| URL Fetch calls | Consumer 20,000／日；Workspace 100,000／日 |

官方說明配額通常按使用者計算，從第一次請求起 24 小時後重置，且可能隨時調整：

- [Apps Script Quotas](https://developers.google.com/apps-script/guides/services/quotas)

判讀時要注意：

- Vercel 呼叫 Apps Script Web App 的 `doPost()` 是「進站請求」，不會因而消耗 Apps Script 的 `URL Fetch` 次數。
- 只有 Apps Script 內部再呼叫外部網址時，才會消耗 `URL Fetch` 配額。
- 若既有 Script 使用 `SpreadsheetApp.appendRow()`，主要先看 Script 執行時間、並發、鎖定與 Sheet 大小。
- 若既有 Script 改用 Advanced Sheets Service／Google Sheets API，還要看 Sheets API 的寫入限制：每專案每分鐘 300 次、每位使用者每專案每分鐘 60 次。官方表示在每分鐘配額內沒有每日請求上限。[Google Sheets API Usage Limits](https://developers.google.com/sheets/api/limits)
- 上表的每日平均遠低於同時執行上限，但平均值不能代表尖峰。多人同時掃碼時，`LockService`、單列 append 的速度及目前 Vercel 800ms timeout 都可能造成遺失，必須用壓力測試驗證。

## Google Sheet 容量估算

Google Sheet 每個試算表最多 1,000 萬個儲存格，所有分頁合併計算。[Google Drive file limits](https://support.google.com/drive/answer/37603)

目前建議事件表為 16 欄。若試算表只保留必要的 16 欄、不含其他分頁與多餘網格，理論上最多約：

```text
10,000,000 ÷ 16 = 625,000 事件列
```

| 每日 QR 導入 | 每月事件列 | 約占用儲存格／月 | 理論上多久接近 1,000 萬格 |
| ---: | ---: | ---: | ---: |
| 100 | 38,700 | 619,200 | 約 16.1 個月 |
| 300 | 116,100 | 1,857,600 | 約 5.4 個月 |
| 500 | 193,500 | 3,096,000 | 約 3.2 個月 |

實際可用時間會更短，因為限制包含同一試算表中的其他分頁、空白網格與額外欄位。只是在同一個 Spreadsheet 內新增每月分頁，無法避開 1,000 萬格總上限。

建議做法：

1. Pilot 可使用 append-only 原始事件表，但只保留必要欄位，刪除不用的額外欄列。
2. 依月建立「不同 Spreadsheet」或定期匯出 CSV 後清理線上原始資料；不要只分成同一檔案內的月份 tabs。
3. 報表使用彙整表，不要每次開 Admin 都掃描十萬列原始資料。
4. 若穩定超過每日 300–500 次 QR 導入，評估將原始事件移至 BigQuery 或院方核准的資料庫，Google Sheet 僅保留報表摘要。

## 目前追蹤可靠性的前置風險

上述估算假設每個事件都成功寫入，但目前 repo 尚未達到這個條件：

- `ANALYTICS_ENDPOINT` 只有通用轉送介面，還沒核對既有 Apps Script payload 與 Sheet 欄位。
- `lib/tracking.ts` 的外部請求 timeout 是 800ms。
- QR Router 以 best-effort 背景呼叫送出事件；Serverless 回應完成後，未完成請求可能遺失。
- Apps Script 若用 `LockService` 保護同時 append，排隊時間可能超過 800ms。

因此正式計算 QR 導入量前，必須依 `docs/QR_ANALYTICS_SETUP.md` 取得 Apps Script、測試 Sheet、部署權限與驗證方式，完成小量測試和至少一輪短時間併發測試。

## 建議的 Pilot 決策線

### 可先維持 Hobby

- 僅供 Demo、交接或小量 Pilot。
- 預估每日不超過約 250 次 QR 導入。
- 每週查看 Vercel Usage，並有人負責處理異常。
- 尚未把 Vercel Hobby 當作院方正式、永久的服務承諾。

### 應在公開活動前升級或確認

- 預估每日超過約 350 次，或活動可能在短時間大量導入。
- Vercel Fast Data Transfer 已達 70%。
- 需要同事共同管理正式 Vercel 專案、帳務與權限。
- 服務由院方或委外人員正式維護，可能落入 Vercel 所稱 commercial usage。
- QR Code 即將大量印製，網址與服務可用性需要正式責任歸屬。

Vercel Pro 在本文件核對日為每位 Developer seat 每月 USD 20，並可能另計超出方案包含額度的使用量。付款、稅金與院方採購方式應在正式上線前另行確認。

## 正式上線後要記錄的實測值

每週至少記錄：

```text
qr_entry 數
read_start 數
平均／中位 active engagement
每次 Reader 的 heartbeat 數
Vercel Fast Data Transfer
Vercel Function Invocations
Apps Script 失敗與 timeout 數
Sheet 新增列數與目前總列數
```

累積一至兩週實測後，用以下真實數值取代本文假設：

```text
實際 read_start / qr_entry
實際每次 Reader 事件數
實際每次閱讀傳輸 MB
實際尖峰每分鐘請求數
```
