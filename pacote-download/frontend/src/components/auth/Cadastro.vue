<template id="auth">
  <v-row
    v-show="cadastro"
    :style="{
      backgroundImage: 'url(' + require('@/assets/login_new.jpg') + ')',
      backgroundSize: 'cover',
    }"
    dense
    class="pt-7"
    justify="center"
  >
    <v-col v-show="cadastro" cols="12" sm="5" class="text-center">
      <v-card flat max-width="460px" height="100%">
        <div>
          <p class="headline font-weight-medium pt-3">Faça seu cadastro</p>
        </div>

        <v-text-field
          v-model="usuario.email"
          color="purple darken-4"
          name="Email"
          label="E-mail"
          class="ml-2 mr-2 mt-6"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="usuario.password"
          color="purple darken-4"
          name="password"
          autocomplete="new-password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          label="Senha"
          :type="show1 ? 'text' : 'password'"
          class="ml-2 mr-2"
          outlined
          @click:append="show1 = !show1"
        ></v-text-field>

        <v-text-field
          v-model="usuario.password"
          color="purple darken-4"
          autocomplete="new-password"
          name="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          label="Confirmar Senha"
          :type="show1 ? 'text' : 'password'"
          class="ml-2 mr-2"
          outlined
          @click:append="show1 = !show1"
        ></v-text-field>

        <v-btn block dark color="indigo darken-4" class="mr-3" elevation="4" @click="cadastro = false">Entrar</v-btn>
      </v-card>
    </v-col>
    <v-col cols="6" class="mt-n2"> </v-col>
  </v-row>
</template>

<script>
import { baseApiUrl, showError, userKey } from '../../global'
import axios from 'axios'
export default {
  name: 'Cadastro',
  data() {
    return {
      show1: false,
      usuario: {},
      cadastro: false,
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