<template>
  <v-container>
    <v-content v-for="obra in obras" :key="obra.id">
      <v-row>
        <v-col cols="11">
          <v-card flat height="100px">
            <h1 class="display-1 font-weight-light">
              <i>Obra - {{obra.nome}}</i>
            </h1>
            <v-card-text class="title text--primary font-weight-medium">
              Autor:
              <router-link :to="{ name: 'perfil', params: { user: obra.user } }">{{ obra.user }}</router-link>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="9">
          <v-img
            src="https://omextemplates.content.office.net/support/templates/pt-br/lt22301254.png"
            contain
            max-height="400"
            max-width="700"
          ></v-img>

          <v-card flat>
            <v-card-title>Sinopse</v-card-title>
            <v-card-text class="text--primary text-justify">{{obra.sinopse}}</v-card-text>
          </v-card>

          <v-card flat>
            <v-card-title>Caracteristicas da Obra</v-card-title>
            <v-card-text
              v-for="c in caracteristicas"
              :key="c.nome"
              class="text--primary text-justify"
            >{{c.nome}}</v-card-text>
          </v-card>

          <v-card flat outlined color="#EEEEEE">
            <v-card-title>Avisos Importantes</v-card-title>
            <v-card-text
              v-for="aviso in avisos"
              :key="aviso.nome"
              class="text--primary text-justify"
            >{{aviso.nome}}</v-card-text>
          </v-card>

          <v-card flat>
            <v-card-title>Informações da Obra</v-card-title>
            <v-card-text>
              <p class="text--primary text-justify">
                <strong>Status:</strong>
                {{obra.status}}
              </p>
              <p class="text--primary text-justify">
                <strong>Início:</strong>
                {{obra.dataAdicionado}}
              </p>
              <p class="text--primary text-justify">
                <strong>Atualizado:</strong>
                {{obra.ultimaPostagem}}
              </p>
              <p class="text--primary text-justify">
                <strong>Categoria:</strong>
                {{obra.categoriaId}}
              </p>

              <div class="d-flex flex-row">
                <strong>Universos:</strong>
                <p
                  class="text--primary text-justify px-1"
                  v-for="universo in universos"
                  :key="universo.id"
                >
                <v-chip small>
                      <a>{{universo.nome}}</a>
                </v-chip>
                </p>
              </div>

              <p>
                <strong>Classificação:</strong>
                <v-avatar class="ml-1" size="20" tile>
                  <v-img src="@/assets/18-anos.png"></v-img>
                </v-avatar>
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="9">
          <v-card flat>
            <v-card-title>Índice</v-card-title>
            <v-list  class="mb-n2" v-for="capitulo in capitulos" :key="capitulo.numero">
              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>
                    <router-link
                      :to="{ name: 'CapituloById', params: { obraId: capitulo.obraId , numero:capitulo.numero} }"
                    >{{capitulo.numero}} - {{capitulo.nome}}</router-link>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-content>
  </v-container>
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
      axios.get(url).then(res => (this.obras = res.data))
    },

    getUniversos() {
      const url = ` ${baseApiUrl}/obra/${this.$route.params.obraId}/universos`
      axios.get(url).then(res => (this.universos = res.data))
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