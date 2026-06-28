"use client";

import { useEffect, useRef } from "react";

const PALETTE = ["#2563eb", "#e11d48", "#16a34a", "#ea580c", "#7c3aed"];

export function DotPattern() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Wave Grid Physics
    const RES = 20; // Grid resolution in pixels
    let cols = 0;
    let rows = 0;
    let current: Float32Array;
    let previous: Float32Array;
    const DAMPING = 0.96; // Smooth, elastic, naturally damped

    // Particle Pool
    let particles: {
      x: number;
      y: number;
      baseAngle: number;
      len: number;
      thickness: number;
      color: string;
      opacity: number;
    }[] = [];

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      cols = Math.ceil(width / RES) + 2;
      rows = Math.ceil(height / RES) + 2;
      
      // Reuse arrays if possible, otherwise allocate
      if (!current || current.length !== cols * rows) {
        current = new Float32Array(cols * rows);
        previous = new Float32Array(cols * rows);
      }

      // Adaptive density
      let count = 2200;
      if (width < 768) count = 500;
      else if (width < 1024) count = 1200;

      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseAngle: Math.random() * Math.PI * 2,
          len: 2 + Math.random() * 3, // 2-5px
          thickness: 0.5 + Math.random() * 1.0,
          color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
          opacity: 0.2 + Math.random() * 0.25, // 20% - 45%
        });
      }
    };

    window.addEventListener("resize", () => {
      // Throttle resize
      cancelAnimationFrame(animationFrameId);
      init();
      if (isVisible) draw();
    });
    init();

    let mouseX = -1000;
    let mouseY = -1000;
    let isMouseMoving = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) draw();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let time = 0;
    let lastTime = performance.now();

    const draw = () => {
      if (!isVisible) return;

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 16.66, 2); // normalize to 60fps, cap at 2 frames
      lastTime = now;
      time += 0.015 * dt;

      // 1. Apply Cursor Disturbance (Pressure Wave)
      if (isMouseMoving && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        const gridX = Math.floor(mouseX / RES) + 1;
        const gridY = Math.floor(mouseY / RES) + 1;
        
        // 150-220px radius ~ 8-11 cells at 20px RES
        const radius = 9; 
        const force = 6; 
        
        for (let i = -radius; i <= radius; i++) {
          for (let j = -radius; j <= radius; j++) {
            const cx = gridX + i;
            const cy = gridY + j;
            if (cx > 0 && cx < cols - 1 && cy > 0 && cy < rows - 1) {
              const distSq = i * i + j * j;
              if (distSq <= radius * radius) {
                // Smooth Gaussian falloff
                const effect = Math.exp(-distSq / (radius * radius / 3)) * force;
                previous[cx + cy * cols] += effect * dt;
              }
            }
          }
        }
        isMouseMoving = false; // Wait for next event
      }

      // 2. Idle Animation (Subtle breathing/paper fiber shifting)
      if (Math.random() < 0.2) {
        const rx = Math.floor(Math.random() * (cols - 2)) + 1;
        const ry = Math.floor(Math.random() * (rows - 2)) + 1;
        previous[rx + ry * cols] += (Math.random() - 0.5) * 0.8;
      }

      // 3. Propagate Waves
      for (let i = 1; i < cols - 1; i++) {
        for (let j = 1; j < rows - 1; j++) {
          const idx = i + j * cols;
          current[idx] = (
            previous[i - 1 + j * cols] +
            previous[i + 1 + j * cols] +
            previous[i + (j - 1) * cols] +
            previous[i + (j + 1) * cols]
          ) / 2 - current[idx];
          current[idx] *= DAMPING;
        }
      }

      // 4. Render Particles
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        const gridX = Math.floor(p.x / RES) + 1;
        const gridY = Math.floor(p.y / RES) + 1;
        
        let dx = 0;
        let dy = 0;

        if (gridX > 0 && gridX < cols - 1 && gridY > 0 && gridY < rows - 1) {
          dx = (current[gridX + 1 + gridY * cols] - current[gridX - 1 + gridY * cols]) / 2;
          dy = (current[gridX + (gridY + 1) * cols] - current[gridX + (gridY - 1) * cols]) / 2;
        }

        // Shift position based on gradient (elastic deformation)
        // Kept subtle as requested (amplitude < 3px for idle, larger for waves)
        const shiftX = dx * 10; 
        const shiftY = dy * 10;
        
        // Idle low-frequency waves
        const idleShiftX = Math.sin(p.x * 0.005 + time) * 1.5;
        const idleShiftY = Math.cos(p.y * 0.005 + time) * 1.5;

        const finalX = p.x + shiftX + idleShiftX;
        const finalY = p.y + shiftY + idleShiftY;

        // Rotation interpolation
        const mag = Math.sqrt(dx * dx + dy * dy);
        let angle = p.baseAngle;
        
        if (mag > 0.02) {
          const targetAngle = Math.atan2(dy, dx);
          // Simple rotation blending
          const blend = Math.min(1, mag * 5);
          
          // Shortest path angle interpolation
          let diff = targetAngle - angle;
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;
          
          angle += diff * blend;
        } else {
           angle += Math.sin(time * 0.5 + p.x) * 0.05; // tiny idle rotation
        }

        ctx.save();
        ctx.translate(finalX, finalY);
        ctx.rotate(angle);
        
        ctx.globalAlpha = p.opacity;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = p.thickness;
        ctx.lineCap = "round";
        
        ctx.beginPath();
        ctx.moveTo(-p.len / 2, 0);
        ctx.lineTo(p.len / 2, 0);
        ctx.stroke();
        
        ctx.restore();
      }

      // Swap buffers
      const temp = previous;
      previous = current;
      current = temp;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[-1]"
    />
  );
}
