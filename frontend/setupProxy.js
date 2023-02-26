const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://129.21.88.24:8080',
      changeOrigin: true,
    })
  );
};
