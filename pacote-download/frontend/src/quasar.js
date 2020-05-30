import Vue from 'vue'

import './styles/quasar.sass'
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar, QDialog, ClosePopup } from 'quasar'

Vue.use(Quasar, {
  components: {
    QDialog,
  },
  directives: {
    ClosePopup,
  },
})
