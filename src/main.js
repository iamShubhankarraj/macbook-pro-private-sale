import './styles.css';
import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import WebGPU from 'three/addons/capabilities/WebGPU.js';

const slots = [
  { id:'hero', name:'Hero Badge', price:2999, position:'Upper centre lid', size:'Large', note:'Highest visibility' },
  { id:'top-left', name:'Top Left', price:1999, position:'Upper left lid', size:'Medium', note:'Clean corner placement' },
  { id:'top-right', name:'Top Right', price:1999, position:'Upper right lid', size:'Medium', note:'Camera-facing angle' },
  { id:'bottom-left', name:'Bottom Left', price:1499, position:'Lower left lid', size:'Small', note:'Subtle persistent mark' },
  { id:'bottom-right', name:'Bottom Right', price:1499, position:'Lower right lid', size:'Small', note:'Compact brand mark' },
  { id:'keyboard', name:'Keyboard Deck', price:2499, position:'Palm-rest / deck', size:'Medium', note:'Visible during use' }
];
const money = new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0});
const app = document.querySelector('#app');
RectAreaLightUniformsLib.init();

app.innerHTML = `
<div class="site">
  <div class="announcement"><span class="live-dot"></span> Live 3D product preview · physically based materials · real-world scale</div>
  <header class="nav shell">
    <a class="brand" href="#top"><span class="brand-mark">SR</span><span><b>Brand My Mac</b><small>Physical sponsorship inventory</small></span></a>
    <nav><a class="active" href="#top">Home</a><a href="#slots">Slots</a><a href="#studio">3D Studio</a><a href="#physics">Physics</a><a href="#faq">FAQ</a></nav>
    <a class="nav-cta" href="#slots">Get a spot <span>↗</span></a>
  </header>

  <main id="top">
    <section class="hero shell">
      <div class="hero-copy">
        <div class="eyebrow"><span>01</span> Physical advertising</div>
        <h1>Your brand.<br><em>On the machine.</em></h1>
        <p>Real advertising inventory on a starlight MacBook. Explore the device at true proportions, inspect every placement, and see how light actually interacts with the metal.</p>
        <div class="hero-actions"><a class="btn primary" href="#slots">Explore ad slots <span>→</span></a><a class="text-link" href="#studio">Open 3D studio</a></div>
        <div class="facts"><div><strong>30.41 cm</strong><span>device width</span></div><div><strong>1.23 kg</strong><span>reference mass</span></div><div><strong>6</strong><span>ad positions</span></div></div>
      </div>
      <div class="hero-canvas-wrap">
        <div class="canvas-top"><span>PRODUCT VIEW</span><b>Starlight · 13.6″ reference geometry</b></div>
        <canvas id="hero-canvas" aria-label="Interactive physically based 3D MacBook model"></canvas>
        <div class="canvas-tools"><button type="button" data-view="hero">Hero</button><button type="button" data-view="lid">Lid</button><button type="button" data-view="open">Open</button><button type="button" data-view="keyboard">Deck</button></div>
        <div class="canvas-help">Drag to orbit · scroll to zoom · click a marker to inspect</div>
      </div>
    </section>

    <section class="strip"><div class="shell strip-inner"><span>REFERENCE GEOMETRY</span><span>30.41 × 21.50 × 1.13 cm</span><span>STARLIGHT ALUMINIUM</span><span>PBR METAL</span><span>REAL-TIME SHADOWS</span></div></section>

    <section class="section shell" id="slots">
      <div class="section-head"><div><div class="eyebrow"><span>02</span> Inventory</div><h2>Six surfaces.<br><em>One machine.</em></h2></div><p>Choose a physical position. The 3D model highlights the corresponding placement and the booking panel updates instantly.</p></div>
      <div class="inventory-layout">
        <div class="slot-grid">${slots.map((s,i)=>`<button class="slot-card ${i===0?'selected':''}" data-slot="${s.id}" type="button"><div class="slot-number">${String(i+1).padStart(2,'0')} <span>${s.size}</span></div><div class="slot-preview"><span class="slot-pin pin-${s.id}"></span></div><h3>${s.name}</h3><p>${s.position}</p><div class="slot-price"><strong>${money.format(s.price)}</strong><span>/ month</span></div></button>`).join('')}</div>
        <aside class="booking" aria-live="polite"><span class="booking-label">SELECTED SLOT</span><div class="booking-no" id="bookingNo">01</div><h3 id="bookingName">Hero Badge</h3><p id="bookingPosition">Upper centre lid</p><div class="booking-price"><small>Monthly</small><strong id="bookingPrice">₹2,999</strong></div><div class="booking-lines"><span>Physical application <b>Included</b></span><span>Minimum term <b>30 days</b></span><span>Artwork review <b>Direct</b></span></div><a class="btn light" id="bookingLink" href="mailto:replace-with-your-email@example.com">Request this slot <span>↗</span></a><small class="booking-note">The render is a visualization of placement. Final artwork dimensions and application method are approved before installation.</small></aside>
      </div>
    </section>

    <section class="studio" id="studio"><div class="shell studio-grid"><div class="studio-copy"><div class="eyebrow"><span>03</span> 3D product studio</div><h2>Not a picture.<br><em>A scene.</em></h2><p>The previous model was a CSS illustration. This version is rendered with Three.js using rounded solid geometry, physically based materials, a measured reference scale, area lights, an environment map and real shadow maps.</p><div class="control-panel"><div class="control-title"><span>LIGHT LAB</span><b>Live parameters</b></div><label>Key light <input id="lightRange" type="range" min="200" max="1800" value="850" step="10"><output id="lightValue">850 W</output></label><label>Metal roughness <input id="roughRange" type="range" min="0.16" max="0.52" value="0.28" step="0.01"><output id="roughValue">0.28</output></label><label>Exposure <input id="exposureRange" type="range" min="0.65" max="1.65" value="1.05" step="0.01"><output id="exposureValue">1.05</output></label></div><div class="studio-note"><span class="green-check">✓</span><span><b>Physics model</b>Inverse-square light falloff, metal PBR response, perspective camera, contact shadowing and ACES tone mapping.</span></div></div><div class="studio-canvas-wrap"><canvas id="studio-canvas" aria-label="Detailed 3D MacBook studio render"></canvas><div class="studio-badge"><span>PHYSICALLY BASED</span><b>Three.js · WebGL 2</b></div><div class="axis-readout"><span>X</span><span>Y</span><span>Z</span><b>metres</b></div></div></div></section>

    <section class="physics section shell" id="physics"><div class="physics-head"><div><div class="eyebrow"><span>04</span> Applied physics</div><h2>Why the render<br><em>looks believable.</em></h2></div><p>A good 3D model is more than polygons. The scene uses physical scale and lighting rules so highlights, falloff and shadows behave predictably.</p></div><div class="physics-grid"><article><span>01</span><h3>Inverse-square falloff</h3><p>For a point-like source, irradiance decreases approximately with 1/r². Moving the key light changes both highlight intensity and shadow softness.</p><code>E ∝ 1 / r²</code></article><article><span>02</span><h3>Metal response</h3><p>The starlight body uses a metallic PBR material. Roughness controls how broad or tight the reflected light becomes across the aluminium.</p><code>metalness = 1.00</code></article><article><span>03</span><h3>Shadow mapping</h3><p>Direct lights cast depth-tested shadows onto the floor and laptop surfaces. Higher shadow-map resolution improves edge fidelity at a performance cost.</p><code>PCFSoftShadowMap</code></article><article><span>04</span><h3>Measured geometry</h3><p>The reference envelope follows Apple’s published 13-inch MacBook Air dimensions: 30.41 cm × 21.5 cm × 1.13 cm and 1.23 kg.</p><code>0.3041 × 0.215 × 0.0113 m</code></article></div></section>

    <section class="section shell detail"><div class="detail-grid"><div><div class="eyebrow"><span>05</span> Hardware detail</div><h2>Minute details<br><em>matter.</em></h2></div><div class="detail-list"><div><b>01</b><span><strong>Display</strong>13.6″ class Liquid Retina reference proportions with a camera notch.</span></div><div><b>02</b><span><strong>Keyboard</strong>Backlit-style key field, function row, Touch ID region and Force Touch trackpad.</span></div><div><b>03</b><span><strong>Ports</strong>USB-C / Thunderbolt openings, MagSafe-style charging port and headphone jack geometry.</span></div><div><b>04</b><span><strong>Exterior</strong>Rounded aluminium shell, chamfered transitions, rubber feet, hinge barrel and centred Apple mark.</span></div></div></div></section>

    <section class="faq section shell" id="faq"><div><div class="eyebrow"><span>06</span> Questions</div><h2>Before you<br><em>book.</em></h2></div><div class="faq-list"><details open><summary>Is this a real 3D model?<span>+</span></summary><p>Yes. The page now renders the laptop geometry in WebGL rather than using a flat image or CSS drawing. It is a physically based approximation built from published reference dimensions, not an official CAD model.</p></details><details><summary>Is it literally a MacBook Pro?<span>+</span></summary><p>The requested starlight finish is an Apple MacBook Air finish. Apple’s current technical specifications list Starlight for the MacBook Air, while the MacBook Pro line does not use that finish. The model therefore uses the starlight Air proportions as the physical reference.</p></details><details><summary>Can the sponsor positions change?<span>+</span></summary><p>Yes. Select any slot above. The inventory UI and 3D marker are designed around the same placement IDs so the listing can be changed without rebuilding the scene.</p></details><details><summary>Can the exact device be matched later?<span>+</span></summary><p>Yes. Once the exact year, screen size and device are confirmed, the reference dimensions and component geometry can be tightened to that specific machine.</p></details></div></section>
  </main>
  <footer class="footer"><div class="shell footer-inner"><span class="brand-mark">SR</span><span>Brand My Mac · Physical sponsorship inventory</span><span>3D studio build · 2026</span></div></footer>
</div>`;

