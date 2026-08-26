import issuesData from "@/data/issues.demo.json";
import qrData from "@/data/qr-routes.demo.json";

export type Issue = (typeof issuesData)[number];
export type QrRoute = (typeof qrData)[number];

export const issues = issuesData as Issue[];
export const qrRoutes = qrData as QrRoute[];

export function getPublishedIssues() {
  return issues.filter((issue) => issue.status === "published").sort((a, b) => b.publish_date.localeCompare(a.publish_date));
}
export function getLatestIssue() { return getPublishedIssues()[0]; }
export function getIssue(id: string) { return issues.find((issue) => issue.issue_id === id && issue.status === "published"); }
export function getQrRoute(id: string) { return qrRoutes.find((route) => route.qr_id === id && route.active); }
export function isAllowedRegistrationUrl(value: string) {
  try { const url = new URL(value); return url.protocol === "https:" && (url.hostname === "shh.tmu.edu.tw" || url.hostname.endsWith(".shh.tmu.edu.tw")); }
  catch { return false; }
}
