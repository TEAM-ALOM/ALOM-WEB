"use client";

import { useEffect, useRef, useState } from "react";
import SectionHead from "../SectionHead/SectionHead";
import styles from "./Activities.module.css";

const ACTIVITIES = [
  {
    icon: "🤝",
    title: "아롬다롬",
    desc: "후배(아롬)와 선배(다롬)가 짝을 이루어 학기 내내 소통합니다. 전공 공부부터 진로 고민까지, 편하게 물어보고 함께 답을 찾아가는 시간이에요.",
  },
  {
    icon: "🧭",
    title: "멘토멘티",
    desc: "실력 있는 멘토가 멘티들을 코칭합니다. 막막했던 개념도 눈높이에 맞는 설명과 피드백으로 확실하게 내 것으로 만들 수 있어요.",
  },
  {
    icon: "📚",
    title: "스터디",
    desc: "같은 목표를 가진 부원들이 모여 자율적으로 학습합니다. 혼자라면 미뤘을 공부도 함께라면 끝까지 해낼 수 있어요.",
  },
  {
    icon: "🎤",
    title: "세미나",
    desc: "최신 기술 트렌드와 실전 경험을 발표로 공유합니다. 발표자는 설명하는 힘을, 청중은 새로운 인사이트를 얻어갑니다.",
  },
  {
    icon: "🏆",
    title: "대외활동",
    desc: "해커톤과 공모전에 팀으로 도전합니다. 아이디어를 실제 서비스로 만들어보는 짧고 굵은 몰입의 시간이에요.",
  },
];

/**
 * 뷰포트 상하 45%씩을 제외한 얇은 띠(정중앙)에 걸리는 항목을 활성 인덱스로 삼는다.
 * 텍스트(item)와 우측 sticky 이미지는 같은 index로 매칭되고, CSS transition이 전환을 담당한다.
 */
export default function Activities() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const items = itemRefs.current.filter((el): el is HTMLDivElement => el !== null);
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0, rootMargin: "-45% 0px -45% 0px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.activities} id="activities">
      <SectionHead eyebrow="ACTIVITIES" title="아롬의 활동" />

      <div className={styles.scroll}>
        <div className={styles.textCol}>
          {ACTIVITIES.map((activity, index) => (
            <div
              key={activity.title}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              data-index={index}
              className={`${styles.item} ${index === activeIndex ? styles.itemActive : ""}`}
            >
              <span className={styles.itemIcon}>{activity.icon}</span>
              <h3 className={styles.itemTitle}>{activity.title}</h3>
              <p className={styles.itemDesc}>{activity.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.imageCol}>
          <div className={styles.imageFrame}>
            {ACTIVITIES.map((activity, index) => (
              <div
                key={activity.title}
                className={`${styles.image} ${index === activeIndex ? styles.imageActive : ""}`}
              >
                <span className={styles.imageIcon}>{activity.icon}</span>
                <span className={styles.imageLabel}>{activity.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
