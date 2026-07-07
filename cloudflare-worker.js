// Cloudflare Worker: Reverse proxy dubbingai.io/blog/* → blog.dubbingai.io/*
//
// Deploy this worker on the dubbingai.io domain via Cloudflare Dashboard.
// All /blog/* requests are proxied to the blog subdomain while preserving
// the original URL visible to the user.
//
// Alternative: If both apps are on Vercel, use the Vercel rewrites in next.config.ts instead.

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Proxy /blog/* requests to the blog subdomain
    if (url.pathname.startsWith("/blog")) {
      url.hostname = "blog.dubbingai.io";
      const modifiedRequest = new Request(url, request);
      return fetch(modifiedRequest);
    }

    // All other requests go to the main site (origin)
    return fetch(request);
  },
};
