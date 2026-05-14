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
