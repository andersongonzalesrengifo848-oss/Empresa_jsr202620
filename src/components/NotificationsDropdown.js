// Componente NotificationsDropdown - Centro de Notificaciones en vivo 🔔 (Multiservicios JSR)

import { getNotifications, markNotificationsRead } from '../services/storage.js';

export function renderNotificationsDropdown() {
  const container = document.createElement('div');
  container.className = 'notifications-dropdown-wrapper';
  container.style.cssText = 'position: relative; display: inline-block; margin-right: 0.5rem;';

  function render() {
    const notifications = getNotifications();
    const unreadCount = notifications.filter(n => !n.isRead).length;

    container.innerHTML = `
      <button type="button" id="btn-bell-toggle" style="
        position: relative;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid var(--border-glass);
        width: 38px;
        height: 38px;
        border-radius: var(--radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: white;
        transition: all var(--transition-fast);
      ">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        ${unreadCount > 0 ? `
          <span style="
            position: absolute;
            top: -2px;
            right: -2px;
            background: var(--accent-red);
            color: white;
            font-size: 0.65rem;
            font-weight: 700;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 8px var(--accent-red-glow);
            animation: pulseRed 2s infinite;
          ">${unreadCount}</span>
        ` : ''}
      </button>

      <!-- Dropdown Card -->
      <div id="notifications-panel" style="
        display: none;
        position: absolute;
        top: 120%;
        right: 0;
        width: 310px;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid var(--border-glass-glow);
        border-radius: var(--radius-md);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8), var(--shadow-glow);
        padding: 0.85rem;
        z-index: 1000;
        animation: fadeIn 0.2s ease-out;
      ">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 0.5rem; margin-bottom: 0.65rem;">
          <strong style="color: white; font-family: var(--font-heading); font-size: 0.9rem;">🔔 Notificaciones Recientes</strong>
          ${unreadCount > 0 ? `
            <button type="button" id="btn-mark-read" style="background: none; border: none; color: var(--accent-cyan); font-size: 0.725rem; cursor: pointer; font-weight: 600;">
              Marcar leídas
            </button>
          ` : ''}
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.55rem; max-height: 280px; overflow-y: auto;">
          ${notifications.length === 0 ? `
            <p style="color: var(--text-dim); font-size: 0.8rem; text-align: center; padding: 1rem 0;">No hay notificaciones recientes.</p>
          ` : notifications.map(n => `
            <div style="
              display: flex;
              gap: 0.6rem;
              padding: 0.55rem 0.65rem;
              background: ${n.isRead ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 229, 255, 0.06)'};
              border-left: 3px solid ${n.type === 'stock' ? '#ff9900' : n.type === 'ready' ? '#00ff9d' : '#00e5ff'};
              border-radius: var(--radius-sm);
            ">
              <span style="font-size: 1.1rem; line-height: 1;">${n.icon || '🔔'}</span>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <strong style="color: white; font-size: 0.8rem;">${n.title}</strong>
                  <span style="font-size: 0.65rem; color: var(--text-muted);">${n.timeAgo}</span>
                </div>
                <p style="color: var(--text-muted); font-size: 0.75rem; margin-top: 0.15rem; line-height: 1.25;">${n.message}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    const bellBtn = container.querySelector('#btn-bell-toggle');
    const panel = container.querySelector('#notifications-panel');

    bellBtn.onclick = (e) => {
      e.stopPropagation();
      const isVisible = panel.style.display === 'block';
      panel.style.display = isVisible ? 'none' : 'block';
    };

    document.addEventListener('click', () => {
      if (panel) panel.style.display = 'none';
    });

    const markBtn = container.querySelector('#btn-mark-read');
    if (markBtn) {
      markBtn.onclick = (e) => {
        e.stopPropagation();
        markNotificationsRead();
        render();
      };
    }
  }

  render();
  return container;
}
