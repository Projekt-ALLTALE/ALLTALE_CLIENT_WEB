module.exports = {
  apps: [{
    name: 'ALLTALE_CLIENT_DEV',
    script: './node_modules/nuxt/bin/nuxt.js',
    args: 'start',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
      ALLTALE_SERVER: 'alltale.i0x0i.ltd:29999'
    }
  }],

  deploy: {
    production: {
      key: '~/.ssh/id_rsa',
      user: 'root',
      host: '42.193.21.101',
      ref: 'origin/main',
      repo: 'https://github.com/Projekt-ALLTALE/ALLTALE_CLIENT_WEB',
      path: '~/Project/ALLTALE_CLIENT_DEV',
      'post-setup': 'yarn install && yarn build',
      'post-deploy': 'source /etc/profile && yarn install && yarn build && pm2 reload ecosystem.config.js --env production --update-env'
    }
  }
};
