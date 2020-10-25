<template>
  <v-card flat :style="{ padding: '50px' }">
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
        <b-img
          v-else
          center
          src=" https://omextemplates.content.office.net/support/templates/pt-br/lt22301254.png"
          fluid
          alt="Responsive image"
        ></b-img>
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
              <strong>Status:</strong>
              {{ obras.status }}
            </p>
            <p class="text--primary text-justify">
              <strong>Início:</strong>
              {{ obras.dataAdicionado }}
            </p>
            <p class="text--primary text-justify">
              <strong>Atualizado:</strong>
              {{ obras.ultimaPostagem }}
            </p>
            <p class="text--primary text-justify">
              <strong>Categoria:</strong>
              {{ obras.categoriaId }}
            </p>

            <p>
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
                <v-img src="@/assets/18-anos.png"></v-img>
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
      <v-col cols="9">
        <v-card flat>
          <v-card-title>Índice</v-card-title>
          <v-list class="mb-n2" v-for="capitulo in capitulos" :key="capitulo.numero">
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title>
                  <router-link
                    :to="{ name: 'CapituloById', params: { obraId: capitulo.obraId, numero: capitulo.numero } }"
                    >{{ capitulo.numero }} - {{ capitulo.nome }}</router-link
                  >
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'

export default {
  name: 'ObraById',
  data() {
    return {
      obras: {},
      capitulos: [],
      universos: {},
      avisos: [],
      caracteristicas: {},
    }
  },

  methods: {
    getObras() {
      const url = ` ${baseApiUrl}/obra/${this.$route.params.obraId}`
      axios.get(url).then((res) => (this.obras = res.data))
    },

    getUniversos() {
      const url = ` ${baseApiUrl}/obra/${this.$route.params.obraId}/universos`
      axios.get(url).then((res) => (this.universos = res.data))
    },

    getAvisos() {
      const url = ` ${baseApiUrl}/obra/${this.$route.params.obraId}/avisos`
      axios.get(url).then((res) => (this.avisos = res.data))
    },

    getCaracteristicas() {
      const url = ` ${baseApiUrl}/obra/${this.$route.params.obraId}/caracteristicas`
      axios.get(url).then((res) => (this.caracteristicas = res.data))
    },

    getCapitulosByObra() {
      const url = ` ${baseApiUrl}/obra/${this.$route.params.obraId}/capitulos`
      axios.get(url).then((res) => (this.capitulos = res.data))
    },
  },

  mounted() {
    this.getObras()
    this.getCapitulosByObra()
    this.getUniversos()
    this.getAvisos()
    this.getCaracteristicas()
  },
}
</script>


<style>
</style>