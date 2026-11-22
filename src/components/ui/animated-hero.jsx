import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { MoveRight, Sparkles, ArrowRight, RotateCw, Maximize2, ShoppingBag, Eye, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";

function Hero() {
  const { setSelectedProductForModal, addToCart, formatPrice } = useCart();

  // Animated title state
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["minimalist", "powerful", "beautiful", "precision", "effortless"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2200);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  // 3D Canvas states
  const mountRef = useRef(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [activeCameraTarget, setActiveCameraTarget] = useState("all");
  const [addedAnim, setAddedAnim] = useState(false);

  const sceneState = useRef({
    camera: null,
    targetPosition: new THREE.Vector3(0, 1.8, 4.2),
    targetLookAt: new THREE.Vector3(0, 0.4, 0),
    currentLookAt: new THREE.Vector3(0, 0.4, 0),
    isDragging: false,
    prevMousePos: { x: 0, y: 0 },
    interactiveMeshes: [],
    deskGroup: null
  });

  // Three.js 3D Desk Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfcfcfd);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 520;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 2.0, 4.4);
    sceneState.current.camera = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(4, 7, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    scene.add(dirLight);

    const softFillLight = new THREE.DirectionalLight(0xe0e7ff, 0.8);
    softFillLight.position.set(-5, 4, -2);
    scene.add(softFillLight);

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

    // Desk Top
    const deskTopGeo = new THREE.BoxGeometry(4.8, 0.1, 2.6);
    const deskTopMesh = new THREE.Mesh(deskTopGeo, woodDeskMaterial);
    deskTopMesh.position.y = -0.05;
    deskTopMesh.receiveShadow = true;
    deskGroup.add(deskTopMesh);

    // Slim black desk legs
    const legGeo = new THREE.CylinderGeometry(0.035, 0.035, 2.2, 16);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.5, metalness: 0.8 });
    [
      [-2.2, -1.15, -1.1],
      [2.2, -1.15, -1.1],
      [-2.2, -1.15, 1.1],
      [2.2, -1.15, 1.1]
    ].forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(x, y, z);
      leg.castShadow = true;
      deskGroup.add(leg);
    });

    // Desk Mat
    const matGeo = new THREE.BoxGeometry(2.4, 0.012, 1.1);
    const deskMat = new THREE.Mesh(matGeo, deskMatMaterial);
    deskMat.position.set(0.1, 0.006, 0.2);
    deskMat.receiveShadow = true;
    deskGroup.add(deskMat);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(20, 20, 0xe4e4e7, 0xf4f4f5);
    gridHelper.position.y = -2.24;
    scene.add(gridHelper);

    const interactiveObjects = [];

    // --- 1. MONITOR ($120) ---
    const monitorGroup = new THREE.Group();
    monitorGroup.position.set(0, 0, -0.4);
    monitorGroup.name = "prod-monitor";

    const baseGeo = new THREE.BoxGeometry(0.65, 0.02, 0.45);
    const baseMesh = new THREE.Mesh(baseGeo, aluminumMaterial);
    baseMesh.position.y = 0.01;
    baseMesh.castShadow = true;
    monitorGroup.add(baseMesh);

    const standGeo = new THREE.BoxGeometry(0.1, 0.8, 0.06);
    const standMesh = new THREE.Mesh(standGeo, aluminumMaterial);
    standMesh.position.set(0, 0.4, -0.1);
    standMesh.castShadow = true;
    monitorGroup.add(standMesh);

    const screenChassisGeo = new THREE.BoxGeometry(2.1, 1.25, 0.04);
    const screenChassis = new THREE.Mesh(screenChassisGeo, darkPlasticMaterial);
    screenChassis.position.set(0, 0.85, -0.05);
    screenChassis.castShadow = true;
    monitorGroup.add(screenChassis);

    // Screen texture
    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = 1024;
    screenCanvas.height = 600;
    const sCtx = screenCanvas.getContext("2d");
    if (sCtx) {
      sCtx.fillStyle = "#0c0d12";
      sCtx.fillRect(0, 0, 1024, 600);
      sCtx.fillStyle = "#18181b";
      sCtx.fillRect(0, 0, 1024, 40);
      sCtx.fillStyle = "#ffffff";
      sCtx.font = "bold 18px -apple-system, sans-serif";
      sCtx.fillText("SabayTinh • Ultra 4K Display (100Hz HDR)", 24, 26);

      sCtx.fillStyle = "#18181b";
      sCtx.roundRect(40, 70, 440, 240, 12);
      sCtx.fill();
      sCtx.fillStyle = "#ffffff";
      sCtx.font = "bold 24px monospace";
      sCtx.fillText("SABAYVIEW 4K", 65, 125);
      sCtx.fillStyle = "#a1a1aa";
      sCtx.font = "14px monospace";
      sCtx.fillText("Resolution: 3840 x 2160 UHD", 65, 160);
      sCtx.fillText("USB-C 65W Power Delivery", 65, 190);
      sCtx.fillText("Price: $120.00 USD", 65, 225);

      sCtx.fillStyle = "#18181b";
      sCtx.roundRect(510, 70, 470, 480, 12);
      sCtx.fill();
      sCtx.fillStyle = "#ffffff";
      sCtx.font = "16px monospace";
      sCtx.fillText("// SabayTinh Workspace Setup", 535, 115);
      sCtx.fillStyle = "#a1a1aa";
      sCtx.fillText("const display = new Monitor({", 535, 155);
      sCtx.fillText('  model: "SabayView 4K",', 535, 185);
      sCtx.fillText("  price: 120,", 535, 215);
      sCtx.fillText('  status: "In Stock"', 535, 245);
      sCtx.fillText("});", 535, 275);
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

    // --- 2. LAPTOP ($650) ---
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(-1.4, 0.01, 0.15);
    laptopGroup.rotation.y = 0.32;
    laptopGroup.name = "prod-laptop";

    const laptopBaseGeo = new THREE.BoxGeometry(0.85, 0.025, 0.58);
    const laptopBase = new THREE.Mesh(laptopBaseGeo, aluminumMaterial);
    laptopBase.position.y = 0.0125;
    laptopBase.castShadow = true;
    laptopGroup.add(laptopBase);

    const lapKbGeo = new THREE.BoxGeometry(0.72, 0.008, 0.3);
    const lapKb = new THREE.Mesh(lapKbGeo, darkPlasticMaterial);
    lapKb.position.set(0, 0.026, -0.07);
    laptopGroup.add(lapKb);

    const trackpadGeo = new THREE.BoxGeometry(0.32, 0.005, 0.18);
    const trackpadMat = new THREE.MeshStandardMaterial({ color: 0x9ca3af, roughness: 0.3 });
    const trackpad = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpad.position.set(0, 0.026, 0.16);
    laptopGroup.add(trackpad);

    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.025, -0.28);
    lidGroup.rotation.x = -1.22;

    const lidBackGeo = new THREE.BoxGeometry(0.85, 0.58, 0.015);
    const lidBack = new THREE.Mesh(lidBackGeo, aluminumMaterial);
    lidBack.position.set(0, 0.28, 0);
    lidBack.castShadow = true;
    lidGroup.add(lidBack);

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
      lCtx.font = "bold 20px monospace";
      lCtx.fillText("$650.00 USD", 32, 90);
      lCtx.fillStyle = "#a1a1aa";
      lCtx.font = "15px sans-serif";
      lCtx.fillText("16GB RAM • 512GB SSD", 32, 130);
      lCtx.fillText("120Hz Liquid Retina", 32, 160);
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

    // --- 3. KEYBOARD ($25) ---
    const keyboardGroup = new THREE.Group();
    keyboardGroup.position.set(-0.05, 0.015, 0.28);
    keyboardGroup.name = "prod-keyboard";

    const kbBodyGeo = new THREE.BoxGeometry(0.92, 0.032, 0.36);
    const kbBody = new THREE.Mesh(kbBodyGeo, darkPlasticMaterial);
    kbBody.position.y = 0.016;
    kbBody.castShadow = true;
    keyboardGroup.add(kbBody);

    const keysGroup = new THREE.Group();
    const rows = 5;
    const cols = 14;
    const keyGeo = new THREE.BoxGeometry(0.048, 0.018, 0.048);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const isAccent = (r === 4 && (c >= 4 && c <= 8));
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

    // --- 4. MOUSE ($15) ---
    const mouseGroup = new THREE.Group();
    mouseGroup.position.set(0.85, 0.015, 0.32);
    mouseGroup.rotation.y = -0.15;
    mouseGroup.name = "prod-mouse";

    const mouseGeo = new THREE.SphereGeometry(0.12, 24, 20);
    mouseGeo.scale(0.8, 0.45, 1.4);
    const mouseMesh = new THREE.Mesh(mouseGeo, darkPlasticMaterial);
    mouseMesh.position.y = 0.04;
    mouseMesh.castShadow = true;
    mouseGroup.add(mouseMesh);

    deskGroup.add(mouseGroup);
    interactiveObjects.push({
      group: mouseGroup,
      productId: "prod-mouse",
      lookAtPos: new THREE.Vector3(0.85, 0.1, 0.32),
      camPos: new THREE.Vector3(0.85, 0.7, 0.9),
      hitBox: mouseMesh
    });

    sceneState.current.interactiveMeshes = interactiveObjects;

    // Raycaster
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
        return interactiveObjects.find(
          (io) => io.hitBox === hitMesh || io.group.getObjectById(hitMesh.id)
        );
      }
      return null;
    };

    const handlePointerMove = (e) => {
      if (sceneState.current.isDragging) {
        const deltaX = e.clientX - sceneState.current.prevMousePos.x;
        const deltaY = e.clientY - sceneState.current.prevMousePos.y;
        sceneState.current.prevMousePos = { x: e.clientX, y: e.clientY };

        deskGroup.rotation.y += deltaX * 0.005;
        deskGroup.rotation.x = Math.max(-0.2, Math.min(0.2, deskGroup.rotation.x + deltaY * 0.003));
        return;
      }

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
      sceneState.current.isDragging = false;
      container.style.cursor = "grab";

      const matched = getRaycastHit(e.clientX, e.clientY);
      if (matched) {
        selectItemView(matched.productId);
      }
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (isAutoRotate && !sceneState.current.isDragging && activeCameraTarget === "all") {
        deskGroup.rotation.y += delta * 0.08;
      }

      camera.position.lerp(sceneState.current.targetPosition, 0.06);
      sceneState.current.currentLookAt.lerp(sceneState.current.targetLookAt, 0.06);
      camera.lookAt(sceneState.current.currentLookAt);

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

  const scrollToCatalog = () => {
    const el = document.getElementById("products-catalog");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="interactive-desk" className="relative w-full bg-white border-b border-neutral-200 overflow-hidden py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Grid: Left = Typography & CTAs, Right = Interactive 3D Desk */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Side: Modern Animated Hero Content */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-6">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-neutral-100 text-black border border-neutral-200">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Next-Gen Workspace Hardware</span>
              <MoveRight className="w-3.5 h-3.5 text-neutral-400" />
            </div>

            {/* Animated Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black leading-[1.08]">
                <span>Workspace built to be</span>
                <span className="relative flex w-full overflow-hidden h-14 sm:h-16 lg:h-18 mt-1">
                  &nbsp;
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className="absolute font-black text-black underline decoration-neutral-300 underline-offset-8"
                      initial={{ opacity: 0, y: -70 }}
                      transition={{ type: "spring", stiffness: 60, damping: 15 }}
                      animate={
                        titleNumber === index
                          ? { y: 0, opacity: 1 }
                          : { y: titleNumber > index ? -70 : 70, opacity: 0 }
                      }
                    >
                      {title}
                    </motion.span>
                  ))}
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed max-w-lg">
              Curated hardware essentials designed for peak focus and productivity. Explore the 4 signature essentials in real-time 3D.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button 
                size="lg" 
                className="gap-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs font-bold shadow-sm"
                onClick={() => selectItemView("all")}
              >
                <span>Explore 3D Setup</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
              
              <Button 
                size="lg" 
                className="gap-2 rounded-xl text-xs font-bold border-neutral-300" 
                variant="outline"
                onClick={scrollToCatalog}
              >
                <span>View Products</span>
              </Button>
            </div>

            {/* Interactive 3D Device Focus Chips */}
            <div className="pt-4 border-t border-neutral-100 w-full space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                Focus 3D Device on Desk:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => selectItemView("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeCameraTarget === "all"
                      ? "bg-black text-white"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  All View
                </button>
                {PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => selectItemView(prod.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeCameraTarget === prod.id
                        ? "bg-black text-white"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    {prod.name.split(" ")[1] || prod.name} ({formatPrice(prod.price)})
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side: The Interactive 3D Computer Desk */}
          <div className="lg:col-span-7 w-full">
            <div className="relative w-full h-[460px] sm:h-[520px] rounded-3xl bg-neutral-50/70 border border-neutral-200 overflow-hidden select-none shadow-xs">
              
              {/* Three.js Canvas */}
              <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

              {/* Canvas Controls */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <button
                  onClick={() => setIsAutoRotate(!isAutoRotate)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/90 text-neutral-800 border border-neutral-200 backdrop-blur-md shadow-2xs hover:bg-white"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isAutoRotate ? "animate-spin" : ""}`} style={{ animationDuration: "6s" }} />
                  {isAutoRotate ? "Rotate" : "Paused"}
                </button>

                <button
                  onClick={() => selectItemView("all")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/90 text-neutral-800 border border-neutral-200 backdrop-blur-md shadow-2xs hover:bg-white"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  Reset View
                </button>
              </div>

              {/* Instructions Badge */}
              <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium bg-white/90 text-neutral-600 border border-neutral-200 backdrop-blur-md shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                Click item on desk to inspect
              </div>

              {/* Hover Badge */}
              {hoveredProduct && !selectedProduct && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                  <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-black text-white text-xs font-semibold shadow-lg">
                    <span>{hoveredProduct.name}</span>
                    <span className="font-mono text-neutral-300">
                      {formatPrice(hoveredProduct.price)}
                    </span>
                  </div>
                </div>
              )}

              {/* Focused 3D Product Detail Card */}
              {selectedProduct && (
                <div className="absolute bottom-4 right-4 max-w-sm w-full z-20 animate-in fade-in slide-in-from-bottom-2">
                  <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-neutral-200 shadow-xl">
                    
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                          {selectedProduct.category}
                        </span>
                        <h3 className="text-sm font-bold text-black mt-0.5">
                          {selectedProduct.name}
                        </h3>
                      </div>
                      <div className="text-right font-mono font-black text-base text-black">
                        {formatPrice(selectedProduct.price)}
                      </div>
                    </div>

                    <p className="mt-1.5 text-xs text-neutral-600 line-clamp-2">
                      {selectedProduct.description}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => setSelectedProductForModal(selectedProduct)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-neutral-100 text-black hover:bg-neutral-200 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Details
                      </button>

                      <button
                        onClick={(e) => handleQuickAdd(selectedProduct, e)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-black text-white hover:bg-neutral-800 transition-colors"
                      >
                        {addedAnim ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Added
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Add ({formatPrice(selectedProduct.price)})
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => selectItemView("all")}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-black transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export { Hero };
