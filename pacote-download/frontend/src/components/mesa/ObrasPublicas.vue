<template>
  <v-card flat>
    <v-container fluid>
      <v-row>
        <v-col>
          <h4 class="font-weight-light pa-2">
            <v-icon x-large class="pa-3">mdi-lock-open-variant</v-icon>Minhas Obras Públicas
          </h4>
        </v-col>
      </v-row>
      <v-row class="mb-n2">
        <v-col cols="12" md="9">
          <v-card flat color="deep-purple darken-4" dark>
            <v-card-title>
              <i v-for="(item, index) in filteredItems" :key="index">{{ item.nome }}</i>
            </v-card-title>
          </v-card>
        </v-col>
        <v-col>
          <v-card flat color="deep-purple darken-4" dark>
            <v-card-title flat color="deep-purple darken-4" dark>Status</v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <!-- conteudos -->
      <v-row>
        <v-col cols="12" md="9">
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
                  <md-list-item v-for="s in status" :key="s.id" @click="search = s.id">
                    {{ s.nome }}
                    <md-badge class="md-primary" :md-content="s.total" />
                  </md-list-item>
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
      search: 5,
      page: 1,
      limit: 0,
      count: 0,
      totalPage: 0,
      status: [],
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
        return e.prateleiraId === this.search
      })
      return a
    },

    ...mapState(['usuario']),
  },

  methods: {
    getObrasPublicas() {
      const url = ` ${baseApiUrl}/mesa/${this.$store.state.usuario.id}/obraspublicas`
      axios(url).then((res) => {
        this.obras = res.data
      })
    },

    getstatus() {
      const url = ` ${baseApiUrl}/mesa/${this.$store.state.usuario.id}/obraspublicas/status`
      axios(url).then((res) => {
        this.status = res.data
      })
    },
  },

  mounted() {
    this.getObrasPublicas()
    this.getstatus()
  },
}
</script>

<style>
.md-badge.md-theme-default.md-primary {
  background-color: #311b92;
}
</style>