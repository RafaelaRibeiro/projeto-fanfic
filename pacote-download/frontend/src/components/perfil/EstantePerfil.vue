<template>
  <v-container v-if="visible" fluid class="mt-1">
    <Loading />
  </v-container>
  <v-card flat min-height="300px" v-else>
    <v-row justify="center">
      <v-col cols="7">
        <v-card-title class="display-1 font-weight-light mb-4">Minha Estante</v-card-title>
        <v-card-text v-if="estante != null && estante.length > 0">
          <div v-for="item in estante" :key="item.id">
            <ItemObra :item="item"></ItemObra>
          </div>
        </v-card-text>
        <v-card flat v-else>
          <div>{{ usuarios.nome }} não tem obra em sua estante</div>
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
  name: 'obrasPerfil',
  components: { ItemObra, Loading },
  data() {
    return {
      usuarios: {},
      estante: [],
      universos: [],
      universo: [],
      expandNews: false,
      notification: [],
      visible: true,
    }
  },

  methods: {
    getUsuarios() {
      const url = `${baseApiUrl}/perfil/${this.usuarios.user}`
      axios(url).then((res) => (this.usuarios = res.data))
    },
    getEstantePerfil() {
      const url = ` ${baseApiUrl}/perfil/${this.usuarios.user}/estante`
      axios(url).then((res) => {
        this.estante = this.estante.concat(res.data)
        this.visible = false
      })
    },
    getUniversoEstante() {
      const url = `${baseApiUrl}/estante/${this.usuarios.user}/universos `
      axios(url).then((res) => {
        this.universos = res.data
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
    this.getUniversoEstante()
  },
}
</script>

<style lang="scss" scoped>
// [dir='ltr'] .md-list-item.md-inset .md-list-item-content {
//   padding-left: 40px !important;
// }
</style>