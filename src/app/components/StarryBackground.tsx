import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";

interface StarData {
  x: number;
  y: number;
  size: number;
  opacity: number;
  state: "fade-in" | "fade-out" | "paused";
  fadeSpeed: number;
  maxOpacity: number;
  pauseTicks: number;
  color: string;
}

interface ShootingStarData {
  x: number;
  y: number;
  length: number;
  dx: number;
  dy: number;
  speed: number;
  opacity: number;
  life: number;
  maxLife: number;
  width: number;
}

const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize 60 stars with relocation-on-fade behavior
    const stars: StarData[] = [];
    for (let i = 0; i < 60; i++) {
      const isBlue = Math.random() > 0.65;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 0.8 + Math.random() * 1.6,
        opacity: 0,
        state: "paused",
        fadeSpeed: 0.004 + Math.random() * 0.012,
        maxOpacity: 0.35 + Math.random() * 0.6,
        pauseTicks: Math.floor(Math.random() * 400), // Random initial pause offset
        color: isBlue ? "#38bdf8" : "#ffffff",
      });
    }

    const shootingStars: ShootingStarData[] = [];

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Update and Draw Blinking Stars
      stars.forEach((star) => {
        if (star.state === "paused") {
          star.pauseTicks--;
          if (star.pauseTicks <= 0) {
            // Relocate to a completely new random location!
            star.x = Math.random() * width;
            star.y = Math.random() * height;
            star.state = "fade-in";
            star.opacity = 0;
          }
        } else if (star.state === "fade-in") {
          star.opacity += star.fadeSpeed;
          if (star.opacity >= star.maxOpacity) {
            star.opacity = star.maxOpacity;
            star.state = "fade-out";
          }
        } else if (star.state === "fade-out") {
          star.opacity -= star.fadeSpeed;
          if (star.opacity <= 0) {
            star.opacity = 0;
            star.state = "paused";
            // Deep pause: stay dark for 2.5s to 9s (at 60fps)
            star.pauseTicks = 150 + Math.floor(Math.random() * 400); 
          }
        }

        // Draw active star
        if (star.opacity > 0) {
          ctx.save();
          ctx.globalAlpha = star.opacity;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fillStyle = star.color;

          // Subtle neon glow for sky-blue stars
          if (star.color === "#38bdf8" && star.size > 1.2) {
            ctx.shadowBlur = 6;
            ctx.shadowColor = "#38bdf8";
          }
          ctx.fill();
          ctx.restore();
        }
      });

      // 2. Spawn and Update Shooting Stars
      // Spawn chance (~0.25% per frame, approx once every 6-7 seconds)
      if (shootingStars.length < 2 && Math.random() < 0.0025) {
        // Spawn randomly in the top-right / middle-top region of the viewport
        const startX = Math.random() * (width * 0.75) + (width * 0.25);
        const startY = Math.random() * (height * 0.35);
        const life = 50 + Math.floor(Math.random() * 70); // duration in frames (approx 1-2 seconds)
        
        shootingStars.push({
          x: startX,
          y: startY,
          length: 50 + Math.random() * 90,
          dx: -4.5 - Math.random() * 4.5, // travel left
          dy: 4.5 + Math.random() * 4.5,   // travel down
          speed: 6.5 + Math.random() * 5.5,
          opacity: 0,
          life: life,
          maxLife: life,
          width: 0.8 + Math.random() * 1.4,
        });
      }

      // Update and Draw active Shooting Stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.dx;
        ss.y += ss.dy;
        ss.life--;

        // Fade in at spawn, fade out at end of life
        const age = ss.maxLife - ss.life;
        if (age < 12) {
          ss.opacity = age / 12;
        } else if (ss.life < 18) {
          ss.opacity = ss.life / 18;
        } else {
          ss.opacity = 1;
        }

        if (ss.life <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }

        // Draw trail gradient
        ctx.save();
        ctx.globalAlpha = ss.opacity;
        
        const trailX = ss.x - ss.dx * (ss.length / ss.speed);
        const trailY = ss.y - ss.dy * (ss.length / ss.speed);
        
        const gradient = ctx.createLinearGradient(ss.x, ss.y, trailX, trailY);
        gradient.addColorStop(0, "#38bdf8"); // glowing sky blue head
        gradient.addColorStop(1, "rgba(56, 189, 248, 0)"); // transparent tail
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = ss.width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(trailX, trailY);
        ctx.stroke();
        
        ctx.restore();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
        // Deep Ivy Green radial background to keep sub-theme intact
        background: "radial-gradient(circle at 50% 30%, #172416 0%, #080d07 100%)",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </Box>
  );
};

export default StarryBackground;
