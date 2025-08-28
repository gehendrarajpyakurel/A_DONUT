import React, { useEffect, useRef } from "react";

function Navigation() {
  const lastScrollTop = useRef(0);
  const navRef = useRef(null);

  useEffect(() => {
    const navbar = navRef.current;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll =
            window.pageYOffset || document.documentElement.scrollTop;
          currentScroll > lastScrollTop.current
            ? (navbar.style.top = "-100px")
            : (navbar.style.top = "0");
          currentScroll > 0
            ? navbar.classList.add("shadow")
            : navbar.classList.remove("shadow");
          lastScrollTop.current = currentScroll <= 0 ? 0 : currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav ref={navRef} className="navigation nav-bar">
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </nav>
  );
}

export default Navigation;