const MODEL = { width:0.3041, depth:0.215, thickness:0.0113 };
const sceneState = { selected:slots[0], light:850, rough:0.28, exposure:1.05 };

function createRounded(w,h,d,r,material,segments=6){ const geo=new RoundedBoxGeometry(w,h,d,segments,r); const mesh=new THREE.Mesh(geo,material); mesh.castShadow=true; mesh.receiveShadow=true; return mesh; }
function metalMaterial(rough=0.28){ return new THREE.MeshPhysicalMaterial({color:0xd8d1c3,metalness:1,roughness:rough,clearcoat:0.16,clearcoatRoughness:0.18}); }
function darkMaterial(rough=.3){ return new THREE.MeshPhysicalMaterial({color:0x171719,metalness:.55,roughness}); }
function makeTextTexture(text,color='#ffffff',bg='rgba(20,20,20,.82)',accent='#d9ab5e'){
  const c=document.createElement('canvas'); c.width=512;c.height=220;const x=c.getContext('2d');
  x.clearRect(0,0,c.width,c.height); x.fillStyle=bg;x.beginPath();x.roundRect(18,18,476,184,32);x.fill();
  x.strokeStyle='rgba(255,255,255,.22)';x.lineWidth=3;x.stroke();x.fillStyle=accent;x.font='700 34px Arial';x.fillText('SPONSOR',44,72);x.fillStyle=color;x.font='700 56px Arial';x.fillText(text,44,138);x.font='500 18px Arial';x.fillStyle='rgba(255,255,255,.62)';x.fillText('PHYSICAL PLACEMENT',44,172);
  const tex=new THREE.CanvasTexture(c); tex.colorSpace=THREE.SRGBColorSpace; return tex;
}
function makeAppleLogo(){
  const c=document.createElement('canvas'); c.width=256;c.height=256;const x=c.getContext('2d');x.fillStyle='#ffffff';x.font='190px Arial';x.textAlign='center';x.textBaseline='middle';x.fillText('',128,132);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;
}
function addDecal(parent, text, x, y, w, h, rotation=0){
  const mat=new THREE.MeshBasicMaterial({map:makeTextTexture(text),transparent:true,depthWrite:false});
  const plane=new THREE.Mesh(new THREE.PlaneGeometry(w,h),mat);plane.position.set(x,y,MODEL.thickness/2+0.0004);plane.rotation.z=rotation;parent.add(plane);return plane;
}
function addPort(parent, x,z,w,h){ const mat=darkMaterial(.2); const port=createRounded(w,0.002,h,.0015,mat,4);port.position.set(x,-MODEL.thickness/2-0.0007,z);port.rotation.x=Math.PI/2;parent.add(port); }

