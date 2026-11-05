// Visor 3D de Inspección y Mapeo de Fallas (Three.js + Raycasting)

import * as THREE from 'three';

export class InspectionViewer3D {
  constructor(containerElement, options = {}) {
    this.container = containerElement;
    this.options = options;
    this.faultPins = [];
    this.pinMeshes = [];
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    
    this.isARActive = false;
    this.videoStream = null;
    this.videoElement = null;

    this.initScene();
    this.createLaptopModel();
    this.setupLights();
    this.setupEventListeners();
    this.animate();
  }

  initScene() {
    this.width = this.container.clientWidth || 800;
    this.height = this.container.clientHeight || 480;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0f1d);

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
    this.camera.position.set(0, 3.2, 5.5);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, alpha: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.innerHTML = '';
    
    // Create AR background video element
    this.videoElement = document.createElement('video');
    this.videoElement.autoplay = true;
    this.videoElement.playsInline = true;
    this.videoElement.style.cssText = 'position: absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; display:none; z-index:1;';
    this.container.appendChild(this.videoElement);

    // Canvas styling for AR overlay
    this.renderer.domElement.style.position = 'relative';
    this.renderer.domElement.style.zIndex = '2';
    this.container.appendChild(this.renderer.domElement);

    // Raycaster for 3D Clicks
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Group holding laptop meshes
    this.laptopGroup = new THREE.Group();
    this.scene.add(this.laptopGroup);

