<template >
  <div oncontextmenu="return false">
    <v-container>
      <v-row justify="center" class="mt-10">
        <v-col cols="12" sm="11">
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
      <v-row justify="center">
        <v-col cols="12" sm="11">
          <v-card v-show="capitulo.notasIniciais" flat outlined color="deep-purple lighten-5">
            <v-card-title>Notas Iniciais</v-card-title>
            <v-card-text style="white-space: pre-line" class="text--primary text-justify">{{
              capitulo.notasIniciais
            }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="11">
          <v-card flat>
            <h5 class="font-weight-light mb-4">
              <i>Capitulo {{ capitulo.numero }} - {{ capitulo.nome }}</i>
            </h5>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="d-flex align-center flex-column" cols="11">
          <v-card class="pa-5" width="21cm" outlined flat>
            <div class="ql-editor text-justify conteudo" v-html="capitulo.conteudo"></div>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-show="capitulo.notasFinais" justify="center">
        <v-col cols="12" sm="10">
          <v-card flat outlined color="deep-purple lighten-5">
            <v-card-title>Notas Finais</v-card-title>
            <v-card-text style="white-space: pre-line" class="text--primary text-justify">{{
              capitulo.notasFinais
            }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" sm="5">
          <router-link :to="{ name: 'CapituloById', params: { obraId: capitulo.obraId, numero: capitulo.numero - 1 } }">
            <v-btn v-show="capitulo.numero != ultimo.min_numero" dark color="deep-purple darken-4">
              <v-icon left>mdi-chevron-triple-left</v-icon>Capitulo Anterior
            </v-btn>
          </router-link>
        </v-col>

        <v-col cols="12" sm="5" class="d-flex justify-end">
          <router-link :to="{ name: 'CapituloById', params: { obraId: capitulo.obraId, numero: capitulo.numero + 1 } }">
            <v-btn v-show="capitulo.numero != ultimo.max_numero" dark color=" deep-purple darken-4">
              proximo capitulo
              <v-icon right>mdi-chevron-triple-right</v-icon>
            </v-btn>
          </router-link>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" sm="10">
          <v-btn v-show="botaoLido" dark color="deep-purple darken-4" @click="checkRead">
            <v-icon left>mdi-check-bold</v-icon>MARCAR COMO LIDO
          </v-btn>

          <v-btn v-show="!estante" color="deep-purple darken-4" dark @click="saveEstante">
            <v-icon left>mdi-bookshelf</v-icon>Colocar na Estante
          </v-btn>
        </v-col>
        <v-col v-show="testeStatus != null" cols="12" sm="10">
          <v-card flat outlined color="deep-purple lighten-5">
            <v-card-text class="text--primary text-justify" c>
              <!-- Obra lida até o capitulo {{ estante.ultimoCapituloId }} -->
              <v-icon color="deep-purple darken-4">mdi-check-bold</v-icon>
              {{ testeStatus }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" sm="10">
          <v-textarea
            v-model="comentar"
            color="deep-purple darken-4"
            class="text-justfy"
            outlined
            auto-grow
            clearable
            label="Deixe seu Comentário"
            clear-icon="cancel"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="10" class="d-flex justify-end">
          <v-btn dark color="deep-purple darken-4" @click="salvarComentario">Salvar</v-btn>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" sm="10" v-for="comentario in comentarios" :key="comentario.id">
          <ItemComentarios :comentario="comentario" />
        </v-col>
      </v-row>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="11">
            <v-pagination
              color="deep-purple darken-4"
              v-model="page"
              :total-visible="7"
              :length="totalPage"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-container>

      <v-row align="center" justify="center">
        <v-dialog v-model="dialog" max-width="500" height="500px">
          <v-card align="center">
            <v-row align="center" justify="center" no-gutters>
              <v-avatar class="ma-10" size="90">
                <v-img src="@/assets/alert-circle.png"></v-img>
              </v-avatar>
            </v-row>
            <span class="md-headline d-flex justify-center mb-5">Esse capítulo contém avisos:</span>

            <span v-for="aviso in avisos" :key="aviso.nome" class="md-title d-flex justify-center mb-5">{{
              aviso.nome
            }}</span>

            <v-card-actions class="justify-center">
              <router-link
                :to="{ name: 'CapituloById', params: { obraId: capitulo.obraId, numero: capitulo.numero + 1 } }"
              >
                <v-btn color="deep-purple darken-4" class="font-weight-bold" text @click="dialog = false"
                  >Próximo Capítulo</v-btn
                >
              </router-link>
              <v-btn color="deep-purple darken-4" class="font-weight-bold" text @click="dialog = false"
                >Continuar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from 'moment'
import ItemComentarios from './ItemComentarios'

import { baseApiUrl, showError } from '@/global'
import { mapState } from 'vuex'
import axios from 'axios'
// import hljs from 'highlight.js'
// import 'highlight.js/styles/monokai-sublime.css'
export default {
  name: 'CapituloById',
  components: { ItemComentarios },

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
      comentar: null,
      comentarios: [],
      edicao: false,
      // mask: '##/##/####',
      now: moment().format('YYYY-MM-DD HH:mm:ss'),
      ultimo: {},
      estante: {},
      lido: false,
    }
  },

  computed: {
    ...mapState(['usuario']),
    testeStatus() {
      let status = ''
      if (this.estante.ultimoCapituloId === this.capitulo.id) {
        status = 'Este foi o último capítulo lido'
      } else {
        if (this.estante.ultimoCapituloId > this.capitulo.id) {
          status = `Você leu até o capítulo ${this.estante.numero} dessa obra`
        } else {
          status = null
        }
      }
      return status
    },

    botaoLido() {
      let varLido = false
      if (!this.estante) {
        varLido = false
      } else {
        if (this.capitulo.id <= this.estante.ultimoCapituloId) {
          varLido = false
        } else {
          varLido = true
        }
      }
      return varLido
    },
  },

  methods: {
    salvarComentario() {
      const url = ` ${baseApiUrl}/obra/${this.capitulo.obraId}/capitulo/${this.capitulo.numero}`
      axios
        .post(url, {
          usuarioId: this.$store.state.usuario.id,
          obraId: this.capitulo.obraId,
          capituloId: this.capitulo.id,
          conteudo: this.comentar,
          dataComentario: this.now,
        })
        .then(() => {
          this.$toast.success('Seu comentário foi salvo')
          this.comentar = null
          this.loadComentarios()
        })
        .catch(showError)
    },

    saveEstante() {
      const url = ` ${baseApiUrl}/${this.$store.state.user}/estante`
      axios
        .post(url, {
          usuarioId: this.usuario.id,
          obraId: this.capitulo.obraId,
          sugerir: false,
          prateleiraId: 2,
        })
        .then(() => {
          this
          this.getEstante()
          this.$toast.success('Obra adicionada à sua estante')
        })
        .catch(showError)
    },

    getEstante() {
      const url = `${baseApiUrl}/${this.$store.state.usuario.id}/estante/${this.$route.params.obraId} `
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
        this.views()
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

    checkRead() {
      const url = `${baseApiUrl}/estante/${this.estante.id}`

      axios
        .put(url, {
          ultimoCapituloId: this.capitulo.id,
        })
        .then(() => {
          this.getEstante()
          this.$toast.success('Capítulo Marcado como Lido')
        })
        .catch(showError)
    },

    views() {
      axios
        .post(`${baseApiUrl}/views `, {
          obraId: this.capitulo.obraId,
          capituloId: this.capitulo.id,
          usuarioId: this.$store.state.usuario.id,
        })
        .then()
        .catch()
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


<style >
.botao {
  margin-top: 200px;
}

.conteudo {
  -moz-user-select: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
}
</style>