import Reveal from "../Reveal/Reveal";
import SectionHead from "../SectionHead/SectionHead";
import styles from "./Curriculum.module.css";

const JUNIOR_ITEMS = ["C언어 기초", "고급 C언어", "파이썬 기초 코딩", "알고리즘"];

const SENIOR_ITEMS = [
  "Java",
  "Spring",
  "프론트 기초 (HTML, CSS, JS)",
  "React",
  "AI - ML",
  "AI - DL",
  "팀 프로젝트반",
];

export default function Curriculum() {
  return (
    <section className={styles.curriculum} id="curriculum">
      <SectionHead eyebrow="CURRICULUM" title="2026학년도 2학기 커리큘럼" />

      <div className={styles.grid}>
        <Reveal direction="left" className={`${styles.card} ${styles.junior}`}>
          <div className={styles.cardHead}>
            <span className={styles.badge}>JUNIOR</span>
            <h3>주니어반</h3>
            <p>개발의 첫걸음을 함께 시작해요</p>
          </div>
          <ul className={styles.list}>
            {JUNIOR_ITEMS.map((item, index) => (
              <li key={item}>
                <span className={styles.num}>{String(index + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal direction="right" className={`${styles.card} ${styles.senior}`}>
          <div className={styles.cardHead}>
            <span className={styles.badge}>SENIOR</span>
            <h3>시니어반</h3>
            <p>실전 기술과 팀 프로젝트로 완성해요</p>
          </div>
          <ul className={styles.list}>
            {SENIOR_ITEMS.map((item, index) => (
              <li key={item}>
                <span className={styles.num}>{String(index + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
