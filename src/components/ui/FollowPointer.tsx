import React, { useEffect, useRef, useCallback } from "react";

function FollowPointer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const particles = useRef<
    Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      color: string;
    }>
  >([]);
  const animationFrameId = useRef<number | null>(null);

  // Configuration for the trail effect
  const TRAIL_LENGTH = 30; // Number of particles in the trail
  const PARTICLE_SIZE_START = 85; // Starting size of particles
  const PARTICLE_SIZE_END = 5; // Ending size of particles
  const PARTICLE_OPACITY_START = 0.8; // Starting opacity
  const PARTICLE_OPACITY_END = 0; // Ending opacity
  // Updated: PARTICLE_COLORS is now an array of colors
  const PARTICLE_COLORS = [
    "rgba(100, 255, 255, ", // Light blue/cyan
    "rgba(144, 238, 144, ", // Light green
    "rgba(0, 0, 255, ", // Blue
  ];

  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, []);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    mousePosition.current = { x: e.clientX, y: e.clientY };
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas completely to transparent each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Add a new particle at the current mouse position
    // Updated: Randomly select a color from PARTICLE_COLORS
    const randomColorIndex = Math.floor(Math.random() * PARTICLE_COLORS.length);
    const selectedColor = PARTICLE_COLORS[randomColorIndex];

    particles.current.push({
      x: mousePosition.current.x,
      y: mousePosition.current.y,
      size: PARTICLE_SIZE_START,
      opacity: PARTICLE_OPACITY_START,
      color: selectedColor, // Use the randomly selected color
    });

    // Remove old particles and update existing ones
    for (let i = 0; i < particles.current.length; i++) {
      const particle = particles.current[i];

      // Calculate progress along the trail
      const progress = i / TRAIL_LENGTH;

      // Interpolate size and opacity
      particle.size =
        PARTICLE_SIZE_START -
        (PARTICLE_SIZE_START - PARTICLE_SIZE_END) * progress;
      particle.opacity =
        PARTICLE_OPACITY_START -
        (PARTICLE_OPACITY_START - PARTICLE_OPACITY_END) * progress;

      // Draw the particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2);
      ctx.fillStyle = particle.color + particle.opacity + ")";
      ctx.fill();
    }

    // Keep only the latest particles
    while (particles.current.length > TRAIL_LENGTH) {
      particles.current.shift();
    }

    animationFrameId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    updateCanvasSize(); // Set initial canvas size
    window.addEventListener("resize", updateCanvasSize);
    window.addEventListener("pointermove", handlePointerMove);

    // Start animation loop
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      // Cleanup
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("pointermove", handlePointerMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [updateCanvasSize, handlePointerMove, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none" // Ensure it's fixed, full screen, and doesn't block clicks
      style={{ backgroundColor: "transparent" }} // Keep canvas background transparent
    />
  );
}

export default FollowPointer;
