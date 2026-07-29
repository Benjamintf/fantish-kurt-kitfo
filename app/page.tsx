import Image from "next/image";
import { BrandMark } from "@/components/BrandMark";
import { PageEnter, Reveal } from "@/components/Motion";

const rituals = [
  { number: "01", title: "The table is the ceremony", detail: "Seasonal ingredients, warm injera, and the unhurried generosity of Ethiopian hospitality." },
  { number: "02", title: "A stay with a story", detail: "Rooms and lounge spaces inspired by the textures, colors, and quiet rituals of home." },
  { number: "03", title: "From our kitchen, live", detail: "Scan your table’s QR code to explore the menu and send your order straight to our team." },
];

const serviceNotes = [
  ["Seasonal kitchen", "Freshly prepared each day with ingredients selected for their depth, colour and character."],
  ["Designed to share", "Order a table of favourites and let our team help you create a generous spread."],
  ["Attentive service", "A thoughtful note with your order reaches your server and kitchen in real time."],
];

const menuHighlights = [
  { name: "Special Kitfo", description: "Mincemeat delicately spiced with niter kibbeh and mitmita, served with kocho and ayibe.", price: "ETB 850" },
  { name: "Raw Kurt (ቁርጥ)", description: "Premium fresh lean meat selected daily, served with traditional condiments and warm injera.", price: "ETB 950" },
  { name: "Traditional Tej", description: "Golden fermented honey wine served in a traditional glass berele for a rich celebration.", price: "ETB 300" },
];

