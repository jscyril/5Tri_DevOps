const root = document.documentElement;
const css = getComputedStyle(root);
const color = name => getComputedStyle(root).getPropertyValue(name).trim();

function lineChart(id, values, stroke, fill, max = Math.max(...values) * 1.18) {
  const el = document.getElementById(id); const w = 900; const h = el.clientHeight || 200;
  const pad = { l: 42, r: 12, t: 10, b: 26 }; const iw = w - pad.l - pad.r; const ih = h - pad.t - pad.b;
  const points = values.map((v, i) => `${pad.l + i * iw / (values.length - 1)},${pad.t + ih - v / max * ih}`).join(' ');
  const area = `${pad.l},${pad.t + ih} ${points} ${pad.l + iw},${pad.t + ih}`;
  const grid = [0,.25,.5,.75,1].map(n => `<line class="chart-grid" x1="${pad.l}" x2="${pad.l+iw}" y1="${pad.t+ih-n*ih}" y2="${pad.t+ih-n*ih}"/>`).join('');
  el.innerHTML = `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><g fill="none" stroke="${color('--line')}">${grid}</g><polygon points="${area}" fill="${fill}" opacity=".18"/><polyline points="${points}" fill="none" stroke="${stroke}" stroke-width="2.4" vector-effect="non-scaling-stroke"/><g fill="${color('--muted')}" font-family="DM Mono" font-size="10"><text x="${pad.l}" y="${h-6}">00:00</text><text x="${w/2-15}" y="${h-6}">12:00</text><text x="${w-45}" y="${h-6}">24:00</text></g></svg>`;
}

function stackedChart() {
  const el = document.getElementById('attackChart'); const w=900,h=260,p={l:42,r:10,t:10,b:28}; const iw=w-p.l-p.r,ih=h-p.t-p.b;
  const series=[{c:'--blue',v:[8,12,10,17,13,20,18,26,19,22,28,24,31,26,35,30,39,34,38,33,42,37,44,41]},{c:'--green',v:[5,8,6,9,8,12,10,13,12,15,13,16,15,18,17,20,16,19,18,22,20,23,21,25]},{c:'--amber',v:[3,4,5,5,7,6,8,8,9,7,10,11,12,11,12,14,13,15,14,16,15,18,17,19]},{c:'--purple',v:[2,3,3,4,4,5,6,5,7,6,8,7,8,9,8,10,9,11,10,12,11,13,12,14]},{c:'--red',v:[1,2,1,2,3,2,3,4,3,4,3,5,4,5,5,6,5,6,7,6,7,8,7,9]}]; const max=140;
  let paths=''; let bottoms=Array(24).fill(0); series.forEach(s=>{const top=bottoms.map((b,i)=>b+s.v[i]); const pts=top.map((v,i)=>`${p.l+i*iw/23},${p.t+ih-v/max*ih}`).join(' '); const base=[...bottoms].reverse().map((v,j)=>`${p.l+(23-j)*iw/23},${p.t+ih-v/max*ih}`).join(' '); paths+=`<polygon points="${pts} ${base}" fill="${color(s.c)}" opacity=".88" stroke="${color('--surface')}" stroke-width="1"/>`; bottoms=top});
  const grid=[0,35,70,105,140].map(v=>`<line x1="${p.l}" x2="${p.l+iw}" y1="${p.t+ih-v/max*ih}" y2="${p.t+ih-v/max*ih}"/>`).join(''); el.innerHTML=`<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><g fill="none" stroke="${color('--line')}">${grid}</g>${paths}<g fill="${color('--muted')}" font-family="DM Mono" font-size="10"><text x="${p.l}" y="${h-7}">00:00</text><text x="${w/2-15}" y="${h-7}">12:00</text><text x="${w-45}" y="${h-7}">24:00</text></g></svg>`;
}

