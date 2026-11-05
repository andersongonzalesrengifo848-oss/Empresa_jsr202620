// Módulo 5: Dashboard de Administración de Órdenes e Inventario (Multiservicios JSR)

import { getInventory, getOrders, updateOrderStatus, saveInventoryItem } from '../services/storage.js';
import { generateTicketPDF } from '../components/TicketPDFGenerator.js';
import { formatCurrency, formatDate } from '../services/utils.js';

export function renderInventoryModule(container) {
  let activeTab = 'orders'; // 'orders' or 'inventory'

  function renderContent() {
    const orders = getOrders();
    const inventory = getInventory();

    container.innerHTML = `
      <div class="inventory-module">
        <div style="margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <h1 style="font-size: 1.8rem; color: white;">Módulo 5: Administración de Órdenes & Stock</h1>
            <p style="color: var(--text-muted); font-size: 0.95rem;">
              Control global de reparaciones, estados de taller y catálogo de repuestos.
            </p>
          </div>

          <div style="display: flex; gap: 0.5rem; background: rgba(17, 24, 39, 0.8); padding: 0.35rem; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">
            <button class="btn btn-sm ${activeTab === 'orders' ? 'btn-primary' : 'btn-secondary'}" id="tab-orders">
              📋 Órdenes de Servicio (${orders.length})
            </button>
            <button class="btn btn-sm ${activeTab === 'inventory' ? 'btn-primary' : 'btn-secondary'}" id="tab-inventory">
              📦 Inventario de Repuestos (${inventory.length})
            </button>
          </div>
        </div>

        ${activeTab === 'orders' ? `
          <!-- Orders Table Panel -->
          <div class="glass-panel">
            <h3 style="color: white; font-size: 1.1rem; margin-bottom: 1rem;">
              Listado General de Tickets y Estado de Taller
            </h3>

            <div style="overflow-x: auto;">
              <table class="custom-table">
                <thead>
                  <tr>
                    <th>N° Ticket</th>
                    <th>Cliente</th>
                    <th>Equipo / Serie</th>
                    <th>Técnico</th>
                    <th>Estado de Trabajo</th>
                    <th>Fecha Ingreso</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${orders.map(o => `
                    <tr>
                      <td><strong style="color: var(--accent-cyan);">${o.id}</strong></td>
                      <td>
                        <strong style="color: white; font-size: 0.9rem;">${o.customerName}</strong><br>
                        <span style="font-size: 0.775rem; color: var(--text-muted);">${o.customerPhone}</span>
                      </td>
                      <td>
                        <span style="color: var(--text-main); font-size: 0.85rem;">${o.deviceModel}</span><br>
                        <span style="font-size: 0.75rem; color: var(--text-dim); font-family: monospace;">${o.deviceSerial}</span>
                      </td>
                      <td><span style="color: var(--text-muted); font-size: 0.85rem;">${o.technician || '-'}</span></td>
                      <td>
                        <select class="form-control status-select" data-id="${o.id}" style="padding: 0.35rem 0.5rem; font-size: 0.8rem; font-weight: 600; width: 155px; color: ${getStatusColor(o.status)};">
                          <option value="DIAGNOSTICO" ${o.status === 'DIAGNOSTICO' ? 'selected' : ''}>🔴 En Diagnóstico</option>
                          <option value="REPARACION" ${o.status === 'REPARACION' ? 'selected' : ''}>🟠 En Reparación</option>
                          <option value="LISTO" ${o.status === 'LISTO' ? 'selected' : ''}>🟢 Listo para Entregar</option>
                        </select>
                      </td>
                      <td><span style="font-size: 0.8rem; color: var(--text-muted);">${formatDate(o.createdAt)}</span></td>
                      <td>
                        <button class="btn btn-secondary btn-sm print-pdf-btn" data-id="${o.id}">
                          📄 Reimprimir PDF
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        ` : `
          <!-- Inventory Table Panel -->
          <div class="glass-panel">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <h3 style="color: white; font-size: 1.1rem;">
                Stock de Repuestos & Insumos Técnicos
              </h3>
              <button class="btn btn-success btn-sm" id="btn-add-part">
                ➕ Registrar Nuevo Repuesto
              </button>
            </div>

            <div style="overflow-x: auto;">
              <table class="custom-table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nombre de Repuesto</th>
                    <th>Categoría</th>
                    <th>Stock Actual</th>
                    <th>Costo</th>
                    <th>Precio Venta</th>
                    <th>Ajuste de Stock</th>
                  </tr>
                </thead>
                <tbody>
                  ${inventory.map(item => `
                    <tr>
                      <td><span style="font-family: monospace; color: var(--text-muted);">${item.code}</span></td>
                      <td><strong style="color: white; font-size: 0.9rem;">${item.name}</strong></td>
                      <td><span class="badge badge-cyan" style="font-size: 0.7rem;">${item.category}</span></td>
                      <td>
                        <span class="badge ${item.stock > 3 ? 'badge-green' : 'badge-red'}" style="font-size: 0.85rem;">
                          ${item.stock} Unidades
                        </span>
                      </td>
                      <td><span style="color: var(--text-muted); font-size: 0.85rem;">${formatCurrency(item.cost)}</span></td>
                      <td><strong style="color: var(--accent-green); font-size: 0.9rem;">${formatCurrency(item.price)}</strong></td>
                      <td>
                        <div style="display: flex; gap: 0.35rem;">
                          <button class="btn btn-secondary btn-sm stock-adj-btn" data-id="${item.id}" data-delta="-1">-1</button>
                          <button class="btn btn-secondary btn-sm stock-adj-btn" data-id="${item.id}" data-delta="1">+1</button>
                        </div>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `}
      </div>

      <!-- Add Part Modal -->
      <div id="add-part-modal" class="modal-backdrop" style="display: none;">
        <div class="modal-card">
          <h3 style="color: var(--accent-green); margin-bottom: 1rem;">➕ Registrar Nuevo Repuesto en Inventario</h3>
          
          <div class="form-group">
            <label class="form-label">Nombre del Repuesto *</label>
            <input type="text" id="new-part-name" class="form-control" placeholder="Ej. Pantalla OLED 14.0 pulgadas" required>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
            <div class="form-group">
              <label class="form-label">Código SKU *</label>
              <input type="text" id="new-part-code" class="form-control" placeholder="SCR-OLED-14" required>
            </div>
            <div class="form-group">
              <label class="form-label">Categoría *</label>
              <input type="text" id="new-part-cat" class="form-control" placeholder="Pantallas / RAM / SSD" required>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem;">
            <div class="form-group">
              <label class="form-label">Stock Inicial</label>
              <input type="number" id="new-part-stock" class="form-control" value="5">
            </div>
            <div class="form-group">
              <label class="form-label">Costo (S/)</label>
              <input type="number" id="new-part-cost" class="form-control" value="100">
            </div>
            <div class="form-group">
              <label class="form-label">Precio Venta (S/)</label>
              <input type="number" id="new-part-price" class="form-control" value="160">
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1rem;">
            <button class="btn btn-secondary" id="btn-cancel-part-modal">Cancelar</button>
            <button class="btn btn-success" id="btn-save-new-part">Guardar Repuesto</button>
          </div>
        </div>
      </div>
    `;

    // Tab switcher events
    container.querySelector('#tab-orders').onclick = () => { activeTab = 'orders'; renderContent(); };
    container.querySelector('#tab-inventory').onclick = () => { activeTab = 'inventory'; renderContent(); };

    // Status change listener
    container.querySelectorAll('.status-select').forEach(sel => {
      sel.onchange = (e) => {
        const ticketId = sel.getAttribute('data-id');
        const newStatus = e.target.value;
        updateOrderStatus(ticketId, newStatus);
        renderContent();
      };
    });

    // PDF Reprint listener
    container.querySelectorAll('.print-pdf-btn').forEach(btn => {
      btn.onclick = async () => {
        const ticketId = btn.getAttribute('data-id');
        const order = orders.find(o => o.id === ticketId);
        if (order) {
          await generateTicketPDF(order);
        }
      };
    });

    // Stock Adjustment listener
    container.querySelectorAll('.stock-adj-btn').forEach(btn => {
      btn.onclick = () => {
        const partId = btn.getAttribute('data-id');
        const delta = parseInt(btn.getAttribute('data-delta'));
        const item = inventory.find(i => i.id === partId);
        if (item) {
          item.stock = Math.max(0, item.stock + delta);
          saveInventoryItem(item);
          renderContent();
        }
      };
    });

    // Modal Add Part handlers
    const addPartBtn = container.querySelector('#btn-add-part');
    const modal = container.querySelector('#add-part-modal');
    const cancelModal = container.querySelector('#btn-cancel-part-modal');
    const savePartBtn = container.querySelector('#btn-save-new-part');

    if (addPartBtn && modal) {
      addPartBtn.onclick = () => { modal.style.display = 'flex'; };
      cancelModal.onclick = () => { modal.style.display = 'none'; };

      savePartBtn.onclick = () => {
        const name = container.querySelector('#new-part-name').value.trim();
        const code = container.querySelector('#new-part-code').value.trim();
        const category = container.querySelector('#new-part-cat').value.trim();
        const stock = parseInt(container.querySelector('#new-part-stock').value) || 0;
        const cost = parseFloat(container.querySelector('#new-part-cost').value) || 0;
        const price = parseFloat(container.querySelector('#new-part-price').value) || 0;

        if (!name || !code || !category) {
          alert('Por favor complete el nombre, código y categoría del repuesto.');
          return;
        }

        const newPart = {
          id: `PART-${Date.now()}`,
          name,
          code,
          category,
          stock,
          cost,
          price
        };

        saveInventoryItem(newPart);
        modal.style.display = 'none';
        renderContent();
      };
    }
  }

  function getStatusColor(status) {
    if (status === 'DIAGNOSTICO') return '#ff3366';
    if (status === 'REPARACION') return '#ff9900';
    if (status === 'LISTO') return '#00ff9d';
    return '#ffffff';
  }

  renderContent();
}
