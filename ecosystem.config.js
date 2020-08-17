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
      path : '/home/nuxt-realworld-staging',
      "pre-setup" : "echo '开始clone项目到目标路径中。然后启动项目'",
      "post-setup": "npm install && npm run build && pm2 start ecosystem.config.js --env production",
      "pre-deploy-local": "echo '开始fetch项目然后重启应用'",
      'post-deploy' : 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
    }
  }
};
