<template>
  <v-card flat>
    <v-container fluid>
      <!-- titulos -->
      <v-row>
        <v-col>
          <h4 class="font-weight-light pa-2"><v-icon x-large class="pa-3">mdi-bookshelf</v-icon>Minha Estante</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="9">
          <v-card flat color="deep-purple darken-4" dark class="d-flex justify-space-between mb-3 pr-3">
            <v-card-title v-for="(item, index) in filteredItems" :key="index">{{ item.nome }}</v-card-title>
          </v-card>
        </v-col>
        <v-col>
          <v-card flat color="deep-purple darken-4" dark class="mb-3">
            <v-card-title flat color="deep-purple darken-4">Prateleiras</v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <!-- conteudos -->
      <v-row>
        <v-col cols="12" md="9">
          <div v-for="item in filtershelves" :key="item.id">
            <ItemEstante :item="item"></ItemEstante>
          </div>
        </v-col>

        <v-col>
          <v-card outlined>
            <md-list>
              <md-list-item v-for="prateleira in prateleiras" :key="prateleira.id" @click="search = prateleira.id"
                >{{ prateleira.nome }}

                <md-badge class="md-primary" :md-content="prateleira.total"
              /></md-list-item>
            </md-list>
          </v-card>
        </v-col>
      </v-row>

      <!-- <v-switch dense v-model="exp" label="Editar Prateleira"></v-switch> -->
      <!-- <v-expand-transition>
            <v-card outlined v-show="(expand = exp)" height="60" width="100%" class="mb-3">
              <v-row>
                <v-col cols="4">
                  <v-checkbox
                    color="deep-purple darken-4"
                    v-model="check"
                    :input-value="check"
                    value
                    :indeterminate="false"
                    label="Marcar Todos"
                    class="shrink mr-2 mt-0 ml-2"
                  ></v-checkbox>
                </v-col>
                <v-col cols="3">
                  <v-btn depressed outlined color="deep-purple darken-4">Arquivar Obra</v-btn>
                </v-col>
                <v-col cols="3">
                  <v-btn depressed outlined color=" deep-purple darken-4">Remover da Prateleira</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-expand-transition> -->
    </v-container>
  </v-card>
</template>

<script>
import ItemEstante from './ItemEstante'
import { mapState } from 'vuex'
import axios from 'axios'
import { baseApiUrl } from '../../global'
export default {
  name: 'ListaFanfic',
  components: { ItemEstante },

  data() {
    return {
      search: 1,
      prateleiras: [],
      titulo: 'Minha Estante',
      seletor: true,
      lista: [],
      estante: [],
    }
  },
  methods: {
    getPrateleiraEstante() {
      const url = ` ${baseApiUrl}/estante/${this.usuario.id}/prateleiras`
      axios(url).then((res) => {
        this.prateleiras = res.data
      })
    },

    getObrasEstante() {
      const url = ` ${baseApiUrl}/estante/${this.usuario.id}`
      axios(url).then((res) => {
        this.estante = res.data
      })
    },
  },

  computed: {
    filteredItems() {
      const id = this.search

      const buscar = this.prateleiras.filter((e) => {
        return e.id === id
      })
      return buscar
    },

    filtershelves() {
      const a = this.estante.filter((e) => {
        return e.prateleiraId === this.search
      })
      return a
    },
    ...mapState(['usuario']),

    // exp: {
    //   get() {
    //     return this.$store.state.expandir
    //   },
    //   set(valor) {
    //     this.$store.commit('setExpand', valor)
    //   },
    // },
    // check: {
    //   get() {
    //     return this.$store.state.checkTodos
    //   },
    //   set(valor) {
    //     this.$store.commit('setCheck', valor)
    //   },
    // },
  },

  mounted() {
    this.getObrasEstante()
    this.getPrateleiraEstante()
  },
}
</script>

<style>
.md-badge.md-theme-default.md-primary {
  background-color: #311b92 !important;
}
</style>
