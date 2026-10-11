import { useEffect } from "react";
import { animate, stagger } from "animejs";

import Background from "./assets/background.png";
import LakshyaLogo from "./assets/logo.png";
import InfinityStones from "./InfinityStonesScenes.jsx";

import "./index.css";

function App() {
  useEffect(() => {
    const animations = [];

    // LOGO ENTRANCE
    animations.push(
      animate(".main-logo", {
        opacity: [0, 1],
        translateY: [25, 0],
        scale: [0.95, 1],
        duration: 1200,
        delay: 250,
        ease: "outCubic",
      })
    );

    // DATE ENTRANCE
    animations.push(
      animate(".hero-date", {
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 800,
        delay: 900,
        ease: "outExpo",
      })
    );

    // SCROLL INDICATOR
    animations.push(
      animate(".hero-scroll", {
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 800,
        delay: 1200,
        ease: "outExpo",
      })
    );

    // BACKGROUND GLOW
    animations.push(
      animate(".background-glow", {
        opacity: [0.25, 0.5],
        scale: [0.95, 1.08],
        duration: 3500,
        alternate: true,
        loop: true,
        ease: "inOutSine",
      })
    );

    // STARS
    animations.push(
      animate(".star", {
        opacity: [0.15, 0.8],
        scale: [0.7, 1.3],
        duration: 1800,
        delay: stagger(250),
        alternate: true,
        loop: true,
        ease: "inOutSine",
      })
    );

    return () => {
      animations.forEach((animation) => {
        animation.pause();
      });
    };
  }, []);

  return (
    <div className="app">

      {/* HERO */}
      <main id="home" className="hero">

        {/* BACKGROUND IMAGE */}
        <div
          className="background-image"
          style={{
            backgroundImage: `url("${Background}")`,
          }}
        />

        {/* OVERLAYS */}
        <div className="background-overlay" />
        <div className="background-glow" />
        <div className="grid" />

        {/* STARS */}
        <div className="stars">
          {Array.from({ length: 12 }, (_, index) => (
            <span
              key={index}
              className={`star star-${index + 1}`}
            />
          ))}
        </div>

        {/* HERO CONTENT */}
        <section className="hero-content">

          {/* LAKSHYA LOGO
              MES PRESENTS is already in logo.png */}
          <div className="main-logo">
            <img
              src={LakshyaLogo}
              alt="LAKSHYA 20.0 - The Infinity Saga"
              draggable="false"
            />
          </div>

          {/* SIX STONES DIRECTLY UNDER THE LOGO */}
          <InfinityStones />

          {/* EVENT DATE */}
          <div className="hero-date">
            12 • 12 • 2026
          </div>

          {/* SCROLL INDICATOR */}
          <a href="#saga" className="hero-scroll">
            <span>SCROLL TO EXPLORE</span>
            <div className="scroll-line" />
          </a>

        </section>
      </main>

      {/* OTHER WEBSITE SECTIONS */}
      <section id="saga" className="content-section">
        <h2>THE SAGA</h2>
      </section>

      <section id="business" className="content-section">
        <h2>BUSINESS</h2>
      </section>

      <section id="timeline" className="content-section">
        <h2>TIMELINE</h2>
      </section>

      <section id="characters" className="content-section">
        <h2>CHARACTERS</h2>
      </section>

      <section id="gallery" className="content-section">
        <h2>GALLERY</h2>
      </section>

      <section id="news" className="content-section">
        <h2>NEWS</h2>
      </section>

    </div>
  );
}

export default App;