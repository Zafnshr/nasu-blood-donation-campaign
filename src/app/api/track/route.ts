import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BOT_UA_RE =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|whatsapp/i;

const CAIRO_FORMATTER = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "Africa/Cairo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function detectDevice(ua: string): "tablet" | "mobile" | "desktop" {
  if (/ipad|tablet|playbook|silk|(android(?!.*mobile))/i.test(ua)) {
    return "tablet";
  }
  if (/mobi|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
    return "mobile";
  }
  return "desktop";
}

function clampString(value: unknown, maxLen: number, fallback = ""): string {
  if (typeof value !== "string") return fallback;
  return value.trim().slice(0, maxLen);
}

function sanitizeMeta(value: unknown): Record<string, string | number | boolean | null> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  const clean: Record<string, string | number | boolean | null> = {};
  for (const [key, val] of Object.entries(value)) {
    const safeKey = key.trim().slice(0, 40);
    if (!safeKey) continue;
    if (
      typeof val === "string" ||
      typeof val === "number" ||
      typeof val === "boolean" ||
      val === null
    ) {
      clean[safeKey] = typeof val === "string" ? val.slice(0, 200) : val;
    }
  }
  const serialized = JSON.stringify(clean);
  if (serialized.length > 2000) {
    return {};
  }
  return clean;
}

export async function POST(request: Request) {
  const ua = request.headers.get("user-agent") ?? "";
  if (BOT_UA_RE.test(ua)) {
    return new NextResponse(null, { status: 204 });
  }

  let rawBody = "";
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!rawBody || rawBody.length > 8192) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  let body: Record<string, unknown>;
  try {
    const parsed = JSON.parse(rawBody) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const event = clampString(body.event, 64);
  if (!event) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const now = new Date();
  const row = {
    created_at: now.toISOString(),
    cairo_time: CAIRO_FORMATTER.format(now),
    visitor_id: clampString(body.visitorId, 64),
    session_id: clampString(body.sessionId, 64),
    event,
    path: clampString(body.path, 120, "/"),
    locale: body.locale === "en" ? "en" : "ar",
    theme: body.theme === "dark" ? "dark" : "light",
    device: detectDevice(ua),
    referrer: clampString(body.referrer, 200),
    meta: sanitizeMeta(body.meta),
  };

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  const secret = process.env.ANALYTICS_SECRET?.trim() ?? "";

  if (!webhookUrl) {
    return NextResponse.json({ ok: true, stored: false }, { status: 202 });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, row }),
      redirect: "follow",
    });

    if (!res.ok) {
      return NextResponse.json({ ok: false }, { status: 202 });
    }

    try {
      const data = (await res.json()) as { ok?: boolean };
      if (data && data.ok === false) {
        return NextResponse.json({ ok: false }, { status: 202 });
      }
    } catch {
      // Accept non-JSON 200 responses cleanly
    }

    return NextResponse.json({ ok: true, stored: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 202 });
  }
}
