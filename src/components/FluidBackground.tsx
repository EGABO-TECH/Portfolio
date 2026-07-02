import { useEffect, useRef } from 'react';
// @ts-expect-error - no types available for fluid.js
import webGLFluid from '../utils/fluid';

const FluidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      // Initialize the WebGL fluid simulation with aaabadcode.com configuration
      webGLFluid(canvasRef.current, {
        IMMEDIATE: false, // Don't start rendering immediately, save CPU
        TRIGGER: 'hover', // Generate splats on hover
        SIM_RESOLUTION: 128,
        DYE_RESOLUTION: 1440,
        DENSITY_DISSIPATION: 0.5,
        VELOCITY_DISSIPATION: 3,
        PRESSURE: 0.1,
        PRESSURE_ITERATIONS: 20,
        CURL: 3,
        SPLAT_RADIUS: 0.2,
        SPLAT_FORCE: 6000,
        SHADING: true,
        COLOR_UPDATE_SPEED: 10,
        BACK_COLOR: { r: 0, g: 0, b: 0 },
        TRANSPARENT: true,
      });
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
};

export default FluidBackground;
