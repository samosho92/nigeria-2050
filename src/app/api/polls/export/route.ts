import { listPulseBallotRows, type PulseBallotRow } from "@/lib/polls-store";
import { getClientIp, jsonError, rateLimit, secretsMatch } from "@/lib/security";

export const runtime = "nodejs";

const COLUMNS: (keyof PulseBallotRow)[] = [
  "recordedAt",
  "pollId",
  "category",
  "question",
  "optionId",
  "optionLabel",
  "age",
  "gender",
  "zone",
  "respondentHash",
];

function csvCell(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

function toCsv(rows: PulseBallotRow[]): string {
  const header = COLUMNS.join(",");
  const body = rows.map((row) => COLUMNS.map((key) => csvCell(row[key])).join(","));
  return [header, ...body].join("\n");
}

export async function GET(request: Request) {
  const ip = getClientIp(request);
  if (!rateLimit(`polls-export:${ip}`, 10, 60 * 60_000)) {
    return jsonError("Too many requests", 429);
  }

  const expected = process.env.POLLS_EXPORT_SECRET ?? "";
  const header = request.headers.get("authorization") ?? "";
  const bearer = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  const queryToken = new URL(request.url).searchParams.get("token")?.trim() ?? "";
  const provided = bearer || queryToken;

  if (expected.length < 16 || !secretsMatch(provided, expected)) {
    return jsonError("Unauthorized", 401);
  }

  const rows = await listPulseBallotRows();
  const format = new URL(request.url).searchParams.get("format")?.trim() ?? "json";

  if (format === "csv") {
    return new Response(toCsv(rows), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="street-pulse.csv"',
      },
    });
  }

  return Response.json({ ok: true, n: rows.length, rows });
}
