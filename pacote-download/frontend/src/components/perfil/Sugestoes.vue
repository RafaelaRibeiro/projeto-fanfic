<template>
  <v-card v-if="visible" class="mt-1" height="300px">
    <Loading />
  </v-card>
  <v-card flat min-height="300px" v-else>
    <v-row justify="center">
      <v-col cols="7">
        <v-card-title class="display-1 font-weight-light mb-4">Minhas Sugestões</v-card-title>

        <v-card-text v-if="sugestoes != null && sugestoes.length > 0">
          <div v-for="item in sugestoes" :key="item.id">
            <ItemObra :item="item"></ItemObra>
          </div>
        </v-card-text>
        <v-card flat v-else>
          <div>{{ usuarios.nome }} não sugeriu nenhuma obra</div>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card-title class="display-1 font-weight-light mb-4">Universos</v-card-title>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import ItemObra from './ItemObra'
import Loading from '../template/Loading'
import axios from 'axios'
import { baseApiUrl } from '../../global'
export default {
  name: 'Sugestoes',
  components: { ItemObra, Loading },
  data() {
    return {
      usuarios: {},
      sugestoes: null,
      i: [],
      visible: true,
    }
  },

  methods: {
    getUsuarios() {
      const url = `${baseApiUrl}/perfil/${this.usuarios.user}`
      axios(url).then((res) => (this.usuarios = res.data))
    },
    getSugestoesPerfil() {
      const url = ` ${baseApiUrl}/perfil/${this.usuarios.user}/sugestoes`
      axios(url).then((res) => {
        this.sugestoes = res.data
        this.visible = false
      })
    },
  },

  watch: {
    $route(to) {
      this.usuarios.user = to.params.user
      this.getUsuarios()
      this.getSugestoesPerfil()
    },
  },

  mounted() {
    this.usuarios.user = this.$route.params.user
    this.getUsuarios()
    this.getSugestoesPerfil()
  },
}
</script>

<style>
</style>