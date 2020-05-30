<template>
  <v-container>
    <v-content>
      <v-row>
        <v-col cols="11">
          <v-card flat height="100px">
            <h1 class="display-1 font-weight-light">
              <i>
                Obra -
                <router-link
                  :to="{ name: 'ObraById', params: { obraId: capitulo.obraId} }"
                >{{capitulo.obraNome}}</router-link>
              </i>
            </h1>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="11">
          <v-card v-show="capitulo.notasIniciais" flat outlined color="#EEEEEE">
            <v-card-title>Notas Iniciais</v-card-title>
            <v-card-text
              style="white-space: pre-line"
              class="text--primary text-justify"
            >{{ capitulo.notasIniciais }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mb-12" justify="center">
        <v-col cols="10">
          <v-card flat>
            <h5 class="font-weight-light mb-4">
              <i>Capitulo {{capitulo.numero}} - {{capitulo.nome}}</i>
            </h5>
          </v-card>
          <div class="ql-editor text-justify" v-html="capitulo.conteudo"></div>
        </v-col>
      </v-row>

      <v-row v-show="capitulo.notasFinais">
        <v-col cols="11">
          <v-card flat outlined color="#EEEEEE">
            <v-card-title>Notas Finais</v-card-title>
            <v-card-text
              style="white-space: pre-line"
              class="text--primary text-justify"
            >{{ capitulo.notasFinais }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-content>
    <v-content>
      <v-row>
        <v-col cols="11">
          <v-row no-gutters>
            <v-col>
              <v-btn tile large dark color="purple darken-4" block depressed>
                <v-icon left>mdi-check-bold</v-icon>MARCAR COMO LIDO
              </v-btn>
            </v-col>
            <v-col>
              <v-btn tile large dark color="purple darken-4" block depressed>
                <v-icon left>mdi-bookshelf</v-icon>COLOCAR NA ESTANTE
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-btn tile large dark color="purple darken-4" depressed>
            <v-icon left>mdi-page-previous-outline</v-icon>Capitulo Anterior
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>

        <v-col cols="4">
          <router-link
            :to="{ name: 'CapituloById', params: { obraId: capitulo.obraId, numero: 3 } }"
          >
            <v-btn tile large dark color="purple darken-4" depressed>
              proximo capitulo
              <v-icon right>mdi-page-next-outline</v-icon>
            </v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-content>

    <v-content>
      <v-row>
        <v-col cols="11">
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
        <v-col cols="11">
          <v-btn
            tile
            large
            dark
            color="purple darken-4"
            depressed
            @click="salvarComentario"
          >Salvar Comentário</v-btn>
        </v-col>
      </v-row>
    </v-content>
    <v-content>
      <v-row>
        <v-col cols="11" v-for="c in comentarios" :key="c.i">
          <v-card class="px-5 text--primary text-justify" color="#EDE7F6" flat outlined>
            <v-row>
              <v-col>
                <v-card-title class="subtitle-1 font-weight-bold">{{c.nome}}</v-card-title>
              </v-col>
              <v-col>
                <v-card-subtitle class="d-flex justify-end">
                  <i>
                    Comentado em {{c.dataComentario}}
                    <!-- <the-mask v-model="c.dataComentario" :mask="'####/##/## ##:##:##'" /> -->
                  </i>
                </v-card-subtitle>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
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

                <p v-else>{{c.conteudo}}</p>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="11">
          <v-pagination
            color="purple darken-4"
            v-model="page"
            :total-visible="7"
            :length="totalPage"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-content>
  </v-container>
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
    nextCapitulo() {
      let a = this.$route.params.numero
      return a++
    },
    // dtComentario() {
    //   let dtNow = moment(this.comentarios.dataComentario).format('DD/MM/YYYY HH:mm')

    //   return dtNow
    // },

    ...mapState(['usuario']),
  },
  data() {
    return {
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

    loadComentarios() {
      const url = ` ${baseApiUrl}/obra/${this.$route.params.obraId}/capitulo/${this.$route.params.numero}/comentarios?page=${this.page}`
      axios.get(url).then(res => {
        this.comentarios = res.data.data
        this.count = res.data.count
        this.limit = res.data.limit
        this.totalPage = res.data.totalPage
      })
    },
  },

  watch: {
    page() {
      this.loadComentarios()
    },
  },

  mounted() {
    const url = ` ${baseApiUrl}/obra/${this.$route.params.obraId}/capitulo/${this.$route.params.numero}`
    axios.get(url).then(res => (this.capitulo = res.data))
    this.loadComentarios()
  },
}
</script>


<style>
</style>