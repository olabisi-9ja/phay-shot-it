import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://phayshot.it",
      lastModified: new Date("2026-08-08"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
