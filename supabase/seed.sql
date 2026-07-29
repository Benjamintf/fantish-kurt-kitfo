-- Curated starter content. Replace imagery, copy, and prices from /staff/menu after launch.
insert into public.restaurant_tables (label)
select 'Table ' || lpad(series::text, 2, '0') from generate_series(1, 12) series
on conflict (label) do nothing;

insert into public.menu_categories (slug, kind, name_en, name_am, description_en, description_am, sort_order) values
  ('traditional-food', 'food', 'Traditional Plates', 'ባህላዊ ምግቦች', 'Celebrated Ethiopian classics', 'የተመረጡ ባህላዊ ምግቦች', 1),
  ('modern-food', 'food', 'Modern Kitchen', 'ዘመናዊ ምግቦች', 'Familiar flavors, Fantish style', 'የፋንትሽ ልዩ ጣዕም', 2),
  ('traditional-drinks', 'drink', 'Traditional Drinks', 'ባህላዊ መጠጦች', 'Poured with ceremony', 'በክብር የሚቀርቡ', 3),
  ('modern-beverages', 'drink', 'Modern Beverages', 'ዘመናዊ መጠጦች', 'Bright, chilled and crafted', 'ትኩስ እና የተዘጋጁ', 4)
on conflict (slug) do nothing;

insert into public.menu_items (category_id, name_en, name_am, description_en, description_am, ingredients_en, ingredients_am, cultural_note_en, cultural_note_am, price_etb, sort_order, is_featured)
select id, 'House Kitfo', 'የቤቱ ክትፎ', 'Hand-minced tender beef, mitmita, herb butter and aayib.', 'በእጅ የተፈጨ ለስላሳ ሥጋ፣ ሚጥሚጣ፣ ቅቤ እና አይብ።', 'Beef, mitmita, niter kibbeh, aayib', 'ሥጋ፣ ሚጥሚጣ፣ ቅቤ፣ አይብ', 'A treasured Ethiopian celebratory dish, served with warm kocho and injera.', 'በኢትዮጵያ በደስታ ጊዜ የሚቀርብ ተወዳጅ ምግብ ነው።', 720, 1, true from public.menu_categories where slug = 'traditional-food'
union all select id, 'Kurt Special', 'የቁርጥ ስፔሻል', 'Premium lean beef cuts with awaze, rosemary and fresh injera.', 'ምርጥ ሥጋ፣ አዋዜ፣ ሮዝሜሪ እና ትኩስ እንጀራ።', 'Beef, awaze, rosemary, injera', 'ሥጋ፣ አዋዜ፣ ሮዝሜሪ፣ እንጀራ', 'Kurt is a beloved communal dish, best enjoyed slowly and shared generously.', 'ቁርጥ በጋራ የሚበላ ተወዳጅ ምግብ ነው።', 760, 2, true from public.menu_categories where slug = 'traditional-food'
union all select id, 'Rosemary Tibs', 'ሮዝሜሪ ጥብስ', 'Sautéed beef, onion, jalapeño and rosemary in fragrant butter.', 'የተጠበሰ ሥጋ፣ ቀይ ሽንኩርት፣ ቃሪያ እና ሮዝሜሪ በቅቤ።', 'Beef, onion, pepper, rosemary, butter', 'ሥጋ፣ ቀይ ሽንኩርት፣ ቃሪያ፣ ሮዝሜሪ፣ ቅቤ', 'Tibs bring the aroma of home-style Ethiopian cooking to the table.', 'ጥብስ የኢትዮጵያ ቤት ምግብ መዓዛን ያመጣል።', 640, 3, false from public.menu_categories where slug = 'traditional-food'
union all select id, 'Silky Shiro', 'ለስላሳ ሽሮ', 'Slow-cooked chickpea stew with berbere and a rich niter kibbeh finish.', 'በርበሬ እና ቅቤ ያለው የሽምብራ ወጥ።', 'Chickpea flour, berbere, garlic, niter kibbeh', 'ሽምብራ፣ በርበሬ፣ ነጭ ሽንኩርት፣ ቅቤ', 'Comforting, deeply flavored, and made for pieces of fresh injera.', 'የሚያጽናና እና ከትኩስ እንጀራ ጋር የሚያምር።', 380, 4, false from public.menu_categories where slug = 'traditional-food'
union all select id, 'Injera Garden Roll', 'የእንጀራ አትክልት ሮል', 'Rolled injera with roasted vegetables, lentils and lemon-tahini.', 'ከተጠበሱ አትክልቶች፣ ምስር እና ሎሚ ጋር የታጠፈ እንጀራ።', 'Injera, lentils, vegetables, tahini, lemon', 'እንጀራ፣ ምስር፣ አትክልት፣ ታሂኒ፣ ሎሚ', 'A fresh Fantish interpretation of the grain that anchors Ethiopian tables.', 'የኢትዮጵያን ጠረጴዛ የሚያስተሳስረውን እህል በዘመናዊ መልክ የቀረበ።', 450, 1, false from public.menu_categories where slug = 'modern-food'
union all select id, 'Aged Tej', 'የቆየ ጠጅ', 'Golden Ethiopian honey wine, served in a traditional berele.', 'በባህላዊ ብርሌ የሚቀርብ የኢትዮጵያ የማር ወይን።', 'Honey wine, gesho', 'የማር ወይን፣ ጌሾ', 'Tej has been part of Ethiopian hospitality for centuries.', 'ጠጅ ለዘመናት የኢትዮጵያ እንግዳ አቀባበል አካል ነው።', 280, 1, true from public.menu_categories where slug = 'traditional-drinks'
union all select id, 'House Tella', 'የቤቱ ጠላ', 'A chilled, malty Ethiopian traditional beer.', 'ቀዝቃዛ ባህላዊ የኢትዮጵያ ቢራ።', 'Barley, gesho, water', 'ገብስ፣ ጌሾ፣ ውሃ', 'A familiar taste of celebration and conversation.', 'የደስታ እና የውይይት የተለመደ ጣዕም።', 180, 2, false from public.menu_categories where slug = 'traditional-drinks'
union all select id, 'Cold Brew Tonic', 'ቀዝቃዛ ቡና ቶኒክ', 'Ethiopian cold brew, tonic and orange peel over ice.', 'የኢትዮጵያ ቀዝቃዛ ቡና፣ ቶኒክ እና ብርቱካን ልጣጭ።', 'Ethiopian coffee, tonic, orange', 'የኢትዮጵያ ቡና፣ ቶኒክ፣ ብርቱካን', 'A sparkling tribute to Ethiopia’s coffee heritage.', 'ለኢትዮጵያ የቡና ቅርስ የቀረበ ትኩስ ክብር።', 220, 1, true from public.menu_categories where slug = 'modern-beverages'
on conflict do nothing;

