"use strict";

// JS가 정상 로드되면 CSS의 no-js 폴백을 해제한다.
document.documentElement.classList.remove("no-js");

document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initScrollReveal();
  initGnbScrollStyle();
  initActivitiesScroll();
  initHeroIntro();
});

/* ==========================================================================
   1. GNB 오프셋을 고려한 스무스 스크롤
   - href="#id" 형태의 모든 내부 링크에 적용
   - GNB가 fixed이므로 이동한 뒤 헤더 높이만큼 보정한다
   ========================================================================== */
function initSmoothScroll() {
  const gnb = document.getElementById("gnb");
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");

      // href="#" 처럼 이동할 섹션이 없는 링크는 맨 위로 이동
      if (!hash || hash === "#") {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      const offset = (gnb ? gnb.offsetHeight : 0) + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}

/* ==========================================================================
   2. IntersectionObserver 기반 스크롤 등장 애니메이션
   - .reveal 요소가 뷰포트에 일정 비율 들어오면 .is-visible 클래스 토글
   - ONCE: true면 한 번 등장 후 다시 관찰하지 않음, false면 화면 밖으로
     나갈 때마다 초기화되어 다시 등장
   - 커리큘럼 카드, 활동 행처럼 스크롤을 오르내릴 때마다 반복 등장해야
     하므로 false로 둔다 (요구사항: "위아래로 스크롤할 때마다" 반복 재생)
   ========================================================================== */
function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  const ONCE = false;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          if (ONCE) observer.unobserve(entry.target);
        } else if (!ONCE) {
          entry.target.classList.remove("is-visible");
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  targets.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   3. 스크롤 시 GNB 배경 전환
   - 최상단에서는 투명, 일정 거리 이상 스크롤되면 .gnb--scrolled 부여
   ========================================================================== */
function initGnbScrollStyle() {
  const gnb = document.getElementById("gnb");
  if (!gnb) return;

  const SCROLL_THRESHOLD = 10;

  const updateGnb = () => {
    gnb.classList.toggle("gnb--scrolled", window.scrollY > SCROLL_THRESHOLD);
  };

  updateGnb();
  window.addEventListener("scroll", updateGnb, { passive: true });
}

/* ==========================================================================
   4. 활동 섹션 — 텍스트 하이라이트 & 이미지 크로스페이드
   - rootMargin으로 뷰포트 상하 45%씩을 제외해, 화면 정중앙을 가로지르는
     얇은 띠만 관찰 영역으로 남긴다. 어떤 .activity-item이 그 띠에
     걸리는 순간(threshold: 0) 그 항목의 data-index를 "활성"으로 삼는다.
   - 텍스트(.activity-item)와 우측 sticky 이미지(.activity-image)는
     같은 data-index로 매칭되며, 활성/비활성 전환은 CSS transition이 담당한다.
   ========================================================================== */
function initActivitiesScroll() {
  const items = document.querySelectorAll(".activity-item");
  const images = document.querySelectorAll(".activity-image");
  if (!items.length || !images.length) return;

  const setActive = (index) => {
    items.forEach((item) => {
      item.classList.toggle("active", item.dataset.index === index);
    });
    images.forEach((image) => {
      image.classList.toggle("active", image.dataset.index === index);
    });
  };

  if (!("IntersectionObserver" in window)) {
    setActive(items[0].dataset.index);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.dataset.index);
        }
      });
    },
    {
      threshold: 0,
      rootMargin: "-45% 0px -45% 0px",
    },
  );

  items.forEach((item) => observer.observe(item));
  setActive(items[0].dataset.index);
}

/* ==========================================================================
   5. 히어로 타이포그래피 인트로 (ALOM -> ALpha to OMega)
   - 로드 후 AUTO_DELAY가 지나거나 사용자가 첫 스크롤/휠을 하는 순간(둘 중
     먼저 오는 쪽) #heroIntro에 .is-expanded를 붙인다. 실제 펼침 애니메이션
     (max-width/opacity/margin/transform 전환)은 CSS가 전담한다.
   - .is-expanded 전환이 끝날 즈음(DETAIL_DELAY) .is-detail-visible을 추가해
     태그라인과 스크롤 인디케이터를 페이드인시킨다. DETAIL_DELAY는 CSS의
     가장 긴 전환 시간(transform 2.6s)에 맞춰져 있다.
   ========================================================================== */
function initHeroIntro() {
  const hero = document.getElementById("heroIntro");
  if (!hero) return;

  const AUTO_DELAY = 1600; // 로드 후 자동 트리거까지의 대기 시간(ms)
  const DETAIL_DELAY = 2600; // .hero-intro__stage 폭/폰트 전환 시간(2.6s)에 맞춘 지연(ms)

  let triggered = false;

  const expand = () => {
    if (triggered) return;
    triggered = true;

    clearTimeout(autoTimer);
    window.removeEventListener("scroll", expand);
    window.removeEventListener("wheel", expand);

    hero.classList.add("is-expanded");
    setTimeout(() => {
      hero.classList.add("is-detail-visible");
    }, DETAIL_DELAY);
  };

  const autoTimer = setTimeout(expand, AUTO_DELAY);

  window.addEventListener("scroll", expand, { passive: true, once: true });
  window.addEventListener("wheel", expand, { passive: true, once: true });
}
