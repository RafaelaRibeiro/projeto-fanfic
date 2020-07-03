<template>
  <v-container>
    <h1 class="display-1 font-weight-light mb-4">
      <i>
        <v-icon x-large class="pa-3">mdi-cog</v-icon>Configurações
      </i>
    </h1>
    <v-tabs
      background-color="deep-purple lighten-5"
      v-model="tab"
      fixed-tabs
      active-class=" primary  text-white shadow p-3 mb-2 rounded "
    >
      <v-tabs-slider color="white"></v-tabs-slider>
      <v-tab v-for="titulo in titulos" :key="titulo.id">
        <v-icon left>{{titulo.icon}}</v-icon>
        {{ titulo.text }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item :transition="false" :reverse-transition="false">
        <div v-for="usuario in usuarios" :key="usuario.id">
          <PerfilEditar :usuario="usuario"></PerfilEditar>
          {{usuario.nome}}
          <v-row>
            <v-col>
              <v-btn dark class="ma-3" color="green darken-4" @click="updatePerfil">Salvar</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-tab-item>
      <v-tab-item :transition="false" :reverse-transition="false">
        <div v-for="usuario in usuarios" :key="usuario.id">
          <Imagens :usuario="usuario"></Imagens>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import PerfilEditar from './PerfilEditar'
import Imagens from './Imagens'
import { baseApiUrl, showError } from '@/global'

import axios from 'axios'
export default {
  components: { PerfilEditar, Imagens },
  name: 'Configuracoes',

  data() {
    return {
      usuarios: [],
      tab: null,
      titulos: [
        { id: 1, text: 'Minha Conta', icon: 'mdi-account' },
        { id: 2, text: 'Imagens', icon: 'mdi-image' },
        { id: 3, text: 'Senha', icon: 'mdi-lock-reset' },
        { id: 4, text: 'Notificações', icon: 'mdi-bell-ring' },
        { id: 5, text: 'Preferencias', icon: 'mdi-cog-sync' },
      ],
    }
  },

  methods: {
    getUsuarios() {
      const url = `${baseApiUrl}/perfil/teste1`
      axios.get(url).then(res => {
        this.usuarios = res.data
      })
    },

    updatePerfil() {
      axios
        .put(`${baseApiUrl}/perfil/teste1`, this.usuarios)
        .then(() => {
          this.$toasted.global.defaultSuccess()
        })
        .catch(showError)
    },
  },

  mounted() {
    this.getUsuarios()
  },
}
</script>

<style>
</style>