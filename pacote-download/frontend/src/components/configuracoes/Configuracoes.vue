<template>
  <v-container>
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
        <PerfilEditar />
      </v-tab-item>
      <v-tab-item :transition="false" :reverse-transition="false">
        <Imagens />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import PerfilEditar from './PerfilEditar'
import Imagens from './Imagens'
import { mapState } from 'vuex'
export default {
  components: { PerfilEditar, Imagens },
  name: 'Configuracoes',
  computed: mapState(['usuario']),
  data() {
    return {
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
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ['bg-primary', 'h6  text-white shadow p-3 mb-5 bg-white rounded']
      } else {
        return ['bg-light', 'h6 shadow p-3 mb-5 bg-white rounded ']
      }
    },
  },
}
</script>

<style>
</style>