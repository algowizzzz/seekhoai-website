// PUBLIC ENDPOINT — anyone can call this and read purchase + signup data.
// You explicitly chose "no protection" for /adminpanel. Before going to
// production, add an auth check here (e.g., compare a cookie against
// process.env.ADMIN_PASSWORD, or require a header token).

import { NextResponse } from "next/server";
import { listAll } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await listAll();
    return NextResponse.json({ ok: true, ...data });
  } catch (err) {
    console.error("[admin/data] read failed", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "unknown" },
      { status: 500 },
    );
  }
}
