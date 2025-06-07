const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // AI API 서버
  app.use(
    '/apiAI',
    createProxyMiddleware({
      target: 'http://13.124.227.245:8000',
      changeOrigin: true,
      pathRewrite: {
        '^/apiAI': '',
      },
    })
  );

  // 마이페이지 서버
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.hifixi.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
