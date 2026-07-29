import { NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase";

type OrderBody = { tableToken?: unknown; guestNote?: unknown; idempotencyKey?: unknown; items?: unknown };

function isUuid(value: unknown) {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export async function POST(request: Request) {
  let body: OrderBody;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid order request." }, { status: 400 }); }
  if (typeof body.tableToken !== "string" || !Array.isArray(body.items) || body.items.length < 1 || body.items.length > 20 || !isUuid(body.idempotencyKey)) {
    return NextResponse.json({ error: "Please review your order and try again." }, { status: 400 });
  }
  const validItems = body.items.every((item: unknown) => {
    if (!item || typeof item !== "object") return false;
    const line = item as { menuItemId?: unknown; quantity?: unknown; note?: unknown };
    return typeof line.menuItemId === "string" && Number.isInteger(line.quantity) && Number(line.quantity) >= 1 && Number(line.quantity) <= 20 && (line.note === undefined || (typeof line.note === "string" && line.note.length <= 280));
  });
  if (!validItems || (typeof body.guestNote === "string" && body.guestNote.length > 500)) return NextResponse.json({ error: "Some order details are invalid." }, { status: 400 });

  const supabase = createAdminSupabase();
  if (!supabase) {
    const trackingToken = crypto.randomUUID();
    return NextResponse.json({ trackingToken, status: "new", demo: true });
  }
  const { data, error } = await supabase.rpc("place_table_order", {
    p_qr_token: body.tableToken,
    p_guest_note: typeof body.guestNote === "string" ? body.guestNote.trim() : "",
    p_idempotency_key: body.idempotencyKey,
    p_items: (body.items as Array<{ menuItemId: string; quantity: number; note?: string }>).map((line) => ({ menu_item_id: line.menuItemId, quantity: line.quantity, note: line.note?.trim() || "" })),
  });
  if (error) {
    const safeMessage = error.message.includes("not available") ? "One or more items are no longer available. Please refresh your order." : "We could not send your order. Please try again.";
    return NextResponse.json({ error: safeMessage }, { status: 400 });
  }
  const order = Array.isArray(data) ? data[0] : data;
  return NextResponse.json({ trackingToken: order.tracking_token, status: order.order_status, orderId: order.order_id });
}
