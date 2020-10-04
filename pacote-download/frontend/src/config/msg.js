import Vue from 'vue'
import Toasted from 'vue-toasted'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

Vue.use(Toasted, {
  iconPack: 'fontawesome',
  duration: 3000,
})

Vue.toasted.register('defaultSuccess', payload => (!payload.msg ? 'Operação realidada com sucesso!' : payload.msg), {
  type: 'success',
  icon: 'check',
})

Vue.toasted.register('defaultError', payload => (!payload.msg ? 'Erro inesperado.' : payload.msg), {
  type: 'error',
  icon: 'times',
})

const options = {
  position: 'top-center',
  transition: 'Vue-Toastification__fade',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: false,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false,
}

Vue.use(Toast, options)