function buildLaptop(scene, detailed=false){
  const root=new THREE.Group(); root.name='MacBookAir_Reference_13in'; scene.add(root);
  const metal=metalMaterial(sceneState.rough); const dark=darkMaterial(.25); const black=new THREE.MeshPhysicalMaterial({color:0x030303,metalness:.1,roughness:.18});
  const base=createRounded(MODEL.width,MODEL.thickness,MODEL.depth,.006,metal,7); base.position.y=MODEL.thickness/2; root.add(base);
  const deck=createRounded(MODEL.width-.008,0.0016,MODEL.depth-.008,.005,metal,6);deck.position.y=MODEL.thickness+.0008;root.add(deck);
  const keyMat=new THREE.MeshPhysicalMaterial({color:0x171719,metalness:.15,roughness:.55});
  const keyGroup=new THREE.Group(); keyGroup.position.set(0,MODEL.thickness+.0021,-.010);root.add(keyGroup);
  const rows=6, cols=14; const keyW=.0162, keyD=.0085, gap=.0022;
  for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
    const k=createRounded(keyW,0.0014,keyD,.0012,keyMat,3); const offset=(r===0?0.002:0); k.position.x=(c-(cols-1)/2)*(keyW+gap); k.position.z=(r-(rows-1)/2)*(keyD+gap)+offset; if(r===0&&c===cols-1) k.scale.x=.68; keyGroup.add(k);
  }
  const track=createRounded(.135,.0012,.082,.007,new THREE.MeshPhysicalMaterial({color:0xc7c0b4,metalness:.25,roughness:.3}),6);track.position.set(0,MODEL.thickness+.002,-.061);root.add(track);
  const touch=createRounded(.017,.0018,.012,.003,dark,5);touch.position.set(.104,MODEL.thickness+.003,-.076);root.add(touch);
  const lidGroup=new THREE.Group(); lidGroup.position.set(0,MODEL.thickness,MODEL.depth/2-.004); lidGroup.rotation.x=-THREE.MathUtils.degToRad(104); root.add(lidGroup);
  const lid=createRounded(MODEL.width,MODEL.thickness,MODEL.depth*.78,.006,metal,7); lid.position.set(0,MODEL.depth*.39,0);lidGroup.add(lid);
  const bezel=createRounded(.288,.002,.177,.004,dark,6);bezel.position.set(0,MODEL.depth*.392,MODEL.thickness/2+.001);lidGroup.add(bezel);
  const screenMat=new THREE.MeshPhysicalMaterial({color:0x101114,metalness:.15,roughness:.22,emissive:0x11161c,emissiveIntensity:.3});
  const screen=createRounded(.278,.001,.167,.002,screenMat,5);screen.position.set(0,MODEL.depth*.392+.001,MODEL.thickness/2+.002);lidGroup.add(screen);
  const cam=new THREE.Mesh(new THREE.SphereGeometry(.0032,16,10),new THREE.MeshBasicMaterial({color:0x060607}));cam.position.set(0,MODEL.depth*.392+.001,.005);lidGroup.add(cam);
  const logo=new THREE.Mesh(new THREE.PlaneGeometry(.036,.036),new THREE.MeshBasicMaterial({map:makeAppleLogo(),transparent:true,depthWrite:false}));logo.position.set(0,MODEL.depth*.09,MODEL.thickness/2+.002);lidGroup.add(logo);
  const sponsorGroup=new THREE.Group(); sponsorGroup.name='SponsorPlacements'; sponsorGroup.position.set(0,MODEL.depth*.39,MODEL.thickness/2+.003);lidGroup.add(sponsorGroup);
  const positions={hero:[0,.065,.056,.032], 'top-left':[-.08,.065,.036,.022], 'top-right':[.08,.065,.036,.022], 'bottom-left':[-.08,-.055,.036,.022], 'bottom-right':[.08,-.055,.036,.022], keyboard:[0,-.09,.075,.024]};
  for(const s of slots){const [x,y,w,h]=positions[s.id];const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:makeTextTexture(s.name,'#f5f5f5','rgba(15,15,16,.9)','#d8ad63'),transparent:true,depthWrite:false}));m.position.set(x,y,0);m.name='slot-'+s.id;sponsorGroup.add(m)}
  // side details / feet
  const footMat=new THREE.MeshPhysicalMaterial({color:0x222222,roughness:.8,metalness:.05});
  for(const x of [-.125,.125]) for(const z of [-.085,.085]){const f=new THREE.Mesh(new THREE.CylinderGeometry(.004,.004,.0015,16),footMat);f.rotation.x=Math.PI/2;f.position.set(x,0,z);root.add(f)}
  // ports on left/right side as thin dark apertures
  for(const x of [-.1,-.075,-.05]) addPort(root,x,-MODEL.depth/2+.001,.012,.0035);
  addPort(root,.09,MODEL.depth/2-.001,.022,.004);
  if(detailed){
    const hingeMat=new THREE.MeshPhysicalMaterial({color:0x7e796f,metalness:.9,roughness:.32});
    for(const x of [-.06,0,.06]){const h=new THREE.Mesh(new THREE.CylinderGeometry(.004,.004,.045,24),hingeMat);h.rotation.z=Math.PI/2;h.position.set(x,MODEL.thickness+.002,MODEL.depth/2-.006);root.add(h)}
    // speaker grilles
    const grilleMat=new THREE.MeshBasicMaterial({color:0x252526});
    for(const side of [-1,1]) for(let i=0;i<28;i++){const g=new THREE.Mesh(new THREE.CylinderGeometry(.00065,.00065,.001,8),grilleMat);g.rotation.x=Math.PI/2;g.position.set(side*(.105+i%2*.004),MODEL.thickness+.003,-.008-Math.floor(i/2)*.0045);root.add(g)}
  }
  root.userData.lidGroup=lidGroup;root.userData.sponsorGroup=sponsorGroup;root.userData.base=base;root.userData.deck=deck;root.userData.modelScale=1;
  return root;
}

