<template>
  <v-card flat>
    <v-container>
      <v-row>
        <v-col cols="12" md="11">
          <v-card flat height="100px">
            <h1 class="display-1 font-weight-light" id="top">
              <i>
                Obra -
                <router-link :to="{ name: 'ObraById', params: { obraId: capitulo.obraId } }">{{
                  capitulo.obraNome
                }}</router-link>
              </i>
            </h1>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="11">
          <v-card v-show="capitulo.notasIniciais" flat outlined color="#EEEEEE">
            <v-card-title>Notas Iniciais</v-card-title>
            <v-card-text style="white-space: pre-line" class="text--primary text-justify">{{
              capitulo.notasIniciais
            }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mb-12">
        <v-col cols="12" md="11">
          <v-card flat>
            <h5 class="font-weight-light mb-7">
              <i>Capitulo {{ capitulo.numero }} - {{ capitulo.nome }}</i>
            </h5>
          </v-card>
          <div class="ql-editor text-justify" v-html="capitulo.conteudo"></div>
        </v-col>
      </v-row>

      <v-row v-show="capitulo.notasFinais">
        <v-col cols="12" md="11">
          <v-card flat outlined color="#EEEEEE">
            <v-card-title>Notas Finais</v-card-title>
            <v-card-text style="white-space: pre-line" class="text--primary text-justify">{{
              capitulo.notasFinais
            }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-container>
        <v-row>
          <v-col cols="12" md="11">
            <v-row no-gutters>
              <v-col cols="12" md="6">
                <v-btn dark color="purple darken-4"> <v-icon left>mdi-check-bold</v-icon>MARCAR COMO LIDO </v-btn>
              </v-col>

              <v-col cols="12" md="6" class="d-flex justify-end">
                <v-btn color="purple darken-4" dark @click="saveEstante">
                  <v-icon left>mdi-bookshelf</v-icon>Colocar na Estante
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12 " md="11" v-for="u in ultimo" :key="u.id">
            <v-row no-gutters>
              <v-col cols="12" sm="11">
                <router-link
                  :to="{ name: 'CapituloById', params: { obraId: capitulo.obraId, numero: capitulo.numero - 1 } }"
                >
                  <v-btn v-show="capitulo.numero != u.min_numero" dark color="purple darken-4">
                    <v-icon left>mdi-chevron-triple-left</v-icon>Capitulo Anterior
                  </v-btn>
                </router-link>
              </v-col>

              <v-col cols="12" sm="11" class="d-flex justify-end">
                <router-link
                  :to="{ name: 'CapituloById', params: { obraId: capitulo.obraId, numero: capitulo.numero + 1 } }"
                >
                  <v-btn v-show="capitulo.numero != u.max_numero" dark color=" blue darken-2">
                    proximo capitulo
                    <v-icon right>mdi-chevron-triple-right</v-icon>
                  </v-btn>
                </router-link>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <v-row>
          <v-col cols="12" sm="11">
            <v-textarea
              v-model="comentario"
              color="purple darken-4"
              class="text-justfy"
              outlined
              auto-grow
              clearable
              label="Deixe seu Comentário"
              clear-icon="cancel"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="11" class="d-flex justify-end">
            <v-btn dark color="purple darken-4" @click="salvarComentario">Salvar</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col cols="12" md="11" v-for="c in comentarios" :key="c.i">
            <v-card class="px-5 text--primary text-justify" color="#EDE7F6" flat outlined>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-card-title class="subtitle-1 font-weight-bold">{{ c.nome }}</v-card-title>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-card-subtitle class="d-flex justify-end">
                    <i>
                      Comentado em {{ c.dataComentario }}
                      <!-- <the-mask v-model="c.dataComentario" :mask="'####/##/## ##:##:##'" /> -->
                    </i>
                  </v-card-subtitle>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="2">
                  <v-avatar size="108" tile>
                    <v-img :src="c.imagemPerfil"></v-img>
                  </v-avatar>
                </v-col>
                <v-col>
                  <p v-if="edicao">
                    <v-textarea
                      v-model="c.conteudo"
                      color="purple darken-4"
                      class="text-justfy"
                      outlined
                      auto-grow
                    ></v-textarea>
                    <v-btn tile large dark color="purple darken-4" depressed>Salvar Comentário</v-btn>
                  </p>

                  <p v-else>{{ c.conteudo }}</p>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="11">
            <v-pagination color="purple darken-4" v-model="page" :total-visible="7" :length="totalPage"></v-pagination>
          </v-col>
        </v-row>
      </v-container>

      <v-row align="center" justify="center">
        <v-dialog v-model="dialog" persistent max-width="355">
          <!-- <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
        </template>-->
          <v-card align="center">
            <v-row align="center" justify="center" no-gutters>
              <v-icon color="red" x-large class="ma-5">mdi-alert-circle-outline</v-icon>
            </v-row>
            <v-card-subtitle class="headline">Esse capítulo contém</v-card-subtitle>
            <v-card-text v-for="aviso in avisos" :key="aviso.nome" class="title text-center">{{
              aviso.nome
            }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">Continuar</v-btn>
              <v-btn color="green darken-1" text @click="dialog = false">Voltar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
// import hljs from 'highlight.js'
// import 'highlight.js/styles/monokai-sublime.css'
export default {
  name: 'CapituloById',
  computed: {
    ...mapState(['usuario']),
  },
  data() {
    return {
      menu: false,
      dialog: false,
      avisos: [],
      page: 1,
      limit: 0,
      count: 0,
      totalPage: 0,
      capitulo: {},
      comentario: null,
      comentarios: [],
      edicao: false,
      // mask: '##/##/####',
      now: moment().format('YYYY-MM-DD HH:mm:ss'),
      ultimo: {},
      estante: {},
    }
  },

  methods: {
    salvarComentario() {
      const url = ` ${baseApiUrl}/obra/${this.capitulo.obraId}/capitulo/${this.capitulo.numero}`
      axios
        .post(url, {
          usuarioId: this.usuario.id,
          obraId: this.capitulo.obraId,
          capituloId: this.capitulo.id,
          conteudo: this.comentario,
          dataComentario: this.now,
        })
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.comentario = null
          this.loadComentarios()
        })
        .catch(showError)
    },

    saveEstante() {
      const url = ` ${baseApiUrl}/teste2/estante`
      axios
        .post(url, {
          usuarioId: this.usuario.id,
          obraId: this.capitulo.obraId,
          sugerir: false,
          prateleiraId: 2,
        })
        .then(() => {
          this.$toasted.global.defaultSuccess()
        })
        .catch(showError)
    },

    getEstante() {
      const url = `${baseApiUrl}/teste1/estante/${this.$route.params.obraId} `
      axios.get(url).then((res) => {
        this.estante = res.data
      })
    },

    loadComentarios() {
      const url = ` ${baseApiUrl}/obra/${this.$route.params.obraId}/capitulo/${this.$route.params.numero}/comentarios?page=${this.page}`
      axios.get(url).then((res) => {
        this.comentarios = res.data.data
        this.count = res.data.count
        this.limit = res.data.limit
        this.totalPage = res.data.totalPage
      })
    },
    getCapitulo() {
      const url = ` ${baseApiUrl}/obra/${this.$route.params.obraId}/capitulo/${this.$route.params.numero}`
      axios.get(url).then((res) => {
        this.capitulo = res.data
        if (this.capitulo.avisosId) this.dialog = true
      })
    },

    ultimoCapitulo() {
      const url = ` ${baseApiUrl}/mesa/${this.$route.params.obraId}/ultimocapitulo/`
      axios.get(url).then((res) => (this.ultimo = res.data))
    },
    getAvisos() {
      const url = ` ${baseApiUrl}/obra/${this.$route.params.obraId}/capitulo/${this.$route.params.numero}/avisos`
      axios.get(url).then((res) => (this.avisos = res.data))
    },
  },

  watch: {
    page() {
      this.loadComentarios()
    },

    $route(to) {
      this.capitulo.obraId = to.params.obraId
      this.capitulo.numero = to.params.numero
      this.page = 1
      this.getCapitulo()
      this.loadComentarios()
      this.getAvisos()
    },
  },

  mounted() {
    this.capitulo.obraId = this.$route.params.obraId
    this.capitulo.numero = this.$route.params.numero
    this.getCapitulo()
    this.loadComentarios()
    this.ultimoCapitulo()
    this.getAvisos()
    this.getEstante()
  },
}
</script>


<style>
.botao {
  margin-top: 200px;
}
</style>