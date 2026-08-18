import Reveal from "../Reveal/Reveal";

interface SectionHeadProps {
  eyebrow: string;
  title: string;
}

/** Curriculum / Activities / Reviews가 공유하는 섹션 헤더. 스타일은 app/globals.css의 공통 클래스를 사용한다. */
export default function SectionHead({ eyebrow, title }: SectionHeadProps) {
  return (
    <Reveal direction="up" className="sectionHead">
      <p className="sectionEyebrow">{eyebrow}</p>
      <h2 className="sectionTitle">{title}</h2>
    </Reveal>
  );
}
