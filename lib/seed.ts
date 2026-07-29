import type { HotelService, MenuCategory, MenuItem, TableInfo, TrackingOrder } from "@/lib/types";

const img = (id: string, url: string, en: string, am: string) => ({ id, url, alt: { en, am }, sortOrder: 0 });

export const demoTable: TableInfo = { id: "demo-table", label: "Welcome Table", token: "demo-table" };

export const demoCategories: MenuCategory[] = [
  {
    id: "traditional-food",
    slug: "traditional-food",
    name: { en: "Traditional Plates", am: "ባህላዊ ምግቦች" },
    description: { en: "Celebrated Ethiopian classics", am: "የተመረጡ ባህላዊ ምግቦች" },
    kind: "food",
    sortOrder: 1,
  },
  {
    id: "modern-food",
    slug: "modern-food",
    name: { en: "Modern Kitchen", am: "ዘመናዊ ምግቦች" },
    description: { en: "Familiar flavors, Fantish style", am: "የፋንትሽ ልዩ ጣዕም" },
    kind: "food",
    sortOrder: 2,
  },
  {
    id: "traditional-drinks",
    slug: "traditional-drinks",
    name: { en: "Traditional Drinks", am: "ባህላዊ መጠጦች" },
    description: { en: "Poured with ceremony", am: "በክብር የሚቀርቡ" },
    kind: "drink",
    sortOrder: 3,
  },
  {
    id: "modern-beverages",
    slug: "modern-beverages",
    name: { en: "Modern Beverages", am: "ዘመናዊ መጠጦች" },
    description: { en: "Bright, chilled and crafted", am: "ትኩስ እና የተዘጋጁ" },
    kind: "drink",
    sortOrder: 4,
  },
];

