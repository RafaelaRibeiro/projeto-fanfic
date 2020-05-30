import Vue from 'vue'

export const userKey = '__fanbase'
export const obraId = '__obra'
// export const baseApiUrl = 'http://35.153.213.232:3000'
export const baseApiUrl = 'http://localhost:3000'

export function showError(e) {
  if (e && e.response && e.response.data) {
    Vue.toasted.global.defaultError({ msg: e.response.data })
  } else if (typeof e === 'string') {
    Vue.toasted.global.defaultError({ msg: e })
  } else {
    Vue.toasted.global.defaultError()
  }
}

export default { baseApiUrl, showError }
