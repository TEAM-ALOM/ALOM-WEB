"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

const SCROLL_THRESHOLD = 10;
const GNB_ID = "gnb";

const NAV_LINKS = [
  { href: "#curriculum", label: "커리큘럼" },
  { href: "#activities", label: "아카이브" },
  { href: "#", label: "아롬인들" },
  { href: "#", label: "자주 묻는 질문" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateGnb = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    updateGnb();
    window.addEventListener("scroll", updateGnb, { passive: true });
    return () => window.removeEventListener("scroll", updateGnb);
  }, []);

  const handleAnchorClick = (event: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (!hash || hash === "#") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const target = document.querySelector(hash);
    if (!target) return;

    event.preventDefault();
    const gnb = document.getElementById(GNB_ID);
    const offset = (gnb ? gnb.offsetHeight : 0) + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <header id={GNB_ID} className={`${styles.gnb} ${scrolled ? styles.gnbScrolled : ""}`}>
      <div className={styles.inner}>
        <a href="#top" className={styles.logo} onClick={(e) => handleAnchorClick(e, "#top")}>
          <Image
            src="/images/alom_logo2_copy.png"
            alt="ALOM"
            width={180}
            height={100}
            style={{ height: "50px", width: "auto" }}
            priority
          />
        </a>
        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
