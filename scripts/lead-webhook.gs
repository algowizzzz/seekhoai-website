/**
 * Google Apps Script — SeekhoAI lead-capture webhook.
 *
 * Receives JSON POSTs from the SeekhoAI site (`/api/enroll/free`) and
 * appends each lead as a row to the bound Google Sheet.
 *
 * ────────────────────────────────────────────────────────────────────────
 * SETUP (one-time, ~5 minutes)
 * ────────────────────────────────────────────────────────────────────────
 *
 * 1. Open https://sheets.google.com → New blank spreadsheet.
 *    Rename it: "SeekhoAI Leads".
 *
 * 2. In the spreadsheet menu: Extensions → Apps Script.
 *    A new tab opens with a code editor.
 *
 * 3. Delete the default `function myFunction() { ... }` placeholder.
 *    Paste this entire file in. Save (Ctrl/Cmd + S).
 *
 * 4. Set the shared secret:
 *    Project Settings (gear icon, left side) → Script properties → Add
 *    property:
 *       Name:  WEBHOOK_SECRET
 *       Value: a long random string, e.g.   ze1AhV2g8KqLsRn39oW2pY6T
 *    Save.
 *
 * 5. Deploy as a Web App:
 *    Deploy → New deployment → gear icon → Web app
 *    Description: "SeekhoAI lead capture"
 *    Execute as:  Me
 *    Who has access:  Anyone
 *    Click Deploy. Authorise when prompted.
 *
 * 6. Copy the Web App URL. It looks like:
 *    https://script.google.com/macros/s/AKfycb.../exec
 *
 * 7. In your project's `.env.local` (or Vercel env vars), add:
 *       LEAD_WEBHOOK_URL=<the URL from step 6>
 *       LEAD_WEBHOOK_SECRET=<the same secret from step 4>
 *
 * 8. Test it:
 *    Submit the form at /free with a real email. A new row should appear
 *    in the spreadsheet within seconds.
 *
 * ────────────────────────────────────────────────────────────────────────
 */

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    // Verify shared secret. Apps Script web apps can't read custom HTTP
    // headers, so the SeekhoAI client embeds `secret` in the body as well.
    var expectedSecret = PropertiesService
      .getScriptProperties()
      .getProperty("WEBHOOK_SECRET");
    if (expectedSecret) {
      if (!body.secret || body.secret !== expectedSecret) {
        return _response(401, { ok: false, error: "unauthorized" });
      }
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    _ensureHeader(sheet);

    sheet.appendRow([
      new Date(),                  // received_at (server time)
      body.name || "",
      body.email || "",
      body.phone || "",
      body.source || "",
      body.site || "",
      body.receivedAt || "",       // received_at (sent by SeekhoAI)
    ]);

    return _response(200, { ok: true });
  } catch (err) {
    return _response(500, { ok: false, error: String(err) });
  }
}

function _ensureHeader(sheet) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow([
    "Received (sheet)",
    "Name",
    "Email",
    "Phone",
    "Source",
    "Site",
    "Received (site)",
  ]);
  sheet.setFrozenRows(1);
  sheet
    .getRange(1, 1, 1, 7)
    .setFontWeight("bold")
    .setBackground("#fafaf7");
}

function _response(status, payload) {
  var output = ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
  return output;
}
