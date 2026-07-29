export type Language = "en" | "am";
export type OrderStatus = "new" | "preparing" | "ready" | "served" | "cancelled";
export type StaffRole = "admin" | "kitchen";

export type LocalizedText = { en: string; am: string };

export type MenuImage = {
  id: string;
  url: string;
  alt: LocalizedText;
  sortOrder: number;
};

export type MenuCategory = {
  id: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  kind: "food" | "drink";
  sortOrder: number;
};

export type MenuItem = {
  id: string;
  categoryId: string;
  name: LocalizedText;
  description: LocalizedText;
  culturalNote: LocalizedText;
  ingredients: LocalizedText;
  priceEtb: number;
  images: MenuImage[];
  isAvailable: boolean;
  isFeatured: boolean;
};

export type HotelService = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  requestLabel: LocalizedText;
  imageUrl: string;
};

export type TableInfo = { id: string; label: string; token: string };

export type CartLine = {
  item: MenuItem;
  quantity: number;
  note: string;
};

export type TrackingOrder = {
  id: string;
  trackingToken: string;
  tableLabel: string;
  status: OrderStatus;
  subtotalEtb: number;
  createdAt: string;
  itemCount: number;
};

export type StaffOrder = {
  id: string;
  tableLabel: string;
  status: OrderStatus;
  subtotalEtb: number;
  guestNote: string | null;
  createdAt: string;
  items: Array<{ name: string; quantity: number; note: string | null }>;
};
