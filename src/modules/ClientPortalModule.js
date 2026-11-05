// Módulo 3: Portal del Cliente Inmersivo - Rastreo 3D en Tiempo Real (Multiservicios JSR)

import * as THREE from 'three';
import { getOrderById } from '../services/storage.js';
import { formatDate, formatCurrency } from '../services/utils.js';

export function renderClientPortalModule(container, defaultTicketId = 'JSR-3099') {
  let activeTicketId = defaultTicketId;
  let orderData = getOrderById(activeTicketId);
  let threeSceneInstance = null;

  // Check URL hash params if any
  const hash = window.location.hash;
  if (hash.includes('ticket=')) {
    const param = hash.split('ticket=')[1];
    if (param) activeTicketId = param.split('&')[0];
    orderData = getOrderById(activeTicketId);
  }

  container.innerHTML = `
    <div class="client-portal-module">
      <div style="margin-bottom: 1.5rem; text-align: center;">
        <h1 style="font-size: 2rem; color: white; margin-bottom: 0.4rem;">
          🌐 Portal de Rastreo 3D para Clientes
        </h1>
        <p style="color: var(--text-muted); font-size: 0.95rem;">
          Consulte el estado de reparación de su equipo con iluminación e inspección 3D en tiempo real.
        </p>

        <!-- Search Bar -->
        <div style="max-width: 460px; margin: 1.25rem auto 0 auto; display: flex; gap: 0.5rem;">
          <input type="text" id="ticket-search-input" class="form-control" placeholder="Ingrese su N° Ticket (Ej. JSR-3099)" value="${activeTicketId}" style="text-transform: uppercase; font-size: 1rem; font-weight: 600; text-align: center;">
          <button class="btn btn-primary" id="btn-search-ticket" style="padding: 0 1.25rem;">
            🔍 Buscar
          </button>
        </div>
      </div>

      ${orderData ? `
        <div class="grid-2-1">
          <!-- 3D Status Viewport -->
          <div class="glass-panel viewport-3d-container" style="height: 500px; position: relative;">
            <div class="viewport-overlay" id="portal-status-overlay">
              <!-- Dynamically populated status badge -->
            </div>

            <div id="client-3d-viewport" style="width: 100%; height: 100%;"></div>
          </div>

          <!-- Ticket Summary Card -->
          <div class="glass-panel" style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="border-bottom: 1px solid var(--border-glass); padding-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <span style="color: var(--text-muted); font-size: 0.75rem;">COMPROBANTE N°</span>
                <h3 style="color: var(--accent-cyan); font-size: 1.35rem;">${orderData.id}</h3>
              </div>
              <div id="portal-badge-container">
                <!-- Status Badge -->
              </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.9rem;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Cliente:</span>
                <strong style="color: white;">${orderData.customerName}</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Equipo:</span>
                <strong style="color: white;">${orderData.deviceModel}</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">N° Serie:</span>
                <span style="color: var(--text-main); font-family: monospace;">${orderData.deviceSerial}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Técnico Asignado:</span>
                <span style="color: var(--accent-cyan);">${orderData.technician || 'En asignación'}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Fecha de Ingreso:</span>
                <span style="color: var(--text-muted);">${formatDate(orderData.createdAt)}</span>
              </div>
            </div>

            <!-- Faults breakdown -->
            <div style="border-top: 1px solid var(--border-glass); padding-top: 0.75rem;">
              <h4 style="font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.4rem;">
                Diagnóstico de Fallas Reportadas
              </h4>
              <div style="display: flex; flex-direction: column; gap: 0.35rem; max-height: 110px; overflow-y: auto;">
                ${(orderData.faults3D || []).map(f => `
                  <div style="font-size: 0.8rem; background: rgba(255,51,102,0.08); border-left: 3px solid #ff3366; padding: 0.3rem 0.5rem; border-radius: 4px;">
                    <strong style="color: white;">${f.part}:</strong> ${f.note}
                  </div>
                `).join('') || '<p style="color: var(--text-dim); font-size: 0.8rem;">Sin observaciones adicionales.</p>'}
              </div>
            </div>

            <!-- Total Cost -->
            <div style="margin-top: auto; border-top: 1px solid var(--border-glass); padding-top: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
              <span style="color: var(--text-muted); font-size: 0.9rem;">Costo de Reparación:</span>
              <strong style="color: var(--accent-green); font-size: 1.35rem; font-family: var(--font-heading);">
                ${formatCurrency(orderData.estimatedCost || 0)}
              </strong>
            </div>
          </div>
        </div>
      ` : `
        <div class="glass-panel" style="text-align: center; padding: 3rem; max-width: 600px; margin: 2rem auto;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
          <h3 style="color: white; margin-bottom: 0.5rem;">Ticket No Encontrado</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">
            No se encontró ninguna orden registrada con el código <strong>"${activeTicketId}"</strong>.
          </p>
          <p style="color: var(--text-dim); font-size: 0.825rem;">
            Intente con tickets de demostración: <a href="#" class="demo-ticket-link" data-id="JSR-1024" style="color: var(--accent-cyan);">JSR-1024 (Rojo)</a> | 
            <a href="#" class="demo-ticket-link" data-id="JSR-2058" style="color: var(--accent-amber);">JSR-2058 (Naranja)</a> | 
            <a href="#" class="demo-ticket-link" data-id="JSR-3099" style="color: var(--accent-green);">JSR-3099 (Verde)</a>
          </p>
        </div>
      `}
    </div>
  `;

  // Search Ticket Handler
  const searchBtn = container.querySelector('#btn-search-ticket');
  const searchInput = container.querySelector('#ticket-search-input');
  
  if (searchBtn && searchInput) {
    searchBtn.onclick = () => {
      const val = searchInput.value.trim().toUpperCase();
      if (val) {
        renderClientPortalModule(container, val);
      }
    };

    searchInput.onkeypress = (e) => {
      if (e.key === 'Enter') searchBtn.click();
    };
  }

  container.querySelectorAll('.demo-ticket-link').forEach(link => {
    link.onclick = (e) => {
      e.preventDefault();
      const id = link.getAttribute('data-id');
      renderClientPortalModule(container, id);
    };
  });

  // Initialize 3D Visual Status Renderer
  if (orderData) {
    initPortal3DViewer(container.querySelector('#client-3d-viewport'), orderData.status, container);
  }
}

