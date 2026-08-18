"use client";

import { useEffect, useState } from "react";
import { apiGet, ApiError } from "@/lib/api";
import type { MemberPageData } from "@/lib/types";

export default function MemberPage() {
  const [data, setData] = useState<MemberPageData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGet<MemberPageData>("/member")
      .then(setData)
      .catch((err) => setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."));
  }, []);

  if (error) return <main style={{ padding: 32 }}>에러: {error}</main>;
  if (!data) return <main style={{ padding: 32 }}>불러오는 중...</main>;

  return (
    <main style={{ padding: 32 }}>
      <h1>아롬인들</h1>
      {data.members.length === 0 ? (
        <p>등록된 멤버가 없습니다.</p>
      ) : (
        <ul>
          {data.members.map((member) => (
            <li key={member.name}>
              {member.name} — {member.role}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
