"use client";

import { useEffect, useState } from "react";
import { apiGet, ApiError } from "@/lib/api";
import type { ArchivePageData } from "@/lib/types";

export default function ArchivePage() {
  const [data, setData] = useState<ArchivePageData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGet<ArchivePageData>("/archive")
      .then(setData)
      .catch((err) => setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."));
  }, []);

  if (error) return <main style={{ padding: 32 }}>에러: {error}</main>;
  if (!data) return <main style={{ padding: 32 }}>불러오는 중...</main>;

  return (
    <main style={{ padding: 32 }}>
      <h1>아카이브</h1>
      {data.items.length === 0 ? (
        <p>등록된 아카이브가 없습니다.</p>
      ) : (
        <ul>
          {data.items.map((item) => (
            <li key={item.url}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
