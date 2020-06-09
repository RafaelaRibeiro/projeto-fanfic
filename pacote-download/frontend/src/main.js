import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './config/store'
import router from './config/router'
import './config/axios'
import './config/msg'
import './config/bootstrap'
import './config/vueMaterial'
import './quasar'
import './config/mask'
import './config/JoditVue'
import './config/VueScrollTo'
import './styles/main.css'
// import './plugins/quill_editor.js'

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,

  router,

  render: h => h(App),
}).$mount('#app')
