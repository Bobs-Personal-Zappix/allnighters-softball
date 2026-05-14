/* =============================================
   ALLNIGHTERS SOFTBALL - Shared Utilities
   ============================================= */

// ── Navigation Setup ────────────────────────
function initNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }
  // Highlight active page
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path) a.classList.add('active');
  });
}

// ── Sponsors Bar ────────────────────────────
async function loadSponsors(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  try {
    const res  = await fetch('/data/sponsors.json');
    const data = await res.json();
    container.innerHTML = data.sponsors.map(s => {
      if (s.placeholder) {
        return `<div class="sponsor-placeholder">Your Logo Here</div>`;
      }
      return `
        <a href="${s.url}" target="_blank" rel="noopener"
           class="sponsor-item${s.dark_logo ? ' dark-logo' : ''}" title="${s.name}">
          <img src="${s.logo}" alt="${s.name}" loading="lazy">
        </a>`;
    }).join('');
  } catch (e) {
    console.warn('Could not load sponsors:', e);
  }
}

// ── Date Helpers ─────────────────────────────
function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateShort(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function isToday(dateStr) {
  const today = new Date();
  const [y, m, d] = dateStr.split('-').map(Number);
  return today.getFullYear() === y && today.getMonth() === m - 1 && today.getDate() === d;
}

function isPast(dateStr) {
  const today = new Date();
  today.setHours(0,0,0,0);
  const [y, m, d] = dateStr.split('-').map(Number);
  const gameDate = new Date(y, m - 1, d);
  return gameDate < today;
}

function isUpcoming(dateStr) {
  return !isPast(dateStr) && !isToday(dateStr);
}

// ── Calculate Batting Average ────────────────
function calcBA(hits, atBats) {
  if (!atBats || atBats === 0) return '.000';
  const avg = hits / atBats;
  return '.' + Math.round(avg * 1000).toString().padStart(3, '0');
}

// ── Spinner / Loading ────────────────────────
function showLoading(containerId, msg = 'Loading...') {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = `<div class="loading"><div class="spinner"></div>${msg}</div>`;
}

function showError(containerId, msg = 'Could not load data.') {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = `<div class="loading">${msg}</div>`;
}

// ── Init on DOM ready ────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
});
// ── VAPI Voice Assistant ─────────────────────
function initVoiceAssistant() {
  const VAPI_KEY       = '387fdeb5-3789-4fe1-bb7b-205e5f6e6949'; // ← We'll fill this in next
  const ASSISTANT_ID   = '3201c158-3daa-4efa-89bb-3f11642165ed';

  // Inject VAPI script
  const script = document.createElement('script');
  script.src = 'hhttps://unpkg.com/@vapi-ai/web@latest/dist/vapi.umd.js';
  script.onload = () => {
    const vapi = new window.Vapi(VAPI_KEY);
    let isCallActive = false;

    // Create floating button
    const btn = document.createElement('div');
    btn.id = 'vapiBtn';
    btn.innerHTML = `
      <div id="vapiBtnInner" title="Talk to Nighty — Allnighters AI Assistant" style="
        position:fixed;
        bottom:2rem;
        right:2rem;
        width:64px;
        height:64px;
        border-radius:50%;
        background:var(--gold);
        border:3px solid #8a6e28;
        display:flex;
        align-items:center;
        justify-content:center;
        cursor:pointer;
        z-index:9999;
        box-shadow:0 4px 20px rgba(201,168,76,0.4);
        transition:all 0.25s ease;
        flex-direction:column;
        gap:2px;
      ">
        <span style="font-size:1.6rem;line-height:1;">⚾</span>
        <span style="font-size:0.5rem;font-family:'Oswald',sans-serif;font-weight:700;color:#080808;letter-spacing:0.08em;text-transform:uppercase;">NIGHTY</span>
      </div>
      <div id="vapiTooltip" style="
        position:fixed;
        bottom:7.5rem;
        right:2rem;
        background:var(--card);
        border:1px solid var(--gold-dark);
        border-radius:8px;
        padding:0.6rem 1rem;
        font-family:'Oswald',sans-serif;
        font-size:0.78rem;
        color:var(--gold);
        letter-spacing:0.08em;
        text-transform:uppercase;
        white-space:nowrap;
        display:none;
        z-index:9998;
        pointer-events:none;
      ">Ask Nighty ⚾</div>
      <div id="vapiStatus" style="
        position:fixed;
        bottom:6.5rem;
        right:1rem;
        background:var(--card);
        border:1px solid var(--gold-dark);
        border-radius:8px;
        padding:0.75rem 1.25rem;
        font-family:'Oswald',sans-serif;
        font-size:0.8rem;
        color:var(--text);
        letter-spacing:0.06em;
        display:none;
        z-index:9998;
        text-align:center;
        min-width:180px;
      ">Connecting...</div>`;
    document.body.appendChild(btn);

    const btnInner  = document.getElementById('vapiBtnInner');
    const tooltip   = document.getElementById('vapiTooltip');
    const statusBox = document.getElementById('vapiStatus');

    // Hover tooltip
    btnInner.addEventListener('mouseenter', () => {
      if (!isCallActive) tooltip.style.display = 'block';
    });
    btnInner.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });

    // Click to start/stop
    btnInner.addEventListener('click', async () => {
      tooltip.style.display = 'none';
      if (!isCallActive) {
        btnInner.style.background = '#e8c970';
        btnInner.innerHTML = `<span style="font-size:1.4rem;line-height:1;">🎙️</span><span style="font-size:0.5rem;font-family:'Oswald',sans-serif;font-weight:700;color:#080808;letter-spacing:0.08em;text-transform:uppercase;">LIVE</span>`;
        btnInner.style.boxShadow = '0 0 0 6px rgba(201,168,76,0.3), 0 4px 20px rgba(201,168,76,0.5)';
        statusBox.style.display = 'block';
        statusBox.innerHTML = '🎙️ Connecting to Nighty...';
        try {
          await vapi.start(ASSISTANT_ID);
        } catch(e) {
          statusBox.innerHTML = '❌ Could not connect. Try again.';
          setTimeout(() => { statusBox.style.display = 'none'; resetBtn(); }, 3000);
        }
      } else {
        vapi.stop();
      }
    });

    // VAPI events
    vapi.on('call-start', () => {
      isCallActive = true;
      statusBox.innerHTML = '🎙️ Nighty is listening...';
      animateBtn();
    });

    vapi.on('speech-start', () => {
      statusBox.innerHTML = '💬 Nighty is speaking...';
    });

    vapi.on('speech-end', () => {
      statusBox.innerHTML = '🎙️ Nighty is listening...';
    });

    vapi.on('call-end', () => {
      isCallActive = false;
      statusBox.innerHTML = '✅ Call ended. Go Allnighters! ⚾';
      setTimeout(() => { statusBox.style.display = 'none'; }, 3000);
      resetBtn();
    });

    vapi.on('error', () => {
      isCallActive = false;
      statusBox.innerHTML = '❌ Something went wrong. Try again.';
      setTimeout(() => { statusBox.style.display = 'none'; }, 3000);
      resetBtn();
    });

    function resetBtn() {
      btnInner.style.background = 'var(--gold)';
      btnInner.style.boxShadow = '0 4px 20px rgba(201,168,76,0.4)';
      btnInner.innerHTML = `<span style="font-size:1.6rem;line-height:1;">⚾</span><span style="font-size:0.5rem;font-family:'Oswald',sans-serif;font-weight:700;color:#080808;letter-spacing:0.08em;text-transform:uppercase;">NIGHTY</span>`;
    }

    function animateBtn() {
      if (!isCallActive) return;
      btnInner.style.transform = 'scale(1.05)';
       setTimeout(() => {
        btnInner.style.transform = 'scale(1)';
        setTimeout(animateBtn, 1000);
      }, 500);
    }
  };
  document.head.appendChild(script);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVoiceAssistant);
} else {
  initVoiceAssistant();
}
