import React, { useEffect, useRef } from "react";

function rand(max: number) {
  return Math.random() * max;
}

class Star {
  constructor(canvas: HTMLCanvasElement, size: number, speed: number) {
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.size = size;
    this.speed = speed;
    this.x = rand(window.innerWidth);
    this.y = rand(window.innerHeight);
  }

  ctx: CanvasRenderingContext2D;
  size: number;
  speed: number;
  x: number;
  y: number;

  animate(delta: number) {
    this.x += this.speed * delta;
    this.y -= this.speed * delta;
    if (this.y < 0) {
      this.y = window.innerHeight;
    }
    if (this.x > window.innerWidth) {
      this.x = 0;
    }
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const starsRef = useRef<Star[]>([]);
  const lastPaintTimeRef = useRef<number>(0);
  const lastResizeTimeRef = useRef<number>(0);
  const ms = 16;

  const drawStars = (delta: number) => {
    for (let i = 0; i < starsRef.current.length; i++) {
      starsRef.current[i].animate(delta);
    }
  };

  const paintLoop: FrameRequestCallback = (timestamp: number) => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let delta = (timestamp - lastPaintTimeRef.current) / 1000;
    if (delta > 0.05) {
      delta = 0.05;
    }
    drawStars(delta);
    requestAnimationFrame(paintLoop);
    lastPaintTimeRef.current = timestamp;
  };

  const fadeIn = (
    canvas: HTMLCanvasElement,
    duration: number,
    callback?: () => any
  ) => {
    canvas.style.opacity = "0";
    canvas.style.display = "block";

    let startTime = Date.now();
    let tick = function () {
      let newOpacity = (Date.now() - startTime) / duration;
      if (newOpacity > 1) {
        newOpacity = 1;
        callback && callback();
      } else {
        requestAnimationFrame(tick);
      }

      canvas.style.opacity = `${newOpacity}`;
    };
    tick();
  };

  const initializeStars = (canvas: HTMLCanvasElement) => {
    let winArea = window.innerWidth * window.innerHeight;
    let smallStarsDensity = 0.0001;
    let mediumStarsDensity = 0.00005;
    let largeStarsDensity = 0.00002;
    let smallStarsCount = winArea * smallStarsDensity;
    let mediumStarsCount = winArea * mediumStarsDensity;
    let largeStarsCount = winArea * largeStarsDensity;
    for (let i = 0; i < smallStarsCount; i++) {
      starsRef.current.push(new Star(canvas, 1, 30));
    }

    for (let i = 0; i < mediumStarsCount; i++) {
      starsRef.current.push(new Star(canvas, 2, 20));
    }

    for (let i = 0; i < largeStarsCount; i++) {
      starsRef.current.push(new Star(canvas, 3, 10));
    }
  };

  const resizeFunction = (
    canvas: HTMLCanvasElement,
    resizeCooldown: number
  ) => {
    if (
      Date.now() - lastResizeTimeRef.current < resizeCooldown &&
      resizeTimeoutRef.current
    ) {
      clearTimeout(resizeTimeoutRef.current as NodeJS.Timeout);
    }

    lastResizeTimeRef.current = Date.now();
    starsRef.current = [];
    canvas.style.display = "none";
    resizeTimeoutRef.current = setTimeout(() => {
      fadeIn(canvas, 500);
      initializeStars(canvas);
    }, 500);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 64;
  };

  const starsDraw = (canvas: HTMLCanvasElement) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 64;
    initializeStars(canvas);
    requestAnimationFrame(paintLoop);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const resizeCallback = () => resizeFunction(canvas, 500);
      window.addEventListener("resize", resizeCallback);
      starsDraw(canvas);
      return () => {
        window.removeEventListener("resize", resizeCallback);
      };
    }
  });

  return <canvas ref={canvasRef} />;
};

export default Canvas;
