<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="display-1 font-weight-light mb-4">
          <i> <v-icon x-large class="pa-3">mdi-plus-box</v-icon>Adicionar Obra </i>
        </h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10">
        <v-row>
          <v-col>
            <v-text-field
              v-model="obra.nome"
              color="deep-purple darken-4"
              dense
              outlined
              value
              label="Título"
            ></v-text-field>

            <v-file-input
              small-chips
              v-model="imagemObra"
              color="deep-purple darken-4"
              label="Capa da Obra"
              dense
              counter
              outlined
              prepend-icon="mdi-camera"
              show-size
              accept="image/png, image/jpeg, image/bmp"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
                  {{ text }}
                </v-chip>

                <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2">
                  +{{ files.length - 2 }} File(s)
                </span>
              </template>
            </v-file-input>

            <v-textarea
              v-model="obra.sinopse"
              color="deep-purple darken-4"
              dense
              outlined
              auto-grow
              label="Sinopse"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row class="mb-n9">
          <v-col>
            <v-select
              v-model="obra.modalidadeId"
              :items="modalidades"
              label="Modalidade"
              item-text="nome"
              item-value="id"
              outlined
              dense
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="mb-n9">
          <v-col>
            <v-autocomplete
              v-model="model"
              :items="items"
              :loading="isLoading"
              :search-input.sync="buscar"
              multiple
              clearable
              chips
              small-chips
              item-text="user"
              item-value="id"
              hide-no-data
              hide-selected
              outlined
              dense
              label="Co-Autor"
              placeholder="Digite o usuário..."
              @change="buscar = ''"
              :disabled="!tipoAu"
              v-show="tipoAu"
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  @click="data.select"
                  color="deep-purple lighten-5"
                  small
                >
                  {{ data.item.user }}
                </v-chip>
              </template>
              <template v-slot:no-data> </template>

              <template v-slot:item="{ item }">
                <v-list dense>
                  <v-list-item-content dense>
                    <v-list-item-title v-text="item.user"></v-list-item-title>
                  </v-list-item-content>
                </v-list>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-row class="mb-n9">
          <v-col cols="6">
            <v-select
              v-model="obra.classificacao"
              :items="classificacao"
              label="Classificação"
              item-text="nome"
              item-value="cod"
              dense
              outlined
              color="deep-purple darken-4"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="obra.categoriaId"
              :items="categorias"
              label="Categoria"
              item-text="nome"
              item-value="id"
              outlined
              dense
            ></v-select>
          </v-col>
        </v-row>

        <v-row class="mb-n9">
          <v-col>
            <v-autocomplete
              v-model="obra.fandonsId"
              :items="list"
              :search-input.sync="searchUniverso"
              outlined
              small-chips
              clearable
              hide-selected
              dense
              v-show="!disabled"
              :disabled="disabled"
              multiple
              deletable-chips
              item-text="nome"
              item-value="id"
              label="Universo"
              @change="searchUniverso = ''"
              :menu-props="{
                maxHeight: 270,
                closeOnContentClick: true,
              }"
            >
              <template v-if="obra.categoriaId" v-slot:no-data>
                <v-dialog v-model="dialog" max-width="800px">
                  <template v-slot:activator="{ on, attrs }">
                    <span>
                      Universo <strong>{{ searchUniverso }}</strong> não encontrado. Clique
                      <v-btn small text v-bind="attrs" v-on="on"><strong>aqui</strong></v-btn> para incluir
                    </span>
                  </template>
                  <v-card>
                    <v-card-title color="white" class="deep-purple darken-4 font-weight-light">
                      <i class="white--text">Incluir Universo</i>
                    </v-card-title>
                    <v-container>
                      <v-row class="ma-2">
                        <v-col cols="8">
                          <v-text-field
                            v-model="obra.nome"
                            color="deep-purple darken-4"
                            dense
                            outlined
                            value
                            label="Universo"
                            placeholder="Digite o nome do universo"
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-select
                            v-model="obra.categoriaId"
                            :items="categorias"
                            label="Categoria"
                            item-text="nome"
                            item-value="id"
                            outlined
                            dense
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" class="text-center">
                          <v-btn dark class="mr-3" color="purple darken-4">Salvar</v-btn>
                          <v-btn dark class="ml-3" color="red darken-4" @click="reset">Cancelar</v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-dialog>
              </template>
              <template v-else v-slot:no-data>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title> Selecione uma categoria </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-combobox
              v-model="obra.shippPrincipal"
              :items="shippLista"
              :search-input.sync="searchShipp"
              item-text="nome"
              item-value="id"
              hide-selected
              dense
              small
              outlined
              clearable
              deletable-chips
              label="Shipp Principal"
              color="deep-purple darken-4"
              small-chips
              v-show="!disabled"
              :disabled="disabled"
            >
              <template v-if="obra.fandonsId.length" v-slot:no-data>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      No results matching "<strong>{{ searchShipp }}</strong
                      >". Press <kbd>enter</kbd> to create a new one
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template v-else v-slot:no-data>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title> Selecione um universo </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-combobox>
          </v-col>
          <v-col>
            <v-autocomplete
              v-model="obra.shippSecundario"
              :items="shippLista"
              :search-input.sync="searchShippSec"
              hide-selected
              multiple
              outlined
              dense
              small-chips
              deletable-chips
              clearable
              v-show="!disabled"
              :disabled="disabled"
              item-text="nome"
              item-value="id"
              label="Shipp Secundário"
              @change="searchShippSec = ''"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="obra.nome"
              color="deep-purple darken-4"
              dense
              outlined
              value
              label="Insira o link do twitter"
              :disabled="tipoAu"
              v-show="!tipoAu"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <h5>
              <i>Características da Obra</i>
            </h5>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col>
            <v-checkbox
              v-for="c in caracteristicas.slice(0, 4)"
              :key="c.id"
              v-model="obra.caracteristicasId"
              dense
              class="ma-0"
              :label="c.nome"
              :value="c.id"
            ></v-checkbox>
          </v-col>
          <v-col>
            <v-checkbox
              v-for="c in caracteristicas.slice(4, 8)"
              :key="c.id"
              v-model="obra.caracteristicasId"
              dense
              class="ma-0"
              :label="c.nome"
              :value="c.id"
            ></v-checkbox>
          </v-col>
          <v-col>
            <v-checkbox
              v-for="c in caracteristicas.slice(8, 12)"
              :key="c.id"
              v-model="obra.caracteristicasId"
              dense
              class="ma-0"
              :label="c.nome"
              :value="c.id"
            ></v-checkbox>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <h5>
              <i>Avisos Importantes</i>
            </h5>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col>
            <v-checkbox
              v-for="aviso in avisos.slice(0, 5)"
              :key="aviso.id"
              v-model="obra.avisosId"
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
              v-model="obra.avisosId"
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
              v-model="obra.avisosId"
              dense
              class="ma-0"
              :label="aviso.nome"
              :value="aviso.id"
            ></v-checkbox>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="text-center">
            <v-btn v-if="obra.modalidadeId === 4" dark class="ma-3" color="purple darken-4" @click="salvarObra"
              >Gravar</v-btn
            >
            <v-btn v-else dark class="ma-3" color="purple darken-4" @click="salvarObra">Avançar</v-btn>
            <v-btn dark class="ma-3" color="red darken-4">Cancelar</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import moment from 'moment'
