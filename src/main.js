import './styles.css';

const slots = [
  { id: 'hero', name: 'Hero Badge', placement: 'Center back · highest visibility', price: 2999, note: 'Above the Apple mark', featured: true },
  { id: 'top-left', name: 'Top Left', placement: 'Upper-left back corner', price: 1999, note: 'Clean, premium placement' },
  { id: 'top-right', name: 'Top Right', placement: 'Upper-right back corner', price: 1999, note: 'Strong camera-facing angle' },
  { id: 'bottom-left', name: 'Bottom Left', placement: 'Lower-left back corner', price: 1499, note: 'Subtle but persistent' },
  { id: 'bottom-right', name: 'Bottom Right', placement: 'Lower-right back corner', price: 1499, note: 'Ideal for compact marks' },
  { id: 'keyboard', name: 'Keyboard Deck', placement: 'Palm-rest / keyboard area', price: 2499, note: 'Seen during active use' }
];

const brands = [
  ['N', 'Notion'], ['G', 'Google'], ['aws', 'AWS'], ['A', 'Airtel'], ['S', 'Spotify'], ['C', 'CRED']
];

const money = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
const app = document.querySelector('#app');

app.innerHTML = `
  <div class="site">
    <div class="announcement"><span class="pulse"></span> Private sponsorship inventory · 6 positions · Monthly placements</div>
    <header class="nav shell">
      <a class="brand" href="#top" aria-label="MacBook Pro Ad Space home"><span class="brand-mark">SR</span><span><b>Shubhankar Raj</b><small>MacBook Pro Ad Space</small></span></a>
      <nav><a class="active" href="#top">Home</a><a href="#slots">Ad Slots</a><a href="#model">3D Model</a><a href="#faq">FAQ</a></nav>
      <a class="nav-cta" href="#slots">Book a slot <span>↗</span></a>
    </header>

    <main id="top">
      <section class="hero shell">
        <div class="hero-copy">
          <div class="eyebrow"><span>01</span> Premium physical ad space</div>
          <h1>Put your brand<br><em>where people</em><br>actually look.</h1>
          <p class="hero-text">Sponsor a real placement on a starlight MacBook Pro. Your mark travels through classrooms, cafés, workspaces and everyday use — not another browser tab.</p>
          <div class="hero-actions"><a class="btn primary" href="#slots">View available slots <span>→</span></a><a class="underlink" href="#model">Explore the 3D render</a></div>
          <div class="hero-stats"><div><strong>6</strong><span>limited slots</span></div><div><strong>30d</strong><span>minimum term</span></div><div><strong>01</strong><span>physical device</span></div></div>
        </div>
        <div class="hero-stage" aria-label="Interactive 3D starlight MacBook Pro render">
          <div class="stage-grid"></div>
          <div class="stage-label"><span>LIVE PREVIEW</span><b>Starlight · MacBook Pro</b></div>
          <div class="mac-wrap" id="mac-wrap">
            <div class="mac-shadow"></div>
            <div class="mac" id="mac">
              <div class="screen-shell"><div class="screen-glass"><div class="wallpaper"><span>PRO</span><div class="screen-brands"><b>Notion</b><b>Google</b><b>AWS</b><b>Spotify</b><b>CRED</b><b>Airtel</b></div><i></i></div><div class="notch"></div></div></div>
              <div class="base-shell"><div class="deck"><div class="keys"></div><div class="trackpad"></div><div class="front-logo">SR</div></div><div class="hinge"></div></div>
            </div>
          </div>
          <div class="turn-hint">Drag / swipe to inspect · <button id="flipMac" type="button">Flip model</button></div>
        </div>
      </section>

      <section class="logo-strip"><div class="shell logo-row"><span class="strip-label">BRAND WALL · EXAMPLE SPONSORS</span>${brands.map(([mark, name]) => `<span class="brand-pill"><b>${mark}</b>${name}</span>`).join('')}</div></section>

      <section class="section shell" id="slots">
        <div class="section-head"><div><div class="eyebrow"><span>02</span> Inventory</div><h2>Own a spot on<br><em>the machine.</em></h2></div><p>Every position is physical, limited and priced monthly. Select a card to preview its location on the MacBook.</p></div>
        <div class="slot-layout">
          <div class="slot-grid">${slots.map(slot => `<button type="button" class="slot-card ${slot.featured ? 'featured' : ''}" data-slot="${slot.id}"><div class="slot-top"><span>${slot.featured ? 'MOST VISIBLE' : 'SLOT ' + String(slots.indexOf(slot) + 1).padStart(2,'0')}</span><span class="slot-dot"></span></div><div class="mini-mac"><span class="mini-marker marker-${slot.id}"></span><span class="mini-apple"></span></div><h3>${slot.name}</h3><p>${slot.placement}</p><div class="slot-bottom"><strong>${money.format(slot.price)}</strong><small>/ month</small></div></button>`).join('')}</div>
          <aside class="booking-panel" aria-live="polite"><div class="selected-tag">SELECTED PLACEMENT</div><div class="booking-number">01</div><h3 id="selectedName">Hero Badge</h3><p id="selectedPlacement">Center back · highest visibility</p><div class="price"><span>Monthly</span><strong id="selectedPrice">₹2,999</strong></div><div class="booking-meta"><span><b>30 days</b> minimum term</span><span><b>1 device</b> physical placement</span></div><a class="btn light" id="bookingLink" href="mailto:replace-with-your-email@example.com?subject=MacBook%20Pro%20Ad%20Slot%20Enquiry">Request this slot <span>↗</span></a><small class="fine">No payment is taken here. Final artwork and placement are confirmed directly.</small></aside>
        </div>
      </section>

      <section class="model-section" id="model"><div class="shell model-grid"><div class="model-copy"><div class="eyebrow"><span>03</span> The physical canvas</div><h2>Designed like a product.<br><em>Used like a billboard.</em></h2><p>The render shows the actual advertising concept: a starlight aluminium body, sponsor marks on the lid, and a companion iPhone carrying the live campaign dashboard.</p><div class="feature-list"><div><b>01</b><span><strong>Starlight finish</strong> Warm metallic surface designed to make marks read cleanly.</span></div><div><b>02</b><span><strong>Brand wall</strong> Six configurable sponsor positions across the physical device.</span></div><div><b>03</b><span><strong>Front + companion view</strong> A MacBook and iPhone presentation gives the site a tangible campaign feel.</span></div></div></div><div class="render-bay"><div class="bay-floor"></div><div class="mac-open"><div class="lid"><div class="sponsor sponsor-one">Notion</div><div class="sponsor sponsor-two">Google</div><div class="sponsor sponsor-three">AWS</div><div class="apple"></div><div class="sponsor sponsor-four">Spotify</div><div class="sponsor sponsor-five">CRED</div><div class="sponsor sponsor-six">Airtel</div></div><div class="mac-base"><div class="keyboard-large"></div><div class="pad"></div></div></div><div class="iphone"><div class="phone-screen"><div class="dynamic-island"></div><small>SPONSOR DASHBOARD</small><strong>500+</strong><span>daily views</span><div class="phone-bars"><i></i><i></i><i></i></div><b>6 / 6 slots</b></div></div><div class="render-caption"><span>03D RENDER</span><b>Starlight MacBook Pro + iPhone</b></div></div></div></section>

      <section class="section shell proof"><div class="proof-head"><div class="eyebrow"><span>04</span> Why it works</div><h2>Physical presence<br><em>beats banner blindness.</em></h2></div><div class="proof-grid"><article><span>01</span><b>Always in the room</b><p>Your brand is attached to an object that gets carried, opened and used repeatedly.</p></article><article><span>02</span><b>High recall surface</b><p>A physical logo is encountered differently from an ad that disappears after a scroll.</p></article><article><span>03</span><b>Scarcity creates value</b><p>Only six placements exist on this device. Once booked, the position is unavailable to competitors.</p></article></div></section>

      <section class="faq section shell" id="faq"><div><div class="eyebrow"><span>05</span> Questions</div><h2>Keep it<br><em>simple.</em></h2></div><div class="faq-list"><details open><summary>What exactly am I buying?<span>+</span></summary><p>A monthly sponsorship placement on the physical MacBook Pro shown on this page. Final dimensions, artwork and application method are agreed before placement.</p></details><details><summary>Can I provide my own logo?<span>+</span></summary><p>Yes. The sponsor marks shown in the render are presentation examples. Your approved artwork becomes the final campaign mark.</p></details><details><summary>Where does the MacBook travel?<span>+</span></summary><p>The device is intended for everyday use across study, work and public environments. Exact cities and exposure details can be supplied with the final listing.</p></details><details><summary>How do I reserve a slot?<span>+</span></summary><p>Select a position, then use the request button. The seller confirms availability, artwork requirements and the final commercial terms directly.</p></details></div></section>
    </main>
    <footer class="footer"><div class="shell footer-inner"><span class="brand-mark">SR</span><span>MacBook Pro Ad Space</span><span>Private sponsorship inventory · 2026</span></div></footer>
  </div>
`;

