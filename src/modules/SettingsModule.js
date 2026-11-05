// Módulo: Configuración del Sistema JSR (Multiservicios JSR)

import { getSettings, saveSettings } from '../services/auth.js';

export function renderSettingsModule(container) {
  const settings = getSettings();

  container.innerHTML = `
    <div class="settings-module">
      <div style="margin-bottom: 1.5rem;">
        <h1 style="font-size: 1.8rem; color: white;">⚙️ Configuración General del Sistema</h1>
        <p style="color: var(--text-muted); font-size: 0.95rem;">
          Ajustes de datos de la tienda, parámetros de comprobante PDF y tarifas base de Multiservicios JSR.
        </p>
      </div>

      <div class="grid-2">
        <!-- Settings Form Card 1 -->
        <div class="glass-panel">
          <h3 style="color: var(--accent-cyan); font-size: 1.15rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border-glass); padding-bottom: 0.5rem;">
            🏢 Datos Comerciales & Empresa
          </h3>

          <form id="settings-company-form" style="display: flex; flex-direction: column; gap: 0.85rem;">
            <div class="form-group" style="margin: 0;">
              <label class="form-label">Nombre Comercial de la Empresa</label>
              <input type="text" id="set-company" class="form-control" value="${settings.companyName || ''}" required>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
              <div class="form-group" style="margin: 0;">
                <label class="form-label">RUC de la Tienda</label>
                <input type="text" id="set-ruc" class="form-control" value="${settings.ruc || ''}" required>
              </div>
              <div class="form-group" style="margin: 0;">
                <label class="form-label">Teléfono de Atención</label>
                <input type="text" id="set-phone" class="form-control" value="${settings.phone || ''}" required>
              </div>
            </div>

            <div class="form-group" style="margin: 0;">
              <label class="form-label">Dirección Física del Local</label>
              <input type="text" id="set-address" class="form-control" value="${settings.address || ''}" required>
            </div>

            <div class="form-group" style="margin: 0;">
              <label class="form-label">Correo Electrónico de Contacto</label>
              <input type="email" id="set-email" class="form-control" value="${settings.email || ''}" required>
            </div>

            <button type="submit" class="btn btn-primary" style="margin-top: 0.75rem;">
              💾 Guardar Datos Comerciales
            </button>
          </form>
        </div>

        <!-- Settings Form Card 2 -->
        <div class="glass-panel">
          <h3 style="color: var(--accent-green); font-size: 1.15rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border-glass); padding-bottom: 0.5rem;">
            ⚙️ Tarifas & Parámetros de Taller
          </h3>

          <form id="settings-taller-form" style="display: flex; flex-direction: column; gap: 0.85rem;">
            <div class="form-group" style="margin: 0;">
              <label class="form-label">Costo Base de Diagnóstico (S/)</label>
              <input type="number" id="set-diag-fee" class="form-control" value="${settings.baseDiagnosticFee || 80}" step="5" required>
            </div>

            <div class="form-group" style="margin: 0;">
              <label class="form-label">Garantía Estándar por Reparación (Días)</label>
              <input type="number" id="set-warranty-days" class="form-control" value="${settings.defaultWarrantyDays || 90}" step="15" required>
            </div>

            <div class="form-group" style="margin: 0;">
              <label class="form-label">Frecuencia de Mantenimiento Preventivo (Meses)</label>
              <input type="number" id="set-maint-months" class="form-control" value="${settings.preventiveMaintenanceMonths || 6}" step="1" required>
            </div>

            <div class="form-group" style="margin: 0;">
              <label class="form-label">Tema Visual del Sistema</label>
              <select id="set-theme" class="form-control">
                <option value="cyber-dark" ${settings.themeMode === 'cyber-dark' ? 'selected' : ''}>🌌 Cyber Dark Glassmorphism (Recomendado)</option>
                <option value="neon-blue" ${settings.themeMode === 'neon-blue' ? 'selected' : ''}>⚡ Neon Cyan High Tech</option>
              </select>
            </div>

            <button type="submit" class="btn btn-success" style="margin-top: 0.75rem;">
              💾 Guardar Parámetros de Taller
            </button>
          </form>
        </div>
      </div>
    </div>
  `;

  // Submit Handlers
  const compForm = container.querySelector('#settings-company-form');
  compForm.onsubmit = (e) => {
    e.preventDefault();
    const newCompData = {
      companyName: container.querySelector('#set-company').value.trim(),
      ruc: container.querySelector('#set-ruc').value.trim(),
      phone: container.querySelector('#set-phone').value.trim(),
      address: container.querySelector('#set-address').value.trim(),
      email: container.querySelector('#set-email').value.trim()
    };
    saveSettings(newCompData);
    alert('¡Datos comerciales actualizados exitosamente!');
  };

  const tallerForm = container.querySelector('#settings-taller-form');
  tallerForm.onsubmit = (e) => {
    e.preventDefault();
    const newTallerData = {
      baseDiagnosticFee: parseFloat(container.querySelector('#set-diag-fee').value) || 80,
      defaultWarrantyDays: parseInt(container.querySelector('#set-warranty-days').value) || 90,
      preventiveMaintenanceMonths: parseInt(container.querySelector('#set-maint-months').value) || 6,
      themeMode: container.querySelector('#set-theme').value
    };
    saveSettings(newTallerData);
    alert('¡Parámetros de taller actualizados exitosamente!');
  };
}
