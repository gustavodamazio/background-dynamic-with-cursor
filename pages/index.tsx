import type { NextPage } from "next";
import Head from "next/head";
import { MouseEvent, useRef } from "react";
import Crosshairs from "../components/svg/Crosshairs";
import TitlePrimary from "../components/TitlePrimary";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const containerRef = useRef<HTMLFormElement | null>(null);

  function setRad(newRad: number) {
    document.body.style.setProperty(
      "--contact-gradient-rotation",
      newRad + "rad"
    );
  }

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    // 👇️ get center coordinates
    let rect = containerRef.current.getBoundingClientRect();
    const formRefX = (rect.left + rect.right) / 2;
    const formRefY = (rect.top + rect.bottom) / 2;
    // 👇️ get cursor angle
    const { pageX, pageY } = event;
    const angle = Math.atan2(formRefX - pageX, pageY - formRefY);
    setRad(angle);
  };

  return (
    <div className={styles.container} onMouseMove={handleMouseMove}>
      <Head>
        <title>Background dynamic with cursor</title>
      </Head>

      <div className={styles.main}>
        <TitlePrimary text="Background dynamic with cursor"/>
        <form ref={containerRef} className={styles.form}>
          <div className={"center-absolute"}>
            <Crosshairs />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
