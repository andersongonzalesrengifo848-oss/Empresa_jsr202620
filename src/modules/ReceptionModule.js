// Módulo 1: Recepción e Inspección 3D Interactiva (Multiservicios JSR)

import { InspectionViewer3D } from '../components/Viewer3D.js';
import { generateTicketPDF } from '../components/TicketPDFGenerator.js';
import { saveOrder } from '../services/storage.js';
import { generateTicketId, formatCurrency } from '../services/utils.js';

export function renderReceptionModule(container) {
  const currentTicketId = generateTicketId();
  let faultPinsList = [];
  let pending3DClickPoint = null;
  let viewer3DInstance = null;

  container.innerHTML = `
    <div class="reception-module">
      <div style="margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: 1.8rem; color: white;">Módulo 1: Recepción e Inspección 3D</h1>
          <p style="color: var(--text-muted); font-size: 0.95rem;">
            Realice el mapeo interactivo de fallas en el modelo 3D y genere el ticket comprobante con código QR.
          </p>
        </div>
        <div class="badge badge-cyan" style="font-size: 0.9rem; padding: 0.4rem 0.9rem;">
          TICKET NUEVO: <span id="current-ticket-badge">${currentTicketId}</span>
        </div>
      </div>

      <div class="grid-2-1">
        <!-- 3D Viewer Container -->
        <div class="glass-panel viewport-3d-container" style="height: 520px; position: relative;">
          <div class="viewport-overlay">
            <span class="badge badge-red" style="animation: pulseRed 2s infinite;">
              <span class="status-dot-red"></span> MODO INSPECCIÓ N 3D ACTIVO
            </span>
            <p style="color: rgba(255,255,255,0.6); font-size: 0.75rem; margin-top: 0.4rem;">
              • Haz clic sobre cualquier pieza de la laptop 3D para registrar una falla.<br>
              • Arrastra con clic izquierdo para rotar $360^\circ$ | Rueda de mouse para Zoom.
            </p>
          </div>

          <!-- The canvas rendered by Three.js will be placed here -->
          <div id="reception-3d-viewport" style="width: 100%; height: 100%;"></div>

          <div class="viewport-controls-bar">
            <button class="btn btn-primary btn-sm" id="btn-toggle-ar" title="Activar Cámara de Realidad Aumentada">
              📱 Modo Realidad Aumentada (AR)
            </button>
            <button class="btn btn-secondary btn-sm" id="btn-reset-3d" title="Restablecer Vista 3D">
              🔄 Restablecer Vista
            </button>
            <button class="btn btn-secondary btn-sm" id="btn-clear-pins" title="Borrar Puntos 3D">
              🗑️ Limpiar Puntos (${faultPinsList.length})
            </button>
          </div>
        </div>

        <!-- Reception Form & Pin Checklist -->
        <div class="glass-panel" style="display: flex; flex-direction: column; gap: 1rem;">
          <h3 style="color: var(--accent-cyan); font-size: 1.15rem; border-bottom: 1px solid var(--border-glass); padding-bottom: 0.5rem;">
            📋 Datos de Ingreso y Cliente
          </h3>

          <form id="reception-form" style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div class="form-group" style="margin-bottom: 0.5rem;">
              <label class="form-label">Nombre del Cliente *</label>
              <input type="text" id="cust-name" class="form-control" placeholder="Ej. Carlos Mendoza" required>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
              <div class="form-group" style="margin: 0;">
                <label class="form-label">DNI / RUC *</label>
                <input type="text" id="cust-dni" class="form-control" placeholder="72819034" required>
              </div>
              <div class="form-group" style="margin: 0;">
                <label class="form-label">Teléfono / WhatsApp *</label>
                <input type="text" id="cust-phone" class="form-control" placeholder="+51 987 654 321" required>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
              <div class="form-group" style="margin: 0;">
                <label class="form-label">Modelo del Equipo *</label>
                <input type="text" id="dev-model" class="form-control" placeholder="Asus TUF / Lenovo ThinkPad" required>
              </div>
              <div class="form-group" style="margin: 0;">
                <label class="form-label">Número de Serie *</label>
                <input type="text" id="dev-serial" class="form-control" placeholder="SN-892103" required>
              </div>
            </div>

            <div class="form-group" style="margin: 0;">
              <label class="form-label">Costo Estimado Diagnóstico (S/)</label>
              <input type="number" id="est-cost" class="form-control" value="80" step="5">
            </div>

            <div style="margin-top: 0.5rem; border-top: 1px solid var(--border-glass); padding-top: 0.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <label class="form-label" style="margin: 0;">Puntos de Falla 3D Marcados</label>
                <span class="badge badge-red" id="pin-count-badge">${faultPinsList.length} Puntos</span>
              </div>
              
              <div id="pins-list-container" style="max-height: 140px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.4rem;">
                <p style="color: var(--text-dim); font-size: 0.825rem; font-style: italic;">
                  No hay fallas marcadas en el modelo 3D aún. Haz clic sobre la laptop para colocar un pin rojo.
                </p>
              </div>
            </div>

            <div style="margin-top: auto; padding-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.85rem;">
                📄 Registrar Orden y Generar Ticket PDF
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal for Pin Description -->
    <div id="fault-modal" class="modal-backdrop" style="display: none;">
      <div class="modal-card">
        <h3 style="color: var(--accent-red); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
          📍 Registrar Falla en Modelo 3D
        </h3>
        <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 1rem;">
          Pieza Seleccionada: <strong id="modal-part-name" style="color: white;">-</strong>
        </p>

        <div class="form-group">
          <label class="form-label">Descripción del Daño / Observación *</label>
          <textarea id="modal-fault-note" class="form-control" rows="3" placeholder="Ej. Raya profunda en la cubierta, puerto flojo, pantalla parpadea..." required></textarea>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1rem;">
          <button type="button" class="btn btn-secondary" id="btn-cancel-modal">Cancelar</button>
          <button type="button" class="btn btn-danger" id="btn-save-pin">📍 Marcar Pin Rojo</button>
        </div>
      </div>
    </div>
  `;

  // Initialize Three.js 3D Viewer
  const viewportElem = container.querySelector('#reception-3d-viewport');
  viewer3DInstance = new InspectionViewer3D(viewportElem, {
    onPointClick: (hitData) => {
      pending3DClickPoint = hitData;
      const modal = container.querySelector('#fault-modal');
      const partNameElem = container.querySelector('#modal-part-name');
      const noteInput = container.querySelector('#modal-fault-note');
      
      partNameElem.textContent = hitData.partName || 'Componente Exterior';
      noteInput.value = '';
      modal.style.display = 'flex';
      noteInput.focus();
    }
  });

  // Controls Event Listeners
  let arActive = false;
  const toggleArBtn = container.querySelector('#btn-toggle-ar');
  if (toggleArBtn) {
    toggleArBtn.onclick = async () => {
      arActive = !arActive;
      await viewer3DInstance.toggleARMode(arActive);
      toggleArBtn.textContent = arActive ? '❌ Salir de AR' : '📱 Modo Realidad Aumentada (AR)';
      toggleArBtn.className = arActive ? 'btn btn-danger btn-sm' : 'btn btn-primary btn-sm';
    };
  }

  const resetBtn = container.querySelector('#btn-reset-3d');
  if (resetBtn) resetBtn.onclick = () => viewer3DInstance.resetView();

  const clearPinsBtn = container.querySelector('#btn-clear-pins');
  if (clearPinsBtn) {
    clearPinsBtn.onclick = () => {
      faultPinsList = [];
      viewer3DInstance.clearFaultPins();
      updatePinsListUI();
    };
  }

  // Modal Buttons
  const cancelModalBtn = container.querySelector('#btn-cancel-modal');
  const savePinBtn = container.querySelector('#btn-save-pin');
  const modal = container.querySelector('#fault-modal');

  cancelModalBtn.onclick = () => {
    modal.style.display = 'none';
    pending3DClickPoint = null;
  };

  savePinBtn.onclick = () => {
    const noteInput = container.querySelector('#modal-fault-note');
    const noteText = noteInput.value.trim();
    if (!noteText) {
      alert('Por favor ingrese una observación para la falla.');
      return;
    }

    if (pending3DClickPoint) {
      const pinObj = {
        id: Date.now(),
        part: pending3DClickPoint.partName,
        note: noteText,
        x: pending3DClickPoint.point.x,
        y: pending3DClickPoint.point.y,
        z: pending3DClickPoint.point.z
      };

      faultPinsList.push(pinObj);
      viewer3DInstance.addFaultPin(pinObj);
      updatePinsListUI();
    }

    modal.style.display = 'none';
    pending3DClickPoint = null;
  };

  function updatePinsListUI() {
    const containerElem = container.querySelector('#pins-list-container');
    const pinBadge = container.querySelector('#pin-count-badge');
    const clearBtn = container.querySelector('#btn-clear-pins');

    if (pinBadge) pinBadge.textContent = `${faultPinsList.length} Puntos`;
    if (clearBtn) clearBtn.textContent = `🗑️ Limpiar Puntos (${faultPinsList.length})`;

    if (faultPinsList.length === 0) {
      containerElem.innerHTML = `
        <p style="color: var(--text-dim); font-size: 0.825rem; font-style: italic;">
          No hay fallas marcadas en el modelo 3D aún. Haz clic sobre la laptop para colocar un pin rojo.
        </p>
      `;
      return;
    }

    containerElem.innerHTML = faultPinsList.map((pin, index) => `
      <div class="fault-pin-item">
        <div>
          <strong style="color: var(--accent-red); font-size: 0.85rem;">[Pin #${index + 1}] ${pin.part}</strong>
          <p style="color: var(--text-main); font-size: 0.8rem; margin-top: 0.1rem;">${pin.note}</p>
        </div>
        <button type="button" class="btn btn-secondary btn-sm remove-pin-btn" data-id="${pin.id}" style="padding: 0.2rem 0.5rem; color: #ff3366;">✕</button>
      </div>
    `).join('');

    containerElem.querySelectorAll('.remove-pin-btn').forEach(btn => {
      btn.onclick = () => {
        const id = parseInt(btn.getAttribute('data-id'));
        faultPinsList = faultPinsList.filter(p => p.id !== id);
        
        // Refresh pins in Three.js
        viewer3DInstance.clearFaultPins();
        faultPinsList.forEach(p => viewer3DInstance.addFaultPin(p));
        updatePinsListUI();
      };
    });
  }

  // Form Submit Handler
  const form = container.querySelector('#reception-form');
  form.onsubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      id: currentTicketId,
      customerName: container.querySelector('#cust-name').value.trim(),
      customerDni: container.querySelector('#cust-dni').value.trim(),
      customerPhone: container.querySelector('#cust-phone').value.trim(),
      deviceModel: container.querySelector('#dev-model').value.trim(),
      deviceSerial: container.querySelector('#dev-serial').value.trim(),
      estimatedCost: parseFloat(container.querySelector('#est-cost').value) || 80,
      status: 'DIAGNOSTICO',
      technician: 'Ing. Alexis Ruiz',
      createdAt: new Date().toISOString(),
      faults3D: faultPinsList,
      usedParts: [],
      warrantyDays: 60
    };

    // 1. Save to local storage DB
    saveOrder(orderData);

    // 2. Capture WebGL 3D Canvas Snapshot
    const snapshot3D = viewer3DInstance.captureSnapshot();

    // 3. Generate PDF Ticket with 3D Snapshot & QR
    await generateTicketPDF(orderData, snapshot3D);

    alert(`¡Orden ${currentTicketId} registrada con éxito!\nSe ha generado y descargado el comprobante PDF con la captura 3D y código QR.`);

    // Reset module
    renderReceptionModule(container);
  };
}
