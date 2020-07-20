<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="display-1 font-weight-light mb-4">
          <i>
            <v-icon x-large class="pa-3">mdi-database-plus</v-icon>Cadastro de Dados
          </i>
        </h1>
      </v-col>
    </v-row>
    <v-form>
      <v-row>
        <v-col cols="4">
          <v-select
            :items="categorias"
            label="Categoria"
            item-text="nome"
            item-value="id"
            outlined
            dense
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-text-field color="purple darken-4" dense outlined value label="Universo"></v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
export default {
  data() {
    return {
      categorias: [],
    }
  },

  methods: {
    getCategorias() {
      const url = ` ${baseApiUrl}/categorias`
      axios(url).then(res => {
        this.categorias = res.data
      })
    },
  },

  mounted() {
    this.getCategorias()
  },
}
</script>

<style>
</style>