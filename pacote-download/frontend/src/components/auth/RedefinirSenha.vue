<template>
  <v-row
    :style="{
      backgroundImage: 'url(' + require('@/assets/reset_password_4.jpg') + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'right',
    }"
    dense
    class="pt-7"
    justify="center"
  >
    <v-col cols="12" sm="5" class="text-center">
      <v-card flat max-width="460px">
        <v-row>
          <v-col>
            <span class="md-headline d-flex justify-center"> Redefinir Senha </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="md-headline d-flex justify-center"> Olá, {{ usuario.nome }}!</span>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              v-model="usuario.newPassword"
              autocomplete="new-password"
              label="Nova Senha"
              type="password"
              color="deep-purple darken-4"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="usuario.confirmarPassword"
              autocomplete="new-password"
              label="Confirmar Senha"
              type="password"
              color="deep-purple darken-4"
              outlined
              :rules="[passwordConfirmationRule]"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn block dark color="deep-purple darken-4" class="mr-3" elevation="4" @click="resetPassword"
            >Mudar minha senha</v-btn
          >
        </v-card-actions>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn block dark color="deep-purple darken-4" class="mr-3 mb-3" elevation="4" @click="telaLogin"
            >Login</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="6" class="mt-n2"> </v-col>
  </v-row>
</template>

<script>
import { baseApiUrl, showError } from '../../global'
import axios from 'axios'
export default {
  data() {
    return {
      show1: false,
      usuario: {},
    }
  },

  methods: {
    getUserByToken() {
      const url = ` ${baseApiUrl}/token/${this.$route.params.token}`
      axios
        .get(url)
        .then((res) => {
          this.usuario = res.data
        })
        .catch(showError, this.$router.push({ path: `/login/` }))
    },

    resetPassword() {
      const url = ` ${baseApiUrl}/usuario/${this.$route.params.token}/resetPassword `
      axios
        .put(url, {
          password: this.usuario.newPassword,
        })
        .then(() => {
          this.$toast.success('Senha alterada com sucesso')
        })
        .catch(showError)
    },

    passwordConfirmationRule() {
      return this.usuario.newPassword === this.usuario.confirmarPassword || 'Senhas não conferem'
    },

    telaLogin() {
      this.$router.push({ path: `/login/` })
    },
  },

  mounted() {
    this.getUserByToken()
  },
}
</script>

<style>
</style>