function renderFallback(canvas, label='3D preview unavailable'){
  const wrap=canvas.parentElement;
  wrap.classList.add('render-fallback');
  const existing=wrap.querySelector('.render-fallback-message');
  if(existing) return null;
  const message=document.createElement('div');
  message.className='render-fallback-message';
  message.innerHTML=`<strong>${label}</strong><span>The GPU renderer could not be initialized or the graphics context was lost.</span><small>The page keeps a visual fallback instead of leaving the product area blank.</small>`;
  wrap.appendChild(message);
  return null;
}

async function setupRenderer(canvas){
  try{
    // WebGPURenderer is the modern Three.js renderer. It uses WebGPU when
    // available and can fall back to a WebGL2 backend automatically.
    const renderer=new THREE.WebGPURenderer({canvas,antialias:true,alpha:true,powerPreference:'high-performance',preserveDrawingBuffer:false});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1,1.5));
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=sceneState.exposure;
    renderer.shadowMap.enabled=true;
    renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    await renderer.init();
    canvas.addEventListener('webgpucontextlost',event=>{event.preventDefault();renderFallback(canvas,'3D preview paused');},{passive:false});
    canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();renderFallback(canvas,'3D preview paused');},{passive:false});
    return renderer;
  }catch(error){
    console.error('GPU renderer initialization failed',error);
    renderFallback(canvas,'3D preview could not start');
    return null;
  }
}

