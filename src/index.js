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
    
    // Serve static assets
    return env.ASSETS.fetch(request);
  },
};
