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
        </div>
      </v-tab-item>
      <v-tab-item :transition="false" :reverse-transition="false">
        <div v-for="usuario in usuarios" :key="usuario.id">
          <Imagens :usuario="usuario"></Imagens>
        </div>
      </v-tab-item>
       <v-tab-item :transition="false" :reverse-transition="false">
        <div v-for="usuario in usuarios" :key="usuario.id">
         <Senha :usuario="usuario"/>
        </div>
      </v-tab-item>
    </v-tabs-items>
   
  </v-container>
</template>

<script>
import PerfilEditar from './PerfilEditar'
import Imagens from './Imagens'
import Senha from './Senha'

import { baseApiUrl } from '@/global'

import axios from 'axios'
export default {
  components: { PerfilEditar, Imagens, Senha },
  name: 'Configuracoes',

  data() {
    return {
      usuarios: [],
     
      tab: null,
      mask: '##/##/####',
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
      const url = `${baseApiUrl}/usuario/1`
      axios(url).then(res => {
        this.usuarios = res.data
      })
    },
  },

  mounted() {
    this.getUsuarios()
  },
}
</script>

<style>
</style>