"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

const AUTO_DELAY = 1600; // 로드 후 자동 트리거까지의 대기 시간(ms)
const DETAIL_DELAY = 2600; // .stage 폭/폰트 전환 시간(2.6s)에 맞춘 지연(ms)

export default function Hero() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  useEffect(() => {
    let triggered = false;
    let detailTimer: ReturnType<typeof setTimeout>;

    const expand = () => {
      if (triggered) return;
      triggered = true;

      clearTimeout(autoTimer);
      window.removeEventListener("scroll", expand);
      window.removeEventListener("wheel", expand);

      setIsExpanded(true);
      detailTimer = setTimeout(() => setIsDetailVisible(true), DETAIL_DELAY);
    };

    const autoTimer = setTimeout(expand, AUTO_DELAY);

    window.addEventListener("scroll", expand, { passive: true, once: true });
    window.addEventListener("wheel", expand, { passive: true, once: true });

    return () => {
      clearTimeout(autoTimer);
      clearTimeout(detailTimer);
      window.removeEventListener("scroll", expand);
      window.removeEventListener("wheel", expand);
    };
  }, []);

  const heroIntroClass = [
    styles.heroIntro,
    isExpanded ? styles.isExpanded : "",
    isDetailVisible ? styles.isDetailVisible : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={styles.hero} id="top">
      <div aria-hidden="true">
        <div className={styles.bg} />
      </div>

      <div className={heroIntroClass}>
        <h1 className={styles.stage}>
          <span className={styles.word}>
            <span className={styles.char}>AL</span>
            <span className={styles.rest}>pha</span>
          </span>
          <span className={styles.connector}>to</span>
          <span className={styles.word}>
            <span className={styles.char}>OM</span>
            <span className={styles.rest}>ega</span>
          </span>
        </h1>

        <div className={styles.detail}>
          <p>다 함께 성장하는 개발 동아리</p>
        </div>
      </div>
    </section>
  );
}
