<template>
  <v-container>
    <v-content v-if="vizualizar">
      <v-row>
        <v-col>
          <h1 class="display-1 font-weight-light mb-4">
            <i>
              <v-icon x-large class="pa-3">mdi-file-plus</v-icon>Adicionar Capítulo
            </i>
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="10">
          <v-row>
            <v-col>
              <v-text-field
                v-model="capitulo.nome"
                color="purple darken-4"
                dense
                outlined
                value
                label="Título do Capitulo"
              ></v-text-field>

              <v-textarea
                v-model="capitulo.notasIniciais"
                label="Notas Iniciais"
                auto-grow
                outlined
                value
                color="purple darken-4"
                class="text-justfy"
              ></v-textarea>

              <div>
                <!-- <vue-editor
                  class="editor"
                  id="conteudo"
                  :editor-toolbar=" customToolbar"
                  :editorOptions="editorSettings"
                  :customModules="customModulesForEditor"
                  v-model="capitulo.conteudo"
                />-->

                <jodit-vue
                  :language="language"
                  v-model="capitulo.conteudo"
                  :buttons="botoes"
                  :config="{uploader: {insertImageAsBase64URI: true}, askBeforePasteFromWord: false, minHeight:350}"
                ></jodit-vue>
              </div>
              {{ WordCount}}
              <v-textarea
                label="Notas Finais"
                auto-grow
                outlined
                color="purple darken-4"
                class="mt-7"
                v-model="capitulo.notasFinais"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="4">
              <q-checkbox v-model="capitulo.publica" label="Marcar capítulo como Publico?" />
            </v-col>
            <v-col cols="4">
              <q-checkbox value="1" label="Marcar a obra como terminada?" />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" class="text-center">
              <v-btn
                dark
                class="ma-3"
                color="green darken-4"
                @click.prevent="vizualizar=!vizualizar"
              >Prévia do Capítulo</v-btn>
              <v-btn dark class="ma-3" color="red darken-3">Cancelar</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-content>
    <v-content v-else>
      <v-row>
        <v-col cols="11">
          <v-card flat height="100px">
            <h1 class="display-1 font-weight-light">
              <i>{{obra.nome}}</i>
            </h1>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="11">
          <v-card flat outlined color="#EEEEEE">
            <v-card-title>Notas Iniciais</v-card-title>
            <v-card-text
              style="white-space: pre-line"
              class="text--primary text-justify"
            >{{ capitulo.notasIniciais }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="11">
          <v-card flat>
            <h5 class="font-weight-light mb-4">
              <i>Capitulo {{capitulo.numero}} - {{capitulo.nome}}</i>
            </h5>
          </v-card>
          <div class="ql-editor text-justify" v-html="capitulo.conteudo"></div>
        </v-col>
      </v-row>
      <v-row>
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
      <v-row>
        <v-col>
          <v-btn
            dark
            class="ma-3"
            color="red darken-3"
            @click.prevent="vizualizar=!vizualizar"
          >Voltar</v-btn>
          <v-btn dark class="ma-3" color="green darken-4" @click="salvarCapitulo">Salvar Capítulo</v-btn>
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
import { JoditVue } from 'jodit-vue'

export default {
  components: { JoditVue },
  props: ['user'],
  name: 'adicionarCapitulo',
  data() {
    return {
      content: '',

      language: 'pt_br',

      botoes: [
        'bold',
        'strikethrough',
        'underline',
        'italic',
        'eraser',
        'align',
        '|',
        'superscript',
        'subscript',
        '|',
        'ul',
        'ol',
        '|',
        'outdent',
        'indent',
        '|',
        'font',
        'fontsize',
        'brush',
        'paragraph',
        '|',
        'image',
        'link',
        '|',
        'undo',
        'redo',
        'selectall',
        'cut',
        'copy',
        'paste',
        'copyformat',
        '|',
        'fullsize',
      ],

      vizualizar: true,
      terminada: false,
      publica: false,
      desabilitado: false,
      capitulo: {
        publica: false,

        conteudo: '',
        dataPostagem: moment().format('YYYY-MM-DD HH:mm:ss'),
      },
      ultimoCapitulo: [],
      obra: {},
    }
  },

  methods: {
    salvarCapitulo() {
      axios
        .post(`${baseApiUrl}/${this.usuario.user}/mesa/adicionarcapitulo`, this.capitulo)
        .then(() => {
          this.$toasted.global.defaultSuccess()
        })
        .catch(showError)
    },

    getObra() {
      const url = ` ${baseApiUrl}/mesa/${this.$route.params.obraId}`
      axios(url).then(res => {
        this.obra = res.data
      })
    },

    getNumeroCapitulo() {
      const url = ` ${baseApiUrl}/mesa/${this.$route.params.obraId}/ultimocapitulo`
      axios(url).then(res => {
        this.ultimoCapitulo = res.data[0]
        this.ultimoCapitulo.numero++
        this.capitulo.numero = this.ultimoCapitulo.numero
      })
    },
  },

  computed: {
    ...mapState(['usuario']),

    WordCount() {
      return this.capitulo.conteudo.split(' ').length
    },
  },

  watch: {
    $route(to) {
      this.capitulo.obraId = to.params.obraId
      this.getObra()
    },
  },

  mounted() {
    this.capitulo.obraId = this.$route.params.obraId
    this.getObra()
    this.getNumeroCapitulo()
  },
}
</script>

<style >
/* .ql-editor p {
  text-indent: 4rem;
  line-height: 2rem;
  margin-bottom: 1.5rem;
} */

.jodit_container .jodit_icon,
.jodit_container .jodit_toolbar .jodit_toolbar_btn > a {
  fill: #3b355c;
  color: #3b355c;
}
.jodit_container .jodit_toolbar > li.jodit_toolbar_btn.jodit_with_dropdownlist .jodit_with_dropdownlist-trigger {
  border-top-color: #3b355c;
}
</style>