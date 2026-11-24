/**
 * NASU Blood Donation Campaign — Private Google Sheets Analytics Backend
 *
 * 3-STEP SETUP (takes ~2 minutes):
 * 1. Open Google Sheets -> create a blank sheet -> Extensions -> Apps Script.
 * 2. Delete the starter code, paste THIS entire file, and change ANALYTICS_SECRET below.
 * 3. Click Deploy -> New deployment -> Web app:
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    Copy the Web app URL (ends in /exec) into Vercel env var GOOGLE_SHEETS_WEBHOOK_URL,
 *    and put your matching secret into Vercel env var ANALYTICS_SECRET.
 */

const ANALYTICS_SECRET = "CHANGE_ME_TO_YOUR_SECRET";
const SHEET_NAME = "Events";
const HEADER_ROW = [
  "created_at",
  "cairo_time",
  "visitor_id",
  "session_id",
  "event",
  "path",
  "locale",
  "theme",
  "device",
  "referrer",
  "meta",
];

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADER_ROW);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: "Empty body" });
    }

    const body = JSON.parse(e.postData.contents);
    if (ANALYTICS_SECRET && body.secret !== ANALYTICS_SECRET) {
      return jsonResponse({ ok: false, error: "Unauthorized" });
    }

    const row = body.row || {};
    lock.tryLock(5000);
    const sheet = getOrCreateSheet();
    sheet.appendRow([
      String(row.created_at || new Date().toISOString()),
      String(row.cairo_time || ""),
      String(row.visitor_id || ""),
      String(row.session_id || ""),
      String(row.event || ""),
      String(row.path || "/"),
      String(row.locale || "ar"),
      String(row.theme || "light"),
      String(row.device || "mobile"),
      String(row.referrer || ""),
      JSON.stringify(row.meta || {}),
    ]);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  } finally {
    try {
      lock.releaseLock();
    } catch (_ignored) {
      // Lock not held
    }
  }
}

function doGet(e) {
  try {
    const provided =
      e && e.parameter && e.parameter.secret ? String(e.parameter.secret) : "";
    if (ANALYTICS_SECRET && provided !== ANALYTICS_SECRET) {
      return jsonResponse({ ok: false, error: "Unauthorized" });
    }

    const sheet = getOrCreateSheet();
    const values = sheet.getDataRange().getValues();
    const events = [];

    for (let i = 1; i < values.length; i++) {
      const r = values[i];
      if (!r[4]) continue; // skip empty event rows
      let meta = {};
      try {
        meta =
          typeof r[10] === "string" && r[10].trim()
            ? JSON.parse(r[10])
            : r[10] || {};
      } catch (_err) {
        meta = {};
      }

      events.push({
        created_at: r[0] instanceof Date ? r[0].toISOString() : String(r[0] || ""),
        cairo_time: String(r[1] || ""),
        visitor_id: String(r[2] || ""),
        session_id: String(r[3] || ""),
        event: String(r[4] || ""),
        path: String(r[5] || "/"),
        locale: String(r[6] || "ar"),
        theme: String(r[7] || "light"),
        device: String(r[8] || "mobile"),
        referrer: String(r[9] || ""),
        meta: meta,
      });
    }

    return jsonResponse({
      ok: true,
      generated_at: new Date().toISOString(),
      total_rows: events.length,
      events: events,
    });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}
