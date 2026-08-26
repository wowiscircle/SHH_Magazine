# Security & Privacy

## Public

No login. No PHI.

## Admin

Protected `/admin`. Do not rely on hidden URL. No client-side hardcoded admin secret, query-string password, or localStorage password.

## Allowed Anonymous Analytics Fields

```text
entry_id
session_id
qr_id
creative_id
placement_id
issue_id
timestamps
anonymous engagement duration
```

Do not collect patient name, MRN, email, phone, diagnosis, appointment result, or precise GPS.

`placement_id` represents the organization-defined installation location of the QR asset. It is NOT GPS tracking of the user.

## QR Router

No open redirect. External registration destinations must come from trusted config and official allowlist.

## Logs

Avoid full arbitrary query-string logging. Raw event debug is available only under protected Admin. Normal dashboard should aggregate.

## Failure Isolation

Admin/auth/analytics failure must never break the public Reader or QR redirect.
