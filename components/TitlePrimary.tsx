import { useEffect, useRef, useState } from "react";

export default function TitlePrimary({ text }: { text: string }) {
  const headingRoot = useRef<HTMLHeadingElement | null>(null);
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
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseMove = (event: globalThis.MouseEvent) => {
    if (!headingRoot.current) return;
    // 👇️ get center coordinates
    let rect = headingRoot.current.getBoundingClientRect();
    const formRefX = (rect.left + rect.right) / 2;
    const formRefY = (rect.top + rect.bottom) / 2;
    // 👇️ get cursor angle
    const { pageX, pageY } = event;
    const angle = Math.atan2(formRefX - pageX, pageY - formRefY);
    const angleDeg = angle * (180 / Math.PI);
    setCoords({
      cursorX: pageX,
      cursorY: pageY,
      mid: {
        x: formRefX,
        y: formRefY,
      },
      angle,
      angleDeg,
    });
  };
  return (
    <h1
      ref={headingRoot}
      className="title-primary background-text"
      style={{
        backgroundImage: `linear-gradient(
        calc(${coords.angle}rad),
        #f81ce5 25%,
        #7928ca 60%
      )`,
      }}
    >
      {text}
    </h1>
  );
}
