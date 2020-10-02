<template>
  <v-container fluid>
    <v-card-title>Alterar Senha</v-card-title>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="usuario.password"
          autocomplete="new-password"
          label="Senha Atual"
          type="password"
          color="purple darken-4"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="usuario.newPassword"
          autocomplete="new-password"
          label="Nova Senha"
          type="password"
          color="purple darken-4"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="usuario.confirmarPassword"
          autocomplete="new-password"
          label="Confirmar Senha"
          type="password"
          color="purple darken-4"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="ml-2" justify="end">
      <v-col cols="6" md="4">
        <v-btn @click="changePassword"> Salvar </v-btn>
      </v-col>
      <v-col></v-col>
    </v-row>

    {{ usuario }}
  </v-container>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
export default {
  name: 'Senha',
  

  data() {
    return {
      usuario: {
        password:"",
        newPassword:"",
        confirmarPassword:""
      },
    }
  },

  methods: {
    changePassword() {
      axios
        .put(`${baseApiUrl}/usuario/1/changepassword/`, {
          password: this.usuario.password,
          newPassword: this.usuario.newPassword,
          confirmarPassword: this.usuario.confirmarPassword,
        })
        .then(() => {
          // eslint-disable-next-line no-console
          console.log('Deu certo')
        })
        .catch('erro')

      // eslint-disable-next-line no-console
      console.log(this.usuario)
    },
  },
}
</script>

<style>
</style>