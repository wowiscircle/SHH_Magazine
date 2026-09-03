# Pilot Deployment Plan

## Context

辦公室 Windows 主機無法從外網手機直接連入，因此 Pilot 不把院內主機開放到 Internet。

## Pilot Strategy

2026/09–10 使用 external public hosting，但只包含公開資料：

- 已公開醫訊 PDF / cover
- 公開院方資訊
- 官方醫師掛號 URL
- anonymous analytics identifiers

Current public MVP:

```text
https://shh-magazine.vercel.app
Vercel project: shh10/shh-magazine
```

This URL is a Pilot preview, not the final hospital subdomain. Vercel deployment-level SSO is disabled so public QR visitors can read without a Vercel account.

禁止：HIS、內網 API、VPN、NAS、病歷、患者／員工個資。

## Hosting Requirements

- HTTPS
- stable Pilot URL
- supports Next.js or equivalent routing/runtime
- environment variables
- security headers
- logs
- no dependency on vendor-specific APIs in core app

## One App

Pilot 也只有一個 deployment/domain：

```text
pilot-host.example/
pilot-host.example/admin
```

## September Pilot

全數約 7–8 個公播點位一起切入新版 QR。Pilot 前需要 placement registry、creative registry、Creative × Placement matrix、2026/09 issue metadata、Reader PDF、analytics test configuration。

As of 2026-09-03, the 2026/09 issue, final placement matrix, approved doctor registration URL, and durable analytics destination are not yet configured. Demo QR records that target 2026/09 must not be printed or distributed.

## Current environment status

Vercel contains entries for the environment variable names in `.env.example`, but `/admin` currently returns `503`. Verify that `ADMIN_USERNAME` and `ADMIN_PASSWORD` have non-empty valid values, then redeploy. Never copy credential values into GitHub or this document.

## Production Handoff

Pilot 通過後向資訊室提出：

```text
magazine.shh.tmu.edu.tw
```

需求：DNS、TLS、deployment environment、monitoring、backup、GA integration、security review。

辦公室 Windows 主機可作 development/local preview，不作 public origin server。

## 資訊室說明重點

Pilot 是公開內容 UX / QR 成效測試：不介接院內系統、不處理患者資料、不開放辦公室主機外網連線；正式導入前再進 Production 資安流程。
