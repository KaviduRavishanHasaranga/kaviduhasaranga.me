module.exports = {
  apps: [
    {
      name: 'kaviduhasaranga-me',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
