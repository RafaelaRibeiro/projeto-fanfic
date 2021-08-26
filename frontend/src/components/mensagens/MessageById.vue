<template>
  <v-container v-if="visible" fluid class="mt-1">
    <Loading />
  </v-container>
  <v-card flat v-else class="ma-2">
    <v-container>
      <v-card outlined>
        <v-row>
          <v-col>
            <v-toolbar flat dense class="ma-2">
              <v-btn-toggle color="primary" dense group>
                <v-tooltip top transition="false">
                  <template v-slot:activator="{ on, attrs }">
                    <router-link :to="{ name: 'Mensagens' }">
                      <v-btn text v-bind="attrs" v-on="on">
                        <v-icon color="deep-purple darken-4"
                          >mdi-arrow-left-thick</v-icon
                        >
                      </v-btn>
                    </router-link>
                  </template>
                  <span>Voltar</span>
                </v-tooltip>

                <v-tooltip top transition="false">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" @click="notRead" text>
                      <v-icon color="deep-purple darken-4"
                        >mdi-email-outline</v-icon
                      >
                    </v-btn>
                  </template>
                  <span>Marcar como Não Lida</span>
                </v-tooltip>

                <v-btn text>
                  <v-icon color="deep-purple darken-4"
                    >mdi-delete-outline</v-icon
                  >
                </v-btn>

                <v-btn text>
                  <v-icon color="deep-purple darken-4"
                    >mdi-alert-octagon-outline</v-icon
                  >
                </v-btn>
              </v-btn-toggle>
            </v-toolbar>
          </v-col>
        </v-row>
        <v-divider class="ma-0"></v-divider>

        <v-row>
          <v-col>
            <v-card flat>
              <h6 class="font-weight-medium pa-2">{{ mensagem.assunto }}</h6>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="my-2">
          <!-- <v-col cols="12" md="1" class="d-flex justify-center">
            <v-avatar size="50">
              <v-img v-if="mensagem.path" :src="mensagem.path"></v-img>
            </v-avatar>
          </v-col> -->
          <v-col>
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <v-img :src="mensagem.path"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-html="mensagem.nome"></v-list-item-title>
                  <v-list-item-subtitle>
                    <v-menu offset-y :nudge-width="200">
                      <template v-slot:activator="{ on, attrs }">
                        para
                        <v-btn x-small icon v-bind="attrs" v-on="on">
                          <v-icon small>mdi-menu-down</v-icon>
                        </v-btn>
                      </template>
                      <v-card width="400">
                        <v-list>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-subtitle>
                                <v-row>
                                  <v-col cols="2" class="ma-1 text--primary"
                                    >de:</v-col
                                  >
                                  <v-col class="ma-1 text--primary">
                                    {{ mensagem.nome }}
                                  </v-col>
                                </v-row>
                              </v-list-item-subtitle>
                              <v-list-item-subtitle>
                                <v-row>
                                  <v-col cols="2" class="ma-1 text--primary"
                                    >para:</v-col
                                  >
                                  <v-col class="ma-1 text--primary">
                                    {{ mensagem.toNome }}
                                  </v-col>
                                </v-row>
                              </v-list-item-subtitle>
                              <v-list-item-subtitle>
                                <v-row>
                                  <v-col cols="2" class="ma-1 text--primary"
                                    >data:</v-col
                                  >
                                  <v-col class="ma-1 text--primary">
                                    {{ mensagem.dtCreateAt }}
                                  </v-col>
                                </v-row>
                              </v-list-item-subtitle>
                              <v-list-item-subtitle>
                                <v-row>
                                  <v-col cols="2" class="ma-1 text--primary"
                                    >Assunto:</v-col
                                  >
                                  <v-col class="ma-1 text--primary">
                                    {{ mensagem.assunto }}
                                  </v-col>
                                </v-row>
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card>
                    </v-menu></v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card flat class="pa-4 text-justify">
              {{ mensagem.conteudo }}
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-expansion-panels flat v-model="panel">
              <v-expansion-panel color="red" v-model="panel">
                <v-expansion-panel-header hide-actions>
                  <v-row>
                    <v-col>
                      <v-card flat class="pa-4 text-justify">
                        <v-btn color="deep-purple darken-4" outlined text small>
                          Responder
                        </v-btn>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col class="pa-0">
                      <v-card class="pa-2 ma-0" elevation="1" outlined tile>
                        <v-toolbar flat dense>
                          Para:

                          <v-toolbar-items>
                            <v-text-field
                              readonly
                              class="ma-1 md-body-1"
                              dense
                              solo
                              flat
                              :value="mensagem.nome"
                            ></v-text-field>
                          </v-toolbar-items>
                        </v-toolbar>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pa-0">
                      <v-card class="pa-4" elevation="1" tile>
                        Assunto: RES: {{ mensagem.assunto }}
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pa-0">
                      <v-card elevation="1" class=" text-justify" tile>
                        <jodit-vue
                          v-model="mensagem.conteudo"
                          :language="language"
                          :buttons="botoes"
                          :config="{
                            uploader: { insertImageAsBase64URI: true },
                            askBeforePasteFromWord: false,
                            minHeight: 250,
                          }"
                        ></jodit-vue>
                      </v-card>
                    </v-col>
                  </v-row>

                  <v-row justify="center" class="mt-n5">
                    <v-col cols="12" sm="2"></v-col>
                    <v-col cols="12" sm="10" class="d-flex justify-end">
                      <v-btn small dark class="mr-2" color="red darken-4"
                        >Cancelar</v-btn
                      >
                      <v-btn small dark color="deep-purple darken-4"
                        >Salvar</v-btn
                      >
                    </v-col>
                  </v-row></v-expansion-panel-content
                >
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-card>
</template>

