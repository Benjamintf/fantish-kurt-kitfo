import type { Language, LocalizedText, OrderStatus } from "@/lib/types";

export const copy = {
  en: {
    menu: "Menu",
    food: "Food",
    drinks: "Drinks",
    lounge: "Hotel & Lounge",
    cart: "Your order",
    add: "Add to order",
    viewCart: "View order",
    placeOrder: "Place order",
    table: "Table",
    note: "Preparation note",
    allergy: "Please tell our team about any allergies. We do our best to help, but our kitchen handles common allergens.",
    total: "Total",
    emptyCart: "Your order is waiting for a favorite.",
    service: "Request service",
    orderReceived: "Your order is with our kitchen.",
  },
  am: {
    menu: "ምናሌ",
    food: "ምግብ",
    drinks: "መጠጦች",
    lounge: "ሆቴል እና ላውንጅ",
    cart: "ትዕዛዝዎ",
    add: "ወደ ትዕዛዝ ያክሉ",
    viewCart: "ትዕዛዝ ይመልከቱ",
    placeOrder: "ትዕዛዝ ይላኩ",
    table: "ጠረጴዛ",
    note: "የአዘገጃጀት ማስታወሻ",
    allergy: "አለርጂ ካለብዎ ለቡድናችን ያሳውቁ። እንረዳዎታለን፣ ነገር ግን ወጥ ቤታችን የተለመዱ አለርጂዎችን ይይዛል።",
    total: "ጠቅላላ",
    emptyCart: "ተወዳጅ ምርጫዎ ትዕዛዝዎን እየጠበቀ ነው።",
    service: "አገልግሎት ይጠይቁ",
    orderReceived: "ትዕዛዝዎ ወደ ወጥ ቤታችን ደርሷል።",
  },
} as const;

export function text(value: LocalizedText, language: Language) {
  return value[language] || value.en;
}

export function statusLabel(status: OrderStatus, language: Language) {
  const labels: Record<OrderStatus, LocalizedText> = {
    new: { en: "New", am: "አዲስ" },
    preparing: { en: "Preparing", am: "በዝግጅት ላይ" },
    ready: { en: "Ready to serve", am: "ለማቅረብ ዝግጁ" },
    served: { en: "Served", am: "ቀርቧል" },
    cancelled: { en: "Cancelled", am: "ተሰርዟል" },
  };
  return text(labels[status], language);
}
