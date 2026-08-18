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
  if (range.unit === "%") return `${raw}%`;
  if (range.unit) return `${raw} ${range.unit}`;
  return raw;
}
