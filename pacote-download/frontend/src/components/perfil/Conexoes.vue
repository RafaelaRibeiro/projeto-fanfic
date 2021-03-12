<template>
  <v-card flat min-height="300px" class="ma-3">
    <v-container v-if="visible" fluid class="mt-1">
      <Loading />
    </v-container>
    <v-container v-else fluid class="mt-3">
      <v-tabs v-model="tab" fixed-tabs active-class=" primary font-weight-bold text-white shadow p-3 mb-2 rounded ">
        <v-tab>Seguidores ({{ countSeguidores.total }}) </v-tab>
        <v-tab>Seguindo ({{ countSeguindo.total }})</v-tab>
      </v-tabs>
      <!-- <v-img v-if="visible" src="@/assets/ajax-loader.gif" height="300px" width="300px"> </v-img> -->

      <v-tabs-items v-model="tab">
        <v-tab-item :transition="false" :reverse-transition="false">
          <v-row class="ma-2" v-if="userSeguidores != null && userSeguidores.length > 0">
            <v-col v-for="item in userSeguidores" :key="item.id" cols="12" sm="6" md="6" lg="3">
              <ItemConexoes :item="item" />
            </v-col>
          </v-row>
          <v-row v-else class="ma-2">
            <v-col cols="12"> {{ usuario.nome }} não tem seguidores </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item :transition="false" :reverse-transition="false">
          <v-row class="ma-2" v-if="userSeguindo != null && userSeguindo.length > 0">
            <v-col v-for="item in userSeguindo" :key="item.id" cols="12" sm="6" md="4" lg="3">
              <ItemConexoes :item="item" />
            </v-col>
          </v-row>
          <v-row v-else class="ma-2">
            <v-col cols="12"> {{ usuario.nome }} não está seguindo ninguém</v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </v-card>
</template>

<script>
import ItemConexoes from './ItemConexoes'
import axios from 'axios'
import { baseApiUrl } from '../../global'
import Loading from '../template/Loading'
export default {
  components: { ItemConexoes, Loading },
  data() {
    return {
      tab: null,
      userSeguindo: [],
      countSeguindo: {},
      userSeguidores: [],
      countSeguidores: {},
      conexao: {},
      usuario: {},
      visible: true,
    }
  },

  methods: {
    getUsuario() {
      axios.get(`${baseApiUrl}/perfil/${this.$route.params.user}`).then((res) => {
        this.usuario = res.data
      })
    },
    getSeguindo() {
      axios.get(`${baseApiUrl}/perfil/${this.$route.params.user}/seguindo`).then((res) => {
        this.userSeguindo = res.data
        this.visible = false
      })
    },
    getCountSeguindo() {
      axios.get(`${baseApiUrl}/perfil/${this.$route.params.user}/seguindo/total`).then((res) => {
        this.countSeguindo = res.data
      })
    },

    getSeguidores() {
      axios.get(`${baseApiUrl}/perfil/${this.$route.params.user}/seguidores`).then((res) => {
        this.userSeguidores = res.data
      })
    },

    getCountSeguidores() {
      axios.get(`${baseApiUrl}/perfil/${this.$route.params.user}/seguidores/total`).then((res) => {
        this.countSeguidores = res.data
      })
    },
  },

  watch: {
    $route(to) {
      this.userSeguindo = to.params.user
      this.userSeguidores = to.params.user

      this.getUsuario()
      this.getSeguindo()
      this.getSeguidores()
      this.getCountSeguindo()
      this.getCountSeguidores()
    },
  },

  mounted() {
    this.userSeguindo = this.$route.params.user
    this.userSeguidores = this.$route.params.user
    this.getUsuario()
    this.getSeguindo()
    this.getSeguidores()
    this.getCountSeguindo()
    this.getCountSeguidores()
  },
}
</script>

<style>
</style>