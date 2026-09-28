import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../utils/gsapSetup";
import "./Preloader.css";

function Preloader({ onComplete }) {
  const loaderRef = useRef(null);
  const progressRef = useRef(null);
  const percentRef = useRef(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const progress = progressRef.current;
    const percent = percentRef.current;

    if (!loader) return;

    if (prefersReducedMotion()) {
      onComplete?.();
      return;
    }

    const counter = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
      },
    });

    tl.to(counter, {
      value: 100,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        const value = Math.round(counter.value);

        if (percent) {
          percent.textContent = String(value).padStart(3, "0");
        }

        if (progress) {
          progress.style.width = `${value}%`;
        }
      },
    })

      // Hold the completed state briefly
      .to({}, { duration: 0.25 })

      // Cinematic name reveal
      .to(".loader-name", {
        letterSpacing: "0.18em",
        scale: 1.03,
        duration: 0.35,
        ease: "power2.out",
      })

      // Move name upward
      .to(".loader-name", {
        y: -20,
        opacity: 0,
        duration: 0.45,
        ease: "power4.inOut",
      })

      // Remove small metadata
      .to(
        ".loader-meta",
        {
          opacity: 0,
          y: -10,
          duration: 0.25,
        },
        "<"
      )

      // Cinematic curtain exit
      .to(
        loader,
        {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.85,
          ease: "power4.inOut",
        },
        "-=0.05"
      );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="preloader" ref={loaderRef}>
      <div className="preloader-grid"></div>

      <div className="preloader-top">
        <span>DHASARATHI A.</span>
        <span>PORTFOLIO / 2026</span>
      </div>

      <div className="preloader-center">
        <div className="loader-index">00 / 01</div>

        <h1 className="loader-name">
          DHASARATHI
          
        </h1>

        <div className="loader-title">
          CYBER SECURITY STUDENT
        </div>
      </div>

      <div className="preloader-bottom">
        <div className="loader-meta">
          <span>INITIALIZING EXPERIENCE</span>
          <span>
            <strong ref={percentRef}>000</strong>%
          </span>
        </div>

        <div className="loader-track">
          <div
            className="loader-progress"
            ref={progressRef}
          ></div>
        </div>

        <div className="loader-footer">
          <span>JAVA / PYTHON / REACT</span>
          <span>LOADING SYSTEM</span>
        </div>
      </div>
    </div>
  );
}

export default Preloader;