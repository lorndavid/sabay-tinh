import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { 
  Sparkles, 
  RotateCw, 
  Eye, 
  Maximize2, 
  ShoppingBag, 
  Check, 
  Plus, 
  Layers, 
  SlidersHorizontal 
} from "lucide-react";

export default function ThreeDeskScene() {
  const mountRef = useRef(null);
  const { setSelectedProductForModal, addToCart, formatPrice } = useCart();

  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [activeCameraTarget, setActiveCameraTarget] = useState("all");
  const [addedAnim, setAddedAnim] = useState(false);

  // References for Three.js instances to allow UI button controls
  const sceneState = useRef({
    camera: null,
    controls: null,
    targetPosition: new THREE.Vector3(0, 1.8, 4.2),
    targetLookAt: new THREE.Vector3(0, 0.4, 0),
    currentLookAt: new THREE.Vector3(0, 0.4, 0),
    isDragging: false,
    prevMousePos: { x: 0, y: 0 },
    rotationVelocity: { x: 0, y: 0 },
    interactiveMeshes: [],
    deskGroup: null
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Renderer setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfcfcfd); // Ultra-clean subtle off-white

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 2.0, 4.4);
    sceneState.current.camera = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    container.appendChild(renderer.domElement);

    // 2. Studio Lighting (Crisp minimalist classic shadows)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(4, 7, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 25;
    dirLight.shadow.camera.left = -4;
    dirLight.shadow.camera.right = 4;
    dirLight.shadow.camera.top = 4;
    dirLight.shadow.camera.bottom = -4;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    const softFillLight = new THREE.DirectionalLight(0xe0e7ff, 0.8);
    softFillLight.position.set(-5, 4, -2);
    scene.add(softFillLight);

    const bottomReflect = new THREE.DirectionalLight(0xffffff, 0.4);
    bottomReflect.position.set(0, -2, 2);
    scene.add(bottomReflect);

    // 3. Desk Group
    const deskGroup = new THREE.Group();
    scene.add(deskGroup);
    sceneState.current.deskGroup = deskGroup;

    // Materials
    const woodDeskMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f5f7,
      roughness: 0.25,
      metalness: 0.05
    });

    const deskMatMaterial = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.6,
      metalness: 0.1
    });

    const aluminumMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.85,
      roughness: 0.2
    });

    const darkPlasticMaterial = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.35,
      metalness: 0.15
    });

    const keycapMaterial = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      roughness: 0.4
    });

    // Desk Top (White Quartz / Matte Minimalist Surface)
    const deskTopGeo = new THREE.BoxGeometry(4.8, 0.1, 2.6);
    const deskTopMesh = new THREE.Mesh(deskTopGeo, woodDeskMaterial);
    deskTopMesh.position.y = -0.05;
    deskTopMesh.receiveShadow = true;
    deskGroup.add(deskTopMesh);

    // Slim matte black steel desk legs
    const legGeo = new THREE.CylinderGeometry(0.035, 0.035, 2.2, 16);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.5, metalness: 0.8 });
    const legPositions = [
      [-2.2, -1.15, -1.1],
      [2.2, -1.15, -1.1],
      [-2.2, -1.15, 1.1],
      [2.2, -1.15, 1.1]
    ];
    legPositions.forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(x, y, z);
      leg.castShadow = true;
      deskGroup.add(leg);
    });

    // Minimalist Leather Desk Mat
    const matGeo = new THREE.BoxGeometry(2.4, 0.012, 1.1);
    const deskMat = new THREE.Mesh(matGeo, deskMatMaterial);
    deskMat.position.set(0.1, 0.006, 0.2);
    deskMat.receiveShadow = true;
    deskGroup.add(deskMat);

    // Floor shadow receiver
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.08 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.25;
    floor.receiveShadow = true;
    scene.add(floor);

    // Subtle background grid
    const gridHelper = new THREE.GridHelper(20, 20, 0xe4e4e7, 0xf4f4f5);
    gridHelper.position.y = -2.24;
    scene.add(gridHelper);

    // 4. INTERACTIVE 3D OBJECTS

    const interactiveObjects = [];

    // --- OBJECT 1: MONITOR ($120 - SabayView 4K Ultra Monitor) ---
    const monitorGroup = new THREE.Group();
    monitorGroup.position.set(0, 0, -0.4);
    monitorGroup.name = "prod-monitor";

    // Stand base
    const baseGeo = new THREE.BoxGeometry(0.65, 0.02, 0.45);
    const baseMesh = new THREE.Mesh(baseGeo, aluminumMaterial);
    baseMesh.position.y = 0.01;
    baseMesh.castShadow = true;
    monitorGroup.add(baseMesh);

    // Stand arm
    const standGeo = new THREE.BoxGeometry(0.1, 0.8, 0.06);
    const standMesh = new THREE.Mesh(standGeo, aluminumMaterial);
    standMesh.position.set(0, 0.4, -0.1);
    standMesh.castShadow = true;
    monitorGroup.add(standMesh);

    // Monitor frame/chassis
    const screenChassisGeo = new THREE.BoxGeometry(2.1, 1.25, 0.04);
    const screenChassis = new THREE.Mesh(screenChassisGeo, darkPlasticMaterial);
    screenChassis.position.set(0, 0.85, -0.05);
    screenChassis.castShadow = true;
    monitorGroup.add(screenChassis);

    // Active Monitor Screen texture (SabayTinh Pro Studio interface)
    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = 1024;
    screenCanvas.height = 600;
    const sCtx = screenCanvas.getContext("2d");
    if (sCtx) {
      sCtx.fillStyle = "#0c0d12";
      sCtx.fillRect(0, 0, 1024, 600);
      
      // Top bar
      sCtx.fillStyle = "#18181b";
      sCtx.fillRect(0, 0, 1024, 38);
      sCtx.fillStyle = "#ffffff";
      sCtx.font = "bold 16px -apple-system, BlinkMacSystemFont, sans-serif";
      sCtx.fillText("SabayTinh Studio OS - Ultra 4K Display (100Hz HDR)", 24, 25);

      // Glowing dashboard widgets
      sCtx.fillStyle = "#27272a";
      sCtx.roundRect(40, 70, 440, 220, 12);
      sCtx.fill();
      sCtx.fillStyle = "#10b981";
      sCtx.font = "bold 22px monospace";
      sCtx.fillText("LIVE REVENUE: $18,450.00", 65, 120);
      sCtx.fillStyle = "#a1a1aa";
      sCtx.font = "14px monospace";
      sCtx.fillText("Bakong KHQR Transactions: 99.4% Success", 65, 155);
      sCtx.fillText("Active Orders: ORD-0001 to ORD-0842", 65, 185);

      // Right widget (code preview)
      sCtx.fillStyle = "#1c1917";
      sCtx.roundRect(510, 70, 470, 480, 12);
      sCtx.fill();
      sCtx.fillStyle = "#38bdf8";
      sCtx.font = "15px monospace";
      sCtx.fillText("const order = new SabayTinhCheckout({", 535, 115);
      sCtx.fillStyle = "#fbbf24";
      sCtx.fillText('  product: "Laptop $650 + Monitor $120",', 535, 145);
      sCtx.fillStyle = "#4ade80";
      sCtx.fillText('  gateway: "KHQR_BAKONG_INSTANT",', 535, 175);
      sCtx.fillStyle = "#f43f5e";
      sCtx.fillText('  status: "Order Placed Successfully"', 535, 205);
      sCtx.fillStyle = "#e2e8f0";
      sCtx.fillText("});", 535, 235);
      sCtx.fillText("await order.processDelivery();", 535, 275);
    }
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });
    const screenGeo = new THREE.PlaneGeometry(2.04, 1.19);
    const screenMesh = new THREE.Mesh(screenGeo, screenMaterial);
    screenMesh.position.set(0, 0.85, -0.028);
    monitorGroup.add(screenMesh);

    deskGroup.add(monitorGroup);
    interactiveObjects.push({
      group: monitorGroup,
      productId: "prod-monitor",
      lookAtPos: new THREE.Vector3(0, 0.85, -0.4),
      camPos: new THREE.Vector3(0, 1.15, 1.2),
      hitBox: screenChassis
    });

    // --- OBJECT 2: LAPTOP ($650 - SabayBook Pro Laptop) ---
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(-1.4, 0.01, 0.15);
    laptopGroup.rotation.y = 0.32; // Angled elegantly
    laptopGroup.name = "prod-laptop";

    // Base body
    const laptopBaseGeo = new THREE.BoxGeometry(0.85, 0.025, 0.58);
    const laptopBase = new THREE.Mesh(laptopBaseGeo, aluminumMaterial);
    laptopBase.position.y = 0.0125;
    laptopBase.castShadow = true;
    laptopGroup.add(laptopBase);

    // Keyboard recess & keys on laptop
    const lapKbGeo = new THREE.BoxGeometry(0.72, 0.008, 0.3);
    const lapKb = new THREE.Mesh(lapKbGeo, darkPlasticMaterial);
    lapKb.position.set(0, 0.026, -0.07);
    laptopGroup.add(lapKb);

    // Touchpad
    const trackpadGeo = new THREE.BoxGeometry(0.32, 0.005, 0.18);
    const trackpadMat = new THREE.MeshStandardMaterial({ color: 0x9ca3af, roughness: 0.3 });
    const trackpad = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpad.position.set(0, 0.026, 0.16);
    laptopGroup.add(trackpad);

    // Laptop Lid / Display (Tilted at 110 degrees)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.025, -0.28);
    lidGroup.rotation.x = -1.22; // Open display angle

    const lidBackGeo = new THREE.BoxGeometry(0.85, 0.58, 0.015);
    const lidBack = new THREE.Mesh(lidBackGeo, aluminumMaterial);
    lidBack.position.set(0, 0.28, 0);
    lidBack.castShadow = true;
    lidGroup.add(lidBack);

    // Laptop screen texture
    const lapCanvas = document.createElement("canvas");
    lapCanvas.width = 512;
    lapCanvas.height = 340;
    const lCtx = lapCanvas.getContext("2d");
    if (lCtx) {
      lCtx.fillStyle = "#18181b";
      lCtx.fillRect(0, 0, 512, 340);
      lCtx.fillStyle = "#ffffff";
      lCtx.font = "bold 26px sans-serif";
      lCtx.fillText("SabayBook Pro 14\"", 32, 50);
      lCtx.fillStyle = "#10b981";
      lCtx.font = "20px monospace";
      lCtx.fillText("Price: $650.00 USD", 32, 90);
      lCtx.fillStyle = "#a1a1aa";
      lCtx.font = "16px sans-serif";
      lCtx.fillText("16GB Unified RAM • 512GB SSD", 32, 130);
      lCtx.fillText("120Hz Liquid Retina Display", 32, 160);
      lCtx.fillStyle = "#ffffff";
      lCtx.fillRect(32, 220, 180, 44);
      lCtx.fillStyle = "#09090b";
      lCtx.font = "bold 16px sans-serif";
      lCtx.fillText("Shop Laptop ->", 50, 248);
    }
    const lapTex = new THREE.CanvasTexture(lapCanvas);
    const lapScreenGeo = new THREE.PlaneGeometry(0.81, 0.54);
    const lapScreenMat = new THREE.MeshBasicMaterial({ map: lapTex });
    const lapScreen = new THREE.Mesh(lapScreenGeo, lapScreenMat);
    lapScreen.position.set(0, 0.28, 0.009);
    lidGroup.add(lapScreen);

    laptopGroup.add(lidGroup);
    deskGroup.add(laptopGroup);

    interactiveObjects.push({
      group: laptopGroup,
      productId: "prod-laptop",
      lookAtPos: new THREE.Vector3(-1.4, 0.25, 0.15),
      camPos: new THREE.Vector3(-1.2, 0.8, 1.4),
      hitBox: laptopBase
    });

    // --- OBJECT 3: KEYBOARD ($25 - SabayKeys Tactile Mechanical Keyboard) ---
    const keyboardGroup = new THREE.Group();
    keyboardGroup.position.set(-0.05, 0.015, 0.28);
    keyboardGroup.name = "prod-keyboard";

    const kbBodyGeo = new THREE.BoxGeometry(0.92, 0.032, 0.36);
    const kbBody = new THREE.Mesh(kbBodyGeo, darkPlasticMaterial);
    kbBody.position.y = 0.016;
    kbBody.castShadow = true;
    keyboardGroup.add(kbBody);

    // Keycaps layout
    const keysGroup = new THREE.Group();
    const rows = 5;
    const cols = 14;
    const keyGeo = new THREE.BoxGeometry(0.048, 0.018, 0.048);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const isAccent = (r === 4 && (c >= 4 && c <= 8)); // Spacebar or enter
        const keyMesh = new THREE.Mesh(
          isAccent ? new THREE.BoxGeometry(0.24, 0.018, 0.048) : keyGeo,
          isAccent ? new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 }) : keycapMaterial
        );
        const xOffset = isAccent ? 0 : (c - cols / 2 + 0.5) * 0.06;
        keyMesh.position.set(xOffset, 0.038, (r - rows / 2 + 0.5) * 0.06);
        keysGroup.add(keyMesh);
        if (isAccent) break;
      }
    }
    keyboardGroup.add(keysGroup);

    deskGroup.add(keyboardGroup);
    interactiveObjects.push({
      group: keyboardGroup,
      productId: "prod-keyboard",
      lookAtPos: new THREE.Vector3(-0.05, 0.1, 0.28),
      camPos: new THREE.Vector3(-0.05, 0.8, 0.95),
      hitBox: kbBody
    });

    // --- OBJECT 4: MOUSE ($15 - SabayGrip Precision Wireless Mouse) ---
    const mouseGroup = new THREE.Group();
    mouseGroup.position.set(0.85, 0.015, 0.32);
    mouseGroup.rotation.y = -0.15;
    mouseGroup.name = "prod-mouse";

    // Sculpted ergonomic mouse body
    const mouseGeo = new THREE.SphereGeometry(0.12, 24, 20);
    mouseGeo.scale(0.8, 0.45, 1.4);
    const mouseMesh = new THREE.Mesh(mouseGeo, darkPlasticMaterial);
    mouseMesh.position.y = 0.04;
    mouseMesh.castShadow = true;
    mouseGroup.add(mouseMesh);

    // Scroll wheel
    const wheelGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.01, 16);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8, roughness: 0.2 });
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(0, 0.082, -0.06);
    mouseGroup.add(wheel);

    deskGroup.add(mouseGroup);
    interactiveObjects.push({
      group: mouseGroup,
      productId: "prod-mouse",
      lookAtPos: new THREE.Vector3(0.85, 0.1, 0.32),
      camPos: new THREE.Vector3(0.85, 0.7, 0.9),
      hitBox: mouseMesh
    });

    // Decorative Ambient Desk Plant (Adds luxury classic workspace aesthetic)
    const plantGroup = new THREE.Group();
    plantGroup.position.set(1.7, 0.01, -0.5);
    const potGeo = new THREE.CylinderGeometry(0.14, 0.1, 0.26, 24);
    const potMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 });
    const pot = new THREE.Mesh(potGeo, potMat);
    pot.position.y = 0.13;
    pot.castShadow = true;
    plantGroup.add(pot);

    const foliageGeo = new THREE.DodecahedronGeometry(0.22, 1);
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.7 });
    const foliage = new THREE.Mesh(foliageGeo, foliageMat);
    foliage.position.y = 0.34;
    foliage.castShadow = true;
    plantGroup.add(foliage);
    deskGroup.add(plantGroup);

    // Ceramic Coffee Mug
    const mugGroup = new THREE.Group();
    mugGroup.position.set(-1.8, 0.01, -0.4);
    const mugGeo = new THREE.CylinderGeometry(0.1, 0.09, 0.22, 24);
    const mugMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.2 });
    const mug = new THREE.Mesh(mugGeo, mugMat);
    mug.position.y = 0.11;
    mug.castShadow = true;
    mugGroup.add(mug);
    deskGroup.add(mugGroup);

    sceneState.current.interactiveMeshes = interactiveObjects;

    // 5. Raycasting for mouse interactions
    const raycaster = new THREE.Raycaster();
    const mouseCoords = new THREE.Vector2();

    const getRaycastHit = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      mouseCoords.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseCoords.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouseCoords, camera);

      const hitList = interactiveObjects.map((io) => io.hitBox);
      const intersects = raycaster.intersectObjects(hitList, true);
      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;
        const matched = interactiveObjects.find(
          (io) => io.hitBox === hitMesh || io.group.getObjectById(hitMesh.id)
        );
        return matched || null;
      }
      return null;
    };

    const handlePointerMove = (e) => {
      if (sceneState.current.isDragging) {
        const deltaX = e.clientX - sceneState.current.prevMousePos.x;
        const deltaY = e.clientY - sceneState.current.prevMousePos.y;
        sceneState.current.prevMousePos = { x: e.clientX, y: e.clientY };

        deskGroup.rotation.y += deltaX * 0.005;
        // Limit tilt
        deskGroup.rotation.x = Math.max(-0.2, Math.min(0.2, deskGroup.rotation.x + deltaY * 0.003));
        return;
      }

      // Hover check
      const matched = getRaycastHit(e.clientX, e.clientY);
      if (matched) {
        const prod = PRODUCTS.find((p) => p.id === matched.productId);
        setHoveredProduct(prod);
        container.style.cursor = "pointer";
      } else {
        setHoveredProduct(null);
        container.style.cursor = "grab";
      }
    };

    const handlePointerDown = (e) => {
      sceneState.current.isDragging = true;
      sceneState.current.prevMousePos = { x: e.clientX, y: e.clientY };
      container.style.cursor = "grabbing";
    };

    const handlePointerUp = (e) => {
      const wasDragging = sceneState.current.isDragging;
      sceneState.current.isDragging = false;
      container.style.cursor = "grab";

      // If clicked without substantial drag, treat as select
      const matched = getRaycastHit(e.clientX, e.clientY);
      if (matched) {
        const prod = PRODUCTS.find((p) => p.id === matched.productId);
        if (prod) {
          selectItemView(matched.productId);
        }
      }
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 6. Animation Loop with smooth Camera Lerp
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Subtle auto-rotation if enabled and not currently dragging
      if (isAutoRotate && !sceneState.current.isDragging && activeCameraTarget === "all") {
        deskGroup.rotation.y += delta * 0.08;
      }

      // Smooth camera position and lookAt interpolation
      camera.position.lerp(sceneState.current.targetPosition, 0.06);
      sceneState.current.currentLookAt.lerp(sceneState.current.targetLookAt, 0.06);
      camera.lookAt(sceneState.current.currentLookAt);

      // Subtle float animation on hovered object
      interactiveObjects.forEach((io) => {
        if (hoveredProduct && io.productId === hoveredProduct.id) {
          io.group.position.y = THREE.MathUtils.lerp(io.group.position.y, 0.06, 0.1);
        } else {
          io.group.position.y = THREE.MathUtils.lerp(io.group.position.y, 0.015, 0.1);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isAutoRotate]);

  // Camera Target Swapper function
  const selectItemView = (targetKey) => {
    setActiveCameraTarget(targetKey);
    const state = sceneState.current;

    if (targetKey === "all") {
      state.targetPosition.set(0, 2.0, 4.4);
      state.targetLookAt.set(0, 0.4, 0);
      setSelectedProduct(null);
      return;
    }

    const matched = state.interactiveMeshes.find((io) => io.productId === targetKey);
    if (matched) {
      state.targetPosition.copy(matched.camPos);
      state.targetLookAt.copy(matched.lookAtPos);
      const prod = PRODUCTS.find((p) => p.id === targetKey);
      setSelectedProduct(prod);
    }
  };

  const handleQuickAdd = (product, e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1200);
  };

  return (
    <section id="interactive-desk" className="relative w-full py-12 bg-white border-b border-neutral-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-neutral-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-800 border border-neutral-300 mb-3 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-neutral-900" />
              Interactive 3D Workspace Experience
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
              Explore the SabayTinh Desk Setup
            </h2>
            <p className="mt-2 text-base text-neutral-600 max-w-2xl">
              Rotate, drag, and click on any hardware on the desk—<strong>Laptop</strong>, <strong>Monitor</strong>, <strong>Keyboard</strong>, or <strong>Mouse</strong>—to inspect live specifications and add directly to your cart.
            </p>
          </div>

          {/* Quick Filter Pill Buttons */}
          <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-2">
            <button
              onClick={() => selectItemView("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCameraTarget === "all"
                  ? "bg-neutral-950 text-white shadow-sm"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              Full Desk View
            </button>
            {PRODUCTS.map((prod) => (
              <button
                key={prod.id}
                onClick={() => selectItemView(prod.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCameraTarget === prod.id
                    ? "bg-neutral-950 text-white shadow-sm"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {prod.name.split(" ")[1] || prod.name} ({formatPrice(prod.price)})
              </button>
            ))}
          </div>
        </div>

        {/* 3D Canvas Box Container */}
        <div className="relative w-full h-[520px] sm:h-[600px] rounded-3xl bg-neutral-50/60 border border-neutral-200 shadow-sm overflow-hidden select-none">
          
          {/* Real Three.js Canvas Element */}
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Floating Top-Left Controls */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <button
              onClick={() => setIsAutoRotate(!isAutoRotate)}
              title="Toggle Auto-Rotation"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all border ${
                isAutoRotate
                  ? "bg-white/90 text-neutral-900 border-neutral-300 shadow-xs"
                  : "bg-neutral-200/80 text-neutral-600 border-neutral-300"
              }`}
            >
              <RotateCw className={`w-3.5 h-3.5 ${isAutoRotate ? "animate-spin" : ""}`} style={{ animationDuration: "6s" }} />
              {isAutoRotate ? "Orbiting" : "Paused"}
            </button>

            <button
              onClick={() => selectItemView("all")}
              title="Reset 3D Camera"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/90 text-neutral-800 border border-neutral-300 shadow-xs hover:bg-white transition-all backdrop-blur-md"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Reset Angle
            </button>
          </div>

          {/* Instructions Pill (Center Top) */}
          <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/90 text-neutral-600 border border-neutral-200/80 backdrop-blur-md shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Click any item on table to inspect specs
          </div>

          {/* Dynamic Floating Hover Badge */}
          {hoveredProduct && !selectedProduct && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-200">
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-neutral-950 text-white shadow-xl border border-neutral-800">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  {hoveredProduct.category}
                </span>
                <span className="text-sm font-semibold">{hoveredProduct.name}</span>
                <span className="text-sm font-mono text-emerald-400 font-bold">
                  {formatPrice(hoveredProduct.price)}
                </span>
                <span className="text-xs text-neutral-400 ml-1">Click to view</span>
              </div>
            </div>
          )}

          {/* Focused 3D Product Detail Floating Glass Card (When an item is clicked/focused) */}
          {selectedProduct && (
            <div className="absolute bottom-4 right-4 max-w-sm sm:max-w-md w-full z-20 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
              <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-neutral-200 shadow-2xl">
                
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-neutral-100 text-neutral-800 border border-neutral-200">
                      {selectedProduct.badge}
                    </div>
                    <h3 className="mt-1 text-lg font-bold text-neutral-950">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-xs text-neutral-500">{selectedProduct.khmerName}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-extrabold text-neutral-950">
                      {formatPrice(selectedProduct.price)}
                    </div>
                    <div className="text-[11px] text-emerald-600 font-medium">In Stock • Phnom Penh</div>
                  </div>
                </div>

                {/* Short specs list */}
                <p className="mt-2.5 text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                  {selectedProduct.tagline}
                </p>

                {/* Mini specs chips */}
                <div className="mt-3 grid grid-cols-2 gap-1.5 text-[11px]">
                  {Object.entries(selectedProduct.specs).slice(0, 2).map(([key, val]) => (
                    <div key={key} className="p-1.5 rounded-lg bg-neutral-50 border border-neutral-100">
                      <span className="font-semibold text-neutral-500 block text-[10px] uppercase">{key}</span>
                      <span className="text-neutral-800 truncate block font-medium">{val}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedProductForModal(selectedProduct)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-neutral-100 text-neutral-800 hover:bg-neutral-200 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Full Details
                  </button>

                  <button
                    onClick={(e) => handleQuickAdd(selectedProduct, e)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-neutral-950 text-white hover:bg-neutral-800 transition-colors shadow-sm"
                  >
                    {addedAnim ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Add to Cart ({formatPrice(selectedProduct.price)})
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => selectItemView("all")}
                    className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                    title="Close preview"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Left 3D Hint */}
          <div className="absolute bottom-4 left-4 z-10 hidden md:flex items-center gap-2 text-[11px] text-neutral-500 font-mono bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-200">
            <span>🖱️ Drag to rotate 3D desk</span>
            <span>•</span>
            <span>🎯 Click item to zoom</span>
          </div>

        </div>

      </div>
    </section>
  );
}
