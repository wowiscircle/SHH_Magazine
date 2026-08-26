import issuesData from "@/data/issues.demo.json";
import qrData from "@/data/qr-routes.demo.json";

export type Issue = (typeof issuesData)[number];
export type QrRoute = (typeof qrData)[number];

export const issues = issuesData as Issue[];
export const qrRoutes = qrData as QrRoute[];

export function getPublishedIssues(): Issue[] {
  return issues
    .filter((issue) => issue.status === "published")
    .sort((a, b) => b.publish_date.localeCompare(a.publish_date));
}

export function getLatestIssue(): Issue {
  const latest = getPublishedIssues()[0];
  if (!latest) throw new Error("No published issue is configured");
  return latest;
}

export function getIssue(id: string): Issue | undefined {
  return issues.find(
    (issue) => issue.issue_id === id && issue.status === "published",
  );
}

export function getQrRoute(id: string): QrRoute | undefined {
  return qrRoutes.find((route) => route.qr_id === id && route.active);
}

export function isAllowedRegistrationUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      (url.hostname === "shh.tmu.edu.tw" ||
        url.hostname.endsWith(".shh.tmu.edu.tw"))
    );
  } catch {
    return false;
  }
}

export function safeEntryId(value: string | string[] | undefined): string | null {
  const entryId = Array.isArray(value) ? value[0] : value;
  return entryId && /^[0-9a-f-]{36}$/i.test(entryId) ? entryId : null;
}
