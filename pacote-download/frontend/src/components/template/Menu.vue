<template >
  <div v-if="isMenuVisible" class="menu">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      :mini-variant.sync="mini"
      permanent
      app
    >
      <v-list-item class="px-2 mb-0">
        <v-list-item-avatar>
          <v-img :src="usuario.imagemPerfil"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>{{ usuario.nome }}</v-list-item-title>
        <v-btn icon @click="fechar">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider class="ma-0"></v-divider>
      <!-- <v-list dense>
        <template v-for="item in items">
          <v-list-group
            v-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item v-for="(child, i) in item.children" :key="i" link>
              <v-list-item-action v-if="child.icon">
                <v-icon small right>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <router-link
                  class="routerLink"
                  :to="{name:child.path, params: {autor: usuario.user}}"
                  :key="child.path"
                >
                  <v-list-item-title>{{ child.text }}</v-list-item-title>
                </router-link>
            
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-item v-else :key="item.text" link>
            <v-list-item-action>
              <v-badge :content="item.notificacao" :value="item.notificacao" color="error" overlap>
                <template slot="badge">{{ item.notificacao }}</template>
                <v-icon>{{ item.icon }}</v-icon>
              </v-badge>
            </v-list-item-action>

            <v-list-item-content class="teste">
              <router-link
                :to="{name:item.path, params: {user: usuario.user}}"
                :key="item.path"
                class="routerLink"
              >
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </router-link>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click.prevent="logout">Sair</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      -->

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
      <md-list class="md-dense pa-0 mb-2">
        <md-list-item @click.prevent="logout">
          <v-icon class="pr-6">mdi-logout</v-icon>
          <span color="red" class="md-list-item-text">Sair</span>
        </md-list-item>
      </md-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { userKey } from '@/global'

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
    },
    fechar() {
      this.mini = !this.mini
      this.expandNews = false
    },
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