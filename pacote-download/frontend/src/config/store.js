import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMenuVisible: false,
    usuario: {},
    user: {},
    obra: [],
    drawer: false,
    expandir: false,
    checkTodos: false,
    intermediario: false,
    cadastro: false,
  },

  mutations: {
    setDrawer(state, payload) {
      state.drawer = payload
    },
    setExpand(state, payload) {
      state.expandir = payload
    },
    setCheck(state, payload) {
      state.checkTodos = payload
    },
    setIntermed(state, payload) {
      state.intermediario = payload
    },

    setObra(state, obra) {
      state.obra = obra
    },

    setCadastro(state, payload) {
      state.cadastro = payload
    },

    setUser(state, usuario) {
      state.usuario = usuario
      if (usuario) {
        axios.defaults.headers.common['Authorization'] = `bearer ${usuario.token}`
        state.isMenuVisible = true
      } else {
        delete axios.defaults.headers.common['Authorization']
        state.isMenuVisible = false
      }
    },
  },

  getters: {
    drawer(state) {
      return state.drawer
    },
    expand(state) {
      return state.expandir
    },

    cadastro(state) {
      return state.cadastro
    },

    check(state) {
      return state.checkTodos
    },
    intermed(state) {
      return state.intermediario
    },

    usuario(state) {
      return state.usuario
    },
    getUsuario(state) {
      return state.usuario
    },
  },
})
