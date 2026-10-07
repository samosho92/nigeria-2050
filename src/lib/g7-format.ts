/** Shared formatters for Nigeria vs. G7 benchmark values. */

export function formatBenchmarkValue(value: number, unit: string): string {
  if (unit === "USD") return `$${Math.round(value).toLocaleString()}`;
  if (unit === "%" || unit === "% of GDP" || unit === "% gross") return `${value}%`;
  if (unit === "WGI score") return value.toFixed(2);
  if (unit === "/100") return `${value}/100`;
  if (unit === "global rank") return `#${Math.round(value)}`;
  if (unit === "per 100k") return `${value} per 100k`;
  if (unit === "kWh/year") return `${Math.round(value).toLocaleString()} kWh`;
  if (unit === "physicians") return value.toFixed(2);
  if (unit === "per 100 people") return `${value} per 100`;
  if (unit === "per 1,000 people") return `${Math.round(value).toLocaleString()} per 1,000`;
  if (unit === "score 1–5") return value.toFixed(1);
  if (unit === "per km²") return `${Math.round(value).toLocaleString()} / km²`;
  if (unit === "sites") return `${Math.round(value)} sites`;
  return `${value.toLocaleString()} ${unit}`;
}

export function formatGapLabel(multiplier: number): string {
  if (multiplier >= 10) return `${Math.round(multiplier)}×`;
  if (multiplier >= 2) return `${multiplier.toFixed(1)}×`;
  return `${multiplier.toFixed(2)}×`;
}
