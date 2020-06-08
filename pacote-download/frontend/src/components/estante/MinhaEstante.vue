<template>
  <v-card flat>
    <!-- <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" label="Pesquisar" single-line hide-details></v-text-field>
    </v-card-title>-->

    <v-container fluid>
      <h1 class="display-1 font-weight-light mb-4">
        <i>
          <v-icon x-large class="pa-3">{{icon}}</v-icon>Minha Estante
        </i>
      </h1>
      <v-row>
        <v-col cols="9">
          <v-card flat color="purple darken-4" dark class="d-flex justify-space-between mb-3 pr-3">
            <v-card-title v-for="(item, index) in filteredItems" :key="index">{{item.nome}}</v-card-title>

            <v-switch dense v-model="exp" label="Editar Prateleira"></v-switch>
          </v-card>
          <v-expand-transition>
            <v-card outlined v-show="expand=exp" height="60" width="100%" class="mb-3">
              <v-row>
                <v-col cols="4">
                  <v-checkbox
                    color="indigo darken-3"
                    v-model="check"
                    :input-value="check"
                    value
                    :indeterminate="false"
                    label="Marcar Todos"
                    class="shrink mr-2 mt-0 ml-2"
                  ></v-checkbox>
                </v-col>
                <v-col cols="3">
                  <v-btn depressed outlined color="indigo darken-3">Arquivar Obra</v-btn>
                </v-col>
                <v-col cols="3">
                  <v-btn depressed outlined color=" indigo darken-3">Remover da Prateleira</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-expand-transition>
          <div v-for="item in filtershelves" :key="item.id">
            <ItemEstante :item="item"></ItemEstante>
          </div>
        </v-col>
        <v-col cols="3">
          <v-card flat color="purple darken-4" dark class="mb-3">
            <v-card-title>Prateleiras</v-card-title>
          </v-card>
          <v-card outlined>
            <v-list>
              <v-list-item-group>
                <v-list-item v-for="prateleira in lista" :key="prateleira.id">
                  <v-list-item-content>
                    <v-list-item-title v-text="prateleira.nome" @click="search = prateleira.id"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
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
      icon: 'mdi-bookshelf',
      search: 1,

      titulo: 'Minha Estante',
      seletor: true,
      lista: [],

      headers: [
        { text: '', value: 'capa' },
        { text: 'História', align: 'left', value: 'name' },
        { text: 'Lido por último', align: 'left', value: 'ultimo' },
        { text: 'Próximo Capítulo', align: 'left', value: 'proximo' },
      ],
      estante: [],
    }
  },
  methods: {
    getPrateleiras() {
      const url = ` ${baseApiUrl}/prateleiras`
      axios(url).then(res => {
        this.lista = this.lista.concat(res.data)
      })
    },

    getObrasPrateleiras() {
      const url = ` ${baseApiUrl}/${this.usuario.user}/estante`

      axios(url).then(res => {
        this.estante = this.estante.concat(res.data)
      })
    },
  },

  computed: {
    filteredItems() {
      const id = this.search

      const buscar = this.lista.filter(e => {
        return e.id === id
      })
      return buscar
    },

    filtershelves() {
      const a = this.estante.filter(e => {
        return e.prateleiraId === this.search
      })
      return a
    },
    ...mapState(['usuario']),

    exp: {
      get() {
        return this.$store.state.expandir
      },
      set(valor) {
        this.$store.commit('setExpand', valor)
      },
    },
    check: {
      get() {
        return this.$store.state.checkTodos
      },
      set(valor) {
        this.$store.commit('setCheck', valor)
      },
    },
  },

  mounted() {
    this.getPrateleiras()
    this.getObrasPrateleiras()
  },
}
</script>

<style>
/* .text-start {
  width: 60px;
}
.lista-fanfic {
  height: 600px;
}

.v-application a {
  text-decoration: none;
} */
</style>
