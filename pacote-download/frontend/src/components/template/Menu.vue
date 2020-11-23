<template >
  <div v-if="isMenuVisible" class="menu">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      :mini-variant.sync="mini"
      permanent
      expand-on-hover
      app
    >
      <v-list-item class="px-2 mb-0">
        <v-list-item-avatar> <v-img :src="usuario.imagemPerfil"></v-img> </v-list-item-avatar>

        <v-list-item-title>{{ usuario.nome }}</v-list-item-title>
        <!-- <v-btn icon @click="fechar">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn> -->
      </v-list-item>

      <v-divider class="ma-0"></v-divider>

      <md-list class="md-dense pa-0 mb-2" v-for="item in items" :key="item.text">
        <md-list-item v-if="item.children" md-expand :md-expanded.sync="expandNews">
          <v-icon class="pr-6">{{ item.icon }}</v-icon>
          <span class="md-list-item-text md-headline">{{ item.text }}</span>

          <md-list slot="md-expand">
            <md-list-item
              v-for="(child, i) in item.children"
              :key="i"
              class="pl-0"
              :to="{ name: child.path, params: { autor: usuario.user } }"
            >
              <v-icon small class="pr-6">{{ child.icon }}</v-icon>
              <span class="md-list-item-text">{{ child.text }}</span>
            </md-list-item>
          </md-list>
        </md-list-item>

        <md-list-item v-else :to="{ name: item.path, params: { user: usuario.user } }">
          <v-icon class="pr-6">{{ item.icon }}</v-icon>

          <span color="red" class="md-list-item-text">{{ item.text }}</span>
        </md-list-item>
      </md-list>

      <v-divider class="ma-0"></v-divider>
      <md-list class="md-dense pa-0 mb-2">
        <md-list-item @click="dialog = true">
          <v-icon class="pr-6">mdi-logout</v-icon>
          <span color="red" class="md-list-item-text">Sair</span>
        </md-list-item>
      </md-list>
    </v-navigation-drawer>

    <v-dialog v-model="dialog" max-width="450">
      <v-card>
        <v-row align="center" justify="center" no-gutters>
          <v-avatar class="ma-10" size="70">
            <v-img src="@/assets/logout.png"></v-img>
          </v-avatar>
        </v-row>

        <span class="md-headline d-flex justify-center"> Confirma sair? </span>
        <br />
        <v-row align="center" justify="center" no-gutters>
          <v-card-actions>
            <v-btn dark color="deep-purple darken-4" class="mr-3 mb-3" @click.prevent="logout" elevation="4">Sim</v-btn>
            <v-btn dark color="deep-purple darken-4" class="mr-3 mb-3" @click="dialog = false" elevation="4">Não</v-btn>
          </v-card-actions>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { userKey, baseApiUrl } from '@/global'

import axios from 'axios'

export default {
  name: 'Menu',
  computed: mapState(['isMenuVisible', 'usuario']),
  miniNovo: {
    get() {
      return this.$store.state.drawer
    },
    set(valor) {
      this.$store.commit('setDrawer', valor)
    },
  },

  data: () => ({
    mini: true,
    nome: {},
    usuarios: [],
    drawer: false,
    expandNews: false,
    expandSingle: true,
    dialog: false,
    url: baseApiUrl,

    items: [
      {
        icon: 'mdi-account',
        text: 'Meu Perfil',
        path: 'perfil',
        notificacao: 0,
        acao: '',
      },
      {
        icon: 'mdi-bookshelf',
        text: 'Minha Estante',
        path: 'minhaEstante',
        notificacao: 3,
        acao: '',
      },

      {
        icon: 'mdi-desk',
        'icon-alt': 'mdi-chevron-down',
        text: 'Minha Mesa',
        notificacao: 0,
        acao: '',
        model: false,
        children: [
          {
            icon: 'mdi-lock-open-variant',
            text: 'Obras Públicas',
            path: 'obrasPublicas',
          },
          { icon: 'mdi-lock', text: 'Obras Privadas', path: 'obrasPrivadas' },
          { icon: 'mdi-plus', text: 'Adicionar Obra', path: 'adicionarObra' },
          {
            icon: 'mdi-pencil-box-multiple',
            text: 'Minhas Notas',
            path: 'notas',
          },
        ],
      },
      { icon: 'mdi-comment', text: 'Comentários', notificacao: 3, acao: '' },
      { icon: 'mdi-send', text: 'Mensagens', notificacao: 10, acao: '' },
      { icon: 'mdi-help-circle', text: 'Help', notificacao: 0, acao: '' },
      { icon: 'mdi-cog', text: 'Configurações', path: 'Configuracoes', notificacao: 0, acao: '' },
    ],
  }),

  methods: {
    logout() {
      localStorage.removeItem(userKey)
      this.$store.commit('setUser', null)
      this.$router.push({ name: 'login' })
      this.dialog = false
    },
    fechar() {
      this.mini = !this.mini
      this.expandNews = false
    },

       getUsuarios() {
      const url = `${baseApiUrl}/usuario/${this.getUsuario.id}`
      axios(url).then(res => {
        this.user = res.data
      })
    },
  },
   mounted() {
    this.getUsuarios()
  },
}
</script>


<style lang="scss" scoped>
$list-width: 320px;

.full-control {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
}

.list {
  width: $list-width;
}

.md-list-item-text {
  color: black;
}

// [dir='ltr'] .md-list-item.md-inset .md-list-item-content {
//   padding-left: 40px !important;
// }
</style>