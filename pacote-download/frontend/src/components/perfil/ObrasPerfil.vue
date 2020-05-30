<template>
  <v-card flat min-height="300px">
    <v-row>
      <v-col cols="8">
        <v-card-title>
          <i class="display-1 font-weight-light mb-4 text--primary">Minhas Obras</i>
        </v-card-title>
        <v-card-text>
          <div v-for="item in filterShipp" :key="item.id">
            <ItemObra :item="item"></ItemObra>
          </div>
        </v-card-text>
      </v-col>
      <v-col>
        <v-card-title>
          <i class="display-1 font-weight-light mb-4 text--primary">Universos</i>
        </v-card-title>

        <v-list>
          <v-list-item-group>
            <v-list-item v-for="shipp in shippObras" :key="shipp.id">
              <v-list-item-content>
                <v-list-item-title @click="search = shipp.id">{{shipp.nome}} ({{shipp.shippCount}})</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title @click="search = ''">Todas as Obras</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
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
      obras: [],
      shippObras: [],
      search: '',
    }
  },

  methods: {
    getUsuarios() {
      const url = `${baseApiUrl}/perfil/${this.usuarios.user}`
      axios(url).then(res => (this.usuarios = res.data))
    },

    getObrasPerfil() {
      const url = ` ${baseApiUrl}/perfil/${this.usuarios.user}/obras`
      axios(url).then(res => {
        this.obras = this.obras.concat(res.data)
      })
    },
    getObrasPerfilShipp() {
      const url = ` ${baseApiUrl}/perfil/${this.usuarios.user}/obras/shipp`
      axios(url).then(res => {
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
        const a = this.obras.filter(e => {
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