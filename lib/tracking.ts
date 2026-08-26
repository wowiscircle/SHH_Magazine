export type TrackingEvent = { event: string; [key: string]: unknown };

export async function trackServerEvent(payload: TrackingEvent) {
  // Adapter seam for GA4 or a durable event store. Tracking is deliberately best-effort.
  if (process.env.ANALYTICS_ENDPOINT) {
    await fetch(process.env.ANALYTICS_ENDPOINT, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload), signal: AbortSignal.timeout(800) });
  }
}
