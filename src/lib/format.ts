/** camelCase metric keys → readable labels (e.g. gdpPerCapita → Gdp Per Capita). */
export function formatMetricKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
}

interface ScenarioValueFormat {
  unit?: string;
}

/** Format a scenario range value with its unit (shared by hero + range panels). */
export function formatScenarioValue(
  range: ScenarioValueFormat,
  value: number | string,
): string {
  const raw = String(value);
  if (range.unit === "USD") return `$${Number(raw).toLocaleString()}`;
  if (range.unit === "USD bn") return `$${Number(raw).toLocaleString()}bn`;
  if (range.unit === "%") return `${raw}%`;
  if (range.unit) return `${raw} ${range.unit}`;
  return raw;
}

/** Compact naira for civic tables (₦68.32tn, ₦186bn, ₦890m). */
export function formatNaira(naira: number): string {
  const abs = Math.abs(naira);
  if (abs >= 1_000_000_000_000) {
    const tn = naira / 1_000_000_000_000;
    return `₦${tn.toLocaleString("en-NG", { maximumFractionDigits: tn >= 10 ? 2 : 3 })}tn`;
  }
  if (abs >= 1_000_000_000) {
    const bn = naira / 1_000_000_000;
    return `₦${bn.toLocaleString("en-NG", { maximumFractionDigits: bn >= 10 ? 1 : 2 })}bn`;
  }
  if (abs >= 1_000_000) {
    const m = naira / 1_000_000;
    return `₦${m.toLocaleString("en-NG", { maximumFractionDigits: m >= 10 ? 0 : 1 })}m`;
  }
  return `₦${naira.toLocaleString("en-NG")}`;
}
