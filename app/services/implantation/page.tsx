import type { Metadata } from "next";
import { ImplantationPage } from "@/components/ImplantationPage";

export const metadata: Metadata = {
  title: "Имплантация зубов в Астане — Liberty Stom",
  description:
    "Имплантация зубов от 70 000 ₸. Диагностика, персональный план лечения и сопровождение в Liberty Stom.",
  alternates: { canonical: "/services/implantation" },
  openGraph: {
    title: "Имплантация зубов в Астане — Liberty Stom",
    description: "Имплантация от 70 000 ₸ с понятным планом лечения и сопровождением.",
    images: ["/images/implant-model.png"],
  },
};

export default function Page() {
  return <ImplantationPage />;
}
