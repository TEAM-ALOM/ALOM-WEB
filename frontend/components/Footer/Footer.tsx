import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Image
            className={styles.logo}
            src="/images/alom_logo2_copy.png"
            alt="ALOM"
            width={180}
            height={100}
            style={{ height: "50px", width: "auto" }}
          />
          <p>함께 성장하는 개발 동아리</p>
        </div>

        <div className={styles.contact}>
          <p>문의 : alom.club@university.ac.kr</p>
          <p>동아리방 : 학생회관 6층 622호</p>
        </div>

        <div className={styles.sns}>
          <a href="#" aria-label="Instagram" className={styles.icon}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" />
            </svg>
          </a>
          <a href="#" aria-label="GitHub" className={styles.icon}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 11 .6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2.1.1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.6 7.9-5.9 7.9-11C23.5 5.6 18.4.5 12 .5z" />
            </svg>
          </a>
          <a href="#" aria-label="Email" className={styles.icon}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
              <path d="M3.5 6l8.5 7 8.5-7" />
            </svg>
          </a>
        </div>
      </div>
      <p className={styles.copyright}>Copyright © ALOM. All rights reserved.</p>
    </footer>
  );
}
