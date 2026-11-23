import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, type FormEvent } from "react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { PostCard } from "@/components/site/PostCard";
import { usePageMotion } from "@/lib/motion";
import { POSTS } from "@/lib/posts";
import { buildQuoteUrl } from "@/lib/site";

const TITLE = "ImportNow — Import Directly from China to India";
const DESCRIPTION =
  "End-to-end imports from China to India: product sourcing, factory inspection, shipping, customs clearance and doorstep delivery. Own company in Shanghai. Trusted by 500+ Indian businesses.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function onQuoteSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const v = (id: string) =>
    ((document.getElementById(id) as HTMLInputElement | null)?.value ?? "").trim();
  const url = buildQuoteUrl({
    name: v("f-name"),
    city: v("f-city"),
    cat: v("f-cat"),
    qty: v("f-qty"),
    budget: v("f-budget"),
    msg: v("f-msg"),
  });
  window.open(url, "_blank", "noopener");
}

function Index() {
  usePageMotion();

  // 3D scenes load after the page is interactive so the text appears first.
  useEffect(() => {
    let alive = true;
    const cleanups: Array<() => void> = [];
    void import("@/lib/three/globe").then(({ initGlobe }) => {
      if (alive) cleanups.push(initGlobe());
    });
    void import("@/lib/three/voyage").then(({ initVoyage }) => {
      if (alive) cleanups.push(initVoyage());
    });
    return () => {
      alive = false;
      cleanups.forEach((f) => f());
    };
  }, []);

  return (
    <>
      <Header home />
      <main>
        {/* HERO */}
        <section className="hero" id="home">
          <canvas id="globe" aria-hidden="true"></canvas>
          <div className="globe-labels" id="glabels" aria-hidden="true"></div>
          <div className="wrap" style={{ width: '100%' }}>
            <div className="hero-content">
              <span className="chip rv"><svg className="flag"><use href="#flag-cn"/></svg><span className="arrow">→</span><svg className="flag"><use href="#flag-in"/></svg> Trusted by 500+ Indian businesses</span>
              <h1 className="rv d1">Import directly from China. <span className="grad-text">Without the guesswork.</span></h1>
              <p className="lead rv d2">Sourcing, factory inspection, shipping and customs, handled end to end by a team with its own company in Shanghai. You choose the product. We bring it to your door.</p>
              <div className="hero-btns rv d3">
                <a className="btn btn-primary" href="#contact">Get a free sourcing quote <span aria-hidden="true">→</span></a>
                <a className="btn btn-ghost" href="#journey">See how it works</a>
              </div>
              <div className="hero-stats rv d4">
                <div className="stat"><b><span data-count="500">0</span>+</b><span>Businesses<br />served</span></div>
                <div className="stat"><b><span data-count="83">0</span>K+</b><span>Community on<br />Instagram</span></div>
                <div className="stat"><b>1 pc</b><span>MOQ on many<br />products</span></div>
                <div className="stat"><b>Shanghai</b><span>Own registered<br />company</span></div>
              </div>
            </div>
          </div>
          <div className="scroll-cue">Scroll<i></i></div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track" id="mq">
            <span>Yiwu <em>→</em> Adilabad</span><span>Foshan <em>→</em> Hyderabad</span><span>Shenzhen <em>→</em> Siddipet</span><span>Guangzhou <em>→</em> Chennai</span><span>Shanghai <em>→</em> Nhava Sheva</span><span>Guzhen <em>→</em> Vizag</span><span>Ningbo <em>→</em> Mumbai</span>
            <span>Yiwu <em>→</em> Adilabad</span><span>Foshan <em>→</em> Hyderabad</span><span>Shenzhen <em>→</em> Siddipet</span><span>Guangzhou <em>→</em> Chennai</span><span>Shanghai <em>→</em> Nhava Sheva</span><span>Guzhen <em>→</em> Vizag</span><span>Ningbo <em>→</em> Mumbai</span>
          </div>
        </div>

        {/* SERVICES */}
        <section className="section" id="services">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow rv">End-to-end imports</span>
              <h2 className="rv d1">One team from the <span className="grad-text">factory floor</span> to your front door.</h2>
              <p className="rv d2">Anyone can say they import from China. What you actually need is a smooth process, clear communication and a shipment that arrives safely.</p>
            </div>
            <div className="grid-3">
              <article className="card tilt rv"><span className="num">01</span><div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M8 11h6M11 8v6"/></svg></div><h3>Product sourcing</h3><p>We find verified manufacturers across Yiwu, Guangzhou, Shenzhen and Foshan, and negotiate prices on your behalf.</p></article>
              <article className="card tilt rv d1"><span className="num">02</span><div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M3 21V9l6 4V9l6 4V5l6 4v12H3z"/><path d="M7 17h2M12 17h2M17 17h1"/></svg></div><h3>Factory inspection</h3><p>Our team visits the factory in person. We check licences, samples and production capacity before you pay.</p></article>
              <article className="card tilt rv d2"><span className="num">03</span><div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg></div><h3>Quality control</h3><p>Pre-shipment checks with photo and video reports, done before the container is sealed.</p></article>
              <article className="card tilt rv"><span className="num">04</span><div className="icon"><svg><use href="#i-ship"/></svg></div><h3>Shipping &amp; logistics</h3><p>Full-container and shared-container sea freight from Chinese ports, plus air cargo for urgent orders.</p></article>
              <article className="card tilt rv d1"><span className="num">05</span><div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/></svg></div><h3>Customs clearance</h3><p>Documentation, duties, GST and clearance at Indian ports. No surprises when the ship lands.</p></article>
              <article className="card tilt rv d2"><span className="num">06</span><div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 6h13v10H1zM14 10h4l4 3v3h-8z"/><circle cx="5.5" cy="18" r="2"/><circle cx="17.5" cy="18" r="2"/></svg></div><h3>Doorstep delivery</h3><p>From the port straight to your shop, warehouse, villa or site, with the container unloaded on location.</p></article>
            </div>
          </div>
        </section>

        {/* JOURNEY (3D) */}
        <section className="journey" id="journey">
          <div className="journey-sticky">
            <canvas id="sea" aria-hidden="true"></canvas>
            <div className="j-loading" id="jloading">Loading 3D scene…</div>
            <div className="j-shade"></div>
            <div className="j-badge"><i></i> Live shipment view</div>
            <div className="j-ui">
              <div className="wrap" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="j-head">
                  <span className="eyebrow">How it works</span>
                  <h2>Watch your order travel from China to India.</h2>
                </div>
                <ol className="j-steps" id="jsteps">
                  <li className="j-step on"><span className="n">1</span><div><h4>Source the right factory</h4><p>Tell us the product. We shortlist verified manufacturers and get you real prices, not middleman quotes.</p></div></li>
                  <li className="j-step"><span className="n">2</span><div><h4>Inspect &amp; approve samples</h4><p>Our team visits the factory and checks samples. You approve over video call.</p></div></li>
                  <li className="j-step"><span className="n">3</span><div><h4>Quality check &amp; loading</h4><p>Every carton is checked and counted. Then the cranes load your container onto the ship.</p></div></li>
                  <li className="j-step"><span className="n">4</span><div><h4>Ocean freight</h4><p>Your container sails from Shanghai to India, and we track it the whole way.</p></div></li>
                  <li className="j-step"><span className="n">5</span><div><h4>Customs clearance</h4><p>Duties, GST and paperwork are handled at the Indian port, so the container is released quickly.</p></div></li>
                  <li className="j-step"><span className="n">6</span><div><h4>Delivered to your door</h4><p>The container is unloaded and trucked to your shop, warehouse or site.</p></div></li>
                </ol>
                <div className="j-route">
                  <div className="j-port"><svg className="flag"><use href="#flag-cn"/></svg><div><span className="pname">Shanghai</span><small>Origin port</small></div></div>
                  <div className="j-track"><div className="j-fill" id="jfill"></div><div className="j-boat" id="jboat"><svg><use href="#i-ship"/></svg></div></div>
                  <div className="j-port"><div style={{ textAlign: 'right' }}><span className="pname">Chennai</span><small>Destination</small></div><svg className="flag"><use href="#flag-in"/></svg></div>
                  <div className="j-day" id="jday">Day 0</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="section" id="products">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow rv">What we import</span>
              <h2 className="rv d1">China has a market for every industry. <span className="grad-text">We know each one.</span></h2>
              <p className="rv d2">Each industry has its own manufacturing hub. We take you straight to the source.</p>
            </div>
            <div className="products">
              <article className="card prod tilt rv"><svg className="art" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M3 11h18v6H3zM5 17v3M19 17v3M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4"/></svg>
                <span className="hub"><svg className="flag"><use href="#flag-cn"/></svg> Foshan hub</span><h3>Furniture &amp; interiors</h3>
                <ul><li>Complete home and villa furniture</li><li>Office desks and executive chairs</li><li>Banquet hall and hotel fit-outs</li></ul>
                <span className="tag">Height-adjustable desk from ₹45,000 · MOQ 1</span></article>
              <article className="card prod tilt rv d1"><svg className="art" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/></svg>
                <span className="hub"><svg className="flag"><use href="#flag-cn"/></svg> Shenzhen hub</span><h3>Electronics &amp; tech</h3>
                <ul><li>LED screens and digital signage</li><li>Mobile accessories in bulk</li><li>Power bank rental kiosks</li></ul>
                <span className="tag">Business ideas India doesn't have yet</span></article>
              <article className="card prod tilt rv d2"><svg className="art" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="5.5" cy="17" r="3.5"/><circle cx="18.5" cy="17" r="3.5"/><path d="M5.5 17l4-8h5l4 8M9 6h3"/></svg>
                <span className="hub"><svg className="flag"><use href="#flag-cn"/></svg> Guangzhou hub</span><h3>EV &amp; automotive</h3>
                <ul><li>Electric scooters as kits for assembly in India</li><li>Battery cells sourced separately</li><li>Car LED lights with your own brand</li></ul>
                <span className="tag">Car LED private label · MOQ 500</span></article>
              <article className="card prod tilt rv"><svg className="art" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9V16h7v-2.1A6 6 0 0012 3z"/></svg>
                <span className="hub"><svg className="flag"><use href="#flag-cn"/></svg> Guzhen hub</span><h3>Lighting</h3>
                <ul><li>Decorative and architectural lighting</li><li>Commercial LED fixtures</li><li>Custom designs for projects</li></ul>
                <span className="tag">Direct from the lighting capital of China</span></article>
              <article className="card prod tilt rv d1"><svg className="art" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M3 4h2l2.5 11h11L21 7H7M9 20a1 1 0 100-2 1 1 0 000 2zM18 20a1 1 0 100-2 1 1 0 000 2z"/></svg>
                <span className="hub"><svg className="flag"><use href="#flag-cn"/></svg> Yiwu hub</span><h3>Supermarket &amp; general goods</h3>
                <ul><li>Complete store stock in one container</li><li>Home, kitchen, toys and gifts</li><li>Choose products over video call</li></ul>
                <span className="tag">World's largest small-goods market</span></article>
              <article className="card prod tilt rv d2"><svg className="art" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>
                <span className="hub"><svg className="flag"><use href="#flag-cn"/></svg> Pan-China</span><h3>Machinery &amp; automation</h3>
                <ul><li>Production and packaging machines</li><li>Smart vending and robotic kiosks</li><li>Spares and after-sales support</li></ul>
                <span className="tag">Tell us the machine, we find the factory</span></article>
            </div>
          </div>
        </section>

        {/* SHANGHAI COMPANY */}
        <section className="section shanghai" id="shanghai">
          <div className="wrap sh-grid">
            <div>
              <span className="eyebrow rv">Officially in China</span>
              <h2 className="rv d1" style={{ fontSize: 'clamp(32px,4.2vw,52px)', margin: '14px 0 18px' }}>Many claim an office in China. <span className="grad-text">We have the licence.</span></h2>
              <p className="rv d2" style={{ color: 'var(--muted)', fontSize: '18px' }}>ImportNow operates through its own registered company in Shanghai, <b style={{ color: 'var(--text)' }}>Shanghai Shengqiao Chain Trading Co., Ltd.</b> That means we can sign contracts with factories, pay suppliers locally and stand behind every order.</p>
              <ul className="checks">
                <li className="rv d2"><span className="tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5 9-10"/></svg></span><div><b>Registered business licence</b> issued in Shanghai, China</div></li>
                <li className="rv d3"><span className="tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5 9-10"/></svg></span><div><b>Chinese company bank account</b>, so payments to factories are safe and traceable</div></li>
                <li className="rv d4"><span className="tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5 9-10"/></svg></span><div><b>Team on the ground</b> for factory visits, quality checks and market trips</div></li>
                <li className="rv d5"><span className="tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5 9-10"/></svg></span><div><b>Indian founder on both sides</b>: talk to us in Telugu, Hindi or English</div></li>
              </ul>
            </div>
            <div className="license-stage rv d2">
              <div className="license" id="license">
                <div className="lt">营业执照</div><div className="ls">BUSINESS LICENCE</div><div className="emblem"></div>
                <dl><dt>Company</dt><dd>Shanghai Shengqiao Chain Trading Co., Ltd.</dd><dt>Location</dt><dd>Shanghai, People's Republic of China</dd><dt>Scope</dt><dd>Supply chain, sourcing &amp; international trade</dd><dt>Serving</dt><dd>Importers across India</dd></dl>
                <div className="qr"></div><div className="stamp"><span>SHANGHAI<br />SHENGQIAO<br />TRADING</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* TRIPS */}
        <section className="section" id="trips">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow rv">Business trips to China</span>
              <h2 className="rv d1">Your business trip doesn't have to <span className="grad-text">feel like work.</span></h2>
              <p className="rv d2">Guided trips to the Canton Fair, wholesale markets and factories you choose. Our clients often tell us it felt like a personal trip, not a business tour.</p>
            </div>
            <div className="trips-grid">
              <article className="card trip-hero rv">
                <svg className="skyline" viewBox="0 0 600 150" preserveAspectRatio="none" fill="rgba(40,20,50,.55)"><path d="M0 150V110h30V80h20v30h25V60h15V40h10v20h15v50h30V70h40v40h20V30l15-25 15 25v80h25V85h30v25h20V50h35v60h25V90h30V20h12V0h6v20h12v90h30V75h40v35h25V95h30v55z"/></svg>
                <span className="eyebrow">Canton Fair · Guangzhou</span>
                <h3>Meet factories face to face. We handle everything else.</h3>
                <p>Walk the world's biggest trade fair with a guide who speaks the language, then visit the factories you shortlist.</p>
                <div className="pill-row"><span className="pill">Guangzhou</span><span className="pill">Shenzhen</span><span className="pill">Yiwu</span><span className="pill">Foshan</span><span className="pill">Macau</span><span className="pill">Glass bridge</span></div>
              </article>
              <article className="card rv d1">
                <h3 style={{ marginBottom: '18px' }}>What's included</h3>
                <div className="inc">
                  <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>Visa guidance &amp; invitation letter</div>
                  <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21V8l9-5 9 5v13M9 21v-6h6v6"/></svg>Hotels close to the fair</div>
                  <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 11h16a8 8 0 01-16 0zM12 3v4M8 5v2M16 5v2"/></svg>Indian food daily, veg &amp; non-veg</div>
                  <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 5h9M8.5 3v2M6 5c0 4 3 7 6 8M11 5c-1 4-4 7-7 8M14 21l4-9 4 9M15.5 18h5"/></svg>Guides &amp; translators</div>
                  <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21V9l6 4V9l6 4V5l6 4v12H3z"/></svg>Factory visits you choose</div>
                  <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>Sightseeing between markets</div>
                </div>
              </article>
              <article className="card rv d2">
                <h3 style={{ marginBottom: '16px' }}>Next departures</h3>
                <div className="dates"><div className="date"><b>Spring</b><span>Canton Fair · April–May</span></div><div className="date"><b>Autumn</b><span>Canton Fair · October–November</span></div></div>
                <a className="btn btn-primary" href="#contact" style={{ marginTop: '20px' }}>Join the next trip →</a>
              </article>
            </div>
          </div>
        </section>

        {/* PROOF OF WORK */}
        <section className="section" id="work" style={{ paddingTop: '10px' }}>
          <div className="wrap">
            <div className="section-head"><span className="eyebrow rv">Recently delivered</span><h2 className="rv d1">Another container unloaded, <span className="grad-text">another happy client.</span></h2></div>
            <div className="work-grid">
              <article className="card work tilt rv"><div className="ph ph1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M3 11h18v6H3zM5 17v3M19 17v3M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4"/></svg><span className="route-chip"><svg className="flag"><use href="#flag-cn"/></svg>Foshan → Villa</span></div><div className="bd"><h3>Complete villa furniture</h3><p>Sofas, dining sets, office furniture and pergolas, all in one container delivered to a luxury villa.</p><div className="meta"><span>Full container</span><span>Door delivery</span></div></div></article>
              <article className="card work tilt rv d1"><div className="ph ph2"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M3 4h2l2.5 11h11L21 7H7M9 20a1 1 0 100-2 1 1 0 000 2zM18 20a1 1 0 100-2 1 1 0 000 2z"/></svg><span className="route-chip"><svg className="flag"><use href="#flag-cn"/></svg>Yiwu → Adilabad</span></div><div className="bd"><h3>Sagar Supermarket</h3><p>Complete supermarket stock sourced from Yiwu over video calls and delivered to the client's warehouse.</p><div className="meta"><span>Retail</span><span>Video sourcing</span></div></div></article>
              <article className="card work tilt rv d2"><div className="ph ph3"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M3 21V8l9-5 9 5v13M9 21v-6h6v6M7 10h2M15 10h2"/></svg><span className="route-chip"><svg className="flag"><use href="#flag-cn"/></svg>China → Convention</span></div><div className="bd"><h3>Sreeman Convention Centre</h3><p>Cots, beds, dining sets and office furniture for a convention venue, with better finish for the same budget.</p><div className="meta"><span>Hospitality</span><span>Bulk order</span></div></div></article>
              <article className="card work tilt rv d3"><div className="ph ph4"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M3 8h18v3H3zM5 11v9M19 11v9M10 8V5h4v3"/></svg><span className="route-chip"><svg className="flag"><use href="#flag-cn"/></svg>China → Hyderabad</span></div><div className="bd"><h3>Smart office desks</h3><p>Motorised height-adjustable L-shaped desks, imported even as a single piece.</p><div className="meta"><span>MOQ 1</span><span>~30 days</span></div></div></article>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS — paraphrased from clients' words in ImportNow's Instagram reels; replace with approved quotes before launch */}
        <section className="section" id="stories" style={{ paddingTop: '10px' }}>
          <div className="wrap">
            <div className="section-head"><span className="eyebrow rv">Client stories</span><h2 className="rv d1">Heard from the people <span className="grad-text">who made the trip.</span></h2></div>
            <div className="grid-3">
              <article className="card quote rv"><p className="q">I came to source LED screens and electronics. The Guangzhou and Shenzhen markets were easy to navigate, and hotels, food and travel were all taken care of.</p><div className="who"><span className="avatar">S</span><div><b>Sai</b><span>Ad-tech startup · Siddipet</span></div></div></article>
              <article className="card quote rv d1"><p className="q">Twelve days covering the Canton Fair and factories of my choice. Visa, guidance, Indian food every day. It felt like a personal trip, not a business tour.</p><div className="who"><span className="avatar">M</span><div><b>Mahender Reddy</b><span>Canton Fair trip client</span></div></div></article>
              <article className="card quote rv d2"><p className="q">We picked our products on video calls, and the container came straight from Yiwu to our warehouse. The whole process was hassle-free.</p><div className="who"><span className="avatar">SS</span><div><b>Sagar Supermarket</b><span>Retail · Adilabad</span></div></div></article>
            </div>
          </div>
        </section>

        {/* LATEST GUIDES */}
        <section className="section" id="guides" style={{ paddingTop: '10px' }}>
          <div className="wrap">
            <div className="section-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', maxWidth: 'none', flexWrap: 'wrap' }}>
              <div style={{ maxWidth: '640px' }}><span className="eyebrow rv">Import guides</span><h2 className="rv d1">Learn before you import.</h2><p className="rv d2">Practical guides on sourcing, shipping, customs and business ideas from China.</p></div>
              <Link className="btn btn-ghost rv" to="/blog">View all articles →</Link>
            </div>
            <div className="post-grid three" id="latest-posts">{POSTS.slice(0, 3).map((p, i) => <PostCard key={p.slug} post={p} index={i} />)}</div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq" style={{ paddingTop: '10px' }}>
          <div className="wrap">
            <div className="section-head"><span className="eyebrow rv">Questions</span><h2 className="rv d1">Before you import</h2></div>
            <div className="faq rv d2">
              <details open><summary>Can I import just one piece?<i></i></summary><p>Yes, for many products. Furniture like height-adjustable desks can be imported with a minimum order of one piece. Private-label products, such as car LED lights, usually start from around 500 units.</p></details>
              <details><summary>How long does delivery take?<i></i></summary><p>Most sea shipments reach your door in about 30 to 40 days, depending on the product, the factory's production time and the destination port. Air cargo is faster for urgent orders.</p></details>
              <details><summary>Do you handle customs and GST?<i></i></summary><p>Yes. We prepare the documentation and manage duties, GST and clearance at the Indian port, then deliver to your address.</p></details>
              <details><summary>Do I need an Import Export Code (IEC)?<i></i></summary><p>For commercial imports, yes. If you don't have one yet, we'll guide you through getting it.</p></details>
              <details><summary>Can I visit the factories myself?<i></i></summary><p>Absolutely. Join one of our guided China business trips, or we can arrange visits to the factories you've shortlisted.</p></details>
              <details><summary>What's the best business to start by importing from China?<i></i></summary><p>It depends on your interests and budget. Popular choices with our clients include furniture, EV scooters, car accessories, lighting and supermarket goods. Talk to us and we'll suggest options that fit your market.</p></details>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section contact" id="contact">
          <div className="wrap ct-grid">
            <div>
              <span className="eyebrow rv">Start importing</span>
              <h2 className="rv d1" style={{ fontSize: 'clamp(32px,4.4vw,52px)', margin: '14px 0 18px' }}>Tell us what you want to import. <span className="grad-text">We'll take it from there.</span></h2>
              <p className="rv d2" style={{ color: 'var(--muted)', fontSize: '18px' }}>Share the product and quantity. You'll get supplier options, landed cost and timelines, free of charge.</p>
              <div className="ct-lines">
                <a className="ct-line rv d2" href="tel:+919989724320"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2"/></svg><div><small>Call or WhatsApp</small><b>+91 99897 24320</b></div></a>
                <a className="ct-line rv d3" href="https://www.instagram.com/importnow.in/" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg><div><small>Instagram</small><b>@importnow.in</b></div></a>
                <div className="ct-line rv d4"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg><div><small>Offices</small><b>Hyderabad, India · Shanghai, China</b></div></div>
              </div>
            </div>
            <form className="quote-form rv d2" id="qform" onSubmit={onQuoteSubmit}>
              <h3 style={{ fontSize: '22px' }}>Get a free sourcing quote</h3>
              <div className="row2">
                <div className="field"><label htmlFor="f-name">Your name</label><input id="f-name" required placeholder="Full name" /></div>
                <div className="field"><label htmlFor="f-city">City</label><input id="f-city" placeholder="e.g. Hyderabad" /></div>
              </div>
              <div className="field"><label htmlFor="f-cat">What do you want to import?</label>
                <select id="f-cat"><option>Furniture &amp; interiors</option><option>Electronics &amp; tech</option><option>EV &amp; automotive</option><option>Lighting</option><option>Supermarket &amp; general goods</option><option>Machinery</option><option>China business trip / Canton Fair</option><option>Something else</option></select></div>
              <div className="row2">
                <div className="field"><label htmlFor="f-qty">Approx. quantity</label><input id="f-qty" placeholder="e.g. 1 container" /></div>
                <div className="field"><label htmlFor="f-budget">Budget</label><select id="f-budget"><option>Under ₹1 lakh</option><option>₹1–5 lakh</option><option>₹5–25 lakh</option><option>₹25 lakh+</option></select></div>
              </div>
              <div className="field"><label htmlFor="f-msg">Details</label><textarea id="f-msg" placeholder="Product, specs, reference photos or links…"></textarea></div>
              <button className="btn btn-primary" type="submit" style={{ justifyContent: 'center' }}>Send on WhatsApp →</button>
              <p className="form-note">Opens WhatsApp with your details filled in. We usually reply within a few hours.</p>
            </form>
          </div>
        </section>


      </main>
      <Footer home />
    </>
  );
}
