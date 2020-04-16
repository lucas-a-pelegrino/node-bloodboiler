module.exports = {
  apps: [
    {
      name: 'pokedex-api-cacher',
      script: 'app.js',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'staging',
        NODE_PATH: './src',
      },
    },
  ],
};
