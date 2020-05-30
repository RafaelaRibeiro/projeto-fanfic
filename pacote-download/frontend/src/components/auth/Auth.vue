<template>
  <v-row dense align="center" justify="center" class="deep-purple lighten-5">
    <v-col cols="7" class="mt-n2">
      <v-img src="@/assets/login.jpg" height="600" width="700"></v-img>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="5" class="text-center">
      <v-card flat width="500px" class="deep-purple lighten-5">
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
          ></v-text-field>
          <v-text-field
            v-model="usuario.senha"
            color="purple darken-4"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            name="Password"
            label="Senha"
            :type="show1 ? 'text' : 'password'"
            class="ml-3 mr-3"
            @click:append="show1 = !show1"
            @keydown.enter="signin"
          ></v-text-field>
          <!-- <v-checkbox v-model="checkbox" label="Mantenha-me Conectado"   color="indigo darken-4" class="ml-3 mr-3" ></v-checkbox> -->
          <v-btn
            rounded
            width="450"
            dark
            color="indigo darken-4"
            class="ma-3"
            @click="signin"
          >Entrar</v-btn>
        </v-form>
      </v-card>
    </v-col>
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
        .then(res => {
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
</style>