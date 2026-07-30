import { NextResponse } from 'next/server';
import { blogPosts } from '@config/blog';
import { seoConfig } from '@config/site';

export async function GET() {
  const itemsXml = blogPosts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${seoConfig.domain}/blog/${post.slug}</link>
      <guid isPermaLink="true">${seoConfig.domain}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category><![CDATA[${post.category}]]></category>
    </item>`
    )
    .join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${seoConfig.title} — Engineering Blog]]></title>
    <link>${seoConfig.domain}/blog</link>
    <description><![CDATA[Technical articles on AI engineering, Next.js 15 App Router optimizations, Playwright stealth scraping, and Python FastAPI architecture by Sahil Bhakre.]]></description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${seoConfig.domain}/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
