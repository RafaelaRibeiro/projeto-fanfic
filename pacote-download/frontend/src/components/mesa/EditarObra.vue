<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="display-1 font-weight-light mb-4">
          <i>
            <v-icon x-large class="pa-3">mdi-plus-box</v-icon>Adicionar Obra
          </i>
        </h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10">
        <v-row>
          <v-col>
            <v-text-field
              v-model="obra.nome"
              color="purple darken-4"
              dense
              outlined
              value
              label="Título"
            ></v-text-field>
            <v-textarea
              v-model="obra.sinopse"
              color="purple darken-4"
              dense
              outlined
              auto-grow
              label="Sinopse"
            ></v-textarea>
            {{obra}}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-autocomplete
              v-model="select"
              :loading="loading"
              :items="items"
              :search-input.sync="searchA"
              cache-items
              outlined
              dense
              label="Co-Autor"
            ></v-autocomplete>
            <v-select
              v-model="obra.categoriaId"
              :items="obra.categoriaId"
              label="Categoria"
              item-text="nome"
              item-value="id"
              outlined
              dense
            ></v-select>

            <v-autocomplete
              v-model="obra.shippPrincipal"
              :items="shippLista"
              label="Shipp Principal"
              item-text="nome"
              item-value="id"
              dense
              small
              outlined
              color="purple darken-4"
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { baseApiUrl } from '@/global'
import axios from 'axios'
export default {
  name: 'EditarObra',
  data() {
    return {
      obra: {},
    }
  },

  methods: {
    getObras() {
      const url = ` ${baseApiUrl}/teste1/mesa/${this.$route.params.id}/`
      axios.get(url).then(res => (this.obra = res.data))
    },
  },

  computed: {
    ...mapState(['usuario']),
  },

  mounted() {
    this.getObras()
  },
}
</script>


<style>
</style>