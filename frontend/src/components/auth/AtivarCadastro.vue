<template>
  <div></div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl } from '../../global'
export default {
  name: 'AtivarCadastro',
  data() {
    return {
      usuario: {},
    }
  },

  methods: {
    getUserByToken() {
      axios.get(` ${baseApiUrl}/activeRegister/${this.$route.params.token}`).then((res) => {
        this.usuario = res.data
      })
    },
    ativarRegistro() {
      axios
        .put(` ${baseApiUrl}/activeRegister/${this.$route.params.token}`, {
          verificado: 1,
        })
        .then(() => {
          this.$router.push({ path: `/login` })
          this.$toast.success('Seu cadastro foi ativado')
        })
        .catch((error) => {
          if (error.response.data === 'Token Expirado') {
            // eslint-disable-next-line no-console
            this.$router.push({ path: `/reenviartoken/${this.$route.params.token}` })
          } else {
            this.$toast.error(error.response.data)
            this.$router.push({ path: `/login` })
          }
        })
    },
  },

  mounted() {
    this.ativarRegistro()
  },
}
</script>

<style>
</style>