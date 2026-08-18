"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Reveal.module.css";

type Direction = "up" | "left" | "right";

interface RevealProps {
  direction: Direction;
  className?: string;
  children: React.ReactNode;
}

/**
 * 뷰포트에 일정 비율 들어오면 등장, 벗어나면 다시 숨겨지는 스크롤 리빌 래퍼.
 * 위아래로 스크롤할 때마다 반복 재생되어야 하므로 한 번 등장 후에도 계속 관찰한다.
 */
export default function Reveal({ direction, className, children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window),
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const directionClass = {
    up: styles.up,
    left: styles.left,
    right: styles.right,
  }[direction];

  return (
    <div
      ref={ref}
      className={[styles.reveal, directionClass, visible ? styles.visible : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
