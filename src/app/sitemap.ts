import type { MetadataRoute } from "next";
import { PROFILE } from "@/data/profile";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${PROFILE.url}/`, lastModified: new Date(), priority: 1 }];
}
