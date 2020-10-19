module.exports = {
  transpileDependencies: ['vuetify'],

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: true,
    },
  },
  devServer: {
    allowedHosts: ['liberfans.com'],
    // disableHostCheck: true,
    port: 8080,
    public: 'liberfans.com:8080',
    https: false,
  },
  publicPath: '/',
}