function initPortal3DViewer(containerElem, status, rootContainer) {
  if (!containerElem) return;

  const width = containerElem.clientWidth || 800;
  const height = containerElem.clientHeight || 500;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x060a14);

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 3, 5.5);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  containerElem.innerHTML = '';
  containerElem.appendChild(renderer.domElement);

  // Status color mapping
  // Rojo: DIAGNOSTICO | Naranja: REPARACION | Verde: LISTO
  let statusColorHex = 0xff3366; // Red default
  let statusBadgeHtml = `<span class="badge badge-red" style="animation: pulseRed 2s infinite;"><span class="status-dot-red"></span> ESTADO: EN DIAGNOSTICO</span>`;
  let statusBadgeSideHtml = `<span class="badge badge-red">🔴 EN DIAGNOSTICO</span>`;

  if (status === 'REPARACION') {
    statusColorHex = 0xff9900; // Amber
    statusBadgeHtml = `<span class="badge badge-amber"><span style="width:10px;height:10px;background:#ff9900;border-radius:50%;"></span> ESTADO: EN PROCESO DE REPARACION</span>`;
    statusBadgeSideHtml = `<span class="badge badge-amber">🟠 EN REPARACION</span>`;
  } else if (status === 'LISTO') {
    statusColorHex = 0x00ff9d; // Neon Green
    statusBadgeHtml = `<span class="badge badge-green" style="animation: pulseGreen 1.8s infinite;"><span class="status-dot-green"></span> ¡LISTO PARA RECOGER!</span>`;
    statusBadgeSideHtml = `<span class="badge badge-green">🟢 LISTO EN TIENDA</span>`;
  }

  // Update UI overlay badges
  const overlay = rootContainer.querySelector('#portal-status-overlay');
  if (overlay) overlay.innerHTML = statusBadgeHtml;

  const badgeSide = rootContainer.querySelector('#portal-badge-container');
  if (badgeSide) badgeSide.innerHTML = statusBadgeSideHtml;

  // Build Laptop 3D Model with glowing lights
  const laptopGroup = new THREE.Group();
  scene.add(laptopGroup);

  const metalMat = new THREE.MeshStandardMaterial({
    color: 0x182030,
    roughness: 0.3,
    metalness: 0.8
  });

  const glowMat = new THREE.MeshStandardMaterial({
    color: statusColorHex,
    emissive: statusColorHex,
    emissiveIntensity: 0.9,
    roughness: 0.1
  });

  // Base
  const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.15, 2.2), metalMat);
  laptopGroup.add(baseMesh);

  // Keyboard Glow Deck
  const kbdMesh = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.02, 1.1), glowMat);
  kbdMesh.position.set(0, 0.08, -0.25);
  laptopGroup.add(kbdMesh);

  // Screen Lid Open
  const lidGroup = new THREE.Group();
  lidGroup.position.set(0, 0.08, -1.05);

  const lidMesh = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.1, 0.1), metalMat);
  lidMesh.geometry.translate(0, 1.05, 0);
  lidGroup.add(lidMesh);

  const displayMesh = new THREE.Mesh(new THREE.BoxGeometry(2.9, 1.8, 0.02), glowMat);
  displayMesh.geometry.translate(0, 1.05, 0.05);
  lidGroup.add(displayMesh);

  lidGroup.rotation.x = THREE.MathUtils.degToRad(-25);
  laptopGroup.add(lidGroup);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const statusLight = new THREE.PointLight(statusColorHex, 2.5, 12);
  statusLight.position.set(0, 2.5, 1);
  scene.add(statusLight);

  // Particle Celebration System for LISTO status
  let particlesMesh = null;
  if (status === 'LISTO') {
    const pGeo = new THREE.BufferGeometry();
    const pCount = 120;
    const posArray = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 6;
      posArray[i + 1] = Math.random() * 4;
      posArray[i + 2] = (Math.random() - 0.5) * 6;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x00ff9d,
      transparent: true,
      opacity: 0.8
    });
    particlesMesh = new THREE.Points(pGeo, pMat);
    scene.add(particlesMesh);
  }

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    laptopGroup.rotation.y += 0.005;

    if (particlesMesh) {
      particlesMesh.rotation.y += 0.003;
      const positions = particlesMesh.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += 0.008;
        if (positions[i] > 4) positions[i] = 0;
      }
      particlesMesh.geometry.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
  }

  animate();
}
