// Módulo 4: Motor de Garantías & Notificaciones Preventivas (6 Meses)

import { getOrders } from '../services/storage.js';
import { formatDate, calculateDaysRemaining } from '../services/utils.js';

export function renderWarrantyModule(container) {
  const orders = getOrders();
  
  // Delivered orders with active warranties or preventive maintenance
  const activeWarranties = orders.filter(o => o.status === 'LISTO' || o.deliveredAt);

  container.innerHTML = `
    <div class="warranty-module">
      <div style="margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: 1.8rem; color: white;">Módulo 4: Motor de Garantías & Alertas Preventivas</h1>
          <p style="color: var(--text-muted); font-size: 0.95rem;">
            Control de garantías de servicio y programación de mantenimientos preventivos a los 6 meses.
          </p>
        </div>
        <div class="badge badge-green" style="font-size: 0.9rem; padding: 0.4rem 0.9rem;">
          🛡️ ${activeWarranties.length} GARANTÍ AS ACTIVAS
        </div>
      </div>

      <div class="grid-2" style="margin-bottom: 2rem;">
        <!-- Card 1: Garantías de Reparación -->
        <div class="glass-panel">
          <h3 style="color: var(--accent-green); font-size: 1.15rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            🛡️ Control de Garantías por Servicio
          </h3>

          <div style="display: flex; flex-direction: column; gap: 0.85rem;">
            ${activeWarranties.length === 0 ? `
              <p style="color: var(--text-dim); font-size: 0.875rem;">No hay garantias registradas aún.</p>
            ` : activeWarranties.map(o => {
              const deliveryDate = o.deliveredAt || o.createdAt;
              const targetDate = new Date(new Date(deliveryDate).getTime() + (o.warrantyDays || 60) * 24 * 60 * 60 * 1000).toISOString();
              const daysLeft = calculateDaysRemaining(targetDate);
              const progressPct = Math.max(0, Math.min(100, (daysLeft / (o.warrantyDays || 60)) * 100));

              return `
                <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); padding: 0.85rem; border-radius: var(--radius-sm);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                    <strong style="color: white;">${o.customerName} - Ticket ${o.id}</strong>
                    <span class="badge ${daysLeft > 15 ? 'badge-green' : 'badge-amber'}">
                      ${daysLeft > 0 ? `${daysLeft} Días Restantes` : 'Vencida'}
                    </span>
                  </div>
                  <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">
                    Equipo: ${o.deviceModel} | Garantía: ${o.warrantyDays || 60} Días
                  </p>

                  <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                    <div style="height: 100%; width: ${progressPct}%; background: ${daysLeft > 15 ? 'var(--accent-green)' : 'var(--accent-amber)'}; transition: width 0.3s;"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Card 2: Alertas Automáticas de 6 Meses -->
        <div class="glass-panel">
          <h3 style="color: var(--accent-cyan); font-size: 1.15rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            🔔 Avisos Automáticos a los 6 Meses (Limpieza Térmica)
          </h3>

          <div style="display: flex; flex-direction: column; gap: 0.85rem;">
            ${activeWarranties.map(o => {
              const maintDateStr = o.nextMaintenanceDate || new Date(new Date(o.createdAt).getTime() + 180 * 24 * 60 * 60 * 1000).toISOString();
              const daysToMaint = calculateDaysRemaining(maintDateStr);

              return `
                <div style="background: rgba(0, 229, 255, 0.04); border: 1px solid rgba(0, 229, 255, 0.2); padding: 0.85rem; border-radius: var(--radius-sm);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                    <strong style="color: white;">${o.customerName}</strong>
                    <span class="badge badge-cyan">${daysToMaint > 0 ? `En ${daysToMaint} Días` : '¡Programado Hoy!'}</span>
                  </div>
                  <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.6rem;">
                    Mantenimiento Preventivo Sugerido: <strong>Limpieza de Fans + Cambio de Pasta Térmica Arctic MX-4</strong>.
                  </p>

                  <button class="btn btn-secondary btn-sm send-whatsapp-btn" data-phone="${o.customerPhone}" data-name="${o.customerName}" data-model="${o.deviceModel}" style="width: 100%; font-size: 0.8rem; color: var(--accent-green);">
                    📱 Simular Envío de Mensaje por WhatsApp
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  // WhatsApp simulate handler
  container.querySelectorAll('.send-whatsapp-btn').forEach(btn => {
    btn.onclick = () => {
      const name = btn.getAttribute('data-name');
      const model = btn.getAttribute('data-model');
      const phone = btn.getAttribute('data-phone');

      const message = `Hola ${name}, desde Multiservicios JSR recordamos que tu laptop ${model} ya cumplió 6 meses desde su mantenimiento. ¡Aprovecha un 20% Dcto en tu Mantenimiento Térmico Preventivo para evitar sobrecalentamiento!`;
      
      const encodedMsg = encodeURIComponent(message);
      const waUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodedMsg}`;
      window.open(waUrl, '_blank');
    };
  });
}
