import React, { useEffect, useRef, useState } from 'react';
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Group,
  AmbientLight,
  DirectionalLight,
  Color,
  SRGBColorSpace,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export default function Airplane() {
  const container = useRef();
  const canvas = useRef();
  const renderer = useRef();
  const camera = useRef();
  const scene = useRef();
  const modelGroup = useRef();
  const [loaded, setLoaded] = useState(false);
  const [xPos, setXPos] = useState(1); // 1 = right, 0 = left
  const xPosRef = useRef(1); // <-- always start at right
  const targetXPosRef = useRef(1);
  const scrollSpeedRef = useRef(0); // Track scroll speed
  const lastScrollYRef = useRef(window.scrollY); // Track last scroll position
  const rotationXRef = useRef(0); // Track nose-down tilt
  const rotationZRef = useRef(-0.4 + 0.8 * xPosRef.current); // <-- Move this to the top level
  const prevScrollY = useRef(window.scrollY); // <-- Move here, not inside handleScroll

  // Animate airplane position and tilt based on timeline widget position
  useEffect(() => {
    let scrollTimeout;

    function handleScroll() {
      const elements = Array.from(document.querySelectorAll('.vertical-timeline-element'));
      const achievementsSection = document.querySelector('.news-section'); // Define achievementsSection
      if (!elements.length || !achievementsSection) return;

      const viewportCenter = window.innerHeight / 2;
      const timelineEnd = elements[elements.length - 1].getBoundingClientRect().bottom;

      let closestWidget = null;
      let minDist = Infinity;
      let closestIndex = 0;
      elements.forEach((el, idx) => {
        const widget = el.querySelector('.vertical-timeline-element-content.bounce-in');
        if (!widget) return;
        const rect = widget.getBoundingClientRect();
        const elCenter = (rect.top + rect.bottom) / 2;
        const dist = Math.abs(elCenter - viewportCenter);
        if (dist < minDist) {
          minDist = dist;
          closestWidget = { widget, rect };
          closestIndex = idx;
        }
      });

      let airplaneProgress;

      if (!closestWidget) {
        return;
      }

      const { rect } = closestWidget;
      const widgetHeight = rect.height;
      const widgetBottom = rect.bottom;
      const viewportHeight = window.innerHeight;

      // Determine if the widget is on the left or right
      const timelineMid = window.innerWidth / 2;
      const isLeft = rect.left < timelineMid;

      // Calculate progress through the widget: 0 at top, 1 at bottom, 0.5 at center
      let progress = 0.5;
      if (widgetHeight > 0) {
        // progress = 1- Math.max(0, Math.min(1, (widgetBottom) / (viewportHeight + widgetHeight)));
        progress = Math.max(0, Math.min(1, (viewportCenter - rect.top) / widgetHeight));
      }

      if (closestIndex === 0) {
        // First widget is on the left: airplane stays on the right
        if (progress <= .5) airplaneProgress = 1;
        else airplaneProgress = 1.5 - progress;
      } 
      else if ((closestIndex === elements.length - 1) && !isLeft) {
        // if (progress <= .9) airplaneProgress = .5 - progress;
        // else {
        //   // airplane flies off
        //   airplaneProgress = (.5-4*progress);
        // }
        airplaneProgress = .5 - Math.min(progress, .5)
      }
      else if ((closestIndex === elements.length - 1) && isLeft) {
        // if (progress <= .9) airplaneProgress = progress + .5;
        // else {
        //   // airplane flies off
        //   airplaneProgress = .5+(4*progress);
        // }
        airplaneProgress = .5 + Math.min(.5, progress)
      }
      else if (!isLeft) {
        // Right widget: 1→0→1
        if (progress <= .5) airplaneProgress = .5 - progress;
        else airplaneProgress = progress - .5;
      } else {
        // // Left widget: 0→1→0
        if (progress <= .5) airplaneProgress = progress + .5;
        else airplaneProgress = 1.5 - progress;
      }

      // --- Airplane nose-down tilt logic ---
      const currentScrollY = window.scrollY;
      const speed = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;
      // Clamp speed for stability
      scrollSpeedRef.current = Math.max(-60, Math.min(60, speed));

      // bring back airplane in achievments section
      const achievementsRect = achievementsSection.getBoundingClientRect();

      // if (achievementsRect.top <= viewportCenter) {
      //   console.log('Achievements section entered');
      //   airplaneProgress = 1.5; // Center the airplane in achievements section

      //   // Set canvas to top: 0
      //   if (container.current) {
      //     container.current.style.top = '200px';
      //   }

      //   console.log('Adjusting airplane tilt'); // Debugging log
      //   modelGroup.current.rotation.z = 0; // Reset side-to-side tilt
      //   modelGroup.current.rotation.x = -0.1; // Slight nose-down tilt
      //   console.log('New rotation:', modelGroup.current.rotation); // Debugging log
      // }

      targetXPosRef.current = airplaneProgress;


      // Clear any existing timeout and set a new one to reset scroll speed
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        scrollSpeedRef.current = 0; // Reset scroll speed when scrolling stops
      }, 100);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

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

    camera.current = new PerspectiveCamera(30, width / height, 0.1, 100);
    camera.current.position.set(0, 0, 12); // Move the camera further back to fit the larger airplane

    scene.current = new Scene();

    // Lighting
    const ambientLight = new AmbientLight(0xffffff, 1.2);
    const keyLight = new DirectionalLight(0xffffff, 1.1);
    keyLight.position.set(0.5, 1, 1);
    scene.current.add(ambientLight, keyLight);

    // Model group
    modelGroup.current = new Group();
    scene.current.add(modelGroup.current);

    // Draco loader setup
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

    // Load model
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      '/airplane.glb',
      gltf => {
        // Remove previous model if any
        while (modelGroup.current.children.length > 0) {
          modelGroup.current.remove(modelGroup.current.children[0]);
        }
        gltf.scene.traverse(child => {
          if (child.isMesh && child.material) {
            child.material.color = new Color('#b0c4de');
            child.material.needsUpdate = true;
          }
        });
        gltf.scene.scale.set(3, 3, 3); // Increase scale to make the airplane larger
        gltf.scene.position.y = -1; // Adjust vertical position to center the airplane
        modelGroup.current.add(gltf.scene);
        setLoaded(true);
        renderFrame();
      },
      undefined,
      error => {
        // eslint-disable-next-line no-console
        console.error('Error loading airplane GLB:', error);
      }
    );

    function renderFrame() {
      renderer.current.render(scene.current, camera.current);
    }

    // Animate airplane position and tilt
    let animationId;

    function animate() {
      // Smoothly interpolate xPos toward targetXPosRef.current
      xPosRef.current += (targetXPosRef.current - xPosRef.current) * 0.05;
      setXPos(xPosRef.current);

      const minX = -4; // left limit in 3D space
      const maxX = 4;  // right limit in 3D space
      const x = minX + (maxX - minX) * xPosRef.current;

      // Side-to-side tilt (z axis) with faster interpolation
      const targetRotationZ = -0.4 + 0.8 * xPosRef.current;
      rotationZRef.current += (targetRotationZ - rotationZRef.current) * 0.1; // Increase interpolation speed

      // Nose tilt (x axis) with smooth return to level attitude
      let targetRotationX = scrollSpeedRef.current / 50; // Scale for nose tilt
      if (Math.abs(scrollSpeedRef.current) < 1) {
        targetRotationX = 0; // Smoothly return to level attitude
      }
      rotationXRef.current += (targetRotationX - rotationXRef.current) * 0.05; // Smooth interpolation

      if (modelGroup.current) {
        modelGroup.current.position.x = x;
        modelGroup.current.rotation.z = rotationZRef.current; // Side-to-side tilt
        modelGroup.current.rotation.x = rotationXRef.current; // Nose-down tilt
      }
      renderer.current.render(scene.current, camera.current);
      animationId = requestAnimationFrame(animate);
    }
    animate();

    // Handle resize
    function onResize() {
      const width = container.current.clientWidth;
      const height = container.current.clientHeight;
      renderer.current.setSize(width, height);
      camera.current.aspect = width / height;
      camera.current.updateProjectionMatrix();
      renderFrame();
    }
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (animationId) cancelAnimationFrame(animationId);
      renderer.current.dispose();
      dracoLoader.dispose();
    };
  }, []); // <-- only run once on mount

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1170) {
        container.current.style.display = 'none'; // Hide airplane
      } else {
        container.current.style.display = 'block'; // Show airplane
      }
    }

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      const experienceSection = document.querySelector('.experience-section'); // Define experience section
      if (!experienceSection || !container.current) return;

      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      const experienceBottom = experienceSection.getBoundingClientRect().bottom;
      const canvasRect = container.current.getBoundingClientRect();
      const canvasCenter = (canvasRect.top + canvasRect.bottom) / 2;

      if (canvasRect.bottom < experienceBottom && canvasRect.top > 0) {
        // Keep the container fixed and centered
        container.current.style.position = 'fixed';
        container.current.style.top = '50%';
        container.current.style.transform = 'translateY(-50%)';
      } else if (canvasRect.bottom >= experienceBottom) {
        // Stop moving the container after the experience section
        container.current.style.position = 'absolute';
        container.current.style.top = `${experienceSection.offsetTop + experienceSection.offsetHeight - viewportHeight / 2}px`;
        container.current.style.transform = 'translateY(0)';
      } 

      const currentScrollY = window.scrollY;

      if (canvasCenter > viewportCenter && currentScrollY < prevScrollY.current) {
        // Re-enable fixed positioning when scrolling back up
        container.current.style.position = 'fixed';
        container.current.style.top = '50%';
        container.current.style.transform = 'translateY(-50%)';
      }

      if (canvasCenter < viewportCenter) {
        // after reload
        container.current.style.position = 'absolute';
        container.current.style.top = `${experienceSection.offsetTop + experienceSection.offsetHeight - viewportHeight / 2}px`;
        container.current.style.transform = 'translateY(0)';
      }

      prevScrollY.current = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={container}
      style={{
        width: '100vw',
        height: 400,
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)', // <-- center vertically
        zIndex: 10, // Updated z-index
        pointerEvents: 'none',
        margin: 0,
        padding: 0,
      }}
      aria-label="Airplane 3D Model"
    >
      <canvas
        ref={canvas}
        style={{
          width: '100vw',
          height: '400px',
          display: loaded ? 'block' : 'none', // Hide canvas until loaded
          filter: 'grayscale(1)',
        }}
      />
    </div>
  );
}
