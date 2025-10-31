"use client";

import { useEffect, useRef, useState } from "react";

export default function DelayedEarthCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;

    let animationId: number;
    let rotation = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 120;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      gradient.addColorStop(0, "#4ade80");
      gradient.addColorStop(0.7, "#22c55e");
      gradient.addColorStop(1, "#15803d");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#166534";
      
      ctx.beginPath();
      ctx.ellipse(-40, -30, 25, 15, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(30, 20, 30, 20, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(-20, 50, 20, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      ctx.strokeStyle = "rgba(74, 222, 128, 0.3)";
      ctx.lineWidth = 2;
      
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radius + 30 + (i * 20), radius + 15 + (i * 10), rotation * 0.5, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = 0; i < 8; i++) {
        const angle = (rotation * 2) + (i * Math.PI / 4);
        const distance = radius + 50 + Math.sin(rotation + i) * 20;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;

        ctx.fillStyle = `rgba(74, 222, 128, ${0.6 + Math.sin(rotation + i) * 0.4})`;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      rotation += 0.01;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isVisible]);

  return (
    <div className="flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className={`transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
}
