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
          color="deep-purple darken-4"
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
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="ml-2" justify="end">
      <v-col cols="6" md="4">
        <v-btn dark class="ma-3" color="deep-purple darken-4" @click="changePassword">
          <v-icon small left>mdi-floppy</v-icon>Salvar
        </v-btn>
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
export default {
  name: 'Senha',

  data() {
    return {
      usuario: {
        password: '',
        newPassword: '',
        confirmarPassword: '',
      },
    }
  },

  methods: {
    changePassword() {
      axios
        .put(`${baseApiUrl}/usuario/${this.$store.state.usuario.id}/changepassword/`, {
          password: this.usuario.password,
          newPassword: this.usuario.newPassword,
          confirmarPassword: this.usuario.confirmarPassword,
        })
        .then(() => {
          this.usuario.password = ''
          this.usuario.newPassword = ''
          this.usuario.confirmarPassword = ''
          this.$toast.success('Senha Alterada com Sucesso')
        })
        .catch(showError)
    },
  },
}
</script>

<style>
</style>