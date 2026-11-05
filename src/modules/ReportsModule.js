// Módulo: Reportes de Ventas, Ingresos y Rendimiento de Taller (Multiservicios JSR)

import { getOrders, getInventory } from '../services/storage.js';
import { formatCurrency } from '../services/utils.js';

export function renderReportsModule(container) {
  const orders = getOrders();
  const inventory = getInventory();

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.estimatedCost || 0), 0);
  const totalPartsUsedCount = orders.reduce((sum, o) => sum + (o.usedParts ? o.usedParts.reduce((pSum, p) => pSum + p.qty, 0) : 0), 0);
  const avgOrderCost = orders.length > 0 ? totalRevenue / orders.length : 0;

  container.innerHTML = `
    <div class="reports-module">
      <div style="margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: 1.8rem; color: white;">📊 Módulo de Reportes & Analítica JSR</h1>
          <p style="color: var(--text-muted); font-size: 0.95rem;">
            Análisis financiero, rotación de repuestos e historial de ganancias de taller.
          </p>
        </div>

        <button class="btn btn-primary btn-sm" id="btn-print-report">
          🖨️ Imprimir Reporte Mensual
        </button>
      </div>

      <!-- Financial Metrics Grid -->
      <div class="grid-3" style="margin-bottom: 1.75rem;">
        <div class="glass-panel">
          <span style="color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">Ingresos Totales Acumulados</span>
          <h2 style="font-size: 2rem; color: var(--accent-green); margin-top: 0.3rem;">${formatCurrency(totalRevenue)}</h2>
        </div>
        <div class="glass-panel">
          <span style="color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">Repuestos Instalados</span>
          <h2 style="font-size: 2rem; color: var(--accent-cyan); margin-top: 0.3rem;">${totalPartsUsedCount} Piezas</h2>
        </div>
        <div class="glass-panel">
          <span style="color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">Ticket Promedio por Reparación</span>
          <h2 style="font-size: 2rem; color: white; margin-top: 0.3rem;">${formatCurrency(avgOrderCost)}</h2>
        </div>
      </div>

      <!-- Financial Breakdown Table -->
      <div class="glass-panel">
        <h3 style="color: white; font-size: 1.1rem; margin-bottom: 1rem;">
          Desglose Financiero por Orden de Servicio
        </h3>

        <div style="overflow-x: auto;">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Cliente</th>
                <th>Equipo</th>
                <th>Repuestos Instalados</th>
                <th>Costo Est. Servicio</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${orders.map(o => `
                <tr>
                  <td><strong style="color: var(--accent-cyan);">${o.id}</strong></td>
                  <td><strong style="color: white;">${o.customerName}</strong></td>
                  <td><span style="color: var(--text-muted);">${o.deviceModel}</span></td>
                  <td>
                    <span style="font-size: 0.8rem; color: var(--text-main);">
                      ${(o.usedParts || []).map(p => `${p.name} (x${p.qty})`).join(', ') || 'Sin repuestos adicionales'}
                    </span>
                  </td>
                  <td><strong style="color: var(--accent-green);">${formatCurrency(o.estimatedCost || 0)}</strong></td>
                  <td>
                    <span class="badge ${o.status === 'DIAGNOSTICO' ? 'badge-red' : o.status === 'REPARACION' ? 'badge-amber' : 'badge-green'}">
                      ${o.status}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  const printBtn = container.querySelector('#btn-print-report');
  if (printBtn) {
    printBtn.onclick = () => {
      window.print();
    };
  }
}
