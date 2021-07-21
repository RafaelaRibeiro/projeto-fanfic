<template>
  <v-container v-if="visible" fluid class="mt-1">
    <Loading />
  </v-container>
  <v-card v-else-if="obras" flat :style="{ padding: '50px' }">
    <v-row>
      <v-col cols="12" md="10">
        <v-card flat>
          <h1 class="display-1 font-weight-light">
            <i>Obra - {{ obras.nome }}</i>
          </h1>
          <v-card-text class="title text--primary font-weight-medium">
            Autor:
            <router-link :to="{ name: 'perfil', params: { user: obras.user } }">{{ obras.user }}</router-link>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col></v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <b-img v-if="obras.path" center :src="obras.path" fluid alt="Responsive image"></b-img>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card flat>
          <v-card-title>Sinopse</v-card-title>
          <v-card-text class="text--primary text-justify">{{ obras.sinopse }}</v-card-text>
        </v-card>
      </v-col>
      <v-col></v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card flat>
          <v-card-title>Caracteristicas</v-card-title>
          <v-card-text v-for="c in caracteristicas" :key="c.nome" class="text--primary text-justify">{{
            c.nome
          }}</v-card-text>
        </v-card>
      </v-col>
      <v-col></v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="10">
        <v-card flat>
          <v-card-title>Informações</v-card-title>
          <v-card-text>
            <p class="text--primary text-justify">
              <strong class="mr-2">Status:</strong>
              <v-chip small dark :color="colorStatus">
                {{ obras.status }}
              </v-chip>
            </p>
            <p class="text--primary text-justify">
              <strong>Início:</strong>
              {{ obras.dataAdicionado }}
            </p>
            <p v-if="obras.modalidadeId != 4" class="text--primary text-justify">
              <strong>Atualizado:</strong>
              {{ obras.ultimaPostagem }}
            </p>
            <p v-if="obras.modalidadeId != 4" class="text--primary text-justify">
              <strong>Visualizações:</strong>
              {{ obras.views }}
            </p>
            <p class="text--primary text-justify">
              <strong>Modalidade:</strong>
              {{ obras.modalidade }}
            </p>
            <p class="text--primary text-justify">
              <strong>Categoria:</strong>
              <span class="text--primary text-justify px-1" v-for="categoria in categorias" :key="categoria.id">
                <v-chip small>
                  <a>{{ categoria.nome }}</a>
                </v-chip>
              </span>
            </p>

            <p v-if="universos.length != 0">
              <strong class="text--primary text-justify">Universos:</strong>
              <span class="text--primary text-justify px-1" v-for="universo in universos" :key="universo.id">
                <v-chip small>
                  <a>{{ universo.nome }}</a>
                </v-chip>
              </span>
            </p>

            <span class="text--primary text-justify">
              <strong>Classificação:</strong>
              <v-avatar class="ml-1" size="20" tile>
                <v-img :src="classificacao"></v-img>
              </v-avatar>
            </span>
          </v-card-text>
        </v-card>

        <v-card flat outlined color="#EEEEEE">
          <v-card-title>Avisos Importantes</v-card-title>
          <v-card-text v-for="aviso in avisos" :key="aviso.nome" class="text--primary text-justify">{{
            aviso.nome
          }}</v-card-text>
        </v-card>
      </v-col>
      <v-col></v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="10">
        <v-card v-if="obras.modalidadeId != 4" flat>
          <v-card-title>Índice</v-card-title>

          <md-list v-for="capitulo in capitulos" :key="capitulo.numero" class="md-dense pa-0 mb-2 ma-n1">
            <md-list-item :to="{ name: 'CapituloById', params: { obraId: capitulo.obraId, numero: capitulo.numero } }">
              <v-row>
                <v-col cols="10" class="md-subheading"> {{ capitulo.numero }} - {{ capitulo.nome }} </v-col>
                <v-col>
                  <v-icon small class="mr-2"> mdi-eye </v-icon>
                  <span class="md-subheading">{{ capitulo.views }} </span>
                </v-col>
              </v-row>
            </md-list-item>
          </md-list>
        </v-card>
        <v-card v-else flat>
          <v-card-title> <a :href="obras.linkTwitter" target="_blank">Link para a obra</a></v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
  <v-card v-else flat :style="{ padding: '50px' }">
    <error-403 />
  </v-card>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import Loading from '../template/Loading'
import error403 from '../template/error403.vue'

export default {
  name: 'ObraById',
  components: { Loading, error403 },
  data() {
    return {
      obras: {},
      capitulos: [],
      categorias: {},
      universos: {},
      avisos: [],
      caracteristicas: {},
      visible: true,
    }
  },

  methods: {
    getObras() {
      const url = ` ${baseApiUrl}/obra/${this.$route.params.obraId}`
      axios.get(url).then(res => {
        this.obras = res.data
        this.visible = false
      })
    },

    getUniversos() {
      const url = ` ${baseApiUrl}/obra/${this.$route.params.obraId}/universos`
      axios.get(url).then(res => (this.universos = res.data))
    },

    getCatergorias() {
      const url = ` ${baseApiUrl}/obra/${this.$route.params.obraId}/categorias`
      axios.get(url).then(res => (this.categorias = res.data))
    },

    getAvisos() {
      const url = ` ${baseApiUrl}/obra/${this.$route.params.obraId}/avisos`
      axios.get(url).then(res => (this.avisos = res.data))
    },

    getCaracteristicas() {
      const url = ` ${baseApiUrl}/obra/${this.$route.params.obraId}/caracteristicas`
      axios.get(url).then(res => (this.caracteristicas = res.data))
    },

    getCapitulosByObra() {
      const url = ` ${baseApiUrl}/obra/${this.$route.params.obraId}/capitulos`
      axios.get(url).then(res => (this.capitulos = res.data))
    },
  },

  computed: {
    classificacao() {
      let imagemClass = ''
      if (this.obras.classificacao === 'livre') return (imagemClass = require('@/assets/livre.png'))
      if (this.obras.classificacao === '10+') return (imagemClass = require('@/assets/10-anos.png'))
      if (this.obras.classificacao === '12+') return (imagemClass = require('@/assets/12-anos.png'))
      if (this.obras.classificacao === '14+') return (imagemClass = require('@/assets/14-anos.png'))
      if (this.obras.classificacao === '16+') return (imagemClass = require('@/assets/16-anos.png'))
      if (this.obras.classificacao === '18+') return (imagemClass = require('@/assets/18-anos.png'))

      return imagemClass
    },

    colorStatus() {
      let cores = ''
      if (this.obras.status === 'Em andamento' || this.obras.status === 'Em Andamento') {
        return (cores = 'orange lighten-1')
      } else if (this.obras.status === 'Suspensa') {
        return (cores = 'red lighten-1')
      } else {
        cores = 'green darken-1'
      }

      return cores
    },
  },

  mounted() {
    this.getObras()
    this.getCapitulosByObra()
    this.getUniversos()
    this.getCatergorias()
    this.getAvisos()
    this.getCaracteristicas()
  },
}
</script>

<style>
[dir]
  .md-list.md-theme-default
  .md-list-item-container:not(.md-list-item-default):not(.md-list-item-expand):not([disabled]):hover {
  background-color: #ede7f6 !important;
}
</style>
