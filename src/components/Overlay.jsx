// Overlay.jsx
import React, { useEffect, useRef } from "react";
import Content from "./Content.jsx";

function Overlay({ children }) {
  const overlayRef = useRef(null);
  const hexRef = useRef(null);
  const contentRef = useRef(null);
  const timers = useRef([]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const hex = hexRef.current;
    const content = contentRef.current;

    overlay.classList.add("fade-in");

    timers.current.push(
      setTimeout(() => {
        if (hex) hex.style.strokeDashoffset = "0";

        timers.current.push(
          setTimeout(() => {
            overlay.classList.remove("fade-in");

            timers.current.push(
              setTimeout(() => {
                overlay.remove();
                if (content) {
                  content.style.opacity = 1;
                  content.style.pointerEvents = "auto";
                }
              }, 1000),
            );
          }, 1300),
        );
      }, 1000),
    );

    return () => timers.current.forEach(clearTimeout);
  }, []);

  return (
    <>
      <div className="overlay" ref={overlayRef}>
        <div className="hexagon-logo-wrapper">
          <svg
            className="hex-border"
            viewBox="0 0 160 160"
            width="160"
            height="160"
          >
            <polygon
              ref={hexRef}
              className="hex-border-shape"
              fill="none"
              points="80,150 21,115 21,45 80,10 139,45 139,115"
            />
          </svg>
          <img src="/hexa-favicon.png" alt="Logo" className="landing-logo" />
        </div>
      </div>

      {/* Wrap children in a container so we can control opacity/pointer-events */}
      <div
        className="content-cnt"
        ref={contentRef}
        style={{
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity 0.5s",
        }}
      >
        {children}
        <Content></Content>
      </div>
    </>
  );
}

export default Overlay;
