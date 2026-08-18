import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface CorrectionBody {
  pageUrl?: string;
  claim?: string;
  counterSource?: string;
  email?: string;
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  let body: CorrectionBody;

  try {
    body = (await request.json()) as CorrectionBody;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  const pageUrl = body.pageUrl?.trim() ?? "";
  const claim = body.claim?.trim() ?? "";
  const counterSource = body.counterSource?.trim() ?? "";
  const email = body.email?.trim();

  if (!pageUrl || !claim || !counterSource) {
    return NextResponse.json({ ok: false, message: "Missing required fields" }, { status: 400 });
  }

  if (!isValidUrl(pageUrl)) {
    return NextResponse.json({ ok: false, message: "Invalid page URL" }, { status: 400 });
  }

  if (claim.length > 2000 || counterSource.length > 2000) {
    return NextResponse.json({ ok: false, message: "Field too long" }, { status: 400 });
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, message: "Invalid email" }, { status: 400 });
  }

  const submission = {
    id: crypto.randomUUID(),
    pageUrl,
    claim,
    counterSource,
    email,
    submittedAt: new Date().toISOString(),
  };

  const webhook = process.env.CORRECTIONS_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
    } catch {
      return NextResponse.json(
        { ok: false, message: "Could not forward submission" },
        { status: 502 },
      );
    }
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[correction submission]", submission);
  }

  return NextResponse.json({ ok: true });
}
