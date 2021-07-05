import Vue from 'vue'

import './styles/quasar.sass'
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar, QDialog, ClosePopup, QBtn } from 'quasar'

Vue.use(Quasar, {
  components: {
    QDialog,
    QBtn,
  },
  directives: {
    ClosePopup,
  },
})
