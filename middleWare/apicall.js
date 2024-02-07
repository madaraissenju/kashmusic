const { createProxyMiddleware } = require('http-proxy-middleware');

// Middleware to remove CORS and add a proxy
const corsAndProxyMiddleware = (targetApiUrl) => {
    const apiProxy = createProxyMiddleware({
        target: targetApiUrl,
        changeOrigin: true,
        pathRewrite: {
            '^/callApi': '/playlists', // Rewrite the path to /playlists on the target API
        },
    });
        return (req, res, next) => {
        // Remove CORS headers
        res.removeHeader('Access-Control-Allow-Origin');
        res.removeHeader('Access-Control-Allow-Methods');
        res.removeHeader('Access-Control-Allow-Headers');

        // Use the proxy middleware for the /callApi route
        apiProxy(req, res, next);
    };
};

module.exports = corsAndProxyMiddleware;

