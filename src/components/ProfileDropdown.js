// Componente ProfileDropdown - Menú Desplegable de Usuario (Inspirado en la Interfaz solicitada)

import { getCurrentUser, logout } from '../services/auth.js';

export function renderProfileDropdown(onNavigate, onLogoutSuccess) {
  const currentUser = getCurrentUser();
  if (!currentUser) return document.createElement('div');

  const wrapper = document.createElement('div');
  wrapper.className = 'profile-dropdown-wrapper';
  wrapper.style.cssText = 'position: relative; display: inline-block;';

  wrapper.innerHTML = `
    <button type="button" id="btn-avatar-menu" style="
      display: flex;
      align-items: center;
      gap: 0.6rem;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--border-glass);
      padding: 0.35rem 0.75rem;
      border-radius: var(--radius-full);
      cursor: pointer;
      color: white;
      transition: all var(--transition-fast);
    ">
      <img src="${currentUser.avatarUrl}" alt="Avatar" style="width: 28px; height: 28px; border-radius: 50%; background: var(--accent-cyan);">
      <span style="font-family: var(--font-heading); font-weight: 600; font-size: 0.85rem; max-width: 110px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        ${currentUser.username}
      </span>
      <span style="font-size: 0.7rem; color: var(--text-muted);">▼</span>
    </button>

    <!-- Dropdown Menu Box (Inspired by the GitHub-style requested design) -->
    <div id="avatar-dropdown-menu" style="
      display: none;
      position: absolute;
      top: 120%;
      right: 0;
      width: 240px;
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--border-glass-glow);
      border-radius: var(--radius-md);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7), var(--shadow-glow);
      padding: 0.6rem 0;
      z-index: 1000;
      animation: fadeIn 0.2s ease-out;
    ">
      <!-- User Info Header -->
      <div style="padding: 0.6rem 1rem 0.8rem 1rem; border-bottom: 1px solid var(--border-glass);">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <img src="${currentUser.avatarUrl}" style="width: 34px; height: 34px; border-radius: 50%; background: var(--accent-cyan);">
          <div style="overflow: hidden;">
            <strong style="color: white; font-size: 0.875rem; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              ${currentUser.fullName}
            </strong>
            <span class="badge ${currentUser.role === 'ADMIN' ? 'badge-cyan' : 'badge-green'}" style="font-size: 0.65rem; padding: 0.15rem 0.45rem;">
              ${currentUser.role}
            </span>
          </div>
        </div>
      </div>

      <!-- Menu Links -->
      <div style="display: flex; flex-direction: column; padding: 0.35rem 0;">
        <button class="dropdown-item-btn" id="menu-btn-profile">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          Mi Perfil
        </button>

        <button class="dropdown-item-btn" id="menu-btn-users">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          Registro de Usuarios
        </button>

        <button class="dropdown-item-btn" id="menu-btn-settings">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          Configuración
        </button>
      </div>

      <div style="border-top: 1px solid var(--border-glass); padding-top: 0.35rem;">
        <button class="dropdown-item-btn" id="menu-btn-logout" style="color: #ff3366;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          Cerrar Sesión
        </button>
      </div>
    </div>
  `;

  // Apply CSS styles for dropdown items
  const styleElem = document.createElement('style');
  styleElem.textContent = `
    .dropdown-item-btn {
      width: 100%;
      text-align: left;
      background: transparent;
      border: none;
      color: var(--text-main);
      padding: 0.55rem 1rem;
      font-family: var(--font-heading);
      font-size: 0.85rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    .dropdown-item-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      color: var(--accent-cyan);
    }
  `;
  wrapper.appendChild(styleElem);

  // Toggle Dropdown
  const avatarBtn = wrapper.querySelector('#btn-avatar-menu');
  const dropdownMenu = wrapper.querySelector('#avatar-dropdown-menu');

  avatarBtn.onclick = (e) => {
    e.stopPropagation();
    const isVisible = dropdownMenu.style.display === 'block';
    dropdownMenu.style.display = isVisible ? 'none' : 'block';
  };

  document.addEventListener('click', () => {
    if (dropdownMenu) dropdownMenu.style.display = 'none';
  });

  // Attach Menu Button Handlers
  wrapper.querySelector('#menu-btn-users').onclick = () => {
    if (onNavigate) onNavigate('users');
  };

  wrapper.querySelector('#menu-btn-settings').onclick = () => {
    if (onNavigate) onNavigate('settings');
  };

  wrapper.querySelector('#menu-btn-profile').onclick = () => {
    if (onNavigate) onNavigate('users');
  };

  wrapper.querySelector('#menu-btn-logout').onclick = () => {
    logout();
    if (onLogoutSuccess) onLogoutSuccess();
  };

  return wrapper;
}
