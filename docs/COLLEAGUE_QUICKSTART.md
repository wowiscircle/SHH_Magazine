# 同事接手須知：第一次使用 Codex

你不需要先會寫程式。請讓 Codex 負責檢查、修改與測試，你負責確認要達成的結果。

## 第一次開始

1. 登入 Codex，建立一個新任務。
2. 貼上 repo 網址：<https://github.com/wowiscircle/SHH_Magazine>
3. 再貼上 `PROMPT_FOR_CODEX.txt` 的完整內容。
4. 補一句：

```text
我是第一次使用 Codex，請用繁體中文帶我一步一步操作。先只檢查並回報，不要立刻修改。
```

Codex 會協助 clone repo、閱讀文件、安裝套件及執行測試。如果它需要你登入 GitHub 或 Vercel，完成登入後回覆「已登入」即可。

## 平常怎麼交代工作

直接用一般中文描述想要的結果，例如：

```text
請加入 2026 年 9 月醫訊。先告訴我還缺哪些檔案或資料，不要自行編造內容。
```

一次交代一個小目標最容易確認。若 Codex 提供選項而你不確定，可以請它推薦最安全的方案。

## 要啟用 QR 導入追蹤時

先閱讀 `docs/QR_ANALYTICS_SETUP.md`，不要直接叫 Codex 自行建立新系統。請先準備：既有 Apps Script 程式、Web App URL、Google Sheet 與欄位、去識別化範例列、存取／驗證方式，以及正式點位與 QR 對照資料。

Web App URL、Token 與 Sheet 權限資料不要放進 GitHub。沒有曝光分母時，請使用「QR 導入量」，不要稱為「掃碼率」。

## 完成前請確認

請 Codex 回報以下四項：

- 測試、lint、build 是否通過。
- 修改了哪些檔案。
- 是否已 commit 並 push 到 `main`。
- 正式預覽網址是否正常，手機 375/390px 是否驗證過。

## 請勿提供或允許

- 不要貼病患、員工個資或院內敏感資料。
- 不要把密碼、API key 或 `.env` 內容貼進 GitHub。
- 看到刪除檔案、hard reset、修改雲端權限或 Production 部署時，先確認目標再允許。
- Demo QR 尚未完成，不要直接印製或公開使用。

## 卡住時直接這樣說

```text
請停止修改，先用簡單中文說明：目前做到哪裡、卡在哪裡、我下一步只要做什麼。
```

完整技術現況請看 `docs/HANDOFF.md`；下一步工作請看 `ACTION_ITEMS.md`。
