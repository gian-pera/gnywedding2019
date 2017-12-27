module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'GnYWedding2019',
      script: './src/main/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      max_restarts: 3,
      min_uptime: 10000,
      env: {
        COMMON_VARIABLE: 'true',
        NODE_ENV: 'DEV'
      }
    }
  ]
}
