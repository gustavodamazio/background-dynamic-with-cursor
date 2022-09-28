import { useEffect, useRef, useState } from "react";
export default function Crosshairs() {
  const svgRoot = useRef<SVGSVGElement | null>(null);
  const [coords, setCoords] = useState({
    cursorX: 0,
    cursorY: 0,
    mid: {
      x: 0,
      y: 0,
    },
    angle: 0,
    angleDeg: 0,
  });
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (!svgRoot.current) return;
    // 👇️ get position of mouse cursor
    const { pageX, pageY } = e;
    const cursorX = pageX - window.document.body.offsetLeft;
    const cursorY = pageY - window.document.body.offsetTop;
    // 👇️ get center coordinates
    let rect = svgRoot.current.getBoundingClientRect();
    const midX = rect.left + (rect.right - rect.left)/2;
    const midY = rect.top + (rect.bottom - rect.top)/2;
    // 👇️ get cursor angle
    const angle = Math.atan2(midY - cursorY, midX - cursorX);
    const angleDeg = angle * (180 / Math.PI);
    setCoords({
      cursorX: pageX,
      cursorY: pageY,
      mid: {
        x: midX,
        y: midY,
      },
      angle,
      angleDeg,
    });
  };
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ref={svgRoot}>
      <defs>
        <linearGradient
          gradientTransform={`rotate( ${coords.angleDeg}, 0.5, 0.5 )`}
          id="gradient"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#f81ce5" />
          <stop offset="20%" stopColor="#7928ca" />
          <stop offset="80%" stopColor="#18181b" />
        </linearGradient>
      </defs>
      <path d="M256 0c17.7 0 32 14.3 32 32V42.4c93.7 13.9 167.7 88 181.6 181.6H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H469.6c-13.9 93.7-88 167.7-181.6 181.6V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V469.6C130.3 455.7 56.3 381.7 42.4 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H42.4C56.3 130.3 130.3 56.3 224 42.4V32c0-17.7 14.3-32 32-32zM107.4 288c12.5 58.3 58.4 104.1 116.6 116.6V384c0-17.7 14.3-32 32-32s32 14.3 32 32v20.6c58.3-12.5 104.1-58.4 116.6-116.6H384c-17.7 0-32-14.3-32-32s14.3-32 32-32h20.6C392.1 165.7 346.3 119.9 288 107.4V128c0 17.7-14.3 32-32 32s-32-14.3-32-32V107.4C165.7 119.9 119.9 165.7 107.4 224H128c17.7 0 32 14.3 32 32s-14.3 32-32 32H107.4zM256 288c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z" />
    </svg>
  );
}
