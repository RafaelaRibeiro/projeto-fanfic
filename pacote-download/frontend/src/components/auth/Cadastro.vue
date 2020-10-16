<template id="cadastro">
  <v-row
    v-show="GetCadastro"
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
        <div>
          <p class="headline font-weight-medium pt-3">Faça seu cadastro</p>
        </div>
        <v-text-field
          v-model="usuario.nome"
          color="purple darken-4"
          name="Nome"
          label="Nome"
          class="ml-2 mr-2 mt-6"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="usuario.email"
          color="purple darken-4"
          name="Email"
          label="E-mail"
          class="ml-2 mr-2"
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

        <v-btn block dark color="indigo darken-4" class="mr-3" elevation="4" @click="dialog = true">Cadastrar</v-btn>
      </v-card>
    </v-col>
    <v-col cols="6" class="mt-n2"> </v-col>

       <v-dialog v-model="dialog" persistent max-width="500" height="500px">
          <!-- <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
        </template>-->
          <v-card align="center">
            <v-row align="center" justify="center" no-gutters>
             <v-avatar class="ma-10" size="50">
                <v-img src="@/assets/check.png"></v-img>
             </v-avatar>
            </v-row>
            <v-card-subtitle class="headline font-weight-bold">Cadastro realizado com sucesso</v-card-subtitle>
            <v-card-text class="font-weight-bold">Verifique seu e-mail para ativar sua conta</v-card-text>
           
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="purple darken-4" class="font-weight-bold" text @click="cadastrar">Continuar</v-btn>
              
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      dialog:false
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

    cadastrar() {
      this.dialog=false
      this.cad =false
    }
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
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 30px white inset;
}
</style>