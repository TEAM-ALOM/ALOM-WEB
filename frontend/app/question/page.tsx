"use client";

import { useEffect, useState } from "react";
import { apiGet, ApiError } from "@/lib/api";
import type { QuestionPageData } from "@/lib/types";

export default function QuestionPage() {
  const [data, setData] = useState<QuestionPageData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGet<QuestionPageData>("/question")
      .then(setData)
      .catch((err) => setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."));
  }, []);

  if (error) return <main style={{ padding: 32 }}>에러: {error}</main>;
  if (!data) return <main style={{ padding: 32 }}>불러오는 중...</main>;

  return (
    <main style={{ padding: 32 }}>
      <h1>자주 묻는 질문</h1>
      {data.faqs.length === 0 ? (
        <p>등록된 질문이 없습니다.</p>
      ) : (
        <dl>
          {data.faqs.map((faq) => (
            <div key={faq.question}>
              <dt>{faq.question}</dt>
              <dd>{faq.answer}</dd>
            </div>
          ))}
        </dl>
      )}
    </main>
  );
}