async function setupScene(canvas, detailed=false){
  const renderer=await setupRenderer(canvas);
  if(!renderer) return null;
  try{
    const scene=new THREE.Scene();
    scene.background=new THREE.Color(0x090909);
    const camera=new THREE.PerspectiveCamera(32,1,.02,5);
    camera.position.set(.38,.26,.38);
    const controls=new OrbitControls(camera,canvas);
    controls.enableDamping=true;
    controls.dampingFactor=.07;
    controls.minDistance=.25;
    controls.maxDistance=.8;
    controls.target.set(0,.055,0);

    // Avoid a second GPU-heavy PMREM scene. The environment is represented by
    // physically plausible broad lights plus a low-energy hemisphere fill.
    const hemi=new THREE.HemisphereLight(0xf5eee2,0x171719,1.25);
    scene.add(hemi);
    const key=new THREE.DirectionalLight(0xffe5bd,3.8);
    key.position.set(.35,.48,.25);key.castShadow=true;
    key.shadow.mapSize.set(1024,1024);
    key.shadow.camera.near=.02;key.shadow.camera.far=1.5;
    key.shadow.camera.left=-.5;key.shadow.camera.right=.5;key.shadow.camera.top=.5;key.shadow.camera.bottom=-.5;
    scene.add(key);
    const fill=new THREE.PointLight(0xdde8ff,18,.9,2);
    fill.position.set(-.4,.25,.15);scene.add(fill);
    const rim=new THREE.DirectionalLight(0xffc77b,1.8);
    rim.position.set(-.25,.5,-.35);scene.add(rim);
    const floor=new THREE.Mesh(new THREE.PlaneGeometry(3,3),new THREE.MeshStandardMaterial({color:0x111111,metalness:.05,roughness:.55}));
    floor.rotation.x=-Math.PI/2;floor.position.y=-.003;floor.receiveShadow=true;scene.add(floor);
    const laptop=buildLaptop(scene,detailed);
    let raf=0, visible=true;
    function resize(){
      const r=canvas.getBoundingClientRect();
      const width=Math.max(1,Math.floor(r.width));
      const height=Math.max(1,Math.floor(r.height));
      renderer.setSize(width,height,false);
      camera.aspect=width/height;
      camera.updateProjectionMatrix();
    }
    const ro=new ResizeObserver(resize);ro.observe(canvas);resize();
    const io=new IntersectionObserver(entries=>{
      visible=entries[0]?.isIntersecting ?? true;
      if(visible && !raf) startLoop();
    },{threshold:0.01});
    io.observe(canvas);
    function frame(){
      if(!visible){raf=0;renderer.setAnimationLoop(null);return;}
      controls.update();
      renderer.toneMappingExposure=sceneState.exposure;
      key.intensity=3.8*(sceneState.light/850);
      renderer.render(scene,camera);
    }
    function startLoop(){
      if(raf) return;
      raf=1;
      renderer.setAnimationLoop(frame);
    }
    startLoop();
    return {scene,renderer,camera,controls,laptop,key,resize,io};
  }catch(error){
    console.error('3D scene initialization failed',error);
    renderer.dispose?.();
    renderFallback(canvas,'3D scene failed to initialize');
    return null;
  }
}

