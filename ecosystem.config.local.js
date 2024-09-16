module.exports = {
  apps: [{
    name: "product-service",
    script: "./build/server.js",
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
  }]
};