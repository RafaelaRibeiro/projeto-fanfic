<template>
  <v-row
    v-show="!GetCadastro"
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
        <span class="md-headline d-flex justify-center"> Entrar </span>

        <v-text-field
          v-model="usuario.email"
          color="deep-purple darken-4"
          name="Email"
          label="E-mail"
          class="ml-2 mr-2 mt-6"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="usuario.password"
          color="deep-purple darken-4"
          name="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          label="Senha"
          :type="show1 ? 'text' : 'password'"
          class="ml-2 mr-2"
          outlined
          @click:append="show1 = !show1"
          @keydown.enter="signin"
        ></v-text-field>
        <v-row>
          <v-col class="d-flex justify-end">
            <v-btn color="deep-purple darken-4" class="mb-5 mt-n10 md-headline" text @click="dialog = true">
              Esqueci minha Senha</v-btn
            >
          </v-col>
        </v-row>

        <v-btn block dark color="deep-purple darken-4" class="mr-3" elevation="4" @click="signin">Entrar</v-btn>
        <v-btn block dark color="deep-purple darken-4" class="mr-3 mt-5" elevation="4" @click="cad = true"
          >Cadastrar-se</v-btn
        >
      </v-card>

      <v-dialog v-model="dialog" max-width="450">
        <v-card max-height="600">
          <v-row align="center" justify="center" no-gutters>
            <v-avatar class="ma-10" size="90">
              <v-img src="@/assets/lock-reset.png"></v-img>
            </v-avatar>
          </v-row>

          <span class="md-headline d-flex justify-center"> Redefinir senha </span>
          <br />

          <span class="md-body-2 d-flex justify ml-5 mr-5"
            >Para redefinir sua senha, informe o e-mail cadastrado e lhe enviaremos um link com maiores instruções
          </span>

          <v-text-field
            v-model="email"
            color="deep-purple darken-4"
            name="Email"
            label="E-mail"
            class="mr-4 ml-4 mt-4"
            outlined
            :rules="[rules.required, rules.email]"
          ></v-text-field>

          <v-alert v-show="error" text prominent type="error" icon="mdi-alert-box" transition="scale-transition">
            {{ error }}
          </v-alert>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn block dark color="deep-purple darken-4" class="mr-3 mb-3" @click="forgotPassword" elevation="4"
              >Enviar e-mail</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>

    <v-col cols="6" class="mt-n2"> </v-col>
  </v-row>
</template>

<script>
import { baseApiUrl, showError, userKey } from '../../global'
import axios from 'axios'
export default {
  props: ['usuario'],
  data() {
    return {
      show1: false,
      cadastro: false,
      dialog: false,
      email: '',
      error: '',
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
    forgotPassword() {
      axios
        .put(`${baseApiUrl}/forgotPassword`, {
          email: this.email,
        })
        .then((response) => {
          this.error = response
          this.email = ''
        })
        .catch((error) => {
          this.error = error.response.data
        })
    },
  },

  computed: {
    GetCadastro() {
      return this.$store.state.cadastro
    },

    cad: {
      get() {
        return this.$store.state.cadastro
      },
      set(valor) {
        this.$store.commit('setCadastro', valor)
      },
    },
  },
}
</script>

<style>
</style>