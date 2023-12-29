module.exports = {
    apps: [
      {
        name: 'ExcelReport',
        script: './dist/app.js', // Adjust the path to your compiled JavaScript file
        watch: true,
        ignore_watch: ['node_modules'],
        exec_mode: 'cluster',
        instances: 2,
        autorestart: true,
        max_memory_restart: '1G',
      },
    ],
  };
  