<template>
  <v-card flat min-height="300px">
    <v-row>
      <v-col cols="8">
        <v-card-title>
          <i class="display-1 font-weight-light mb-4 text--primary">Minha Estante</i>
        </v-card-title>
        <v-card-text>
          <div v-for="item in estante" :key="item.id">
            <ItemObra :item="item"></ItemObra>
          </div>
        </v-card-text>
      </v-col>
      <v-col>
        <v-card-title>
          <i class="display-1 font-weight-light mb-4 text--primary">Universos</i>
        </v-card-title>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import ItemObra from './ItemObra'
import axios from 'axios'
import { baseApiUrl } from '../../global'
export default {
  name: 'obrasPerfil',
  components: { ItemObra },
  data() {
    return {
      usuarios: {},
      estante: [],
    }
  },

  methods: {
    getUsuarios() {
      const url = `${baseApiUrl}/perfil/${this.usuarios.user}`
      axios(url).then(res => (this.usuarios = res.data))
    },
    getEstantePerfil() {
      const url = ` ${baseApiUrl}/perfil/${this.usuarios.user}/estante`
      axios(url).then(res => {
        this.estante = this.estante.concat(res.data)
      })
    },
  },

  watch: {
    $route(to) {
      this.usuarios.user = to.params.user
      this.getUsuarios()
      this.getEstantePerfil()
    },
  },
  mounted() {
    this.usuarios.user = this.$route.params.user
    this.getEstantePerfil()
    this.getUsuarios()
  },
}
</script>

<style>
</style>