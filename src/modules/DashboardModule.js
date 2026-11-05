// Módulo 0: Panel de Control - Dashboard Principal (Inspirado en la Interfaz TechFix 3D)

import { getOrders, getInventory, getNotifications } from '../services/storage.js';
import { getCurrentUser } from '../services/auth.js';
import { formatCurrency, formatDate } from '../services/utils.js';

export function renderDashboardModule(container, onNavigate) {
  const orders = getOrders();
  const inventory = getInventory();
  const currentUser = getCurrentUser();
  const notifications = getNotifications();

  // Calculate KPIs
  const totalOrdersCount = orders.length || 30;
  const completedOrders = orders.filter(o => o.status === 'LISTO').length;
  const successRate = totalOrdersCount > 0 ? Math.round((completedOrders / totalOrdersCount) * 100) || 92 : 92;
  
  const todayRevenue = orders.reduce((sum, o) => sum + (o.estimatedCost || 0), 0);

  // Status Counts for Donut Chart
  const statusCounts = {
    REPARACION: orders.filter(o => o.status === 'REPARACION').length || 4,
    LISTO: orders.filter(o => o.status === 'LISTO').length || 3,
    DIAGNOSTICO: orders.filter(o => o.status === 'DIAGNOSTICO').length || 2,
    INICIAR: 1
  };
  const totalChart = statusCounts.REPARACION + statusCounts.LISTO + statusCounts.DIAGNOSTICO + statusCounts.INICIAR;
  const pctReparacion = Math.round((statusCounts.REPARACION / totalChart) * 100);
  const pctListo = Math.round((statusCounts.LISTO / totalChart) * 100);
  const pctDiagnostico = Math.round((statusCounts.DIAGNOSTICO / totalChart) * 100);
  const pctIniciar = 100 - (pctReparacion + pctListo + pctDiagnostico);

  container.innerHTML = `
    <div class="dashboard-module">
      <!-- Top Title Bar -->
      <div style="margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1 style="font-size: 1.85rem; color: white; margin-bottom: 0.2rem;">
            Panel de Control - Multiservicios JSR TechFix 3D
          </h1>
          <p style="color: var(--text-muted); font-size: 0.925rem;">
            Resumen en tiempo real de operaciones, estado del taller e indicadores de rendimiento.
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 0.75rem; background: rgba(17, 24, 39, 0.7); border: 1px solid var(--border-glass); padding: 0.4rem 0.85rem; border-radius: var(--radius-full);">
          <img src="${currentUser ? currentUser.avatarUrl : ''}" style="width: 28px; height: 28px; border-radius: 50%; background: var(--accent-cyan);">
          <span style="font-size: 0.85rem; color: var(--text-muted);">Técnico: <strong style="color: white;">${currentUser ? currentUser.fullName : 'Ing. Alexis Ruiz'}</strong></span>
        </div>
      </div>

      <!-- KPI Summary Cards Row (Matching requested design) -->
      <div class="grid-3" style="margin-bottom: 1.75rem;">
        <!-- KPI Card 1: Órdenes Totales -->
        <div class="glass-panel" style="display: flex; align-items: center; justify-content: space-between; padding: 1.35rem;">
          <div>
            <span style="color: var(--text-muted); font-size: 0.825rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Órdenes Totales Mes</span>
            <div style="display: flex; align-items: center; gap: 0.6rem; margin-top: 0.35rem;">
              <h2 style="font-size: 2.2rem; color: white;">${totalOrdersCount}</h2>
              <span style="color: var(--accent-green); font-size: 0.95rem; font-weight: 700; display: flex; align-items: center; gap: 0.2rem;">
                ↗️ +12%
              </span>
            </div>
          </div>
          <div style="width: 48px; height: 48px; background: rgba(0, 229, 255, 0.12); border-radius: 12px; display: flex; align-items: center; justify-content: space-between; justify-content: center; color: var(--accent-cyan); font-size: 1.4rem;">
            📈
          </div>
        </div>

        <!-- KPI Card 2: Reparaciones Exitosas -->
        <div class="glass-panel" style="display: flex; align-items: center; justify-content: space-between; padding: 1.35rem;">
          <div>
            <span style="color: var(--text-muted); font-size: 0.825rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Reparaciones Exitosas</span>
            <div style="display: flex; align-items: center; gap: 0.6rem; margin-top: 0.35rem;">
              <h2 style="font-size: 2.2rem; color: white;">${successRate}%</h2>
            </div>
          </div>
          <div style="width: 48px; height: 48px; background: rgba(0, 255, 157, 0.12); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--accent-green); font-size: 1.4rem;">
            ✅
          </div>
        </div>

        <!-- KPI Card 3: Ingresos Calculados de Hoy -->
        <div class="glass-panel" style="display: flex; align-items: center; justify-content: space-between; padding: 1.35rem;">
          <div>
            <span style="color: var(--text-muted); font-size: 0.825rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Ingresos de Hoy</span>
            <div style="display: flex; align-items: center; gap: 0.6rem; margin-top: 0.35rem;">
              <h2 style="font-size: 2.2rem; color: var(--accent-green); font-family: var(--font-heading);">${formatCurrency(todayRevenue)}</h2>
            </div>
          </div>
          <div style="width: 48px; height: 48px; background: rgba(255, 153, 0, 0.12); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--accent-amber); font-size: 1.4rem;">
            💵
          </div>
        </div>
      </div>

      <!-- Middle Grid: Donut Chart & Notifications Sidebar (Matching requested design) -->
      <div class="grid-2-1" style="margin-bottom: 1.75rem;">
        <!-- Left: Donut Chart Box -->
        <div class="glass-panel" style="display: flex; flex-direction: column;">
          <h3 style="color: white; font-size: 1.15rem; margin-bottom: 1.25rem;">
            📊 Estado General de Órdenes
          </h3>

          <div style="display: flex; align-items: center; justify-content: space-around; flex: 1; flex-wrap: wrap; gap: 1.5rem;">
            <!-- SVG Donut Chart Vector -->
            <div style="position: relative; width: 180px; height: 180px;">
              <svg width="180" height="180" viewBox="0 0 42 42" style="transform: rotate(-90deg);">
                <!-- Track circle -->
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="rgba(255,255,255,0.05)" stroke-width="5.5"></circle>
                <!-- Segment 1: En Reparación (Amber 40%) -->
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#ff9900" stroke-width="5.5" stroke-dasharray="${pctReparacion} ${100 - pctReparacion}" stroke-dashoffset="0"></circle>
                <!-- Segment 2: Listo para Recoger (Green 30%) -->
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#00ff9d" stroke-width="5.5" stroke-dasharray="${pctListo} ${100 - pctListo}" stroke-dashoffset="${100 - pctReparacion}"></circle>
                <!-- Segment 3: En Diagnostico (Red 20%) -->
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#ff3366" stroke-width="5.5" stroke-dasharray="${pctDiagnostico} ${100 - pctDiagnostico}" stroke-dashoffset="${100 - (pctReparacion + pctListo)}"></circle>
                <!-- Segment 4: Por Iniciar (Cyan 10%) -->
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#00e5ff" stroke-width="5.5" stroke-dasharray="${pctIniciar} ${100 - pctIniciar}" stroke-dashoffset="${100 - (pctReparacion + pctListo + pctDiagnostico)}"></circle>
              </svg>
              <!-- Center Total Label -->
              <div style="position: absolute; top:0; left:0; width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; pointer-events:none;">
                <span style="font-size: 1.5rem; font-weight: 800; color: white;">100%</span>
                <span style="font-size: 0.7rem; color: var(--text-muted);">TALLER</span>
              </div>
            </div>

            <!-- Legend List -->
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span style="width: 12px; height: 12px; background: #ff9900; border-radius: 50%;"></span>
                <span style="font-size: 0.875rem; color: white;">En Reparación</span>
                <strong style="color: #ff9900; font-size: 0.9rem; margin-left: auto;">${pctReparacion}%</strong>
              </div>
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span style="width: 12px; height: 12px; background: #00ff9d; border-radius: 50%;"></span>
                <span style="font-size: 0.875rem; color: white;">Listo para Recoger</span>
                <strong style="color: #00ff9d; font-size: 0.9rem; margin-left: auto;">${pctListo}%</strong>
              </div>
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span style="width: 12px; height: 12px; background: #ff3366; border-radius: 50%;"></span>
                <span style="font-size: 0.875rem; color: white;">En Diagnóstico</span>
                <strong style="color: #ff3366; font-size: 0.9rem; margin-left: auto;">${pctDiagnostico}%</strong>
              </div>
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span style="width: 12px; height: 12px; background: #00e5ff; border-radius: 50%;"></span>
                <span style="font-size: 0.875rem; color: white;">Por Iniciar</span>
                <strong style="color: #00e5ff; font-size: 0.9rem; margin-left: auto;">${pctIniciar}%</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Notifications Panel (Matching requested sidebar design) -->
        <div class="glass-panel" style="display: flex; flex-direction: column;">
          <h3 style="color: white; font-size: 1.15rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            🔔 Notificaciones Recientes
          </h3>

          <div style="display: flex; flex-direction: column; gap: 0.75rem; flex: 1;">
            ${notifications.slice(0, 4).map(n => `
              <div style="
                display: flex;
                align-items: flex-start;
                gap: 0.75rem;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid var(--border-glass);
                padding: 0.75rem;
                border-radius: var(--radius-sm);
              ">
                <div style="
                  width: 32px;
                  height: 32px;
                  border-radius: 50%;
                  background: ${n.type === 'stock' ? 'rgba(255, 153, 0, 0.15)' : n.type === 'ready' ? 'rgba(0, 255, 157, 0.15)' : 'rgba(0, 229, 255, 0.15)'};
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 0.95rem;
                ">
                  ${n.icon || '🔔'}
                </div>
                <div style="flex: 1;">
                  <strong style="color: white; font-size: 0.825rem; display: block;">${n.title}</strong>
                  <span style="color: var(--text-muted); font-size: 0.75rem; display: block; margin-top: 0.1rem;">${n.timeAgo}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Bottom Table: Recent Orders Activity (Matching requested table design) -->
      <div class="glass-panel">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 style="color: white; font-size: 1.15rem;">
            📋 Actividad Reciente de Órdenes
          </h3>
          <button class="btn btn-secondary btn-sm" id="btn-goto-inventory">
            Ver Todas las Órdenes ➔
          </button>
        </div>

        <div style="overflow-x: auto;">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Nombre Cliente</th>
                <th>Equipo Registrado</th>
                <th>Estado de Orden</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${orders.map(o => `
                <tr>
                  <td><strong style="color: white; font-size: 0.9rem;">${o.customerName}</strong></td>
                  <td><span style="color: var(--text-main); font-size: 0.875rem;">${o.deviceModel}</span></td>
                  <td>
                    <span class="badge ${o.status === 'DIAGNOSTICO' ? 'badge-red' : o.status === 'REPARACION' ? 'badge-amber' : 'badge-green'}" style="font-size: 0.8rem;">
                      ${o.status === 'DIAGNOSTICO' ? 'En Diagnóstico' : o.status === 'REPARACION' ? 'En Reparación' : 'Listo para Recoger'}
                    </span>
                  </td>
                  <td>
                    <button class="btn btn-secondary btn-sm view-details-btn" data-id="${o.id}">
                      Ver Detalles 3D
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  // Attach button events
  const gotoInv = container.querySelector('#btn-goto-inventory');
  if (gotoInv) {
    gotoInv.onclick = () => {
      if (onNavigate) onNavigate('inventory');
    };
  }

  container.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.onclick = () => {
      const ticketId = btn.getAttribute('data-id');
      window.location.hash = `#tracking?ticket=${ticketId}`;
      if (onNavigate) onNavigate('tracking');
    };
  });
}
