import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Cache-Control": "no-store",
};

function extractProvidedKey(request: Request): string {
  const url = new URL(request.url);
  const queryKey = url.searchParams.get("key")?.trim();
  if (queryKey) return queryKey;
  const auth = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(auth);
  return match ? match[1].trim() : "";
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(request: Request) {
  const expectedSecret = process.env.ANALYTICS_SECRET?.trim() ?? "";
  if (expectedSecret) {
    const providedKey = extractProvidedKey(request);
    if (providedKey !== expectedSecret) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401, headers: CORS_HEADERS }
      );
    }
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    return NextResponse.json(
      { ok: false, error: "GOOGLE_SHEETS_WEBHOOK_URL is not configured" },
      { status: 503, headers: CORS_HEADERS }
    );
  }

  try {
    const sep = webhookUrl.includes("?") ? "&" : "?";
    const upstreamUrl = `${webhookUrl}${sep}secret=${encodeURIComponent(expectedSecret)}`;
    const res = await fetch(upstreamUrl, {
      method: "GET",
      cache: "no-store",
      redirect: "follow",
    });

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: `Upstream returned ${res.status}` },
        { status: 502, headers: CORS_HEADERS }
      );
    }

    const data = (await res.json()) as Record<string, unknown>;
    return NextResponse.json(data, {
      status: data && data.ok === false ? 401 : 200,
      headers: CORS_HEADERS,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to reach Google Sheets webhook" },
      { status: 502, headers: CORS_HEADERS }
    );
  }
}
