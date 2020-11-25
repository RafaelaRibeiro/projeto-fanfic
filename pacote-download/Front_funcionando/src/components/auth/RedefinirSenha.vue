<template>
  <v-row
    :style="{
      backgroundImage: 'url(' + require('@/assets/login_new.jpg') + ')',
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
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn block dark color="deep-deep-purple darken-4" class="mr-3" elevation="4">Entrar</v-btn>
      </v-card>
    </v-col>

    <v-col cols="6" class="mt-n2"> </v-col>
  </v-row>
</template>

<script>
import { baseApiUrl } from '../../global'
import axios from 'axios'
export default {
  data() {
    return {
      show1: false,
      usuario: {},

      rules: {
        required: (value) => !!value || 'Digite seu e-mail',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'E-mail Invalido.'
        },
      },
    }
  },

  methods: {
    getUserByToken() {
      const url = ` ${baseApiUrl}/token/${this.$route.params.token}`
      axios.get(url).then((res) => {
        this.usuario = res.data
      })
    },
  },

  mounted() {
    this.getUserByToken()
  },
}
</script>

<style>
</style>