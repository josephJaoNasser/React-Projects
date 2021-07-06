const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(createProxyMiddleware("/auth/**", { target: "http://localhost:5002/", changeOrigin: true }));
  app.use(createProxyMiddleware("/api", { target: "http://localhost:5002/", changeOrigin: true }));
};