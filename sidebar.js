// ─── Shared sidebar + mobile navigation ───────────────────────────────────────

const NAV_ITEMS = [
  { group: 'Utama' },
  { href: 'dashboard.html',         icon: '◈', label: 'Dashboard',        id: 'dashboard' },
  { group: 'Presensi' },
  { href: 'presensi-otomatis.html', icon: '⊙', label: 'Presensi Otomatis',id: 'presensi-otomatis', badge: 'NIS' },
  { href: 'presensi-manual.html',   icon: '✎', label: 'Presensi Manual',  id: 'presensi-manual' },
  { href: 'rekap-presensi.html',    icon: '▦', label: 'Rekap Harian',     id: 'rekap-presensi' },
  { group: 'Pelanggaran' },
  { href: 'catat-pelanggaran.html', icon: '⚠', label: 'Catat Pelanggaran',id: 'catat-pelanggaran' },
  { href: 'rekap-pelanggaran.html', icon: '▦', label: 'Rekap Pelanggaran',id: 'rekap-pelanggaran' },
  { group: 'Jadwal' },
  { href: 'jadwal-piket.html',      icon: '⊞', label: 'Jadwal Piket Guru',id: 'jadwal-piket' },
  { group: 'Admin', admin: true },
  { href: 'admin-guru.html',        icon: '◑', label: 'Data Guru',        id: 'admin-guru',    admin: true },
  { href: 'admin-murid.html',       icon: '◐', label: 'Data Murid',       id: 'admin-murid',   admin: true },
  { href: 'admin-session.html',     icon: '◎', label: 'Session Aktif',    id: 'admin-session', admin: true },
  { href: 'admin-kelas.html',       icon: '▣', label: 'Data Kelas',       id: 'admin-kelas',   admin: true },
  { group: 'Lainnya' },
  { href: 'about.html',             icon: '◉', label: 'About Developer',  id: 'about' },
];

// Bottom nav — 5 slots
const BOTTOM_NAV = [
  { href: 'dashboard.html',         icon: '◈', label: 'Dashboard',  id: 'dashboard' },
  { href: 'presensi-otomatis.html', icon: '⊙', label: 'Presensi',   id: 'presensi-otomatis' },
  { href: 'rekap-presensi.html',    icon: '▦', label: 'Rekap',      id: 'rekap-presensi' },
  { href: 'admin-guru.html',        icon: '◑', label: 'Admin',      id: 'admin-guru' },
  { href: 'about.html',             icon: '◉', label: 'About',      id: 'about' },
];

function renderSidebar(activePage) {
  const navHTML = NAV_ITEMS.map(item => {
    if (item.group) {
      const adminPill = item.admin
        ? `<span style="font-size:8px;background:rgba(232,64,64,0.15);color:#e84040;padding:1px 6px;border-radius:10px;margin-left:6px;font-weight:600;letter-spacing:0.5px;border:0.5px solid rgba(232,64,64,0.25)">ADMIN</span>`
        : '';
      return `<div class="nav-group-label">${item.group}${adminPill}</div>`;
    }
    const active = item.id === activePage ? ' active' : '';
    const badge  = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
    const adminDot = item.admin
      ? `<span style="width:5px;height:5px;border-radius:50%;background:#e84040;display:inline-block;margin-left:auto;flex-shrink:0"></span>`
      : '';
    return `<a href="${item.href}" class="nav-link${active}">
      <span class="nav-icon">${item.icon}</span>${item.label}${badge}${adminDot}
    </a>`;
  }).join('');

  const bnHTML = BOTTOM_NAV.map(item => {
    const active = item.id === activePage ? ' active' : '';
    return `<a href="${item.href}" class="bn-item${active}">
      <span class="bn-icon">${item.icon}</span>
      <span class="bn-label">${item.label}</span>
    </a>`;
  }).join('');

  return `
  <div class="sidebar-backdrop" id="sidebarBackdrop"></div>
  <aside class="sidebar" id="sidebar">
    <a href="dashboard.html" class="sidebar-logo">
      <div class="logo-mark">P</div>
      <div>
        <div class="logo-text-main">Presence</div>
        <div class="logo-text-sub">Presensi &amp; Pelanggaran</div>
      </div>
    </a>
    <div class="sidebar-user">
      <div class="user-row">
        <div class="user-avatar">BU</div>
        <div>
          <div class="user-name">Bu Sari Utami</div>
          <div class="user-role">Administrator</div>
        </div>
      </div>
      <div class="user-status">
        <div class="status-dot"></div>
        <span class="status-text">Sesi aktif</span>
        <span class="status-time">Login 07:12</span>
      </div>
    </div>
    <nav class="sidebar-nav">${navHTML}</nav>
    <div class="sidebar-logout">
      <a href="login.html" class="btn-logout">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5.5 2H3C2.4 2 2 2.4 2 3V11C2 11.6 2.4 12 3 12H5.5" stroke="#e84040" stroke-width="1.3" stroke-linecap="round"/>
          <path d="M9.5 9.5L12 7L9.5 4.5" stroke="#e84040" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5 7H12" stroke="#e84040" stroke-width="1.3" stroke-linecap="round"/>
        </svg>
        Keluar
      </a>
    </div>
  </aside>
  <nav class="bottom-nav">${bnHTML}</nav>`;
}

function renderTopbar(title, subtitle) {
  return `
  <div class="topbar">
    <div class="topbar-left">
      <button class="topbar-menu-btn" id="menuBtn" aria-label="Buka menu">&#9776;</button>
      <div>
        <div class="topbar-title">${title}</div>
        <div class="topbar-sub">${subtitle || 'Jumat, 17 April 2026'}</div>
      </div>
    </div>
    <div class="topbar-right">
      <span class="session-pill">&#9679; Sesi Aktif</span>
    </div>
  </div>`;
}

function initSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  const menuBtn  = document.getElementById('menuBtn');
  if (!sidebar || !backdrop || !menuBtn) return;

  function openSidebar()  { sidebar.classList.add('open');  backdrop.classList.add('show'); document.body.style.overflow = 'hidden'; }
  function closeSidebar() { sidebar.classList.remove('open'); backdrop.classList.remove('show'); document.body.style.overflow = ''; }

  menuBtn.addEventListener('click', openSidebar);
  backdrop.addEventListener('click', closeSidebar);
  sidebar.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => { if (window.innerWidth < 900) closeSidebar(); });
  });
}
