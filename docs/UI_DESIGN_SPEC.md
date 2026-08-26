# UI Design Specification

## Brand

```css
--brand: #009fa8;
--brand-soft: rgba(0,159,168,.14);
```

## Public UI

Visual direction：Editorial / Modern Healthcare / Calm / Official / Mobile-first。

公開首頁：Latest Issue、Cover、Headline、Summary、Start Reading、Features、Archive、Footer。

不得出現 Tracking Demo、Admin button、Analytics、Dashboard 或 Debug。

Latest Issue 的 `homepage_headline` / `homepage_summary` 從 metadata 取得，不使用固定 generic hero copy。

Primary CTA =「開始閱讀」；PDF Download 為 secondary action。

## Admin UI

工具型但維持雙和視覺一致，不需要重型 sidebar。

Sections：Overview、Creative × Placement、Time Analysis、Issue Performance、System Health、Tracking Debug。

### Heatmap

Primary = Placement × Hour。使用品牌色 `#009fa8` 不同透明度／強度，不使用 rainbow heatmap。

Metric switch：QR Entries / Read Start / Active Engagement。

### Interaction Time

同時顯示 Median Active Engagement 與 Median Elapsed Session，並以 tooltip 說明差別。

### Debug

放 Admin 最下方，預設 collapsed；dark developer-style panel 只可存在 protected Admin。

## Accessibility

- WCAG AA
- 16px+ mobile body
- 44px touch targets
- visible focus
- semantic HTML
- no essential hover-only interaction

## Responsive

Public 以 375/390px 為主要驗收；Admin desktop/tablet first，但 mobile 仍須可查看主要 KPI。