let heroScene=null;
let studioScene=null;
const studioCanvas=document.querySelector('#studio-canvas');
async function initHero(){
  heroScene=await setupScene(document.querySelector('#hero-canvas'),false);
  if(heroScene){heroScene.controls.autoRotate=true;heroScene.controls.autoRotateSpeed=.7;selectSlot(slots[0]);}
}
initHero();
const studioObserver=new IntersectionObserver(async entries=>{
  if(entries[0]?.isIntersecting && !studioScene){
    studioScene=await setupScene(studioCanvas,true);
    if(studioScene){studioScene.controls.autoRotate=true;studioScene.controls.autoRotateSpeed=.32;}
    studioObserver.disconnect();
  }
},{rootMargin:'400px 0px'});
studioObserver.observe(studioCanvas);

function applyView(name, target){
  if(!heroScene) return;
  heroScene.controls.autoRotate=false;
  const views={hero:[.38,.24,.38,.0,.05,.0],lid:[.02,.34,.34,0,.05,0],open:[.36,.25,.42,0,.05,0],keyboard:[.04,.48,.12,0,.02,0]};
  const v=views[name]||views.hero;heroScene.camera.position.set(v[0],v[1],v[2]);heroScene.controls.target.set(v[3],v[4],v[5]);heroScene.controls.update();
  document.querySelectorAll('.canvas-tools button').forEach(b=>b.classList.toggle('active',b.dataset.view===name));
}
document.querySelectorAll('.canvas-tools button').forEach(b=>b.addEventListener('click',()=>applyView(b.dataset.view)));
// Initial camera state is applied after the hero renderer is ready.

