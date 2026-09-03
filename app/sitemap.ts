import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://libertystom.kz", changeFrequency: "weekly", priority: 1 },
    { url: "https://libertystom.kz/services/implantation", changeFrequency: "monthly", priority: 0.9 },
  ];
}
