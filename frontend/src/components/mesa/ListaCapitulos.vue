<template>
  <v-card flat>
    <v-container fluid>
      <v-row>
        <v-col>
          <h4 class="font-weight-light pa-3"><md-icon class="md-size-2x">list</md-icon> Lista de Capitulos</h4>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="9">
          <v-card flat color="deep-purple darken-4" dark>
            <v-card-title>
              <span class="md-title ml-4"> Obra - {{ obra.nome }} </span>
            </v-card-title>
          </v-card>
        </v-col>
        <v-col> </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="9">
          <v-row>
            <v-col class="mb-n3" cols="12" v-for="capitulo in capitulos" :key="capitulo.id">
              <ItemCapitulos :capitulo="capitulo"></ItemCapitulos>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import ItemCapitulos from './ItemCapitulos'

import axios from 'axios'
import { baseApiUrl } from '../../global'
export default {
  name: 'listaCapitulos',
  components: { ItemCapitulos },
  data() {
    return {
      capitulos: [],
      obra: {},
    }
  },

  methods: {
    getCapitulos() {
      const url = ` ${baseApiUrl}/mesa/${this.$route.params.obraId}/listacapitulos`
      axios(url).then((res) => {
        this.capitulos = res.data
      })
    },

    getObra() {
      const url = ` ${baseApiUrl}/mesa/${this.$route.params.obraId}`
      axios(url).then((res) => {
        this.obra = res.data
      })
    },
  },

  mounted() {
    this.getCapitulos()
    this.getObra()
  },
}
</script>

<style>
</style>