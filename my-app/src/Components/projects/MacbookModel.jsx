import React, { useEffect, useRef, useState } from 'react';
import './MacbookModel.css';
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Group,
  AmbientLight,
  DirectionalLight,
  Color,
  SRGBColorSpace,
  MathUtils,
  VideoTexture,
  LinearFilter,
  MeshBasicMaterial,
  TextureLoader,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export default function MacbookModel({ style, className, mediaSrc, photoSrc, isVideo = false }) {
  const container = useRef();
  const canvas = useRef();
  const renderer = useRef();
  const camera = useRef();
  const scene = useRef();
  const modelGroup = useRef();
  const [loaded, setLoaded] = useState(false);
  const [shouldOpen, setShouldOpen] = useState(false);
  const lidRef = useRef();
  const lidSpring = useRef({
    velocity: 0,
    value: MathUtils.degToRad(90),
    target: 0,
    stiffness: 40,
    damping: 20,
    restSpeed: 0.0001,
  });
  const [hasOpened, setHasOpened] = useState(false); // Track if the lid has already opened

  // Observe when in viewport to trigger open animation only once
  useEffect(() => {
    let openTimeout;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasOpened) {
          openTimeout = setTimeout(() => {
            setShouldOpen(true);
            setHasOpened(true); // Mark as opened
          }, 1000);
        }
        // Do not close the lid if it has already opened once
      },
      { threshold: 0.2 }
    );
    if (container.current) observer.observe(container.current);
    return () => {
      observer.disconnect();
      if (openTimeout) clearTimeout(openTimeout);
    };
  }, [hasOpened]);

  useEffect(() => {
    const width = container.current.clientWidth;
    const height = container.current.clientHeight;

    renderer.current = new WebGLRenderer({
      canvas: canvas.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.current.setPixelRatio(window.devicePixelRatio);
    renderer.current.setSize(width, height);
    renderer.current.outputColorSpace = SRGBColorSpace;

    camera.current = new PerspectiveCamera(36, width / height, 0.1, 100);
    if (window.innerWidth < 1000) {
      camera.current.position.set(0, 0, 8);
    } else {
      camera.current.position.set(0, 0.5, 8);
    }

    scene.current = new Scene();

    // Lighting
    const ambientLight = new AmbientLight(0xffffff, 1.2);
    const keyLight = new DirectionalLight(0xffffff, 1.1);
    keyLight.position.set(0.5, 0, 0.866);
    scene.current.add(ambientLight, keyLight);

    // Model group
    modelGroup.current = new Group();
    scene.current.add(modelGroup.current);

    // Draco loader setup
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/'); // CDN for Draco decoder

    // Load model
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader); // <-- set DRACOLoader

    // Helper to recursively find a mesh by name
    function findMeshByName(object, name) {
      if (object.name === name && object.isMesh) return object;
      for (const child of object.children || []) {
        const found = findMeshByName(child, name);
        if (found) return found;
      }
      return null;
    }

    // Helper to update model scale responsively
    function updateModelScale() {
      // if (!modelGroup.current || !container.current) return;
      // const width = container.current.clientWidth;
      // // Clamp scale between 1.2 and 1.5
      // const scale = Math.max(1, Math.min(1, width / 450));
      // modelGroup.current.scale.set(scale, scale, scale);
    }

    loader.load(
      '/macbook-pro.glb',
      gltf => {
        // Remove previous model if any
        while (modelGroup.current.children.length > 0) {
          modelGroup.current.remove(modelGroup.current.children[0]);
        }

        // Output all nodes in the scene
        gltf.scene.traverse(node => {
          console.log(`[GLTF Node] name: ${node.name}, type: ${node.type}`);
        });

        // Make all materials black
        gltf.scene.traverse(child => {
          if (child.isMesh && child.material) {
            child.material.color = new Color('#343d46');
            child.material.needsUpdate = true;
          }
        });

        // Make the model less wide by reducing the X scale
        gltf.scene.scale.set(1, 1, 1); // X < Y/Z for a thinner base/screen

        modelGroup.current.add(gltf.scene);
        updateModelScale();

        // Output all top-level children to console
        console.log('gltf.scene.children:', gltf.scene.children);

        // Find the lid node by name (e.g. "Frame")
        lidRef.current =
          gltf.scene.children.find(node => node.name === 'Frame');

        // Start with lid fully closed (exactly 90deg)
        if (lidRef.current) {
          const closedRad = Math.PI / 2;
          lidRef.current.rotation.x = closedRad;
          lidSpring.current.value = closedRad;
          lidSpring.current.velocity = 0;
          lidSpring.current.target = 0;
        }

        // Find the screen mesh and set video texture
        const screenMesh = findMeshByName(gltf.scene, 'Screen');
        if (screenMesh && isVideo) {
          // Use MeshBasicMaterial for clarity
          screenMesh.material = new MeshBasicMaterial({ color: 0xffffff });
          const video = document.createElement('video');
          video.src = mediaSrc;
          video.loop = true;
          video.defaultMuted = true;
          video.muted = true;
          video.controls = null;
          video.playsInline = true;
          video.autoplay = true;
          video.crossOrigin = 'anonymous';

          video.addEventListener('loadeddata', () => {
            video.play();
          });

          const videoTexture = new VideoTexture(video);
          videoTexture.generateMipmaps = false;
          videoTexture.minFilter = LinearFilter;
          videoTexture.magFilter = LinearFilter;
          videoTexture.flipY = false;
          videoTexture.colorSpace = SRGBColorSpace;

          screenMesh.material.map = videoTexture;
          screenMesh.material.needsUpdate = true;
        } 
        // else {
        //   const textureLoader = new TextureLoader();
        //   textureLoader.load(photoSrc, texture => {
        //     texture.colorSpace = SRGBColorSpace;
        //     texture.flipY = false;
        //     screenMesh.material = new MeshBasicMaterial({ map: texture });
        //     screenMesh.material.needsUpdate = true;
        //   });
        // }

        setLoaded(true);
        renderFrame();
      },
      undefined,
      error => {
        // eslint-disable-next-line no-console
        console.error('Error loading GLB:', error);
      }
    );

    // Mouse-driven rotation (spring-like)
    let targetRotation = { x: 0, y: 0 };
    let currentRotation = { x: 0, y: 0 };

    function animate() {
      // Lid open spring animation
      if (lidRef.current && shouldOpen) {
        const dt = 1 / 60;
        const displacement = lidSpring.current.value - lidSpring.current.target;
        const springForce = -lidSpring.current.stiffness * displacement;
        const dampingForce = -lidSpring.current.damping * lidSpring.current.velocity;
        const force = springForce + dampingForce;
        lidSpring.current.velocity += force * dt;
        lidSpring.current.value += lidSpring.current.velocity * dt;

        // Clamp to open
        if (Math.abs(lidSpring.current.value - lidSpring.current.target) < 0.001 && Math.abs(lidSpring.current.velocity) < lidSpring.current.restSpeed) {
          lidSpring.current.value = lidSpring.current.target;
          lidSpring.current.velocity = 0;
        }
        lidRef.current.rotation.x = lidSpring.current.value;
      }

      // Simple spring interpolation for model rotation
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.06;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.06;
      if (modelGroup.current) {
        modelGroup.current.rotation.x = currentRotation.x;
        modelGroup.current.rotation.y = currentRotation.y;
      }
      renderer.current.render(scene.current, camera.current);
      requestAnimationFrame(animate);
    }

    function renderFrame() {
      renderer.current.render(scene.current, camera.current);
    }

    function onMouseMove(event) {
      // Use global mouse position, invert y so down moves down
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1; // <-- invert y mapping
      targetRotation.y = x * 0.12; // was 0.3
      targetRotation.x = y * 0.08; // was 0.2
    }

    window.addEventListener('mousemove', onMouseMove); // <-- use window instead of container

    // Handle resize
    function onResize() {
      const width = container.current.clientWidth;
      const height = container.current.clientHeight;
      renderer.current.setSize(width, height);
      camera.current.aspect = width / height;
      camera.current.updateProjectionMatrix();

      if (window.innerWidth < 1000) {
        camera.current.position.set(0, 0, 8);
      } else {
        camera.current.position.set(0, 0.5, 8);
      }

      updateModelScale();
      renderFrame();
    }
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove); // <-- remove from window
      window.removeEventListener('resize', onResize);
      renderer.current.dispose();
      dracoLoader.dispose(); // <-- clean up
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <-- only run once on mount

  useEffect(() => {
    if (!loaded || !lidRef.current) return; // Only start animation after model is loaded and lidRef is set
    let animationId;
    // Mouse-driven rotation (spring-like)
    let targetRotation = { x: 0, y: 0 };
    let currentRotation = { x: 0, y: 0 };

    // Ensure lid is fully closed before animation starts
    if (!shouldOpen) {
      const closedRad = Math.PI / 2;
      lidRef.current.rotation.x = closedRad;
      lidSpring.current.value = closedRad;
      lidSpring.current.velocity = 0;
      lidSpring.current.target = 0;
    }

    function animate() {
      // Lid open spring animation
      if (lidRef.current && shouldOpen) {
        const dt = 1 / 60;
        const spring = lidSpring.current;
        const displacement = spring.value - spring.target;
        const springForce = -spring.stiffness * displacement;
        const dampingForce = -spring.damping * spring.velocity;
        const force = springForce + dampingForce;
        spring.velocity += force * dt;
        spring.value += spring.velocity * dt;

        // Clamp to open
        if (Math.abs(spring.value - spring.target) < 0.001 && Math.abs(spring.velocity) < spring.restSpeed) {
          spring.value = spring.target;
          spring.velocity = 0;
        }
        lidRef.current.rotation.x = spring.value;
      }

      // Simple spring interpolation for model rotation
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.1;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.1;
      if (modelGroup.current) {
        modelGroup.current.rotation.x = currentRotation.x;
        modelGroup.current.rotation.y = currentRotation.y;
      }
      renderer.current.render(scene.current, camera.current);
      animationId = requestAnimationFrame(animate);
    }

    function onMouseMove(event) {
      // Use global mouse position, invert y so down moves down
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      targetRotation.y = x * 0.12; // was 0.3
      targetRotation.x = y * 0.08; // was 0.2
    }

    window.addEventListener('mousemove', onMouseMove);

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (animationId) cancelAnimationFrame(animationId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldOpen, loaded]);

  return (
    <div
      ref={container}
      className={`macbook-container ${className || ''}`}
      aria-label="Macbook 3D Model"
    >
      <canvas ref={canvas} style={{ width: '100%', height: '100%', display: 'block' }} />
      {!loaded && (
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'transparent', color: '#222'
        }}>
          Loading...
        </div>
      )}
    </div>
  );
}
