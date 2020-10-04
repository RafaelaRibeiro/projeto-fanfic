


<template id="auth">
  <v-row dense align="center" justify="center">
    <v-col cols="5" class="text-center">
      <v-card flat width="500px">
        <div>
          <p class="display-1 font-weight-medium pt-3">Entrar</p>
        </div>
        <v-form ref="form">
          <v-text-field
            v-model="usuario.email"
            color="purple darken-4"
            name="Email"
            label="E-mail"
            class="ml-3 mr-3 mt-6"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="usuario.password"
            color="purple darken-4"
            name="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            label="Senha"
            :type="show1 ? 'text' : 'password'"
            class="ml-3 mr-3"
            outlined
            @click:append="show1 = !show1"
            @keydown.enter="signin"
          ></v-text-field>

          <v-btn rounded width="450" dark color="indigo darken-4" class="ma-3" @click="signin">Entrar</v-btn>
        </v-form>
      </v-card>
    </v-col>
    <v-col cols="6" class="mt-n2"> </v-col>
  </v-row>
</template>

<script>
import { baseApiUrl, showError, userKey } from '../../global'
import axios from 'axios'
export default {
  data() {
    return {
      show1: false,
      usuario: {},
    }
  },
  methods: {
    signin() {
      axios
        .post(`${baseApiUrl}/signin`, this.usuario)
        .then((res) => {
          this.$store.commit('setUser', res.data)
          localStorage.setItem(userKey, JSON.stringify(res.data))
          this.$router.push({ path: `/perfil/${res.data.user}` })
        })
        .catch(showError)
    },
  },
}
</script>

<style>
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 30px white inset;
}
</style>