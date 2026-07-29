import { NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  let body: { tableToken?: unknown; serviceId?: unknown; note?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (typeof body.tableToken !== "string" || typeof body.serviceId !== "string" || (typeof body.note === "string" && body.note.length > 500)) return NextResponse.json({ error: "Please review your request." }, { status: 400 });
  const supabase = createAdminSupabase();
  if (!supabase) return NextResponse.json({ id: crypto.randomUUID(), demo: true });
  const { data, error } = await supabase.rpc("create_service_request", { p_qr_token: body.tableToken, p_service_id: body.serviceId, p_note: typeof body.note === "string" ? body.note.trim() : "" });
  if (error) return NextResponse.json({ error: "We could not send your request. Please try again." }, { status: 400 });
  return NextResponse.json({ id: data });
}
