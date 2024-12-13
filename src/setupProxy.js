const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://103.181.183.222:5555',  // Ganti dengan URL API Anda
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api', // Jika diperlukan, sesuaikan path-nya
      },
    })
  );
};
