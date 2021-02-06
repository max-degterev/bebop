module.exports = {
  deploy: {
    // "production" is the environment name
    production: {
      user: 'pi',
      host: [
        {
          host: 'bebop.local',
          port: '22',
        },
      ],
      ref: 'origin/master',
      repo: 'git@github.com:suprMax/bebop.git',
      path: '/home/pi/app',
      'post-deploy': 'npm ci && npm run compile && npm run service:reload',
    },
  },
};
