import { demoCategories, demoItems, demoServices, demoTable, demoTrackingOrder } from "@/lib/seed";
import { createAdminSupabase, createServerSupabase, hasAdminSupabase, hasSupabase } from "@/lib/supabase";
import type { HotelService, MenuCategory, MenuImage, MenuItem, TableInfo, TrackingOrder } from "@/lib/types";

function pair(en: string | null, am: string | null) {
  return { en: en || "", am: am || en || "" };
}

export async function getTable(token: string): Promise<TableInfo | null> {
  if (token === "demo-table" && !hasSupabase) return demoTable;
  // QR tokens are deliberately not exposed through anonymous table policies.
  // Resolution happens only on the server with the service-role client.
  const supabase = createAdminSupabase();
  if (!supabase) return token === "demo-table" ? demoTable : null;
  const { data } = await supabase
    .from("restaurant_tables")
    .select("id,label,qr_token")
    .eq("qr_token", token)
    .eq("is_active", true)
    .maybeSingle();
  return data ? { id: data.id, label: data.label, token: data.qr_token } : null;
}

export async function getPublicMenu(): Promise<{ categories: MenuCategory[]; items: MenuItem[]; services: HotelService[] }> {
  const supabase = createServerSupabase();
  if (!supabase) return { categories: demoCategories, items: demoItems, services: demoServices };

  const [categoriesResult, itemsResult, servicesResult] = await Promise.all([
    supabase.from("menu_categories").select("*").eq("is_active", true).order("sort_order"),
    supabase.from("menu_items").select("*, menu_item_images(*)").eq("is_active", true).eq("is_available", true).order("sort_order"),
    supabase.from("hotel_services").select("*").eq("is_active", true).order("sort_order"),
  ]);

  if (categoriesResult.error || itemsResult.error || !categoriesResult.data?.length) {
    return { categories: demoCategories, items: demoItems, services: demoServices };
  }

  const categories = categoriesResult.data.map((category) => ({
    id: category.id,
    slug: category.slug,
    name: pair(category.name_en, category.name_am),
    description: pair(category.description_en, category.description_am),
    kind: category.kind as "food" | "drink",
    sortOrder: category.sort_order,
  }));
  const items = itemsResult.data.map((item) => ({
    id: item.id,
    categoryId: item.category_id,
    name: pair(item.name_en, item.name_am),
    description: pair(item.description_en, item.description_am),
    culturalNote: pair(item.cultural_note_en, item.cultural_note_am),
    ingredients: pair(item.ingredients_en, item.ingredients_am),
    priceEtb: Number(item.price_etb),
    isAvailable: item.is_available,
    isFeatured: item.is_featured,
    images: ((item.menu_item_images || []) as Array<Record<string, unknown>>)
      .sort((a, b) => Number(a.sort_order) - Number(b.sort_order))
      .map((image) => ({
        id: String(image.id),
        url: String(image.image_url),
        alt: pair(image.alt_en as string, image.alt_am as string),
        sortOrder: Number(image.sort_order),
      })) as MenuImage[],
  }));
  const services = (servicesResult.data || []).map((service) => ({
    id: service.id,
    title: pair(service.title_en, service.title_am),
    description: pair(service.description_en, service.description_am),
    requestLabel: pair(service.request_label_en, service.request_label_am),
    imageUrl: service.image_url,
  }));
  return { categories, items, services };
}

export async function getTrackingOrder(token: string): Promise<TrackingOrder | null> {
  const supabase = createAdminSupabase();
  if (!supabase) return token ? demoTrackingOrder(token) : null;
  const { data } = await supabase
    .from("orders")
    .select("id,tracking_token,status,subtotal_etb,created_at,restaurant_tables(label),order_items(id)")
    .eq("tracking_token", token)
    .maybeSingle();
  if (!data) return null;
  const table = data.restaurant_tables as unknown as { label: string } | null;
  const items = data.order_items as unknown as Array<{ id: string }>;
  return {
    id: data.id,
    trackingToken: data.tracking_token,
    tableLabel: table?.label || "Table",
    status: data.status,
    subtotalEtb: Number(data.subtotal_etb),
    createdAt: data.created_at,
    itemCount: items?.length || 0,
  };
}

export { hasAdminSupabase };