let selected = slots[0];
const mac = document.querySelector('#mac');
const wrap = document.querySelector('#mac-wrap');
let dragging = false;
let startX = 0;
let rotation = 0;

function updateSelection(slot) {
  selected = slot;
  document.querySelectorAll('.slot-card').forEach(card => card.classList.toggle('selected', card.dataset.slot === slot.id));
  document.querySelector('#selectedName').textContent = slot.name;
  document.querySelector('#selectedPlacement').textContent = slot.placement;
  document.querySelector('#selectedPrice').textContent = money.format(slot.price);
  document.querySelector('.booking-number').textContent = String(slots.indexOf(slot) + 1).padStart(2, '0');
  document.querySelector('#bookingLink').href = `mailto:replace-with-your-email@example.com?subject=${encodeURIComponent(`MacBook Pro Ad Slot — ${slot.name}`)}&body=${encodeURIComponent(`I am interested in the ${slot.name} placement (${money.format(slot.price)}/month).`)}`;
  const marker = document.querySelector(`.marker-${slot.id}`);
  document.querySelectorAll('.mini-marker').forEach(el => el.classList.remove('active'));
  marker?.classList.add('active');
}

document.querySelectorAll('.slot-card').forEach(card => card.addEventListener('click', () => updateSelection(slots.find(slot => slot.id === card.dataset.slot))));

document.querySelector('#flipMac').addEventListener('click', () => {
  rotation += 180;
  mac.style.transform = `rotateY(${rotation}deg)`;
});

wrap.addEventListener('pointerdown', e => { dragging = true; startX = e.clientX; wrap.setPointerCapture(e.pointerId); });
wrap.addEventListener('pointermove', e => { if (!dragging) return; const delta = e.clientX - startX; if (Math.abs(delta) > 3) { rotation += delta * 0.45; startX = e.clientX; mac.style.transform = `rotateY(${rotation}deg)`; } });
wrap.addEventListener('pointerup', () => { dragging = false; });
wrap.addEventListener('pointercancel', () => { dragging = false; });

updateSelection(selected);
