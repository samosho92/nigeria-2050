"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FadeIn } from "@/components/motion";

interface DataChartProps {
  data: Record<string, number | string>;
  title?: string;
}

export function DataChart({ data, title }: DataChartProps) {
  const chartData = Object.entries(data).map(([key, value]) => ({
    name: key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
    value: typeof value === "string" ? parseFloat(value.replace(/[^0-9.]/g, "")) || 0 : value,
    display: String(value),
  }));

  const isNumeric = chartData.some((d) => d.value > 0);

  if (!isNumeric) {
    return (
      <FadeIn>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(data).map(([key, value]) => (
            <div
              key={key}
              className="rounded-lg border border-border bg-surface-elevated p-4"
            >
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {key.replace(/([A-Z])/g, " $1")}
              </p>
              <p className="mt-1 text-xl font-bold text-accent">{value}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
      {title && <h4 className="mb-4 text-sm font-medium text-muted-foreground">{title}</h4>}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <XAxis
              dataKey="name"
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                color: "var(--foreground)",
              }}
              formatter={(_, __, props) => [
                chartData[props.payload.index]?.display ?? _,
                "",
              ]}
            />
            <Bar dataKey="value" fill="var(--accent)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </FadeIn>
  );
}
