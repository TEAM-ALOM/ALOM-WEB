import type { NextConfig } from "next";

// 백엔드(FastAPI) 서버 주소. 배포 환경에서는 실제 API 서버 URL로 덮어쓴다.
const BACKEND_URL = process.env.BACKEND_URL ?? "http://127.0.0.1:8081";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
