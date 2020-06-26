<template>
  <v-card flat min-height="300px">
    <v-row>
      <v-col cols="8">
        <v-card-title>
          <i class="display-1 font-weight-light mb-4 text--primary">Minha Estante</i>
        </v-card-title>
        <v-card-text>
          <div v-for="item in estante" :key="item.id">
            <ItemObra :item="item"></ItemObra>
          </div>
        </v-card-text>
      </v-col>
      <v-col>
        <v-card-title>
          <i class="display-1 font-weight-light mb-4 text--primary">Universos</i>
          <!-- <v-treeview selected-color="purple darken-4" selectable :items="universos" dense></v-treeview> -->
          <div class="full-control">
            <md-list class="md-dense pa-0" v-for="u in universos" :key="u.id">
              <md-list-item md-expand :md-expanded.sync="expandNews">
                <span class="md-list-item-text md-headline">{{u.name}}</span>

                <md-list slot="md-expand">
                  <md-list-item>
                    <span class="md-list-item-text">teste</span>
                  </md-list-item>
                </md-list>
              </md-list-item>
            </md-list>
          </div>
        </v-card-title>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import ItemObra from './ItemObra'
import axios from 'axios'
import { baseApiUrl } from '../../global'
export default {
  name: 'obrasPerfil',
  components: { ItemObra },
  data() {
    return {
      usuarios: {},
      estante: [],
      universos: [],
      universo: [],
      expandNews: false,
      notification: [],
      items: [
        {
          id: 1,
          name: 'Applications :',
          children: [
            { id: 2, name: 'Calendar : app' },
            { id: 3, name: 'Chrome : app' },
            { id: 4, name: 'Webstorm : app' },
          ],
        },
        {
          id: 5,
          name: 'Documents :',
          children: [
            {
              id: 6,
              name: 'vuetify :',
              children: [
                {
                  id: 7,
                  name: 'src :',
                  children: [
                    { id: 8, name: 'index : ts' },
                    { id: 9, name: 'bootstrap : ts' },
                  ],
                },
              ],
            },
            {
              id: 10,
              name: 'material2 :',
              children: [
                {
                  id: 11,
                  name: 'src :',
                  children: [
                    { id: 12, name: 'v-btn : ts' },
                    { id: 13, name: 'v-card : ts' },
                    { id: 14, name: 'v-window : ts' },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 15,
          name: 'Downloads :',
          children: [
            { id: 16, name: 'October : pdf' },
            { id: 17, name: 'November : pdf' },
            { id: 18, name: 'Tutorial : html' },
          ],
        },
        {
          id: 19,
          name: 'Videos :',
          children: [
            {
              id: 20,
              name: 'Tutorials :',
              children: [
                { id: 21, name: 'Basic layouts : mp4' },
                { id: 22, name: 'Advanced techniques : mp4' },
                { id: 23, name: 'All about app : dir' },
              ],
            },
            { id: 24, name: 'Intro : mov' },
            { id: 25, name: 'Conference introduction : avi' },
          ],
        },
      ],
    }
  },

  methods: {
    getUsuarios() {
      const url = `${baseApiUrl}/perfil/${this.usuarios.user}`
      axios(url).then(res => (this.usuarios = res.data))
    },
    getEstantePerfil() {
      const url = ` ${baseApiUrl}/perfil/${this.usuarios.user}/estante`
      axios(url).then(res => {
        this.estante = this.estante.concat(res.data)
      })
    },
    getUniversoEstante() {
      const url = `${baseApiUrl}/estante/${this.usuarios.user}/universos `
      axios(url).then(res => {
        this.universos = res.data
      })
    },
  },

  watch: {
    $route(to) {
      this.usuarios.user = to.params.user
      this.getUsuarios()
      this.getEstantePerfil()
    },
  },
  mounted() {
    this.usuarios.user = this.$route.params.user
    this.getEstantePerfil()
    this.getUsuarios()
    this.getUniversoEstante()
  },
}
</script>

<style lang="scss" scoped>
// [dir='ltr'] .md-list-item.md-inset .md-list-item-content {
//   padding-left: 40px !important;
// }
</style>