export default {
  data() {
    return {
      selectedCateg: [],
      search: [],
      searchShipp: null,
      searchShippSec: null,
      searchUniverso: null,
      selected: [],
      dialog: false,
      options: [
        { text: 'Orange', value: 'orange' },
        { text: 'Apple', value: 'apple' },
        { text: 'Pineapple', value: 'pineapple' },
        { text: 'Grape', value: 'grape' },
      ],
      editarObs: false,

      publica: false,
      model: null,
      desabilitado: false,
      imagemObra: null,
      name: 'Midnight Crew',
      shipps: [],
      categorias: [],
      modalidades: [],
      obra: { fandonsId: [], caracteristicasId: [], avisosId: [] },
      ultimaObra: null,
      universos: [],
      caracteristicas: [],
      avisos: [],
      coautor: [],
      classificacao: [
        { nome: 'Livre', cod: 'livre' },
        { nome: 'Acima de 10 Anos', cod: '10+' },
        { nome: 'Acima de 12 Anos', cod: '12+' },
        { nome: 'Acima de 14 Anos', cod: '14+' },
        { nome: 'Acima de 16 Anos', cod: '16+' },
        { nome: 'Acima de 18 Anos', cod: '18+' },
      ],
      now: moment().format('YYYY-MM-DD HH:mm:ss'),

      isLoading: false,
      items: [],

      buscar: null,
      select: null,
      tab: null,
      url: `${baseApiUrl}/files/sem_imagem.jpg`,
    }
  },

  methods: {
    // /:autor/mesa/adicionarobra
    salvarObra() {
      axios
        .post(`${baseApiUrl}/mesa/${this.usuario.id}/adicionarobra`, {
          nome: this.obra.nome,
          autor: this.usuario.id,
          publica: this.obra.publica,
          categoriaId: this.obra.categoriaId,
          modalidadadeId: this.obra.modalidadeId,
          fandonsId: [this.obra.fandonsId].join(','),
          shippPrincipal: this.obra.shippPrincipal,
          shippSecundario: [this.obra.shippSecundario].join(','),
          classificacao: this.obra.classificacao,
          prateleiraId: 5,
          sinopse: this.obra.sinopse,
          caracteristicasId: [this.obra.caracteristicasId].join(','),
          avisosId: [this.obra.avisosId].join(','),
          dataAdicionado: this.now,
        })
        .then(() => {
          if (this.imagemObra === null) {
            this.semImagem()
          } else {
            this.uploadImagem()
          }
          this.postarCapitulo()
        })
        .catch(showError)
    },

    getUltimaObra() {
      let fd = new FormData()
      fd.append('file', this.imagemObra)
      // eslint-disable-next-line no-console
      console.log(this.imagemObra)

      axios
        .post(`${baseApiUrl}/mesa/145/upload`, fd)
        .then(() => {
          // eslint-disable-next-line no-console
          console.log(this.imagemObra)
        })
        .catch('erro')
    },

    postarCapitulo() {
      const url = ` ${baseApiUrl}/mesa/${this.usuario.id}/ultimaobra/${this.obra.nome}`
      axios(url).then((res) => {
        this.ultimaObra = res.data
        this.$router.push({ path: `/mesa/${this.ultimaObra.id}/adicionarcapitulo` })
      })
    },

    uploadImagem() {
      const url = ` ${baseApiUrl}/mesa/${this.usuario.id}/ultimaobra/${this.obra.nome}`
      axios(url)
        .then(() => {
          var fd = new FormData()
          fd.append('file', this.imagemObra)

          axios
            .post(`${baseApiUrl}/mesa/${this.ultimaObra.id}/upload`, fd)
            .then(() => {
              this.$router.push({ path: `/mesa/${this.ultimaObra.id}/adicionarcapitulo` })
            })
            .catch()
        })
        .catch()
    },

    semImagem() {
      axios
        .post(`${baseApiUrl}/mesa/${this.ultimaObra.id}/semimagem`, {
          url: this.url,
        })
        .then(() => {
          this.$router.push({ path: `/mesa/${this.ultimaObra.id}/adicionarcapitulo` })
        })
        .catch(showError)
    },

    getCategorias() {
      const url = ` ${baseApiUrl}/categorias`
      axios(url).then((res) => {
        this.categorias = res.data
      })
    },

    getModalidades() {
      const url = ` ${baseApiUrl}/modalidades`
      axios(url).then((res) => {
        this.modalidades = res.data
      })
    },
    getUniversos() {
      const url = ` ${baseApiUrl}/universos`
      axios(url).then((res) => {
        this.universos = res.data
      })
    },
    getShipps() {
      const url = ` ${baseApiUrl}/shipp`
      axios(url).then((res) => {
        this.shipps = res.data
      })
    },

    getCaracteristicas() {
      const url = ` ${baseApiUrl}/caracteristicas`
      axios(url).then((res) => {
        this.caracteristicas = res.data
      })
    },
    getAvisos() {
      const url = ` ${baseApiUrl}/avisos`
      axios(url).then((res) => {
        this.avisos = res.data
      })
    },

    getCoautor() {
      const url = ` ${baseApiUrl}/mesa/Coautor`
      axios(url).then((res) => {
        this.coautor = res.data
      })
    },

    reset() {
      this.nota = {}
      this.dialog = false
    },
  },

  watch: {
    model(val) {
      if (val != null) this.tab = 0
      else this.tab = null
    },

    buscar() {
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

  computed: {
    list() {
      const a = this.universos.filter((e) => {
        return e.categoriaId == this.obra.categoriaId
      })
      return a
    },

    user() {
      return this.$store.getters.usuario
    },

    shippLista() {
      const a = this.shipps.filter((e) => this.obra.fandonsId.includes(e.fandonsId))
      return a
    },
    ...mapState(['usuario']),

    disabled() {
      let disabled = false
      if (this.obra.categoriaId === 1) {
        disabled = true
      }
      return disabled
    },

    tipoAu() {
      let disabled = false
      if (this.obra.modalidadeId !== 4) {
        disabled = true
      }
      return disabled
    },
  },

  mounted() {
    this.getCategorias()
    this.getUniversos()
    this.getModalidades()
    this.getShipps()
    this.getCaracteristicas()
    this.getAvisos()
    this.getCoautor()
  },
}
</script>

<style>
.theme--light.v-label {
  color: #000;
  margin-bottom: 0;
}

.v-select__selections {
  margin-top: 5px;
}
</style>