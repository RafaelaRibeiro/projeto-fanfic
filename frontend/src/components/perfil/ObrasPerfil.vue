<template>
  <v-card v-if="visible" class="mt-1" height="300px">
    <Loading />
  </v-card>
  <v-card flat min-height="300px" v-else>
    <v-row justify="center">
      <v-col cols="7">
        <v-card-title class="display-1 font-weight-light mb-4">Minha Obras</v-card-title>
        <v-card-text v-if="filterShipp != null && filterShipp.length > 0">
          <div v-for="item in filterShipp" :key="item.id">
            <ItemObra :item="item"></ItemObra>
          </div>
        </v-card-text>
        <v-card flat v-else>
          <div>{{ usuarios.nome }} não tem obra publicada</div>
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
      obras: [],
      shippObras: [],
      search: '',
      visible: true,
    }
  },

  methods: {
    getUsuarios() {
      const url = `${baseApiUrl}/perfil/${this.usuarios.user}`
      axios(url).then((res) => (this.usuarios = res.data))
    },

    getObrasPerfil() {
      const url = ` ${baseApiUrl}/perfil/${this.usuarios.user}/obras`
      axios(url).then((res) => {
        this.obras = this.obras.concat(res.data)
        this.visible = false
      })
    },
    getObrasPerfilShipp() {
      const url = ` ${baseApiUrl}/perfil/${this.usuarios.user}/obras/shipp`
      axios(url).then((res) => {
        this.shippObras = this.shippObras.concat(res.data)
      })
    },
  },

  watch: {
    $route(to) {
      this.usuarios.user = to.params.user
      this.getUsuarios()
      this.getObrasPerfil()
    },
  },

  computed: {
    filterShipp() {
      if (this.search === '') {
        return this.obras
      } else {
        const a = this.obras.filter((e) => {
          return e.shippId === this.search
        })
        return a
      }
    },
  },

  mounted() {
    this.usuarios.user = this.$route.params.user
    this.getUsuarios()
    this.getObrasPerfil()
    this.getObrasPerfilShipp()
  },
}
</script>

<style>
</style>