<script>
import Loading from '../template/Loading'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import { mapState } from 'vuex'
import { JoditVue } from 'jodit-vue'
export default {
  name: 'MessageById',
  components: { Loading, JoditVue },
  data() {
    return {
      visible: true,
      panel: null,
      language: 'pt_br',
      values: [17],
      usuarios: [],
      mensagem: {},

      botoes: [
        'bold',
        'strikethrough',
        'underline',
        'italic',
        'align',
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
        'copyformat',
      ],
    }
  },

  methods: {
    getMessageById() {
      const url = ` ${baseApiUrl}/mensagens/${this.$store.state.usuario.id}/read/${this.$route.params.messageId}`
      axios.get(url).then((res) => {
        this.mensagem = res.data
        this.values = res.data.toId
        this.visible = false
        this.updateRead()
      })
    },

    getUsuarios() {
      const url = ` ${baseApiUrl}/usuarios`
      axios(url).then((res) => {
        this.usuarios = res.data
      })
    },
    updateRead() {
      const url = ` ${baseApiUrl}/mensagens/${this.$store.state.usuario.id}/read/${this.$route.params.messageId}`
      axios
        .put(url, {
          notRead: false,
        })
        .then(() => {})
        .catch(showError)
    },

    notRead() {
      const url = ` ${baseApiUrl}/mensagens/${this.$store.state.usuario.id}/read/${this.$route.params.messageId}`
      axios
        .put(url, {
          notRead: true,
        })
        .then(() => {
          this.$router.push({
            path: `/mensagens`,
          })
        })
        .catch(showError)
    },
  },

  computed: {
    ...mapState(['usuario']),
  },

  watch: {
    buscarUsuario() {
      // Items have already been loaded
      if (this.items.length > 0) return

      this.isLoading = true

      // Lazily load input items
      // fetch('https://api.coingecko.com/api/v3/coins/list')
      const url = ` ${baseApiUrl}/mesa/Coautor`
      fetch(url)
        .then((res) => res.clone().json())
        .then((res) => {
          this.items = res
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    },
  },
  mounted() {
    this.getMessageById()
    this.getUsuarios()
  },
}
</script>

<style></style>
