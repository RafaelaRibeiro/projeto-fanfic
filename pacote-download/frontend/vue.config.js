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
    // port: 8080,
    // host: 'localhost',
    public: '34.201.5.202:8080',
    // proxy: 'http://localhost:8080',
    // public: '34.201.5.202:8080',
  },
  publicPath: '/',
}
