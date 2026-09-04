import type { MetadataRoute } from "next";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://libertystom.kz", changeFrequency: "weekly", priority: 1 },
    ...services.map((service) => ({
      url: `https://libertystom.kz/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
