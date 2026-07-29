import Image from "next/image";
import { BrandMark } from "@/components/BrandMark";

const highlights = [
  ["01", "The table is the ceremony", "Seasonal ingredients, warm injera, and the unhurried generosity of Ethiopian hospitality."],
  ["02", "A stay with a story", "Rooms and lounge spaces inspired by the textures, colors, and quiet rituals of home."],
  ["03", "From our kitchen, live", "Scan your table’s code to explore the menu and send your order straight to our team."],
];

export default function HomePage() {
  return (
    <main className="paper-grain overflow-hidden">
      <section className="relative min-h-[760px] overflow-hidden bg-[var(--ink)] text-[#fff9ed] sm:min-h-[820px]">
        <Image src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2200&q=90" alt="Warmly lit restaurant interior" fill priority className="object-cover opacity-65" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(30,16,11,.83),rgba(30,16,11,.3)),linear-gradient(0deg,rgba(30,16,11,.58),transparent_58%)]" />
        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <BrandMark light />
          <div className="hidden items-center gap-7 text-sm font-medium md:flex">
            <a className="focus-ring hover:text-[#f7d99b]" href="#food">Food</a>
            <a className="focus-ring hover:text-[#f7d99b]" href="#drinks">Drinks</a>
            <a className="focus-ring hover:text-[#f7d99b]" href="#stay">Hotel & Lounge</a>
          </div>
          <a className="focus-ring rounded-full border border-white/60 px-4 py-2 text-xs font-bold uppercase tracking-[.12em] transition hover:bg-white hover:text-[var(--ink)]" href="#how-to-order">How to order</a>
        </nav>
        <div className="relative z-10 mx-auto flex min-h-[640px] max-w-7xl flex-col justify-end px-5 pb-20 pt-32 sm:px-8 sm:pb-28">
          <span className="eyebrow text-[#f3ce81]">Addis Ababa · Restaurant & Hotel</span>
          <h1 className="font-display mt-5 max-w-4xl text-5xl leading-[.92] tracking-[-.055em] sm:text-7xl md:text-8xl">An Ethiopian table, <em className="font-normal">made memorable.</em></h1>
          <p className="mt-7 max-w-md text-base leading-7 text-[#f1e7d6] sm:text-lg">A premium home for Kurt, Kitfo, warm hospitality, and evenings that deserve to linger.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#how-to-order" className="focus-ring rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-bold text-[var(--ink)] transition hover:bg-[#f4c66c]">Order from your table <span aria-hidden>→</span></a>
            <a href="#stay" className="focus-ring rounded-full border border-white/50 px-6 py-3 text-sm font-bold transition hover:bg-white/10">Discover the house</a>
          </div>
        </div>
      </section>

      <section id="food" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:py-32">
        <div><p className="eyebrow text-[var(--terracotta)]">The Fantish table</p><h2 className="font-display mt-4 text-4xl leading-none tracking-tight sm:text-6xl">Gather around something <em>honest.</em></h2></div>
        <p className="max-w-xl self-end text-lg leading-8 text-[var(--muted)]">Our kitchen honors the confidence of Ethiopian flavor — vivid berbere, rich niter kibbeh, bright herbs and the soft tang of fresh injera. Each plate is designed to be shared.</p>
      </section>

      <section id="how-to-order" className="mx-auto grid max-w-7xl gap-4 px-5 pb-24 sm:grid-cols-3 sm:px-8" aria-label="Fantish highlights">
        {highlights.map(([number, title, detail]) => <article key={number} className="border-t border-[var(--line)] py-6"><span className="text-xs font-bold text-[var(--terracotta)]">{number}</span><h3 className="font-display mt-8 text-2xl">{title}</h3><p className="mt-4 max-w-sm text-sm leading-6 text-[var(--muted)]">{detail}</p></article>)}
      </section>

      <section id="drinks" className="relative min-h-[560px] overflow-hidden bg-[var(--forest)] px-5 py-20 text-[#fff9ed] sm:px-8 sm:py-28">
        <Image src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=2000&q=90" alt="A glass of golden honey wine" fill className="object-cover opacity-35" sizes="100vw" />
        <div className="relative mx-auto max-w-7xl"><p className="eyebrow text-[#f3ce81]">Tej · Tella · Coffee</p><h2 className="font-display mt-4 max-w-2xl text-5xl leading-[.93] tracking-tight sm:text-7xl">A toast to the <em>long evening.</em></h2><p className="mt-7 max-w-md leading-7 text-[#e7dbcb]">From honey wine poured in a berele to an impeccably bright cold brew, every drink has a sense of place.</p><a href="#how-to-order" className="focus-ring mt-8 inline-block rounded-full bg-[#fff9ed] px-6 py-3 text-sm font-bold text-[var(--forest)]">Order from your table</a></div>
      </section>

      <section id="stay" className="mx-auto grid max-w-7xl gap-9 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:py-32">
        <div className="relative min-h-[430px] overflow-hidden rounded-2xl"><Image src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=88" alt="Refined hotel room" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" /></div>
        <div className="flex flex-col justify-center"><p className="eyebrow text-[var(--terracotta)]">Rooms · Lounge · Events</p><h2 className="font-display mt-4 text-4xl leading-none tracking-tight sm:text-6xl">Stay for dinner.<br /><em>Stay a little longer.</em></h2><p className="mt-6 max-w-md leading-7 text-[var(--muted)]">Our hotel and lounge carry the same warmth as the kitchen: deeply considered, quietly luxurious, unmistakably Ethiopian.</p><a href="#how-to-order" className="focus-ring mt-8 w-fit rounded-full border border-[var(--ink)] px-6 py-3 text-sm font-bold transition hover:bg-[var(--ink)] hover:text-white">Ask at your table</a></div>
      </section>

      <footer className="bg-[var(--ink)] px-5 py-10 text-[#eee2d0] sm:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 sm:flex-row sm:items-end"><BrandMark light /><div className="text-sm leading-6 text-[#c9b9a4]"><p>Addis Ababa, Ethiopia</p><p>Restaurant · Hotel · Lounge</p><p className="mt-4 text-xs">© {new Date().getFullYear()} Fantish Kurt and Kitfo</p></div></div></footer>
    </main>
  );
}
