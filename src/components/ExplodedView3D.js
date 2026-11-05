// Visor 3D de Despiece Explotado e Inspección de Componentes Internos (Three.js)

import * as THREE from 'three';

export class ExplodedView3D {
  constructor(containerElement, options = {}) {
    this.container = containerElement;
    this.options = options;
    this.explodeFactor = 0.6; // 0 = Closed, 1 = Fully Exploded
    this.componentsMap = new Map();
    this.selectedMesh = null;

    this.isARActive = false;
    this.videoStream = null;
    this.videoElement = null;

    this.initScene();
    this.createInternalComponents();
    this.setupLights();
    this.setupEventListeners();
    this.animate();
  }

  initScene() {
    this.width = this.container.clientWidth || 800;
    this.height = this.container.clientHeight || 480;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x070b14);

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
    this.camera.position.set(0, 4.5, 5);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, alpha: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.container.innerHTML = '';

    // Create AR background video element
    this.videoElement = document.createElement('video');
    this.videoElement.autoplay = true;
    this.videoElement.playsInline = true;
    this.videoElement.style.cssText = 'position: absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; display:none; z-index:1;';
    this.container.appendChild(this.videoElement);

    this.renderer.domElement.style.position = 'relative';
    this.renderer.domElement.style.zIndex = '2';
    this.container.appendChild(this.renderer.domElement);

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.explodedGroup = new THREE.Group();
    this.scene.add(this.explodedGroup);
  }

  async toggleARMode(active) {
    this.isARActive = active;

    if (active) {
      this.scene.background = null;
      this.renderer.setClearColor(0x000000, 0);

      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          this.videoStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
          });
          this.videoElement.srcObject = this.videoStream;
          this.videoElement.style.display = 'block';
        }
      } catch (err) {
        console.warn('Camera access denied or unavailable, using AR WebXR Passthrough Simulation:', err);
        this.container.style.backgroundImage = 'radial-gradient(circle at center, rgba(0, 229, 255, 0.15) 0%, rgba(6, 10, 20, 0.9) 100%)';
      }
    } else {
      if (this.videoStream) {
        this.videoStream.getTracks().forEach(track => track.stop());
        this.videoStream = null;
      }
      this.videoElement.style.display = 'none';
      this.container.style.backgroundImage = '';
      this.scene.background = new THREE.Color(0x070b14);
    }
  }

  createInternalComponents() {
    const metalMat = new THREE.MeshStandardMaterial({ color: 0x1f293d, metalness: 0.8, roughness: 0.3 });
    const pcbGreenMat = new THREE.MeshStandardMaterial({ color: 0x047857, metalness: 0.2, roughness: 0.4 });
    const copperMat = new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.9, roughness: 0.2 });
    const batteryMat = new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.1, roughness: 0.8 });
    const ramMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.4, roughness: 0.4 });
    const ssdMat = new THREE.MeshStandardMaterial({ color: 0x4338ca, metalness: 0.5, roughness: 0.3 });
    const fanMat = new THREE.MeshStandardMaterial({ color: 0x374151, metalness: 0.7, roughness: 0.3 });

    // 1. Bottom Cover (Layer 0 - base)
    const baseGeo = new THREE.BoxGeometry(3.2, 0.08, 2.2);
    const baseMesh = new THREE.Mesh(baseGeo, metalMat);
    baseMesh.userData = { id: 'BASE', name: 'Tapa Inferior de Carcasa', partId: null, basePosY: -0.8 };
    this.explodedGroup.add(baseMesh);
    this.componentsMap.set('BASE', baseMesh);

    // 2. Battery Module (Layer 1)
    const batGeo = new THREE.BoxGeometry(2.4, 0.1, 0.7);
    const batMesh = new THREE.Mesh(batGeo, batteryMat);
    batMesh.userData = { id: 'BATTERY', name: 'Batería Interna 56Wh 3 Celdas', partId: 'PART-004', basePosY: -0.4, posZ: 0.6 };
    this.explodedGroup.add(batMesh);
    this.componentsMap.set('BATTERY', batMesh);

    // 3. Motherboard PCB (Layer 2)
    const pcbGeo = new THREE.BoxGeometry(2.8, 0.06, 1.3);
    const pcbMesh = new THREE.Mesh(pcbGeo, pcbGreenMat);
    pcbMesh.userData = { id: 'MOTHERBOARD', name: 'Tarjeta Madre Mainboard System', partId: null, basePosY: -0.1, posZ: -0.3 };
    this.explodedGroup.add(pcbMesh);
    this.componentsMap.set('MOTHERBOARD', pcbMesh);

    // 4. Cooling Fan & Copper Heatpipe (Layer 3)
    const fanGroup = new THREE.Group();
    const fanBoxGeo = new THREE.BoxGeometry(0.8, 0.12, 0.8);
    const fanBoxMesh = new THREE.Mesh(fanBoxGeo, fanMat);
    
    const heatpipeGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.4);
    const heatpipeMesh = new THREE.Mesh(heatpipeGeo, copperMat);
    heatpipeMesh.rotation.z = Math.PI / 2;
    heatpipeMesh.position.set(0.6, 0.05, 0);
    fanGroup.add(fanBoxMesh);
    fanGroup.add(heatpipeMesh);
    fanGroup.position.set(-0.8, 0, -0.3);

    // Make interactive child mesh
    fanBoxMesh.userData = { id: 'COOLER', name: 'Fan / Cooler Térmico Asus TUF/ROG', partId: 'PART-003', basePosY: 0.35, posZ: -0.3, posX: -0.8 };
    this.explodedGroup.add(fanGroup);
    this.componentsMap.set('COOLER', fanGroup);

    // 5. RAM Modules Dual Channel (Layer 4)
    const ramGeo = new THREE.BoxGeometry(0.7, 0.08, 0.25);
    const ramMesh = new THREE.Mesh(ramGeo, ramMat);
    ramMesh.userData = { id: 'RAM', name: 'Memoria RAM Kingston DDR4 16GB 3200MHz', partId: 'PART-001', basePosY: 0.65, posZ: -0.1, posX: 0.3 };
    this.explodedGroup.add(ramMesh);
    this.componentsMap.set('RAM', ramMesh);

    // 6. SSD M.2 NVMe Card (Layer 5)
    const ssdGeo = new THREE.BoxGeometry(0.6, 0.06, 0.2);
    const ssdMesh = new THREE.Mesh(ssdGeo, ssdMat);
    ssdMesh.userData = { id: 'SSD', name: 'Disco SSD M.2 NVMe 1TB Kingston NV2', partId: 'PART-002', basePosY: 0.65, posZ: -0.5, posX: 0.8 };
    this.explodedGroup.add(ssdMesh);
    this.componentsMap.set('SSD', ssdMesh);

    // 7. Top Keyboard Deck (Layer 6 - top)
    const topGeo = new THREE.BoxGeometry(3.2, 0.08, 2.2);
    const topMesh = new THREE.Mesh(topGeo, metalMat);
    topMesh.userData = { id: 'TOP_DECK', name: 'Carcasa Superior con Teclado', partId: 'PART-007', basePosY: 1.2 };
    this.explodedGroup.add(topMesh);
    this.componentsMap.set('TOP_DECK', topMesh);

    this.updateExplodePositions();
  }

  setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00e5ff, 1.2);
    dirLight.position.set(4, 6, 4);
    this.scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x00ff9d, 0.8, 10);
    pointLight.position.set(0, 2, 0);
    this.scene.add(pointLight);
  }

  setupEventListeners() {
    const dom = this.renderer.domElement;

    dom.addEventListener('pointerdown', (e) => {
      this.isDragging = false;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    dom.addEventListener('pointermove', (e) => {
      const deltaX = Math.abs(e.clientX - this.previousMousePosition.x);
      const deltaY = Math.abs(e.clientY - this.previousMousePosition.y);
      if (deltaX > 3 || deltaY > 3) this.isDragging = true;

      if (e.buttons === 1) {
        this.explodedGroup.rotation.y += (e.clientX - this.previousMousePosition.x) * 0.01;
        this.explodedGroup.rotation.x += (e.clientY - this.previousMousePosition.y) * 0.008;
      }
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    dom.addEventListener('click', (e) => {
      if (this.isDragging) return;

      const rect = dom.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / this.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / this.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.explodedGroup.children, true);

      if (intersects.length > 0) {
        let hitObj = intersects[0].object;
        // Traverse up to find user data
        while (hitObj && !hitObj.userData.name && hitObj.parent) {
          hitObj = hitObj.parent;
        }

        if (hitObj && hitObj.userData) {
          if (this.options.onComponentSelect) {
            this.options.onComponentSelect(hitObj.userData);
          }
        }
      }
    });

    window.addEventListener('resize', () => this.onWindowResize());
  }

  setExplodeFactor(factor) {
    this.explodeFactor = Math.max(0, Math.min(1, factor));
    this.updateExplodePositions();
  }

  updateExplodePositions() {
    this.componentsMap.forEach((obj) => {
      const uData = obj.userData || (obj.children[0] && obj.children[0].userData) || {};
      const basePosY = uData.basePosY || 0;
      const posX = uData.posX || 0;
      const posZ = uData.posZ || 0;

      obj.position.y = basePosY * this.explodeFactor;
      obj.position.x = posX * (1 + this.explodeFactor * 0.3);
      obj.position.z = posZ;
    });
  }

  onWindowResize() {
    if (!this.container) return;
    this.width = this.container.clientWidth || 800;
    this.height = this.container.clientHeight || 480;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
    }
  }
}