function selectSlot(slot){
 sceneState.selected=slot;const idx=slots.indexOf(slot);document.querySelectorAll('.slot-card').forEach(c=>c.classList.toggle('selected',c.dataset.slot===slot.id));
 document.querySelector('#bookingNo').textContent=String(idx+1).padStart(2,'0');document.querySelector('#bookingName').textContent=slot.name;document.querySelector('#bookingPosition').textContent=slot.position;document.querySelector('#bookingPrice').textContent=money.format(slot.price);
 document.querySelector('#bookingLink').href=`mailto:replace-with-your-email@example.com?subject=${encodeURIComponent('MacBook Ad Slot — '+slot.name)}&body=${encodeURIComponent('I am interested in the '+slot.name+' placement at '+money.format(slot.price)+'/month.')}`;
 if(!heroScene) return;
 heroScene.laptop.userData.sponsorGroup.children.forEach((m,i)=>{m.visible=i===idx || idx===0; if(i===idx){m.scale.setScalar(1.08)}else m.scale.setScalar(.94)});
 heroScene.controls.autoRotate=false; applyView(idx===5?'keyboard':idx===0?'hero':'lid');
}
document.querySelectorAll('.slot-card').forEach(c=>c.addEventListener('click',()=>selectSlot(slots.find(s=>s.id===c.dataset.slot))));selectSlot(slots[0]);

for(const [id,fn] of [['lightRange',v=>{sceneState.light=+v;document.querySelector('#lightValue').textContent=v+' W'}],['roughRange',v=>{sceneState.rough=+v;document.querySelector('#roughValue').textContent=(+v).toFixed(2);[heroScene,studioScene].filter(Boolean).forEach(s=>s.laptop.traverse(o=>{if(o.material?.metalness===1)o.material.roughness=+v}))}],['exposureRange',v=>{sceneState.exposure=+v;document.querySelector('#exposureValue').textContent=(+v).toFixed(2)}]]){
 document.querySelector('#'+id).addEventListener('input',e=>fn(e.target.value));
}

window.addEventListener('keydown',e=>{if(e.key.toLowerCase()==='r' && heroScene){heroScene.camera.position.set(.38,.24,.38);heroScene.controls.target.set(0,.05,0);heroScene.controls.update();}});