insert into public.menu_item_images (menu_item_id, image_url, alt_en, alt_am, sort_order)
select id, case name_en
  when 'House Kitfo' then 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85'
  when 'Kurt Special' then 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=85'
  when 'Rosemary Tibs' then 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85'
  when 'Silky Shiro' then 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=85'
  when 'Injera Garden Roll' then 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1200&q=85'
  when 'Aged Tej' then 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85'
  when 'House Tella' then 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=1200&q=85'
  else 'https://images.unsplash.com/photo-1494314671902-399b18174975?auto=format&fit=crop&w=1200&q=85' end,
  name_en, name_am, 0 from public.menu_items
on conflict (menu_item_id, sort_order) do nothing;

insert into public.hotel_services (title_en, title_am, description_en, description_am, request_label_en, request_label_am, image_url, sort_order) values
  ('Sunset Lounge', 'የፀሐይ መጥለቂያ ላውንጅ', 'Reserve a quieter corner for an evening drink or a special conversation.', 'ለምሽት መጠጥ ወይም ልዩ ውይይት ጸጥ ያለ ቦታ ይያዙ።', 'Reserve lounge seating', 'የላውንጅ ቦታ ይያዙ', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85', 1),
  ('Stay at Fantish', 'በፋንትሽ ይቆዩ', 'Ask our reception team about rooms, celebrations, and hotel experiences.', 'ስለ ክፍሎች፣ ዝግጅቶች እና የሆቴል ተሞክሮዎች ሪሴፕሽን ይጠይቁ።', 'Request a room tour', 'የክፍል ጉብኝት ይጠይቁ', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85', 2)
on conflict do nothing;

-- After creating the first staff user in Supabase Auth, grant administrator access once:
-- update public.profiles set role = 'admin' where id = '<auth-user-uuid>';
