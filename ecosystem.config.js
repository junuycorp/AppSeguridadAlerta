// Settings for production with PM2
module.exports = {
  apps: [
    {
      name: `alerta-ciudadano-back-5926`,
      script: 'yarn',
      args: 'deploy:ciudadano',
      interpreter: 'node@20.9.0',
    },
    {
      name: `alerta-agente-back-5927`,
      script: 'yarn',
      args: 'deploy:agente',
      interpreter: 'node@20.9.0',
    },
  ],
}
