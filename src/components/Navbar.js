// Componente Navbar - Navegación Principal Multiservicios JSR

import { renderProfileDropdown } from './ProfileDropdown.js';
import { renderNotificationsDropdown } from './NotificationsDropdown.js';

export function renderNavbar(activeModule = 'dashboard', onNavigate, onLogoutSuccess) {
  const navContainer = document.createElement('header');
  navContainer.className = 'navbar';
  
  navContainer.innerHTML = `
    <div class="navbar-container">
      <a href="#" class="brand-logo" id="brand-home">
        <div class="brand-icon">3D</div>
        <div class="brand-title">Multiservicios <span>JSR</span></div>
      </a>

      <nav>
        <ul class="nav-links">
          <li>
            <a href="#dashboard" class="nav-link ${activeModule === 'dashboard' ? 'active' : ''}" data-module="dashboard">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Inicio
            </a>
          </li>
          <li>
            <a href="#reception" class="nav-link ${activeModule === 'reception' ? 'active' : ''}" data-module="reception">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
              Recepción 3D
            </a>
          </li>
          <li>
            <a href="#workshop" class="nav-link ${activeModule === 'workshop' ? 'active' : ''}" data-module="workshop">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
              Taller & Despiece
            </a>
          </li>
          <li>
            <a href="#tracking" class="nav-link ${activeModule === 'tracking' ? 'active' : ''}" data-module="tracking">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
              Rastreo 3D
            </a>
          </li>
          <li>
            <a href="#inventory" class="nav-link ${activeModule === 'inventory' ? 'active' : ''}" data-module="inventory">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              Inventario & Órdenes
            </a>
          </li>
          <li>
            <a href="#reports" class="nav-link ${activeModule === 'reports' ? 'active' : ''}" data-module="reports">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              Reportes
            </a>
          </li>
          <li>
            <a href="#warranties" class="nav-link ${activeModule === 'warranties' ? 'active' : ''}" data-module="warranties">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              Garantías
            </a>
          </li>
        </ul>
      </nav>

      <!-- Right Slot for Notifications 🔔 and User Profile Dropdown -->
      <div id="navbar-profile-slot" style="display: flex; align-items: center;"></div>
    </div>
  `;

  // Attach nav event listeners
  navContainer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const moduleName = link.getAttribute('data-module');
      if (onNavigate) onNavigate(moduleName);
    });
  });

  const homeBtn = navContainer.querySelector('#brand-home');
  if (homeBtn) {
    homeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (onNavigate) onNavigate('dashboard');
    });
  }

  // Embed Notifications 🔔 & User Profile Dropdown
  const profileSlot = navContainer.querySelector('#navbar-profile-slot');
  if (profileSlot) {
    const notifElem = renderNotificationsDropdown();
    const dropdownElem = renderProfileDropdown(onNavigate, onLogoutSuccess);
    profileSlot.appendChild(notifElem);
    profileSlot.appendChild(dropdownElem);
  }

  return navContainer;
}
