<template id="cadastro">
  <v-row
    v-show="GetCadastro"
    dense
    class="pt-7"
    justify="center"
    :style="{
      backgroundImage: 'url(' + require('@/assets/cadastro.png') + ')',
      backgroundSize: '60%',
      backgroundPosition: 'right',
    }"
  >
    <v-col cols="12" sm="5" class="text-center">
      <v-card flat max-width="700px">
        <div>
          <span class="md-headline d-flex justify-center"> Faça seu cadastro </span>
        </div>
        <v-text-field
          v-model="usuario.nome"
          color="deep-purple darken-4"
          name="Nome"
          label="Nome"
          class="ml-2 mr-2 mt-6"
          :rules="nameRules"
          dense
          outlined
        ></v-text-field>
        <v-text-field
          v-model="usuario.user"
          color="deep-purple darken-4"
          name="Usuario"
          label="Usuario"
          class="ml-2 mr-2"
          :rules="[checkUser]"
          @blur="getUser"
          dense
          outlined
        ></v-text-field>
        <v-text-field
          v-model="usuario.email"
          color="deep-purple darken-4"
          name="Email"
          label="E-mail"
          class="ml-2 mr-2"
          :rules="[checkEmail]"
          @blur="GetEmail"
          dense
          outlined
        ></v-text-field>
        <v-text-field
          v-model="usuario.password"
          color="deep-purple darken-4"
          name="password"
          autocomplete="new-password"
          label="Senha"
          :type="show1 ? 'text' : 'password'"
          class="ml-2 mr-2"
          dense
          outlined
        ></v-text-field>

        <v-text-field
          v-model="usuario.confirmarPassword"
          color="deep-purple darken-4"
          autocomplete="new-password"
          name="password"
          label="Confirmar Senha"
          :type="show1 ? 'text' : 'password'"
          class="ml-2 mr-2 mb-3"
          :rules="[passwordConfirmationRule]"
          dense
          outlined
        ></v-text-field>

        <v-btn dark color="deep-purple darken-4" class="mr-3" elevation="4" @click="dialog = true">Cadastrar</v-btn>
        <v-btn dark color="deep-purple darken-4" class="mr-3" elevation="4" @click="cad = false">Voltar</v-btn>
      </v-card>
    </v-col>
    <v-col cols="6" class="mt-n2">
      <v-alert v-show="error" text prominent type="error" icon="mdi-alert-box" transition="scale-transition">
        {{ error }}
      </v-alert>
    </v-col>

    <v-dialog v-model="dialog" max-width="500" height="500px">
      <!-- <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
        </template>-->
      <v-card align="center">
        <v-row align="center" justify="center" no-gutters>
          <v-avatar class="ma-10" size="90">
            <v-img src="@/assets/check-circle.png"></v-img>
          </v-avatar>
        </v-row>
        <span class="md-headline d-flex justify-center mb-2">Cadastro realizado com sucesso</span>
        <span class="md-body-2 d-flex justify-center ml-5 mr-5">Verifique seu e-mail para ativar sua conta</span>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="deep-purple darken-4" class="font-weight-bold" text @click="cadastrar">Continuar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { baseApiUrl, showError } from '../../global'
import axios from 'axios'
export default {
  name: 'Cadastro',
  data() {
    return {
      show1: false,
      usuario: {},
      cadastro: false,
      dialog: false,
      error: '',
      user: {
        user: '',
        email: '',
      },
      nameRules: [(value) => !!value || 'Digite seu nome'],
    }
  },
  methods: {
    save() {
      axios
        .post(`${baseApiUrl}/usuarios`, this.usuario)
        .then((response) => {
          this.error = response
          this.email = ''
          this.dialog = 'true'
        })
        .catch(showError)
    },

    getUser() {
      axios.get(`${baseApiUrl}/usuario/${this.usuario.user}/user`).then((res) => {
        this.user.user = res.data.user
      })
    },
    GetEmail() {
      axios.get(`${baseApiUrl}/usuario/${this.usuario.email}/email`).then((res) => {
        this.user.email = res.data.email
      })
    },

    cadastrar() {
      this.dialog = false
      this.cad = false
    },
  },

  computed: {
    GetCadastro() {
      return this.$store.state.cadastro
    },

    passwordConfirmationRule() {
      return this.usuario.password === this.usuario.confirmarPassword || 'Senhas não conferem'
    },
    checkUser() {
      if (this.usuario.user) {
        return this.usuario.user !== this.user.user || 'Usuário já está sendo utilizado'
      } else {
        return 'Digite um usuário'
      }
    },
    checkEmail() {
      if (this.usuario.email) {
        return this.usuario.email !== this.user.email || 'Este e-mail já está cadastrado'
      } else {
        return 'Digite seu e-mail'
      }
    },

    cad: {
      get() {
        return this.$store.state.cadastro
      },
      set(valor) {
        this.$store.commit('setCadastro', valor)
      },
    },

    ckeckUser() {
      if (this.user) {
        return 'Usuario já está sendo usado'
      } else {
        return {}
      }
    },
  },

  // mounted() {
  //   this.getUser()
  // },
}
</script>

<style>
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 30px white inset;
}
</style>