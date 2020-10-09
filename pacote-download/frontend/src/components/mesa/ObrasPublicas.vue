<template>
  <v-card flat>
    <v-container fluid>
      <!-- titulos -->
      <v-row>
        <v-col>
          <h1 class="display-1 font-weight-light mb-4">
            <i> <v-icon x-large class="pa-3">mdi-lock-open-variant</v-icon>Minhas Obras Públicas </i>
          </h1>
        </v-col>
      </v-row>

      <v-row class="mb-n2">
        <v-col cols="9">
          <v-card flat color="purple darken-4" dark>
            <v-card-title>
              <i v-for="(item, index) in filteredItems" :key="index">{{ item.text }}</i>
            </v-card-title>
          </v-card>
        </v-col>
        <v-col>
          <v-card flat color="purple darken-4" dark>
            <v-card-title flat color="purple darken-4" dark>Status</v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <!-- conteudos -->
      <v-row>
        <v-col cols="9">
          <v-row>
            <v-col class="mb-n3" cols="12" v-for="item in filtershelves" :key="item.id">
              <ItemObras :item="item"></ItemObras>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <v-row>
            <v-col>
              <v-card outlined>
                <md-list>
                  <md-list-item v-for="s in status" :key="s.id" @click="search = s.id">{{ s.text }}</md-list-item>
                </md-list>
                <!-- <v-list>
                  <v-list-item-group>
                    <v-list-item v-for="s in status" :key="s.id">
                      <v-list-item-content>
                        <v-list-item-title v-text="s.text" @click="search = s.id"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>-->
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import ItemObras from './ItemObras'
import { mapState } from 'vuex'
import axios from 'axios'
import { baseApiUrl } from '../../global'
export default {
  name: 'obrasPublicas',
  components: { ItemObras },
  data() {
    return {
      obras: [],
      search: 'A',
      page: 1,
      limit: 0,
      count: 0,
      totalPage: 0,
      status: [
        { id: 'A', text: 'Em Andamento' },
        { id: 'T', text: 'Terminada' },
        { id: 'S', text: 'Suspensa' },
      ],
    }
  },

  computed: {
    filteredItems() {
      const id = this.search

      const buscar = this.status.filter((e) => {
        return e.id === id
      })
      return buscar
    },

    filtershelves() {
      const a = this.obras.filter((e) => {
        return e.terminada === this.search
      })
      return a
    },

    ...mapState(['usuario']),
  },

  methods: {
    getObrasPublicas() {
      const url = ` ${baseApiUrl}/${this.$store.state.usuario.user}/obraspublicas`
      axios(url).then((res) => {
        this.obras = res.data
      })
    },
  },

  mounted() {
    this.getObrasPublicas()
  },
}
</script>

<style>
</style>