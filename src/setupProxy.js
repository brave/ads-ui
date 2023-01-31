const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/v1',
    createProxyMiddleware({
      target: `${process.env.BACKEND_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: `${process.env.BACKEND_URL}`,
      changeOrigin: true,
    })
  );
};
