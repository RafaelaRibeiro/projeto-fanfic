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
    disableHostCheck: true,
    public: 'liberfans.com:8080',
  },
}
