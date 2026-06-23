import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "f5iwk3nd",
  dataset: "production",
  apiVersion: "2026-03-01",
  useCdn: true,
});

export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    "imageUrl": mainImage.asset->url,
    "categories": categories[]->title
  }
`;

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    "imageUrl": mainImage.asset->url,
    "categories": categories[]->title
  }
`;