    // Group for fault pin markers
    this.pinsGroup = new THREE.Group();
    this.scene.add(this.pinsGroup);
  }

  createLaptopModel() {
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x1a2130,
      roughness: 0.3,
      metalness: 0.8
    });

    const keyboardMat = new THREE.MeshStandardMaterial({
      color: 0x0f1420,
      roughness: 0.6,
      metalness: 0.2
    });

    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x050a14,
      roughness: 0.1,
      metalness: 0.9
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x00e5ff,
      emissiveIntensity: 0.3,
      roughness: 0.2
    });

    // 1. Laptop Base Body
    const baseGeo = new THREE.BoxGeometry(3.2, 0.15, 2.2);
    const baseMesh = new THREE.Mesh(baseGeo, darkMetalMat);
    baseMesh.position.y = 0;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    baseMesh.name = "Carcasa Base Inferior";
    this.laptopGroup.add(baseMesh);

    // Trackpad
    const trackpadGeo = new THREE.BoxGeometry(0.9, 0.01, 0.6);
    const trackpadMesh = new THREE.Mesh(trackpadGeo, accentMat);
    trackpadMesh.position.set(0, 0.08, 0.65);
    trackpadMesh.name = "Touchpad / Cursor";
    this.laptopGroup.add(trackpadMesh);

    // Keyboard Area
    const kbdAreaGeo = new THREE.BoxGeometry(2.8, 0.02, 1.1);
    const kbdAreaMesh = new THREE.Mesh(kbdAreaGeo, keyboardMat);
    kbdAreaMesh.position.set(0, 0.08, -0.25);
    kbdAreaMesh.name = "Teclado Principal";
    this.laptopGroup.add(kbdAreaMesh);

    // Simulated Keys grid
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 12; col++) {
        const keyGeo = new THREE.BoxGeometry(0.18, 0.02, 0.16);
        const keyMesh = new THREE.Mesh(keyGeo, darkMetalMat);
        keyMesh.position.set(-1.2 + col * 0.22, 0.1, -0.65 + row * 0.2);
        keyMesh.name = `Tecla K-${row}-${col}`;
        this.laptopGroup.add(keyMesh);
      }
    }

    // 2. Display Screen Lid (Open at 110 degrees)
    this.screenLidGroup = new THREE.Group();
    this.screenLidGroup.position.set(0, 0.08, -1.05);

    const lidGeo = new THREE.BoxGeometry(3.2, 2.1, 0.1);
    lidGeo.translate(0, 1.05, 0);
    const lidMesh = new THREE.Mesh(lidGeo, darkMetalMat);
    lidMesh.castShadow = true;
    lidMesh.name = "Tapa / Carcasa de Pantalla";
    this.screenLidGroup.add(lidMesh);

    // Display Glass Screen
    const screenDisplayGeo = new THREE.BoxGeometry(2.9, 1.8, 0.02);
    screenDisplayGeo.translate(0, 1.05, 0.05);
    const displayMesh = new THREE.Mesh(screenDisplayGeo, screenMat);
    displayMesh.name = "Pantalla Display LCD/LED";
    this.screenLidGroup.add(displayMesh);

    // Screen Bezel Logo
    const logoGeo = new THREE.BoxGeometry(0.4, 0.05, 0.02);
    logoGeo.translate(0, 0.15, 0.06);
    const logoMesh = new THREE.Mesh(logoGeo, accentMat);
    logoMesh.name = "Logo de Marca JSR";
    this.screenLidGroup.add(logoMesh);

    // Rotate screen open
    this.screenLidGroup.rotation.x = THREE.MathUtils.degToRad(-25);
    this.laptopGroup.add(this.screenLidGroup);

    // Left and Right Side Ports (USB, HDMI, Audio)
    const portGeo = new THREE.BoxGeometry(0.02, 0.05, 0.2);
    
    const usbPortLeft = new THREE.Mesh(portGeo, accentMat);
    usbPortLeft.position.set(-1.61, 0, 0.2);
    usbPortLeft.name = "Puerto USB-A Izquierdo";
    this.laptopGroup.add(usbPortLeft);

    const hdmiPortLeft = new THREE.Mesh(portGeo, accentMat);
    hdmiPortLeft.position.set(-1.61, 0, -0.3);
    hdmiPortLeft.name = "Puerto HDMI / DisplayPort";
    this.laptopGroup.add(hdmiPortLeft);

    const usbPortRight = new THREE.Mesh(portGeo, accentMat);
    usbPortRight.position.set(1.61, 0, 0.1);
    usbPortRight.name = "Puerto USB-C / Carga";
    this.laptopGroup.add(usbPortRight);
  }

  setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00e5ff, 1.2);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    this.scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x8b5cf6, 0.8);
    fillLight.position.set(-5, 4, -5);
    this.scene.add(fillLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5, 10);
    pointLight.position.set(0, 3, 2);
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
      
      if (deltaX > 3 || deltaY > 3) {
        this.isDragging = true;
      }

      if (e.buttons === 1) { // Left drag -> Rotate
        this.laptopGroup.rotation.y += (e.clientX - this.previousMousePosition.x) * 0.01;
        this.laptopGroup.rotation.x += (e.clientY - this.previousMousePosition.y) * 0.008;
        // Clamp X rotation
        this.laptopGroup.rotation.x = Math.max(-0.5, Math.min(1.2, this.laptopGroup.rotation.x));
      } else if (e.buttons === 2) { // Right drag -> Pan
        this.camera.position.x -= (e.clientX - this.previousMousePosition.x) * 0.005;
        this.camera.position.y += (e.clientY - this.previousMousePosition.y) * 0.005;
      }
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    dom.addEventListener('contextmenu', (e) => e.preventDefault());

    dom.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.camera.position.z += e.deltaY * 0.003;
      this.camera.position.z = Math.max(2.5, Math.min(10, this.camera.position.z));
    });

    // 3D Click / Raycasting Event
    dom.addEventListener('click', (e) => {
      if (this.isDragging) return;

      const rect = dom.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / this.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / this.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.laptopGroup.children, true);

      if (intersects.length > 0) {
        const hit = intersects[0];
        const hitPartName = hit.object.name || 'Componente Exterior';
        
        // Notify caller
        if (this.options.onPointClick) {
          this.options.onPointClick({
            point: hit.point,
            partName: hitPartName,
            worldPoint: hit.point
          });
        }
      }
    });

    window.addEventListener('resize', () => this.onWindowResize());
  }

  addFaultPin(faultData) {
    const pinGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xff3366,
      emissive: 0xff3366,
      emissiveIntensity: 0.8,
      roughness: 0.2
    });

    const pinMesh = new THREE.Mesh(pinGeo, pinMat);
    pinMesh.position.set(faultData.x, faultData.y, faultData.z);
    
    // Outer pulsing ring
    const ringGeo = new THREE.RingGeometry(0.1, 0.16, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xff3366,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    pinMesh.add(ringMesh);

    pinMesh.userData = faultData;
    this.pinsGroup.add(pinMesh);
    this.pinMeshes.push(pinMesh);
  }

  clearFaultPins() {
    this.pinMeshes.forEach(mesh => this.pinsGroup.remove(mesh));
    this.pinMeshes = [];
  }

  captureSnapshot() {
    this.renderer.render(this.scene, this.camera);
    return this.renderer.domElement.toDataURL('image/png');
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
      this.scene.background = new THREE.Color(0x0a0f1d);
    }
  }

  resetView() {
    this.laptopGroup.rotation.set(0, 0, 0);
    this.camera.position.set(0, 3.2, 5.5);
    this.camera.lookAt(0, 0, 0);
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

    // Pulse fault pin rings
    const time = Date.now() * 0.004;
    this.pinMeshes.forEach(pin => {
      const ring = pin.children[0];
      if (ring) {
        const s = 1 + Math.sin(time) * 0.3;
        ring.scale.set(s, s, s);
      }
    });

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
    }
  }
}
