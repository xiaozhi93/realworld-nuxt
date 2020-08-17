module.exports = {
  apps : [{
    name: 'realworld',
    script: 'npm -- run start',
    watch: true,
    env: {
        "PORT": 3000,
        "NODE_ENV": "development"
    },
    env_staging: {
        "PORT": 8070,
        "NODE_ENV": "production",
    },
    env_production: {
        "PORT": 8080,
        "NODE_ENV": "production",
    }
  }],
  deploy : {
    production : {
      user : 'root',
      host : '119.45.51.253',
      ref  : 'origin/master',
      repo : 'https://gitee.com/xiaozhij/fed-e-task-03-03.git',
      path : '/home/nuxt-realworld-prod',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && npm run build && npm run deploy',
      'pre-setup': ''
    }
  }
};
