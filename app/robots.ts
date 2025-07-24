import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [],
    sitemap: '',
  }
}

// check the documentation for more options:
// https://nextjs.org/docs/app/api-reference/functions/metadata-route#robots
