export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Handle API routes
    if (url.pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ error: 'API not implemented' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 404
      });
    }
    
    // Try to serve static assets first
    let assetResponse = await env.ASSETS.fetch(request);
    
    // If asset not found and it's not a file request, serve index.html (SPA routing)
    if (!assetResponse.ok && !url.pathname.includes('.')) {
      const indexRequest = new Request('https://example.com/index.html', {
        method: request.method,
        headers: request.headers,
      });
      assetResponse = await env.ASSETS.fetch(indexRequest);
    }
    
    // Set proper MIME types for common file extensions
    if (assetResponse.ok) {
      const pathname = url.pathname.toLowerCase();
      const newHeaders = new Headers(assetResponse.headers);
      
      if (pathname.endsWith('.js')) {
        newHeaders.set('Content-Type', 'application/javascript');
      } else if (pathname.endsWith('.css')) {
        newHeaders.set('Content-Type', 'text/css');
      } else if (pathname.endsWith('.png')) {
        newHeaders.set('Content-Type', 'image/png');
      } else if (pathname.endsWith('.jpg') || pathname.endsWith('.jpeg')) {
        newHeaders.set('Content-Type', 'image/jpeg');
      } else if (pathname.endsWith('.svg')) {
        newHeaders.set('Content-Type', 'image/svg+xml');
      } else if (pathname.endsWith('.webp')) {
        newHeaders.set('Content-Type', 'image/webp');
      }
      
      return new Response(assetResponse.body, {
        status: assetResponse.status,
        statusText: assetResponse.statusText,
        headers: newHeaders,
      });
    }
    
    return assetResponse;
  },
};
