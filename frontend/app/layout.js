export const metadata = {
  title: "ALOM",
  description: "ALOM-WEB frontend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