function renderCharts(){ stackedChart(); lineChart('latencyChart',[44,48,42,56,51,61,55,63,59,68,60,72,66,70,62,74,68,77,71,83,75,81,78,88],color('--brand'),color('--brand')); lineChart('creditChart',[4,7,11,15,19,23,27,31,35,39,44,48,52,56,60,64,68,72,76,81,85,89,94,100],color('--brand'),color('--brand'),110); }
renderCharts(); window.addEventListener('resize', renderCharts);

const pageTitle={overview:'Overview',logs:'Threat Audit',config:'Thresholds',keys:'Access'};
document.querySelectorAll('.nav-item').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelector('h1').textContent=pageTitle[btn.dataset.page];document.querySelector('.eyebrow').textContent=`Module 0${Object.keys(pageTitle).indexOf(btn.dataset.page)} · Global`; if(btn.dataset.page!=='overview') document.getElementById('pageContent').classList.add('dimmed'); else document.getElementById('pageContent').classList.remove('dimmed');}));
document.getElementById('themeToggle').addEventListener('click',()=>{document.body.classList.toggle('dark');document.getElementById('themeToggle').textContent=document.body.classList.contains('dark')?'☾ Dark':'☼ Light';renderCharts()});
const palette=document.getElementById('palette'); const input=document.getElementById('paletteInput'); function togglePalette(){palette.classList.toggle('open');palette.setAttribute('aria-hidden',!palette.classList.contains('open'));if(palette.classList.contains('open'))input.focus()}; document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();togglePalette()}if(e.key==='Escape')palette.classList.remove('open')}); document.querySelectorAll('[data-command]').forEach(btn=>btn.addEventListener('click',()=>{palette.classList.remove('open');document.querySelector(`[data-page="${btn.dataset.command}"]`).click()})); palette.addEventListener('click',e=>{if(e.target===palette)palette.classList.remove('open')}); document.getElementById('signOut').addEventListener('click',()=>alert('Static demo: sign out is not connected.'));


document.addEventListener("DOMContentLoaded", () => {

    const mainPanel = document.getElementById("mainPanel");
    const aquaVision = document.getElementById("openAquavision");
    const echelon = document.getElementById("openEchelon");

    const echelonHTML = mainPanel.innerHTML;

    aquaVision.addEventListener("click", async () => {

        try {

            const response = await fetch("./Landing.html");

            if (!response.ok) {
                throw new Error(
                    `Failed to load Landing.html: HTTP ${response.status}`
                );
            }

            const landingHTML = await response.text();

            // Replace ONLY the right/main panel
            mainPanel.innerHTML = landingHTML;

            // Re-create Lucide icons
            if (window.lucide) {
                lucide.createIcons();
            }

            // Optional: mark AquaVision as active
            aquaVision.classList.add("active-brand");

            echelon.classList.remove("active-brand");

            // Scroll main panel to top
            mainPanel.scrollTop = 0;

        } catch (error) {

            console.error(
                "Failed to load Landing.html:",
                error
            );

        }

    });


    echelon.addEventListener("click", () => {

        // Restore original Echelon dashboard
        mainPanel.innerHTML = echelonHTML;

        aquaVision.classList.remove("active-brand");

        echelon.classList.add("active-brand");

        // Reinitialize anything that your dashboard
        // needs after being restored.
        initializeEchelon();

        mainPanel.scrollTop = 0;

    });

    function initializeEchelon() {

        // Rebuild Lucide icons if your dashboard uses them
        if (window.lucide) {
            lucide.createIcons();
        }

        /*
         * Put your existing Echelon chart initialization
         * code here if you have any.
         *
         * Example:
         *
         * createAttackChart();
         * createLatencyChart();
         * createCreditChart();
         */

    }

});


document.addEventListener("DOMContentLoaded", () => {

    const openLanding = document.getElementById("openAquavision");
    const landingContainer = document.getElementById("landingContainer");

    openLanding.addEventListener("click", async () => {

        try {
            const response = await fetch("./Landing.html");

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const html = await response.text();

            landingContainer.innerHTML = html;

            // Important: convert data-lucide attributes into SVGs
            lucide.createIcons();

        } catch (error) {
            console.error("Failed to load Landing.html:", error);
        }

    });

});