export const demoItems: MenuItem[] = [
  {
    id: "kitfo",
    categoryId: "traditional-food",
    name: { en: "House Kitfo", am: "የቤቱ ክትፎ" },
    description: { en: "Hand-minced tender beef, mitmita, herb butter and aayib.", am: "በእጅ የተፈጨ ለስላሳ ሥጋ፣ ሚጥሚጣ፣ ቅቤ እና አይብ።" },
    culturalNote: { en: "A treasured Ethiopian celebratory dish, served with warm kocho and injera.", am: "በኢትዮጵያ በደስታ ጊዜ የሚቀርብ ተወዳጅ ምግብ ነው።" },
    ingredients: { en: "Beef, mitmita, niter kibbeh, aayib", am: "ሥጋ፣ ሚጥሚጣ፣ ቅቤ፣ አይብ" },
    priceEtb: 720,
    images: [
      img("kitfo-1", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85", "Kitfo platter", "የክትፎ ሳህን"),
      img("kitfo-2", "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85", "Fresh Ethiopian-style ingredients", "ትኩስ ግብዓቶች"),
    ],
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: "kurt",
    categoryId: "traditional-food",
    name: { en: "Kurt Special", am: "የቁርጥ ስፔሻል" },
    description: { en: "Premium lean beef cuts with awaze, rosemary and fresh injera.", am: "ምርጥ ሥጋ፣ አዋዜ፣ ሮዝሜሪ እና ትኩስ እንጀራ።" },
    culturalNote: { en: "Kurt is a beloved communal dish, best enjoyed slowly and shared generously.", am: "ቁርጥ በጋራ የሚበላ ተወዳጅ ምግብ ነው።" },
    ingredients: { en: "Beef, awaze, rosemary, injera", am: "ሥጋ፣ አዋዜ፣ ሮዝሜሪ፣ እንጀራ" },
    priceEtb: 760,
    images: [img("kurt-1", "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=85", "Seasoned beef dish", "የተቀመመ ሥጋ")],
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: "tibs",
    categoryId: "traditional-food",
    name: { en: "Rosemary Tibs", am: "ሮዝሜሪ ጥብስ" },
    description: { en: "Sautéed beef, onion, jalapeño and rosemary in fragrant butter.", am: "የተጠበሰ ሥጋ፣ ቀይ ሽንኩርት፣ ቃሪያ እና ሮዝሜሪ በቅቤ።" },
    culturalNote: { en: "Tibs bring the aroma of home-style Ethiopian cooking to the table.", am: "ጥብስ የኢትዮጵያ ቤት ምግብ መዓዛን ያመጣል።" },
    ingredients: { en: "Beef, onion, pepper, rosemary, butter", am: "ሥጋ፣ ቀይ ሽንኩርት፣ ቃሪያ፣ ሮዝሜሪ፣ ቅቤ" },
    priceEtb: 640,
    images: [img("tibs-1", "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85", "Sautéed beef", "የተጠበሰ ሥጋ")],
    isAvailable: true,
    isFeatured: false,
  },
  {
    id: "shiro",
    categoryId: "traditional-food",
    name: { en: "Silky Shiro", am: "ለስላሳ ሽሮ" },
    description: { en: "Slow-cooked chickpea stew with berbere and a rich niter kibbeh finish.", am: "በርበሬ እና ቅቤ ያለው የሽምብራ ወጥ።" },
    culturalNote: { en: "Comforting, deeply flavored, and made for pieces of fresh injera.", am: "የሚያጽናና እና ከትኩስ እንጀራ ጋር የሚያምር።" },
    ingredients: { en: "Chickpea flour, berbere, garlic, niter kibbeh", am: "ሽምብራ፣ በርበሬ፣ ነጭ ሽንኩርት፣ ቅቤ" },
    priceEtb: 380,
    images: [img("shiro-1", "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=85", "Warm chickpea stew", "የሽምብራ ወጥ")],
    isAvailable: true,
    isFeatured: false,
  },
  {
    id: "injera-roll",
    categoryId: "modern-food",
    name: { en: "Injera Garden Roll", am: "የእንጀራ አትክልት ሮል" },
    description: { en: "Rolled injera with roasted vegetables, lentils and lemon-tahini.", am: "ከተጠበሱ አትክልቶች፣ ምስር እና ሎሚ ጋር የታጠፈ እንጀራ።" },
    culturalNote: { en: "A fresh Fantish interpretation of the grain that anchors Ethiopian tables.", am: "የኢትዮጵያን ጠረጴዛ የሚያስተሳስረውን እህል በዘመናዊ መልክ የቀረበ።" },
    ingredients: { en: "Injera, lentils, vegetables, tahini, lemon", am: "እንጀራ፣ ምስር፣ አትክልት፣ ታሂኒ፣ ሎሚ" },
    priceEtb: 450,
    images: [img("roll-1", "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1200&q=85", "Vegetable roll", "የአትክልት ሮል")],
    isAvailable: true,
    isFeatured: false,
  },
  {
    id: "tej",
    categoryId: "traditional-drinks",
    name: { en: "Aged Tej", am: "የቆየ ጠጅ" },
    description: { en: "Golden Ethiopian honey wine, served in a traditional berele.", am: "በባህላዊ ብርሌ የሚቀርብ የኢትዮጵያ የማር ወይን።" },
    culturalNote: { en: "Tej has been part of Ethiopian hospitality for centuries.", am: "ጠጅ ለዘመናት የኢትዮጵያ እንግዳ አቀባበል አካል ነው።" },
    ingredients: { en: "Honey wine, gesho", am: "የማር ወይን፣ ጌሾ" },
    priceEtb: 280,
    images: [img("tej-1", "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85", "Golden honey wine", "የማር ወይን")],
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: "tella",
    categoryId: "traditional-drinks",
    name: { en: "House Tella", am: "የቤቱ ጠላ" },
    description: { en: "A chilled, malty Ethiopian traditional beer.", am: "ቀዝቃዛ ባህላዊ የኢትዮጵያ ቢራ።" },
    culturalNote: { en: "A familiar taste of celebration and conversation.", am: "የደስታ እና የውይይት የተለመደ ጣዕም።" },
    ingredients: { en: "Barley, gesho, water", am: "ገብስ፣ ጌሾ፣ ውሃ" },
    priceEtb: 180,
    images: [img("tella-1", "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=1200&q=85", "Craft beer glass", "የጠላ ብርጭቆ")],
    isAvailable: true,
    isFeatured: false,
  },
  {
    id: "coffee-tonic",
    categoryId: "modern-beverages",
    name: { en: "Cold Brew Tonic", am: "ቀዝቃዛ ቡና ቶኒክ" },
    description: { en: "Ethiopian cold brew, tonic and orange peel over ice.", am: "የኢትዮጵያ ቀዝቃዛ ቡና፣ ቶኒክ እና ብርቱካን ልጣጭ።" },
    culturalNote: { en: "A sparkling tribute to Ethiopia’s coffee heritage.", am: "ለኢትዮጵያ የቡና ቅርስ የቀረበ ትኩስ ክብር።" },
    ingredients: { en: "Ethiopian coffee, tonic, orange", am: "የኢትዮጵያ ቡና፣ ቶኒክ፣ ብርቱካን" },
    priceEtb: 220,
    images: [img("coffee-1", "https://images.unsplash.com/photo-1494314671902-399b18174975?auto=format&fit=crop&w=1200&q=85", "Cold coffee", "ቀዝቃዛ ቡና")],
    isAvailable: true,
    isFeatured: true,
  },
];

export const demoServices: HotelService[] = [
  {
    id: "lounge-reservation",
    title: { en: "Sunset Lounge", am: "የፀሐይ መጥለቂያ ላውንጅ" },
    description: { en: "Reserve a quieter corner for an evening drink or a special conversation.", am: "ለምሽት መጠጥ ወይም ልዩ ውይይት ጸጥ ያለ ቦታ ይያዙ።" },
    requestLabel: { en: "Reserve lounge seating", am: "የላውንጅ ቦታ ይያዙ" },
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "hotel-tour",
    title: { en: "Stay at Fantish", am: "በፋንትሽ ይቆዩ" },
    description: { en: "Ask our reception team about rooms, celebrations, and hotel experiences.", am: "ስለ ክፍሎች፣ ዝግጅቶች እና የሆቴል ተሞክሮዎች ሪሴፕሽን ይጠይቁ።" },
    requestLabel: { en: "Request a room tour", am: "የክፍል ጉብኝት ይጠይቁ" },
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
  },
];

export function demoTrackingOrder(token: string): TrackingOrder {
  return { id: "demo-order", trackingToken: token, tableLabel: "Welcome Table", status: "new", subtotalEtb: 0, createdAt: new Date().toISOString(), itemCount: 0 };
}
