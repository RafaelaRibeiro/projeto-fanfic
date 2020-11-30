<template>
  <v-container>
    <v-main v-if="vizualizar">
      <v-row>
        <v-col>
          <h1 class="display-1 font-weight-light mb-4">
            <i> <v-icon x-large class="pa-3">mdi-file-edit</v-icon>Editar Capítulo </i>
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="10">
          <v-row>
            <v-col>
              <v-text-field
                v-model="capitulo.nome"
                color="deep-purple darken-4"
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
                color="deep-purple darken-4"
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
                  :config="{
                    uploader: { insertImageAsBase64URI: true },
                    askBeforePasteFromWord: false,
                    minHeight: 350,
                  }"
                ></jodit-vue>
              </div>

              <v-textarea
                label="Notas Finais"
                auto-grow
                outlined
                color="deep-purple darken-4"
                class="mt-7"
                v-model="capitulo.notasFinais"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-expansion-panels flat focusable>
                <v-expansion-panel>
                  <v-expansion-panel-header flat outlined color="deep-purple lighten-5"
                    >Seu capítulo necessita de avisos?</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-row justify="center">
                      <v-col>
                        <v-checkbox
                          v-for="aviso in avisos.slice(0, 5)"
                          :key="aviso.id"
                          v-model="capitulo.avisosId"
                          dense
                          class="ma-0"
                          :label="aviso.nome"
                          :value="aviso.id"
                        ></v-checkbox>
                      </v-col>
                      <v-col>
                        <v-checkbox
                          v-for="aviso in avisos.slice(5, 10)"
                          :key="aviso.id"
                          v-model="capitulo.avisosId"
                          dense
                          class="ma-0"
                          :label="aviso.nome"
                          :value="aviso.id"
                        ></v-checkbox>
                      </v-col>
                      <v-col>
                        <v-checkbox
                          v-for="aviso in avisos.slice(10, 15)"
                          :key="aviso.id"
                          v-model="capitulo.avisosId"
                          dense
                          class="ma-0"
                          :label="aviso.nome"
                          :value="aviso.id"
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-checkbox v-model="capitulo.publica" label="Marcar capítulo como Publico?"></v-checkbox>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" class="text-center">
              <v-btn dark class="ma-3" color="green darken-4" @click.prevent="vizualizar = !vizualizar"
                >Prévia do Capítulo</v-btn
              >
              <v-btn dark class="ma-3" color="red darken-3">Cancelar</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-main>
    <v-main v-else>
      <v-row>
        <v-col cols="11">
          <v-card flat height="100px">
            <h1 class="display-1 font-weight-light">
              <i>{{ obra.nome }}</i>
            </h1>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="11">
          <v-card flat outlined color="#EEEEEE">
            <v-card-title>Notas Iniciais</v-card-title>
            <v-card-text style="white-space: pre-line" class="text--primary text-justify">{{
              capitulo.notasIniciais
            }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-card flat>
          <h5 class="font-weight-light mb-4">
            <i>Capitulo {{ capitulo.numero }} - {{ capitulo.nome }}</i>
          </h5>
        </v-card>
        <v-col class="d-flex align-center flex-column" cols="11">
          <v-card class="pa-5" width="21cm" outlined flat>
            <div class="ql-editor text-justify" v-html="capitulo.conteudo"></div>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="11">
          <v-card flat outlined color="#EEEEEE">
            <v-card-title>Notas Finais</v-card-title>
            <v-card-text style="white-space: pre-line" class="text--primary text-justify">{{
              capitulo.notasFinais
            }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn dark class="ma-3" color="red darken-3" @click.prevent="vizualizar = !vizualizar">Voltar</v-btn>
          <v-btn dark class="ma-3" color="green darken-4" @click="salvarCapitulo">Salvar Capítulo</v-btn>
        </v-col>
      </v-row>
    </v-main>
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
      selected: [],
      avisos: [],

      language: 'pt_br',

      botoes: [
        'source',
        '|',
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
        'find',
        '|',
        'fullsize',
      ],

      vizualizar: true,
      terminada: false,
      publica: false,
      desabilitado: false,
      capitulo: {
        conteudo: '',
        avisosId: [],
        dataPostagem: moment().format('YYYY-MM-DD HH:mm:ss'),
      },
      ultimoCapitulo: [],
      obra: {},
    }
  },

  methods: {
    salvarCapitulo() {
      axios
        .put(`${baseApiUrl}/mesa/${this.capitulo.obraId}/editarcapitulo/${this.capitulo.id}`, {
          nome: this.capitulo.nome,
          publica: this.capitulo.publica,
          conteudo: this.capitulo.conteudo,
          notasIniciais: this.capitulo.notasIniciais,
          notasFinais: this.capitulo.notasFinais,
          obraId: this.obraId,
          avisosId: [this.capitulo.avisosId].join(','),
        })
        .then(() => {
          this.$toast.success('Capítulo Editado com Sucesso')
          this.$router.push({ path: `/obra/${this.capitulo.obraId}/capitulo/${this.capitulo.numero}` })
        })
        .catch(showError)
    },

    getAvisos() {
      const url = ` ${baseApiUrl}/avisos`
      axios(url).then((res) => {
        this.avisos = res.data
      })
    },

    getCapitulo() {
      const url = ` ${baseApiUrl}/mesa/${this.$route.params.obraId}/capitulo/${this.$route.params.numero}`
      axios.get(url).then((res) => {
        this.capitulo = res.data

        if (this.capitulo.avisosId) {
          this.capitulo.avisosId = this.capitulo.avisosId.split(',')
          this.capitulo.avisosId = this.capitulo.avisosId.map(Number)
        } else {
          this.capitulo.avisosId = []
        }
      })
    },
  },

  computed: {
    ...mapState(['usuario']),
  },

  mounted() {
    this.getAvisos()

    this.getCapitulo()
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