import SectionHead from "../SectionHead/SectionHead";
import styles from "./Reviews.module.css";

const REVIEWS = [
  {
    tilt: "-4deg",
    quote: "전공 수업에서 이해 못했던 개념을 아롬 스터디에서 확실히 잡고 갈 수 있었어요.",
    name: "회원 A",
    meta: "주니어반 · 25학번",
  },
  {
    tilt: "3deg",
    quote: "멘토멘티 덕분에 처음 써본 React로 팀 프로젝트를 무사히 마쳤습니다.",
    name: "회원 B",
    meta: "시니어반 · 24학번",
  },
  {
    tilt: "-2deg",
    quote: "아롬다롬 활동에서 만난 선배 덕분에 진로 고민을 많이 해결했어요.",
    name: "회원 C",
    meta: "주니어반 · 25학번",
  },
  {
    tilt: "5deg",
    quote: "해커톤에 나가서 처음으로 수상까지 해봤습니다. 아롬 아니었으면 못했을 도전이에요.",
    name: "회원 D",
    meta: "시니어반 · 23학번",
  },
  {
    tilt: "-3deg",
    quote: "세미나에서 발표하면서 제가 아는 걸 설명하는 힘이 늘었어요.",
    name: "회원 E",
    meta: "시니어반 · 24학번",
  },
];

function ReviewCard({
  review,
  hidden,
}: {
  review: (typeof REVIEWS)[number];
  hidden?: boolean;
}) {
  return (
    <article
      className={styles.card}
      style={{ "--tilt": review.tilt } as React.CSSProperties}
      aria-hidden={hidden}
    >
      <p className={styles.quote}>&ldquo;{review.quote}&rdquo;</p>
      <div className={styles.author}>
        <span className={styles.name}>{review.name}</span>
        <span className={styles.meta}>{review.meta}</span>
      </div>
    </article>
  );
}

/** overflow:hidden 래퍼 안에서 .track이 CSS keyframes(translateX -50%)로 끊임없이 흐르는 무한 마퀴.
 *  두 세트를 이어붙여 이음새 없이 반복되도록, 동일 카드 목록을 한 번 더 렌더링한다(aria-hidden). */
export default function Reviews() {
  return (
    <section className={styles.reviews} id="reviews">
      <SectionHead eyebrow="REVIEWS" title="아롬 부원들의 이야기" />

      <div className={styles.marquee}>
        <div className={styles.track}>
          {REVIEWS.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
          {REVIEWS.map((review) => (
            <ReviewCard key={`${review.name}-dup`} review={review} hidden />
          ))}
        </div>
      </div>
    </section>
  );
}
