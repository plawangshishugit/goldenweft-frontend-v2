export function track(event: string) {
  if (typeof window === "undefined") return;
  console.log("[GW EVENT]", event);
}
