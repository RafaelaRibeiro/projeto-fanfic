<template id="auth">
  <Login v-if="!GetCadastro" :usuario="usuario" />
  <Cadastro v-else :usuario="usuario" />
</template>

<script>
import Login from './Login'
import Cadastro from './Cadastro'
export default {
  components: { Login, Cadastro },
  data() {
    return {
      show1: false,
      usuario: {},
      cadastro: false,
    }
  },
  computed: {
    GetCadastro() {
      return this.$store.state.cadastro
    },
  },
}
</script>

<style>
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 30px white inset;
}
</style>