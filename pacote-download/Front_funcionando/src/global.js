import Vue from 'vue'

export const userKey = '__fanbase'
export const obraId = '__obra'

export const baseApiUrl = 'http://18.209.229.198:3000'
// export const baseApiUrl = 'http://localhost:3000'

export function showError(e) {
  if (e && e.response && e.response.data) {
    Vue.$toast.error(e.response.data)
  } else if (typeof e === 'string') {
    Vue.$toast.error(e)
  } else {
    Vue.$toast.error()
  }
}

export function erroAlert(e) {
  e.response.data
}

export default { baseApiUrl, showError, erroAlert }
