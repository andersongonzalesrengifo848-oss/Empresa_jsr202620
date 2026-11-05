// Módulo 2: Taller & Despiece 3D de Repuestos (Multiservicios JSR)

import { ExplodedView3D } from '../components/ExplodedView3D.js';
import { getOrders, getInventory, deductInventoryStock, saveOrder } from '../services/storage.js';
import { formatCurrency } from '../services/utils.js';

export function renderWorkshopModule(container) {
  const orders = getOrders();
  const inventory = getInventory();
  let selectedOrderId = orders.length > 0 ? orders[0].id : null;
  let selectedComponent = null;
  let explodedViewInstance = null;

  function activeOrder() {
    return getOrders().find(o => o.id === selectedOrderId) || null;
  }

  container.innerHTML = `
    <div class="workshop-module">
      <div style="margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: 1.8rem; color: white;">Módulo 2: Taller & Despiece 3D de Repuestos</h1>
          <p style="color: var(--text-muted); font-size: 0.95rem;">
            Despiece interno en 3D del equipo y descuento automático de repuestos del inventario en tiempo real.
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <label class="form-label" style="margin: 0; white-space: nowrap;">Orden Activa:</label>
          <select id="workshop-order-select" class="form-control" style="width: 220px; font-weight: 600; color: var(--accent-cyan);">
            ${orders.map(o => `
              <option value="${o.id}" ${o.id === selectedOrderId ? 'selected' : ''}>
                ${o.id} - ${o.deviceModel}
              </option>
            `).join('')}
          </select>
        </div>
      </div>

      <div class="grid-2-1">
        <!-- 3D Exploded View Box -->
        <div class="glass-panel viewport-3d-container" style="height: 520px; position: relative;">
          <div class="viewport-overlay">
            <span class="badge badge-amber">
              ⚙️ VISTA EXPLOTADA 3D DE COMPONENTES INTERNOS
            </span>
            <p style="color: rgba(255,255,255,0.6); font-size: 0.75rem; margin-top: 0.4rem;">
              • Haz clic en la RAM, SSD, Fan o Batería para seleccionarla e integrarla al inventario.<br>
              • Usa el control deslizante inferior para ajustar el nivel de despiece.
            </p>
          </div>

          <div id="workshop-3d-viewport" style="width: 100%; height: 100%;"></div>

          <!-- Explode Factor Slider & AR Button -->
          <div class="viewport-controls-bar" style="left: 1rem; right: 1rem; justify-content: space-between; align-items: center;">
            <button class="btn btn-primary btn-sm" id="btn-toggle-ar-workshop" title="Activar Cámara de Realidad Aumentada">
              📱 AR Despiece
            </button>
            <div style="display: flex; align-items: center; gap: 0.75rem; width: 55%;">
              <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">💥 DESPIECE:</span>
              <input type="range" id="explode-slider" min="0" max="1" step="0.02" value="0.6" style="flex: 1; accent-color: var(--accent-cyan); cursor: pointer;">
            </div>
            <button class="btn btn-secondary btn-sm" id="btn-reset-exploded">
              🔄 Vista Inicial
            </button>
          </div>
        </div>

        <!-- Component Inspector & Inventory Sync Card -->
        <div class="glass-panel" style="display: flex; flex-direction: column; gap: 1rem;">
          <h3 style="color: var(--accent-cyan); font-size: 1.15rem; border-bottom: 1px solid var(--border-glass); padding-bottom: 0.5rem;">
            🔍 Componente Seleccionado & Stock
          </h3>

          <div id="component-detail-box" style="flex: 1; display: flex; flex-direction: column;">
            <p style="color: var(--text-dim); font-size: 0.875rem; font-style: italic;">
              Haz clic en cualquier pieza dentro del modelo 3D (RAM, SSD, Fan, Batería) para consultar stock y descontar repuestos.
            </p>
          </div>

          <!-- Active Order Summary Box -->
          <div style="border-top: 1px solid var(--border-glass); padding-top: 1rem;">
            <h4 style="font-size: 0.95rem; color: white; margin-bottom: 0.5rem;">Repuestos Asignados a la Orden</h4>
            <div id="assigned-parts-list" style="max-height: 140px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.4rem;">
              <!-- Dynamically populated -->
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize Exploded 3D View
  const viewportElem = container.querySelector('#workshop-3d-viewport');
  explodedViewInstance = new ExplodedView3D(viewportElem, {
    onComponentSelect: (compData) => {
      selectedComponent = compData;
      updateComponentDetailUI();
    }
  });

  // AR Toggle Button
  let arActive = false;
  const toggleArBtn = container.querySelector('#btn-toggle-ar-workshop');
  if (toggleArBtn) {
    toggleArBtn.onclick = async () => {
      arActive = !arActive;
      await explodedViewInstance.toggleARMode(arActive);
      toggleArBtn.textContent = arActive ? '❌ Salir AR' : '📱 AR Despiece';
      toggleArBtn.className = arActive ? 'btn btn-danger btn-sm' : 'btn btn-primary btn-sm';
    };
  }

  // Slider control
  const slider = container.querySelector('#explode-slider');
  slider.oninput = (e) => {
    explodedViewInstance.setExplodeFactor(parseFloat(e.target.value));
  };

  const resetBtn = container.querySelector('#btn-reset-exploded');
  if (resetBtn) {
    resetBtn.onclick = () => {
      slider.value = 0.6;
      explodedViewInstance.setExplodeFactor(0.6);
    };
  }

  // Order Dropdown Selector
  const orderSelect = container.querySelector('#workshop-order-select');
  orderSelect.onchange = (e) => {
    selectedOrderId = e.target.value;
    updateAssignedPartsUI();
  };

  function updateComponentDetailUI() {
    const box = container.querySelector('#component-detail-box');
    if (!selectedComponent) return;

    // Search matched part in inventory
    const currentInventory = getInventory();
    const matchedPart = currentInventory.find(p => p.id === selectedComponent.partId) || null;

    box.innerHTML = `
      <div style="background: rgba(0, 229, 255, 0.06); border: 1px solid rgba(0, 229, 255, 0.2); padding: 0.85rem; border-radius: var(--radius-sm); margin-bottom: 1rem;">
        <span class="badge badge-cyan">PIEZA 3D: ${selectedComponent.id}</span>
        <h4 style="color: white; font-size: 1.05rem; margin-top: 0.3rem;">${selectedComponent.name}</h4>
      </div>

      ${matchedPart ? `
        <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.875rem;">
            <span style="color: var(--text-muted);">Código de Stock:</span>
            <strong style="color: white;">${matchedPart.code}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.875rem;">
            <span style="color: var(--text-muted);">Stock Disponible en Almacén:</span>
            <strong style="color: ${matchedPart.stock > 3 ? 'var(--accent-green)' : 'var(--accent-red)'}; font-size: 1.05rem;">
              ${matchedPart.stock} Unidades
            </strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.875rem;">
            <span style="color: var(--text-muted);">Precio Unitario Venta:</span>
            <strong style="color: var(--accent-cyan); font-size: 1.05rem;">${formatCurrency(matchedPart.price)}</strong>
          </div>
        </div>

        <button class="btn btn-success" id="btn-deduct-stock" style="width: 100%; margin-top: auto; padding: 0.75rem;" ${matchedPart.stock <= 0 ? 'disabled' : ''}>
          📦 Descontar 1 Unidad de Stock y Vincular a Orden
        </button>
      ` : `
        <div style="background: rgba(255, 153, 0, 0.1); border: 1px solid rgba(255, 153, 0, 0.3); padding: 0.85rem; border-radius: var(--radius-sm);">
          <p style="color: var(--accent-amber); font-size: 0.85rem;">
            Este componente es parte de la estructura base y no requiere repuesto de inventario directo.
          </p>
        </div>
      `}
    `;

    const deductBtn = box.querySelector('#btn-deduct-stock');
    if (deductBtn && matchedPart) {
      deductBtn.onclick = () => {
        const order = activeOrder();
        if (!order) {
          alert('Por favor seleccione una orden de servicio activa.');
          return;
        }

        const res = deductInventoryStock(matchedPart.id, 1);
        if (res.success) {
          // Update active order's used parts
          const existingParts = order.usedParts || [];
          const existingIndex = existingParts.findIndex(p => p.partId === matchedPart.id);
          
          if (existingIndex >= 0) {
            existingParts[existingIndex].qty += 1;
          } else {
            existingParts.push({
              partId: matchedPart.id,
              name: matchedPart.name,
              qty: 1,
              price: matchedPart.price
            });
          }

          order.usedParts = existingParts;
          order.status = 'REPARACION'; // Auto switch status to IN REPAIR
          saveOrder(order);

          alert(`¡1 Unidad de "${matchedPart.name}" descontada del stock y vinculada exitosamente a la Orden ${order.id}!`);
          
          updateComponentDetailUI();
          updateAssignedPartsUI();
        } else {
          alert(res.message || 'Error al descontar stock');
        }
      };
    }
  }

  function updateAssignedPartsUI() {
    const containerElem = container.querySelector('#assigned-parts-list');
    const order = activeOrder();

    if (!order || !order.usedParts || order.usedParts.length === 0) {
      containerElem.innerHTML = `
        <p style="color: var(--text-dim); font-size: 0.8rem; font-style: italic;">
          No hay repuestos registrados para esta orden.
        </p>
      `;
      return;
    }

    containerElem.innerHTML = order.usedParts.map(part => `
      <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255, 255, 255, 0.04); padding: 0.4rem 0.6rem; border-radius: var(--radius-sm);">
        <span style="font-size: 0.8rem; color: white;">${part.name} (x${part.qty})</span>
        <strong style="font-size: 0.8rem; color: var(--accent-green);">${formatCurrency(part.price * part.qty)}</strong>
      </div>
    `).join('');
  }

  updateAssignedPartsUI();
}
