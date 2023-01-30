const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/v1',
    createProxyMiddleware({
      target: `${process.env.PROXY_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: `${process.env.PROXY_URL}`,
      changeOrigin: true,
    })
  );
};