export default function HomePage() {
  return (
    <PageEnter>
      <main className="paper-grain overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[760px] overflow-hidden bg-[var(--ink)] text-[#fff9ed] sm:min-h-[820px]">
          <Image
            src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2200&q=90"
            alt="Warmly lit Fantish restaurant interior"
            fill
            priority
            className="object-cover opacity-65 transition-transform duration-1000 hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(30,16,11,.86),rgba(30,16,11,.28)),linear-gradient(0deg,rgba(30,16,11,.62),transparent_60%)]" />
          <div className="absolute -right-24 top-36 h-80 w-80 rounded-full border border-[#f3ce81]/20 animate-pulse" aria-hidden="true" />
          <div className="absolute -right-8 top-52 h-48 w-48 rounded-full border border-[#f3ce81]/15" aria-hidden="true" />

          <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
            <BrandMark light />
            <div className="hidden items-center gap-7 text-sm font-medium md:flex">
              <a className="focus-ring transition hover:text-[#f7d99b]" href="#food">Food</a>
              <a className="focus-ring transition hover:text-[#f7d99b]" href="#menu-highlights">Menu</a>
              <a className="focus-ring transition hover:text-[#f7d99b]" href="#rituals">Our ritual</a>
              <a className="focus-ring transition hover:text-[#f7d99b]" href="#drinks">Drinks</a>
              <a className="focus-ring transition hover:text-[#f7d99b]" href="#stay">Hotel & Lounge</a>
            </div>
            <a className="focus-ring rounded-full border border-white/60 px-4 py-2 text-xs font-bold uppercase tracking-[.12em] transition hover:bg-white hover:text-[var(--ink)]" href="#how-to-order">How to order</a>
          </nav>

          <Reveal className="relative z-10 mx-auto flex min-h-[640px] max-w-7xl flex-col justify-end px-5 pb-20 pt-32 sm:px-8 sm:pb-28">
            <span className="eyebrow text-[#f3ce81]">Addis Ababa · Restaurant & Hotel</span>
            <h1 className="font-display mt-5 max-w-4xl text-5xl leading-[.9] tracking-[-.055em] sm:text-7xl md:text-8xl">An Ethiopian table, <em className="font-normal">made memorable.</em></h1>
            <p className="mt-7 max-w-md text-base leading-7 text-[#f1e7d6] sm:text-lg">A premium home for Kurt, Kitfo, warm hospitality, and evenings that deserve to linger.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#how-to-order" className="focus-ring rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-bold text-[var(--ink)] transition transform hover:-translate-y-0.5 hover:bg-[#f4c66c]">Order from your table <span aria-hidden="true">→</span></a>
              <a href="#stay" className="focus-ring rounded-full border border-white/50 px-6 py-3 text-sm font-bold transition hover:bg-white/10">Discover the house</a>
            </div>
          </Reveal>

          <div className="absolute bottom-6 left-5 right-5 z-10 mx-auto hidden max-w-7xl items-end justify-between border-t border-white/20 pt-4 text-xs text-[#e8ddce] sm:flex sm:px-3">
            <span className="eyebrow text-[#e8bb63]">ፋንትሽ ቁርጥ እና ክትፎ</span>
            <a className="focus-ring flex items-center gap-3 transition hover:text-white" href="#food">Scroll to discover <span className="h-px w-12 bg-current" /></a>
          </div>
        </section>

        {/* Food Section */}
        <Reveal>
          <section id="food" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[.82fr_1.18fr] lg:py-32">
            <div>
              <p className="eyebrow text-[var(--terracotta)]">The Fantish table</p>
              <h2 className="font-display mt-4 text-4xl leading-none tracking-tight sm:text-6xl">Gather around something <em>honest.</em></h2>
            </div>
            <div className="self-end">
              <p className="max-w-xl text-lg leading-8 text-[var(--muted)]">Our kitchen honours the confidence of Ethiopian flavour — vivid berbere, rich niter kibbeh, bright herbs and the soft tang of fresh injera. Each plate is designed to be shared.</p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-[.1em] text-[var(--terracotta)]"><span>Traditional craft</span><span>•</span><span>Modern hospitality</span><span>•</span><span>Always generous</span></div>
            </div>
          </section>
        </Reveal>

        <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-24 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:pb-32">
          <Reveal className="relative min-h-[430px] overflow-hidden rounded-3xl bg-[var(--forest)] shadow-lg">
            <Image src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1700&q=88" alt="Fresh ingredients prepared in the Fantish kitchen" fill className="object-cover opacity-80 transition-transform duration-700 hover:scale-105" sizes="(max-width: 1024px) 100vw, 60vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(22,41,34,.86)] via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9"><p className="eyebrow text-[#eac876]">From the kitchen</p><h3 className="font-display mt-3 max-w-md text-3xl leading-none">The smallest details make the deepest flavours.</h3><p className="mt-4 max-w-md text-sm leading-6 text-[#e6e2d3]">We make room for slow-cooked sauces, freshly folded injera and the perfect moment to bring it all to the table.</p></div>
          </Reveal>
          <Reveal className="grid gap-3" delay={0.1}>
            {serviceNotes.map(([title, detail], index) => <article key={title} className="flex min-h-36 flex-col justify-between rounded-2xl border border-[var(--line)] bg-[var(--cream)] p-6 transition-all duration-300 hover:shadow-md"><span className="text-xs font-bold text-[var(--terracotta)]">0{index + 1}</span><div><h3 className="font-display text-2xl">{title}</h3><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{detail}</p></div></article>)}
          </Reveal>
        </section>

        {/* New Menu Highlights Section (Added for extra detail and professional look) */}
        <section id="menu-highlights" className="bg-[var(--cream)] border-y border-[var(--line)] px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <Reveal className="text-center max-w-2xl mx-auto mb-16">
              <p className="eyebrow text-[var(--terracotta)]">Culinary Masterpieces</p>
              <h2 className="font-display mt-4 text-4xl sm:text-5xl">Signature Selections</h2>
              <p className="mt-3 text-sm text-[var(--muted)]">A preview of our daily fresh cuts, rich spices, and authentic hospitality.</p>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {menuHighlights.map((item, index) => (
                <Reveal key={item.name} delay={index * 0.1}>
                  <div className="h-full rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div>
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-display text-xl">{item.name}</h3>
                        <span className="text-xs font-bold text-[var(--terracotta)]">{item.price}</span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-[var(--line)] text-xs font-medium text-[var(--ink)]">
                      <span>Prepared fresh daily</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Rituals Section */}
        <section id="rituals" className="bg-[#eadcc4] px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <Reveal className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><div><p className="eyebrow text-[var(--terracotta)]">The Fantish ritual</p><h2 className="font-display mt-4 max-w-2xl text-4xl leading-none sm:text-6xl">Every visit begins with <em>an invitation.</em></h2></div><p className="max-w-sm text-sm leading-7 text-[var(--muted)]">Whether you are here for a lively shared lunch or an unhurried evening, our team makes the table feel like yours.</p></Reveal>
            <div id="how-to-order" className="mt-12 grid gap-4 sm:grid-cols-3" aria-label="How the QR menu works">
              {rituals.map((ritual, index) => <Reveal key={ritual.number} delay={index * 0.08}><article className="h-full rounded-2xl border border-[rgba(65,35,22,.14)] bg-[var(--paper)] p-6 transition-all duration-300 hover:shadow-md"><span className="text-xs font-bold text-[var(--terracotta)]">{ritual.number}</span><h3 className="font-display mt-12 text-2xl">{ritual.title}</h3><p className="mt-4 text-sm leading-6 text-[var(--muted)]">{ritual.detail}</p><span className="mt-6 inline-block text-xs font-bold uppercase tracking-[.12em] text-[var(--terracotta)]">{index === 2 ? "Your table, connected" : "The Fantish way"}</span></article></Reveal>)}
            </div>
          </div>
        </section>

        {/* Drinks Section */}
        <section id="drinks" className="relative min-h-[620px] overflow-hidden bg-[var(--forest)] px-5 py-20 text-[#fff9ed] sm:px-8 sm:py-28">
          <Image src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=2000&q=90" alt="Golden honey wine in a glass" fill className="object-cover opacity-35" sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,42,33,.88),rgba(16,42,33,.36))]" />
          <Reveal className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_.65fr] lg:items-end"><div><p className="eyebrow text-[#f3ce81]">Tej · Tella · Coffee</p><h2 className="font-display mt-4 max-w-2xl text-5xl leading-[.93] tracking-tight sm:text-7xl">A toast to the <em>long evening.</em></h2><p className="mt-7 max-w-md leading-7 text-[#e7dbcb]">From honey wine poured in a berele to an impeccably bright cold brew, every drink has a sense of place.</p><a href="#how-to-order" className="focus-ring mt-8 inline-block rounded-full bg-[#fff9ed] px-6 py-3 text-sm font-bold text-[var(--forest)] transition hover:bg-[#f1d99e]">Order from your table</a></div><div className="grid grid-cols-2 gap-3"><div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur"><p className="text-xs font-bold uppercase tracking-[.12em] text-[#eac876]">Pour</p><p className="font-display mt-5 text-2xl">Aged Tej</p><p className="mt-2 text-sm leading-6 text-[#d9d9c9]">Golden honey wine served in the traditional berele.</p></div><div className="mt-9 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur"><p className="text-xs font-bold uppercase tracking-[.12em] text-[#eac876]">Brew</p><p className="font-display mt-5 text-2xl">Ethiopian coffee</p><p className="mt-2 text-sm leading-6 text-[#d9d9c9]">A bright finish to a generous meal and a lasting conversation.</p></div></div></Reveal>
        </section>

        {/* Hotel & Lounge Section */}
        <section id="stay" className="mx-auto grid max-w-7xl gap-9 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:py-32">
          <Reveal className="relative min-h-[470px] overflow-hidden rounded-3xl shadow-lg"><Image src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=88" alt="Refined Fantish hotel room" fill className="object-cover transition-transform duration-700 hover:scale-105" sizes="(max-width: 1024px) 100vw, 50vw" /><div className="absolute inset-x-5 bottom-5 rounded-2xl bg-[rgba(255,250,241,.92)] p-4 backdrop-blur"><p className="eyebrow text-[var(--terracotta)]">A quieter corner</p><p className="font-display mt-1 text-xl">Rest well, wake slowly.</p></div></Reveal>
          <Reveal className="flex flex-col justify-center" delay={0.08}><p className="eyebrow text-[var(--terracotta)]">Rooms · Lounge · Events</p><h2 className="font-display mt-4 text-4xl leading-none tracking-tight sm:text-6xl">Stay for dinner.<br /><em>Stay a little longer.</em></h2><p className="mt-6 max-w-md leading-7 text-[var(--muted)]">Our hotel and lounge carry the same warmth as the kitchen: deeply considered, quietly luxurious, unmistakably Ethiopian.</p><dl className="mt-8 grid grid-cols-2 gap-5 border-y border-[var(--line)] py-5 text-sm"><div><dt className="eyebrow text-[var(--terracotta)]">The lounge</dt><dd className="mt-2 leading-6 text-[var(--muted)]">Drinks, light bites and unhurried conversation.</dd></div><div><dt className="eyebrow text-[var(--terracotta)]">Private moments</dt><dd className="mt-2 leading-6 text-[var(--muted)]">Celebrations and gatherings with a personal touch.</dd></div></dl><a href="#how-to-order" className="focus-ring mt-8 w-fit rounded-full border border-[var(--ink)] px-6 py-3 text-sm font-bold transition hover:bg-[var(--ink)] hover:text-white">Ask at your table</a></Reveal>
        </section>

        {/* Call to Action Banner */}
        {/* Call to Action & QR Code Section */}
        <Reveal>
          <section className="mx-auto mb-20 max-w-7xl px-5 sm:px-8">
            <div className="rounded-3xl bg-[var(--terracotta)] px-6 py-12 text-white sm:px-10 sm:py-16 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-10">
              <div>
                <p className="eyebrow text-[#f5d48e]">Your Fantish evening</p>
                <h2 className="font-display mt-4 max-w-2xl text-4xl leading-none sm:text-6xl">The best evenings are the ones we share.</h2>
                <p className="mt-4 max-w-sm text-sm leading-7 text-[#fdebd4]">Scan the QR code or click the button whenever you are ready to view the menu and manage your table order.</p>
                
                <div className="mt-8 flex flex-wrap gap-4">
                  <a 
                    href="/table/1" 
                    className="rounded-full bg-[var(--ink)] px-8 py-3.5 text-sm font-bold text-white transition hover:bg-black shadow-md inline-flex items-center gap-2"
                  >
                    <span>Open Order Dashboard</span>
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>

              {/* QR Code Card */}
              <div className="bg-[var(--ink)] p-4 rounded-2xl shadow-lg flex flex-col items-center text-center text-white">
                <a href="/table/1" className="group block cursor-pointer">
                  <div className="relative w-40 h-40 bg-white rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center p-2">
                    <img 
  src="/table-qr.png" 
  alt="Scan to order table menu"
  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
/>
                  </div>
                  <span className="mt-3 block text-xs font-bold uppercase tracking-wider text-[#f5d48e] group-hover:text-white">
                    Scan Table QR
                  </span>
                </a>
              </div>
            </div>
          </section>
        </Reveal>

      </main>

      {/* Footer Section with Contact & Social Media */}
      <footer className="bg-[var(--ink)] text-white py-10 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 1. Brand Info */}
          <div>
            <h3 className="text-xl font-bold tracking-wide text-[#f5d48e]">Fantish (ፋንቲሽ ቁርት እና ክትፎ)</h3>
            <p className="text-sm text-gray-300 mt-2">Addis Ababa, Ethiopia</p>
            <p className="text-xs text-gray-400 mt-1">Restaurant · Hotel · Lounge</p>
          </div>

          {/* 2. Contact Phone & Address */}
          <div>
            <h4 className="text-md font-semibold text-[#f5d48e] mb-2">Contact Us</h4>
            <p className="text-sm text-gray-300 flex items-center gap-2">
              📞 Phone: <a href="tel:0988292698" className="underline hover:text-white">+251 900 000 000</a>
            </p>
            <p className="text-sm text-gray-300 mt-1">📍 Location: Bole, Addis Ababa</p>
          </div>

          {/* 3. Social Media Links */}
          <div>
            <h4 className="text-md font-semibold text-[#f5d48e] mb-2">Social Media</h4>
            <div className="flex flex-col gap-1 text-sm text-gray-300">
              <a href="https://t.me/tk_digital_market" target="_blank" rel="noopener noreferrer" className="hover:text-[#f5d48e]">
                🔵 Telegram Channel
              </a>
          
              <a href="https://web.facebook.com/amare.kfle.94" target="_blank" rel="noopener noreferrer" className="hover:text-[#f5d48e]">
                🟦 Facebook Page
              </a>
            </div>
          </div>

        </div>
        
        <div className="max-w-6xl mx-auto text-center text-xs text-gray-500 mt-8 pt-4 border-t border-gray-800">
          © 2026 Fantish Kurt and Kitfo. All rights reserved.
        </div>
      </footer>

    </PageEnter>
  );
}