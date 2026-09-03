import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://libertystom.kz"),
  title: "Liberty Stom — семейная стоматология в Астане",
  description:
    "Современная стоматология для взрослых и детей. Имплантация, ортодонтия, хирургия и лечение во сне.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Liberty Stom — семейная стоматология в Астане",
    description: "Современное лечение взрослых и детей — спокойно, понятно и без лишнего стресса.",
    images: ["/images/hero-clinic.png"],
    locale: "ru_KZ",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
