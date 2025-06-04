const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // AI API 서버
  app.use(
    '/apiAI',
    createProxyMiddleware({
      target: 'http://43.203.246.125:8000',
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
      target: 'http://172.17.213.7:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
