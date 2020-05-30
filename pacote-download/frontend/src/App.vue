<template>
  <v-app id="app">
    <Header />

    <Menu />
    <Content />

    <Footer />
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import axios from 'axios'
import { baseApiUrl, userKey } from '@/global'
import { mapState } from 'vuex'
import Menu from './components/template/Menu'
import Header from './components/template/Header'
import Content from './components/template/Content'
import Footer from './components/template/Footer'

export default {
  name: 'App',

  components: { Header, Menu, Footer, Content },
  computed: mapState(['isMenuVisible', 'usuario']),
  data() {
    return {
      validatingToken: true,
      i: [],
    }
  },

  methods: {
    async validateToken() {
      this.validatingToken = true

      const json = localStorage.getItem(userKey)
      const userData = JSON.parse(json)
      this.$store.commit('setUser', null)

      if (!userData) {
        this.validatingToken = false
        this.$router.push({ name: 'auth' })
        return
      }
      const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

      if (res.data) {
        this.$store.commit('setUser', userData)
      } else {
        localStorage.removeItem(userKey)
        this.$router.push({ name: 'auth' })
      }
      this.validatingToken = false
    },
  },

  created() {
    this.validateToken()
  },
}
</script>

<style>
</style>
