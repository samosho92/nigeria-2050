/** Locale-aware integers for civic counts (people, seats, ballots). */
export function formatInteger(value: number, locale = "en-NG"): string {
  return value.toLocaleString(locale);
}

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

/** Parse a scenario range endpoint for layout math (bars, markers). */
export function parseScenarioNumber(value: number | string): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  const parsed = Number.parseFloat(String(value).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Position of the base case between low and high (0–100), or null when
 * endpoints are non-numeric or identical.
 */
export function scenarioBasePositionPercent(
  low: number | string,
  base: number | string,
  high: number | string,
): number | null {
  const lowN = parseScenarioNumber(low);
  const baseN = parseScenarioNumber(base);
  const highN = parseScenarioNumber(high);
  if (lowN === null || baseN === null || highN === null || highN === lowN) return null;
  const pct = ((baseN - lowN) / (highN - lowN)) * 100;
  return Math.min(100, Math.max(0, pct));
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
