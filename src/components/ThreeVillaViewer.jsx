import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { 
  Sun, Moon, Sunset, RotateCcw, 
  Layers, Eye, Sparkles, Compass, Check,
  Home, Building2, MapPin, Maximize2, Crown,
  ZoomIn, ZoomOut, Waves, Car
} from 'lucide-react';

export default function ThreeVillaViewer({ onBookTour }) {
  const mountRef = useRef(null);
  const [timeOfDay, setTimeOfDay] = useState('sunset'); // 'day' | 'sunset' | 'night'
  const [isAutoRotate, setIsAutoRotate] = useState(false); // Default to OFF for rock-solid stability!
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [cameraPreset, setCameraPreset] = useState('panoramic');
  const [activeModel, setActiveModel] = useState('mansion'); // 'mansion' | 'villa'
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [solarHour, setSolarHour] = useState(16.5); // 6.0 (Dawn) to 19.0 (Dusk) - Golden hour default 16:30
  const [showDimensions, setShowDimensions] = useState(false); // Architectural Caliper Dimension Overlay
  const [activeSpatialLens, setActiveSpatialLens] = useState('all'); // 'all' | 'architecture' | 'gardens' | 'interior'

  // Three.js internal references
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const currentModelGroupRef = useRef(null);
  const lightsRef = useRef({});
  const starsGroupRef = useRef(null);
  const dimensionGroupRef = useRef(null);
  const isTransitioningCamera = useRef(false);
  const mobileRibbonRef = useRef(null);

  const scrollMobileRibbon = (direction) => {
    if (mobileRibbonRef.current) {
      mobileRibbonRef.current.scrollBy({
        left: direction * 140,
        behavior: 'smooth'
      });
    }
  };

  // Update directional sunlight trajectory according to solar hour (6 AM - 7 PM)
  const updateSolarTrajectory = (hour) => {
    setSolarHour(hour);
    const lights = lightsRef.current;
    const scene = sceneRef.current;
    if (!lights?.sun || !scene) return;

    // Angle from east (morning) to zenith (noon) to west (sunset)
    // 6:00 -> -PI/2, 12:00 -> 0, 18:00 -> PI/2
    const normalizedTime = (hour - 6) / 12; // 0 to 1
    const sunAngle = (normalizedTime - 0.5) * Math.PI * 0.95; // Sweep angle
    const sunElevation = Math.sin(normalizedTime * Math.PI) * 45 + 5; // Sun height
    const radius = 55;

    const sunX = Math.sin(sunAngle) * radius;
    const sunY = Math.max(sunElevation, 4);
    const sunZ = Math.cos(sunAngle) * radius * 0.6;

    lights.sun.position.set(sunX, sunY, sunZ);

    // Warm sunset tone vs midday bright daylight
    if (hour < 8 || hour > 17) {
      lights.sun.color.set(0xff8038); // Golden hour warmth
      lights.sun.intensity = 2.8;
      lights.ambient.color.set(0xffc599);
      lights.ambient.intensity = 0.75;
    } else if (hour >= 11 && hour <= 14) {
      lights.sun.color.set(0xfffaed); // Noon pure white solar beam
      lights.sun.intensity = 3.4;
      lights.ambient.color.set(0xffffff);
      lights.ambient.intensity = 1.05;
    } else {
      lights.sun.color.set(0xffdfaa); // Warm afternoon light
      lights.sun.intensity = 3.0;
      lights.ambient.color.set(0xfdf0d5);
      lights.ambient.intensity = 0.9;
    }
  };

  // Dynamic Room & Feature Inspections for each model - Focusing on actual amenities: Pool, Garage, Wings & Gardens!
  // Authentic Architectural Focal Points for each building - Pristinely aligned with the real GLB geometry!
  const ROOM_CONFIGS = {
    mansion: [
      {
        id: "colonnade",
        title: "Imperial Colonnade & Great Hall",
        subtitle: "Heritage Doric Pillars & Dual Grand Staircases",
        type: "architecture",
        camPos: new THREE.Vector3(0, 3.8, 16.0),
        camLook: new THREE.Vector3(0, 2.2, 3.5),
        specs: "Classical Doric Portico • Symmetrical Sweeping Stairways • Limestone Balustrades",
        desc: "Stately monumental classical arrival facade featuring symmetrical ascending grand staircases, dual-tiered Italian balustrades, and hand-carved limestone archways."
      },
      {
        id: "parterre",
        title: "Renaissance Parterre Gardens",
        subtitle: "Symmetrical Topiary Maze & Cypress Allee",
        type: "gardens",
        camPos: new THREE.Vector3(0.0, 14.0, -18.0),
        camLook: new THREE.Vector3(0.0, 3.0, 2.0),
        specs: "22,400 sq ft Formal Landscape • Manicured Boxwood Parterres • Tuscan Cypress Borders",
        desc: "Bespoke Italian Renaissance parterre gardens with geometric knot garden hedging, statuesque gravel promenades, and mature Mediterranean cypress colonnades."
      },
      {
        id: "fountain",
        title: "Central Italian Fountain Court",
        subtitle: "Cascading Carved Stone Basin & Reflecting Circle",
        type: "exterior",
        camPos: new THREE.Vector3(-6.5, 4.2, 10.5),
        camLook: new THREE.Vector3(0.0, 1.2, 4.0),
        specs: "Hand-Hewn Travertine Basin • Recirculating Aeration • Architectural Pathway Illumination",
        desc: "Low-profile classical water feature anchoring the ceremonial motor court, casting soft reflections of the palazzo facade during sunset golden hour."
      },
      {
        id: "reception",
        title: "Double-Height Primary Piano Nobile",
        subtitle: "26-ft Ceilings, Heritage Architraves & Great Salon",
        type: "interior",
        camPos: new THREE.Vector3(3.2, 5.0, 7.5),
        camLook: new THREE.Vector3(0.0, 3.5, 0.0),
        specs: "26-ft Soaring Ceilings • Herringbone Parquet Flooring • Classical Moulded Architraves",
        desc: "The primary noble entertaining floor commanding elevated views across the estate lawns, featuring monumental sash casements and stately volume proportions."
      },
      {
        id: "upper_loggia",
        title: "Master Suite Upper Belvedere",
        subtitle: "Panoramic Promenade Balcony & Ocean Balustrade",
        type: "interior",
        camPos: new THREE.Vector3(7.5, 9.0, 13.0),
        camLook: new THREE.Vector3(1.0, 5.5, 2.0),
        specs: "Private Upper Belvedere • Handcrafted Pilaster Accents • Direct Arabian Sea Sightlines",
        desc: "Elevated second-floor master suite opening onto a private panoramic belvedere commanding unobstructed horizons across the manicured formal grounds."
      }
    ],
    villa: [
      {
        id: "cantilever",
        title: "Cantilevered Master Wing",
        subtitle: "Post-Tensioned Floating Volume with Zero Ground Piers",
        type: "architecture",
        camPos: new THREE.Vector3(-12.0, 6.8, 14.0),
        camLook: new THREE.Vector3(0.5, 3.5, 0.0),
        specs: "Post-Tensioned Aeronautical Steel • Motorized Aluminum Louvers • Cedar Underside Soffits",
        desc: "Bold modernist architectural volume projecting dramatically into open space without visible ground supports, maximizing natural subtropical cross-ventilation."
      },
      {
        id: "atrium",
        title: "Panoramic Glass Living Pavilion",
        subtitle: "Floor-to-Ceiling Acoustic Low-E Glass Walls",
        type: "interior",
        camPos: new THREE.Vector3(11.5, 4.5, 12.0),
        camLook: new THREE.Vector3(0.0, 2.2, 1.0),
        specs: "Low-E Triple Acoustic Glazing • 24-ft Continuous Heights • Motorized Concealed Sliders",
        desc: "Minimalist transparent living pavilion that dissolves the barrier between interior social spaces and the lush private palm canopy."
      },
      {
        id: "sky_terrace",
        title: "Upper Sunken Sky Terrace",
        subtitle: "Private Starlight Promenade & Outdoor Lounge",
        type: "exterior",
        camPos: new THREE.Vector3(0.0, 8.5, 16.0),
        camLook: new THREE.Vector3(0.0, 4.0, 2.0),
        specs: "Honed Flamed Basalt Decking • Integrated Perimeter Planters • Ambient Recessed Lighting",
        desc: "Elevated open-air terrace oriented toward the Goan sunset, featuring discrete teak lounge framing and architectural glass railings."
      },
      {
        id: "arrival_court",
        title: "Zen Arrival Courtyard",
        subtitle: "Monolithic Basalt Water Feature & Entry Portal",
        type: "gardens",
        camPos: new THREE.Vector3(10.0, 4.0, -9.0),
        camLook: new THREE.Vector3(-1.0, 2.0, 1.0),
        specs: "Honed Charcoal Granite • Reflecting Water Mirror • Tropical Frangipani Landscape",
        desc: "Contemplative entry arrival sequence featuring linear water mirrors and architectural concrete privacy baffles."
      }
    ]
  };

  const currentRooms = ROOM_CONFIGS[activeModel] || ROOM_CONFIGS.mansion;

  // Smooth, Non-Locking Camera Tween (Cancels instantly on user contact)
  const transitionCameraTo = (endPos, endTarget, duration = 750) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    // Turn off auto-rotate during transition
    controls.autoRotate = false;
    setIsAutoRotate(false);

    const startPos = camera.position.clone();
    const startTarget = controls.target.clone();
    const startTime = performance.now();
    isTransitioningCamera.current = true;

    const step = (currentTime) => {
      // If user starts dragging with mouse/touch, cancel tween instantly!
      if (!isTransitioningCamera.current) return;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Cubic Ease-In-Out
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      camera.position.lerpVectors(startPos, endPos, ease);
      controls.target.lerpVectors(startTarget, endTarget, ease);
      controls.update();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        isTransitioningCamera.current = false;
        camera.position.copy(endPos);
        controls.target.copy(endTarget);
        controls.update();
      }
    };

    requestAnimationFrame(step);
  };

  // Load selected GLB Model
  const loadGLTFModel = (modelKey) => {
    const scene = sceneRef.current;
    if (!scene) return;

    setIsLoading(true);
    setLoadProgress(15);

    // Dispose old model resources to free mobile GPU memory
    if (currentModelGroupRef.current) {
      currentModelGroupRef.current.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m?.dispose());
            } else {
              child.material.dispose();
            }
          }
        }
      });
      scene.remove(currentModelGroupRef.current);
      currentModelGroupRef.current = null;
    }

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
    dracoLoader.setDecoderPath(`${baseUrl}/draco/gltf/`);
    loader.setDRACOLoader(dracoLoader);

    const modelUrl = modelKey === 'mansion' 
      ? `${baseUrl}/models/luxury_grand_mansion.glb` 
      : `${baseUrl}/models/modern_home.glb`;

    loader.load(
      modelUrl,
      (gltf) => {
        const root = gltf.scene;
        currentModelGroupRef.current = root;

        // Auto compute bounding box for optimal centering & scale
        const box = new THREE.Box3().setFromObject(root);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z, 1);

        const targetScale = (modelKey === 'mansion' ? 24.0 : 25.0) / maxDim;
        root.scale.set(targetScale, targetScale, targetScale);
        root.updateMatrixWorld(true);

        // Center precisely on the orbit axis (0, 0, 0) and ground at Y = 0
        const scaledBox = new THREE.Box3().setFromObject(root);
        const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
        root.position.x -= scaledCenter.x;
        root.position.z -= scaledCenter.z;
        root.position.y -= scaledBox.min.y;
        root.updateMatrixWorld(true);

        // Enhance all materials for realistic PBR rendering
        const enhanceMat = (mat) => {
          if (!mat) return;
          mat.side = THREE.DoubleSide;
          if (mat.isMeshBasicMaterial) {
            const oldColor = mat.color ? mat.color.clone() : new THREE.Color(0xffffff);
            const oldMap = mat.map || null;
            mat = new THREE.MeshStandardMaterial({
              color: oldColor,
              map: oldMap,
              roughness: 0.55,
              metalness: 0.1,
              side: THREE.DoubleSide
            });
          } else {
            mat.roughness = Math.max(0.2, mat.roughness ?? 0.5);
            mat.metalness = Math.min(0.85, mat.metalness ?? 0.1);
            mat.needsUpdate = true;
          }
        };

        root.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (Array.isArray(child.material)) {
              child.material.forEach(enhanceMat);
            } else if (child.material) {
              enhanceMat(child.material);
            }
          }
        });

        scene.add(root);
        setIsLoading(false);
        setLoadProgress(100);

        // Establish clean establishing shot
        if (cameraRef.current && controlsRef.current) {
          const orbitTargetY = 3.6;
          controlsRef.current.target.set(0, orbitTargetY, 0);
          cameraRef.current.position.set(24, 15, 26);
          controlsRef.current.update();
        }
      },
      (xhr) => {
        if (xhr.lengthComputable && xhr.total > 0) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadProgress(percent);
        }
      },
      (error) => {
        console.error(`Error loading GLTF model ${modelUrl}:`, error);
        if (modelKey !== 'mansion') {
          console.warn("Failing over to sovereign grand mansion...");
          loadGLTFModel('mansion');
        } else {
          setIsLoading(false);
        }
      }
    );
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x131722);
    scene.fog = new THREE.FogExp2(0x131722, 0.012);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(28, 16, 28);
    cameraRef.current = camera;

    // 3. WebGL Renderer - Mobile performance optimized!
    const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobileDevice,
      powerPreference: 'high-performance',
      alpha: false,
      precision: isMobileDevice ? 'mediump' : 'highp',
      stencil: false
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isMobileDevice ? Math.min(window.devicePixelRatio, 1.4) : Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = isMobileDevice ? THREE.PCFShadowMap : THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. OrbitControls - Natural, fluid, non-blocking touch interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = isMobileDevice ? 0.12 : 0.08;
    controls.rotateSpeed = isMobileDevice ? 1.15 : 0.85; // Faster, lighter thumb rotation on mobile
    controls.zoomSpeed = isMobileDevice ? 1.25 : 1.0;
    controls.panSpeed = 0.8;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevent flipping below ground
    controls.minPolarAngle = 0.1; // Prevent top-pole gimbal lock
    controls.minDistance = 8;
    controls.maxDistance = 65;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.8;
    controls.target.set(0, 3.5, 0); // Fixed, stable center of orbit
    controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
    controlsRef.current = controls;

    // Cancel any scripted camera movement immediately on user contact
    controls.addEventListener('start', () => {
      isTransitioningCamera.current = false;
    });

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff8ed, 0.95);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffecd2, 3.2);
    sunLight.position.set(30, 48, 25);
    sunLight.castShadow = true;
    const shadowRes = isMobileDevice ? 1024 : 2048;
    sunLight.shadow.mapSize.width = shadowRes;
    sunLight.shadow.mapSize.height = shadowRes;
    sunLight.shadow.bias = -0.0003;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 180;
    sunLight.shadow.camera.left = -55;
    sunLight.shadow.camera.right = 55;
    sunLight.shadow.camera.top = 55;
    sunLight.shadow.camera.bottom = -55;
    scene.add(sunLight);

    // Warm Interior Point Lights
    const interiorLight1 = new THREE.PointLight(0xffbe6b, 3.8, 25);
    interiorLight1.position.set(0, 5.0, 0);
    scene.add(interiorLight1);

    const interiorLight2 = new THREE.PointLight(0xffd58a, 4.2, 30);
    interiorLight2.position.set(0, 10.0, 2);
    scene.add(interiorLight2);

    const poolLight = new THREE.PointLight(0x00f0ff, 2.5, 20);
    poolLight.position.set(0, 1.2, 14);
    scene.add(poolLight);

    lightsRef.current = {
      ambient: ambientLight,
      sun: sunLight,
      interior1: interiorLight1,
      interior2: interiorLight2,
      pool: poolLight
    };

    // 6. Starfield
    const starGeo = new THREE.BufferGeometry();
    const starCount = 800;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 350;
      starPositions[i + 1] = Math.random() * 120 + 10;
      starPositions[i + 2] = (Math.random() - 0.5) * 350;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.8, transparent: true, opacity: 0 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);
    starsGroupRef.current = starMat;

    // 7. Architectural Ground Podium
    const podiumGeo = new THREE.CylinderGeometry(55, 60, 1.6, 64);
    const podiumMat = new THREE.MeshStandardMaterial({
      color: 0x14171f,
      roughness: 0.85,
      metalness: 0.1
    });
    const podium = new THREE.Mesh(podiumGeo, podiumMat);
    podium.position.y = -0.8;
    podium.receiveShadow = true;
    scene.add(podium);

    // 7b. Architectural Caliper Dimension Rulers & Grid Group
    const dimGroup = new THREE.Group();
    dimGroup.visible = false;

    // Outer Plot Boundary Grid (Cadastral boundaries)
    const gridHelper = new THREE.GridHelper(38, 12, 0xd4af37, 0x334155);
    gridHelper.position.y = 0.05;
    dimGroup.add(gridHelper);

    // Architectural Dimension Crosshairs (X-span & Z-span)
    const lineMat = new THREE.LineBasicMaterial({ color: 0xd4af37, linewidth: 2 });
    const xPoints = [new THREE.Vector3(-14, 0.1, -14), new THREE.Vector3(14, 0.1, -14)];
    const xGeo = new THREE.BufferGeometry().setFromPoints(xPoints);
    const xLine = new THREE.Line(xGeo, lineMat);
    dimGroup.add(xLine);

    const zPoints = [new THREE.Vector3(-14, 0.1, -14), new THREE.Vector3(-14, 0.1, 14)];
    const zGeo = new THREE.BufferGeometry().setFromPoints(zPoints);
    const zLine = new THREE.Line(zGeo, lineMat);
    dimGroup.add(zLine);

    scene.add(dimGroup);
    dimensionGroupRef.current = dimGroup;

    // Initial Load
    loadGLTFModel('mansion');

    // 8. Animation Loop - ZERO camera fighting! OrbitControls has full domain!
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Listener
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (controls) controls.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update Time of Day Lighting dynamically
  useEffect(() => {
    const lights = lightsRef.current;
    const scene = sceneRef.current;
    if (!lights.ambient || !scene) return;

    if (timeOfDay === 'day') {
      scene.background.set(0x1a2332);
      scene.fog.color.set(0x1a2332);
      lights.ambient.color.set(0xffffff);
      lights.ambient.intensity = 1.1;
      lights.sun.color.set(0xfffaed);
      lights.sun.intensity = 3.0;
      lights.sun.position.set(28, 48, 20);
      lights.interior1.intensity = 1.2;
      lights.interior2.intensity = 1.2;
      lights.pool.intensity = 0.8;
      if (starsGroupRef.current) starsGroupRef.current.opacity = 0;
    } else if (timeOfDay === 'sunset') {
      scene.background.set(0x211721);
      scene.fog.color.set(0x211721);
      lights.ambient.color.set(0xffd5ad);
      lights.ambient.intensity = 0.8;
      lights.sun.color.set(0xff7a33);
      lights.sun.intensity = 3.2;
      lights.sun.position.set(45, 18, 28);
      lights.interior1.intensity = 3.5;
      lights.interior2.intensity = 4.0;
      lights.pool.intensity = 2.4;
      if (starsGroupRef.current) starsGroupRef.current.opacity = 0.2;
    } else if (timeOfDay === 'night') {
      scene.background.set(0x06070a);
      scene.fog.color.set(0x06070a);
      lights.ambient.color.set(0x28334a);
      lights.ambient.intensity = 0.4;
      lights.sun.color.set(0x405577);
      lights.sun.intensity = 0.5;
      lights.interior1.intensity = 5.2;
      lights.interior2.intensity = 5.8;
      lights.pool.intensity = 4.2;
      if (starsGroupRef.current) starsGroupRef.current.opacity = 0.95;
    }
  }, [timeOfDay]);

  // Handle Auto Rotate Toggle
  const toggleAutoRotate = () => {
    const nextState = !isAutoRotate;
    setIsAutoRotate(nextState);
    if (controlsRef.current) {
      controlsRef.current.autoRotate = nextState;
    }
  };

  // Zoom In / Out Handlers
  const handleZoom = (delta) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    const offset = camera.position.clone().sub(controls.target);
    const newDistance = offset.length() + delta;

    if (newDistance > controls.minDistance && newDistance < controls.maxDistance) {
      offset.setLength(newDistance);
      camera.position.copy(controls.target).add(offset);
      controls.update();
    }
  };

  // Switch Model
  const handleModelSwitch = (modelKey) => {
    setActiveModel(modelKey);
    setActiveHotspot(null);
    loadGLTFModel(modelKey);
  };

  // Toggle Architectural Dimension Caliper Grid Overlay
  const toggleDimensions = () => {
    const nextState = !showDimensions;
    setShowDimensions(nextState);
    if (dimensionGroupRef.current) {
      dimensionGroupRef.current.visible = nextState;
    }
  };

  // ROOM & ARCHITECTURAL HOTSPOT INSPECTION: Smooth Non-Locking Camera Fly-To
  const handleRoomInspectClick = (spot, e) => {
    const orbitTargetY = activeModel === 'mansion' ? 5.5 : 3.5;

    if (e?.currentTarget) {
      e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    if (activeHotspot?.id === spot.id) {
      setActiveHotspot(null);
      // Return to panoramic overview smoothly
      transitionCameraTo(new THREE.Vector3(24, 15, 28), new THREE.Vector3(0, orbitTargetY, 0));
    } else {
      setActiveHotspot(spot);
      // Fly smoothly to this architectural feature with cinematic framing
      transitionCameraTo(spot.camPos, spot.camLook);
    }
  };

  // CAMERA PRESETS
  const setCameraView = (preset) => {
    setCameraPreset(preset);
    setActiveHotspot(null);

    const orbitTargetY = activeModel === 'mansion' ? 5.5 : 3.5;

    if (preset === 'panoramic') {
      transitionCameraTo(new THREE.Vector3(24, 15, 28), new THREE.Vector3(0, orbitTargetY, 0));
    } else if (preset === 'aerial') {
      transitionCameraTo(new THREE.Vector3(14, 34, 22), new THREE.Vector3(0, orbitTargetY - 1.5, 0));
    } else if (preset === 'terrace') {
      transitionCameraTo(new THREE.Vector3(0, 6.5, 26), new THREE.Vector3(0, orbitTargetY - 1.0, 4));
    } else if (preset === 'courtyard') {
      transitionCameraTo(new THREE.Vector3(22, 9, -14), new THREE.Vector3(0, orbitTargetY - 1.0, -2));
    }
  };

  return (
    <div className="relative w-full h-[560px] sm:h-[660px] lg:h-[780px] bg-[#07080b] rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl select-none">
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md space-y-4 pointer-events-auto">
          <div className="w-14 h-14 rounded-2xl bg-gold-gradient text-black flex items-center justify-center shadow-2xl shadow-gold-500/30 animate-bounce">
            <Crown className="w-7 h-7" />
          </div>
          <div className="text-center space-y-1">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-bold block">
              Streaming Sovereign 3D Architecture
            </span>
            <span className="text-xs text-slate-300">
              {activeModel === 'mansion' ? 'Sovereign Grand Mansion (30.8MB Ultra-Luxury Asset)' : 'Villa Aurora Modernist Cantilever (14.5MB)'} • {loadProgress}%
            </span>
          </div>
          <div className="w-56 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gold-gradient transition-all duration-200" 
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* 3D WebGL Canvas Mount */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none select-none" 
      />

      {/* MOBILE TOP CONTROLS (Dedicated, non-overlapping touch-optimized controls for mobile) */}
      <div className="sm:hidden absolute top-3 inset-x-3 z-20 pointer-events-none space-y-2">
        {/* Full-width Segmented Model Switcher - Big 44px touch targets */}
        <div className="p-1.5 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/20 grid grid-cols-2 gap-2 pointer-events-auto shadow-2xl">
          <button
            onClick={() => handleModelSwitch('mansion')}
            className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
              activeModel === 'mansion'
                ? 'bg-gold-500 text-black font-bold shadow-lg shadow-gold-500/30 ring-2 ring-gold-400'
                : 'text-slate-300 hover:text-white bg-white/5 active:bg-white/10'
            }`}
          >
            <Crown className="w-4 h-4 shrink-0" />
            <span className="truncate lining-nums">Worli (₹145 Cr)</span>
          </button>
          
          <button
            onClick={() => handleModelSwitch('villa')}
            className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
              activeModel === 'villa'
                ? 'bg-gold-500 text-black font-bold shadow-lg shadow-gold-500/30 ring-2 ring-gold-400'
                : 'text-slate-300 hover:text-white bg-white/5 active:bg-white/10'
            }`}
          >
            <Building2 className="w-4 h-4 shrink-0" />
            <span className="truncate lining-nums">Goa (₹48.5 Cr)</span>
          </button>
        </div>

        {/* Mobile Perspectives Ribbon - Smooth touch drag + chevron arrows for effortless navigation */}
        <div className="relative flex items-center pointer-events-auto">
          <button
            onClick={() => scrollMobileRibbon(-1)}
            className="w-7 h-10 rounded-l-xl bg-black/85 text-gold-400 hover:text-white flex items-center justify-center shrink-0 border border-r-0 border-white/20 active:scale-90 text-sm font-bold z-10"
            aria-label="Scroll views left"
          >
            ‹
          </button>

          <div 
            ref={mobileRibbonRef}
            style={{
              touchAction: 'pan-x',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            className="flex-1 glass-panel px-2 py-1.5 flex items-center space-x-2 border-y border-white/10 shadow-xl backdrop-blur-xl overflow-x-auto scroll-smooth touch-pan-x overscroll-x-contain"
          >
            <div className="px-2 py-1 text-[9px] uppercase tracking-widest text-gold-400 font-bold flex items-center gap-1 border-r border-white/10 shrink-0">
              <Eye className="w-3 h-3 text-gold-400" />
              <span>Views</span>
            </div>

            {currentRooms.map((spot, idx) => {
              const isSelected = activeHotspot?.id === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={(e) => handleRoomInspectClick(spot, e)}
                  style={{ touchAction: 'manipulation' }}
                  className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-1.5 shrink-0 active:scale-95 ${
                    isSelected
                      ? 'bg-gold-500 text-black font-bold shadow-md shadow-gold-500/25 ring-2 ring-gold-400'
                      : 'text-slate-200 hover:text-white bg-white/10 active:bg-white/20 border border-white/5'
                  }`}
                >
                  <span className="text-[10px] font-mono opacity-60">0{idx + 1}</span>
                  <span className="whitespace-nowrap font-sans font-medium">
                    {spot.title.split(' ')[0]} {spot.title.split(' ')[1] || ''}
                  </span>
                </button>
              );
            })}

            {activeHotspot && (
              <button
                onClick={() => {
                  setActiveHotspot(null);
                  const orbitTargetY = activeModel === 'mansion' ? 5.5 : 3.5;
                  transitionCameraTo(new THREE.Vector3(24, 15, 28), new THREE.Vector3(0, orbitTargetY, 0));
                }}
                className="px-3 py-1.5 rounded-xl text-xs text-slate-300 bg-white/15 hover:bg-white/25 shrink-0 font-bold ml-1 active:scale-90"
                title="Reset View"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={() => scrollMobileRibbon(1)}
            className="w-7 h-10 rounded-r-xl bg-black/85 text-gold-400 hover:text-white flex items-center justify-center shrink-0 border border-l-0 border-white/20 active:scale-90 text-sm font-bold z-10"
            aria-label="Scroll views right"
          >
            ›
          </button>
        </div>
      </div>

      {/* DESKTOP TOP LEFT (Hidden on mobile to eliminate overlap) */}
      <div className="hidden sm:block absolute top-5 left-5 z-10 pointer-events-none">
        <div className="flex items-center space-x-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold-500/40 text-xs font-semibold text-gold-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>PRIME RESIDENTIAL ATELIER • 60 FPS</span>
        </div>
        
        <h3 className="text-xl sm:text-2xl font-serif text-white mt-2.5 tracking-wide font-normal">
          {activeModel === 'mansion' ? 'The Sovereign Sea-Face Bungalow • Worli, Mumbai' : 'Villa Aurora • Assagao, North Goa'}
        </h3>
        
        {/* Desktop Model Switcher Buttons */}
        <div className="mt-2.5 flex space-x-2 pointer-events-auto">
          <button
            onClick={() => handleModelSwitch('mansion')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 btn-secondary-physical ${
              activeModel === 'mansion'
                ? 'bg-gold-500 text-black border-gold-400 shadow-xl shadow-gold-500/20 font-bold'
                : 'bg-black/60 text-slate-300 border-white/10 hover:border-gold-500/40'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span className="lining-nums">Worli Sea-Face Bungalow (₹145 Cr)</span>
          </button>
          
          <button
            onClick={() => handleModelSwitch('villa')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 btn-secondary-physical ${
              activeModel === 'villa'
                ? 'bg-gold-500 text-black border-gold-400 shadow-xl shadow-gold-500/20 font-bold'
                : 'bg-black/60 text-slate-300 border-white/10 hover:border-gold-500/40'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span className="lining-nums">Goa Cantilever Villa (₹48.5 Cr)</span>
          </button>
        </div>
      </div>

      {/* Top Right Architectural Price Overlay */}
      <div className="hidden sm:block absolute top-5 right-5 z-10 pointer-events-none">
        <div className="glass-panel px-4 py-3 rounded-2xl border border-gold-500/30 text-right space-y-1 shadow-xl">
          <div className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">Acquisition Price</div>
          <div className="text-2xl font-serif text-white tracking-tight lining-nums">
            {activeModel === 'mansion' ? '₹145.00 Cr' : '₹48.50 Cr'}
          </div>
          <div className="text-[11px] text-slate-300 lining-nums">
            {activeModel === 'mansion' ? 'Worli Sea Face, Mumbai • 22,400 sq ft • 7 Suites • Freehold Plot' : 'Assagao, North Goa • 14,850 sq ft • 6 Suites • Infinity Pool'}
          </div>
          {showDimensions && (
            <div className="mt-2 pt-2 border-t border-gold-500/20 text-left font-mono text-[10px] text-gold-300 space-y-0.5 animate-in fade-in">
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Plot Boundary (Cadastral):</span>
                <span className="font-bold lining-nums">{activeModel === 'mansion' ? '120 ft × 185 ft' : '95 ft × 155 ft'}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Building Facade Span:</span>
                <span className="font-bold lining-nums">{activeModel === 'mansion' ? '82.4 ft' : '64.8 ft'}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Ceiling Clear Height:</span>
                <span className="font-bold lining-nums">{activeModel === 'mansion' ? '14.5 ft (Salon: 26 ft)' : '12.0 ft (Atrium: 24 ft)'}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Side Zoom & Reset Controls */}
      <div className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 flex flex-col space-y-2 pointer-events-none">
        <div className="glass-panel p-1.5 rounded-2xl flex flex-col space-y-1 border border-white/10 pointer-events-auto shadow-xl">
          <button
            onClick={() => handleZoom(-5)}
            className="p-2 sm:p-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4 text-gold-400" />
          </button>
          <button
            onClick={() => handleZoom(5)}
            className="p-2 sm:p-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4 text-gold-400" />
          </button>
          <button
            onClick={toggleDimensions}
            className={`p-2 sm:p-2.5 rounded-xl transition-colors ${
              showDimensions 
                ? 'bg-gold-500 text-black shadow-lg shadow-gold-500/25' 
                : 'hover:bg-white/10 text-slate-300 hover:text-white'
            }`}
            title={showDimensions ? "Hide Architectural Dimensions" : "Show Architectural Caliper & Plot Boundary (Grid & Crosshairs)"}
          >
            <Compass className={`w-4 h-4 ${showDimensions ? 'text-black' : 'text-gold-400'}`} />
          </button>
          <button
            onClick={() => {
              setActiveHotspot(null);
              const orbitTargetY = activeModel === 'mansion' ? 5.5 : 3.5;
              transitionCameraTo(new THREE.Vector3(24, 15, 28), new THREE.Vector3(0, orbitTargetY, 0));
            }}
            className="p-2 sm:p-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors border-t border-white/5"
            title="Reset Establishing View"
          >
            <RotateCcw className="w-4 h-4 text-slate-400 hover:text-gold-400" />
          </button>
        </div>
      </div>

      {/* DESKTOP Architectural Waypoint Ribbon */}
      <div className="hidden sm:block absolute top-32 left-5 z-10 pointer-events-none">
        <div className="glass-panel p-1.5 rounded-2xl flex items-center space-x-1.5 border border-white/10 pointer-events-auto shadow-xl backdrop-blur-xl">
          <div className="px-2.5 py-1 text-[10px] uppercase tracking-widest text-gold-400 font-semibold flex items-center gap-1.5 border-r border-white/10">
            <Eye className="w-3.5 h-3.5" />
            <span>Estate Perspectives</span>
          </div>

          {currentRooms.map((spot, idx) => {
            const isSelected = activeHotspot?.id === spot.id;

            return (
              <button
                key={spot.id}
                onClick={() => handleRoomInspectClick(spot)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all btn-secondary-physical flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-gold-500 text-black font-bold shadow-md shadow-gold-500/25 ring-2 ring-gold-400/50'
                    : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent'
                }`}
                title={`${spot.title} • ${spot.subtitle}`}
              >
                <span className="text-[10px] font-mono opacity-60">0{idx + 1}</span>
                <span className="whitespace-nowrap font-sans">
                  {spot.title.split(' ')[0]} {spot.title.split(' ')[1] || ''}
                </span>
              </button>
            );
          })}

          {activeHotspot && (
            <button
              onClick={() => {
                setActiveHotspot(null);
                const orbitTargetY = activeModel === 'mansion' ? 5.5 : 3.5;
                transitionCameraTo(new THREE.Vector3(24, 15, 28), new THREE.Vector3(0, orbitTargetY, 0));
              }}
              className="px-2.5 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-1 border-l border-white/10 font-bold"
              title="Reset View"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Active Hotspot Architectural Information Panel (Mobile docked at bottom, desktop at top-right) */}
      {activeHotspot && (
        <div className="absolute bottom-24 sm:top-28 inset-x-3 sm:inset-x-auto sm:right-5 z-20 sm:w-96 glass-panel-gold p-4 sm:p-5 rounded-2xl animate-in fade-in duration-300 pointer-events-auto shadow-2xl border border-gold-500/40 max-h-[280px] overflow-y-auto">
          <div className="flex justify-between items-start gap-2">
            <span className="text-[10px] uppercase tracking-widest text-gold-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-gold-400" /> Spatial Framing Active
            </span>
            <button 
              onClick={() => {
                setActiveHotspot(null);
                const orbitTargetY = activeModel === 'mansion' ? 5.5 : 3.5;
                transitionCameraTo(new THREE.Vector3(24, 15, 28), new THREE.Vector3(0, orbitTargetY, 0));
              }}
              className="text-slate-400 hover:text-white text-xs px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              title="Close Inspection"
            >
              ✕
            </button>
          </div>
          <h4 className="text-base sm:text-lg font-serif text-white font-normal mt-1 leading-snug">{activeHotspot.title}</h4>
          <p className="text-[10px] sm:text-[11px] text-gold-300 font-mono mt-0.5 leading-snug">{activeHotspot.specs}</p>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">{activeHotspot.desc}</p>
          <button
            onClick={() => onBookTour && onBookTour(`Private Viewing: ${activeHotspot.title}`)}
            className="mt-3.5 w-full py-2 bg-gold-gradient text-black rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90 shadow-md shadow-gold-500/20 active:scale-95 transition-all btn-primary-physical"
          >
            Request Suite Dossier
          </button>
        </div>
      )}

      {/* Bottom Main Interactive HUD Controls (Outer wrapper is pointer-events-none!) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 w-[95%] max-w-4xl pointer-events-none">
        <div className="glass-panel px-3.5 py-3 sm:px-6 sm:py-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 border border-white/10 shadow-2xl pointer-events-auto">
          
          {/* Time of Day Lighting Mode & Solar Dial */}
          <div className="flex items-center space-x-2 bg-black/50 p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => { setTimeOfDay('day'); updateSolarTrajectory(12.0); }}
              className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all btn-secondary-physical ${
                timeOfDay === 'day' ? 'bg-gold-500 text-black font-bold shadow' : 'text-slate-300 hover:text-white'
              }`}
              title="Day Sunlight (12:00 PM)"
            >
              <Sun className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Noon</span>
            </button>
            <button
              onClick={() => { setTimeOfDay('sunset'); updateSolarTrajectory(17.5); }}
              className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all btn-secondary-physical ${
                timeOfDay === 'sunset' ? 'bg-gold-500 text-black font-bold shadow' : 'text-slate-300 hover:text-white'
              }`}
              title="Golden Sunset (5:30 PM)"
            >
              <Sunset className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sunset</span>
            </button>
            <button
              onClick={() => { setTimeOfDay('night'); }}
              className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all btn-secondary-physical ${
                timeOfDay === 'night' ? 'bg-gold-500 text-black font-bold shadow' : 'text-slate-300 hover:text-white'
              }`}
              title="Midnight Starlight"
            >
              <Moon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Midnight</span>
            </button>

            {/* Live Sun Trajectory Slider */}
            {timeOfDay !== 'night' && (
              <div className="hidden md:flex items-center space-x-1.5 pl-2 border-l border-white/10">
                <span className="text-[10px] uppercase font-mono text-gold-400 font-semibold tracking-wider">
                  Solar Dial
                </span>
                <input 
                  type="range"
                  min="6"
                  max="19"
                  step="0.5"
                  value={solarHour}
                  onChange={(e) => updateSolarTrajectory(parseFloat(e.target.value))}
                  className="w-20 accent-gold-500 cursor-pointer h-1.5 bg-white/20 rounded-lg"
                  title="Adjust Sun Illumination Angle & Facade Shadows (6 AM - 7 PM)"
                />
                <span className="text-[10px] font-mono text-slate-300 w-11 lining-nums">
                  {Math.floor(solarHour)}:{solarHour % 1 !== 0 ? '30' : '00'}
                </span>
              </div>
            )}
          </div>

          {/* Camera View Presets */}
          <div className="hidden lg:flex items-center space-x-1.5 text-xs">
            {[
              { id: 'panoramic', label: 'Panoramic' },
              { id: 'aerial', label: 'Aerial Drone' },
              { id: 'terrace', label: 'Grand Entrance' },
              { id: 'courtyard', label: 'Estate Grounds' }
            ].map((preset) => (
              <button
                key={preset.id}
                onClick={() => setCameraView(preset.id)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all btn-secondary-physical ${
                  cameraPreset === preset.id
                    ? 'bg-white/20 text-gold-400 font-semibold border border-gold-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Auto-Rotate & Tour Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleAutoRotate}
              className={`p-2 rounded-xl text-xs border transition-all btn-secondary-physical ${
                isAutoRotate ? 'bg-white/20 text-gold-400 border-gold-500/40' : 'bg-black/50 text-slate-400 border-white/10'
              }`}
              title={isAutoRotate ? 'Pause 360 Rotation' : 'Start Smooth 360 Rotation'}
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
            </button>

            {/* Schedule VIP Tour CTA */}
            <button
              onClick={() => onBookTour && onBookTour(`3D Tour: ${activeModel === 'mansion' ? 'The Sovereign Grand Estate' : 'Villa Aurora'}`)}
              className="px-4 py-2 bg-gold-gradient text-black rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90 shadow-md shadow-gold-500/20 active:scale-95 btn-primary-physical"
            >
              Schedule VIP Tour
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
