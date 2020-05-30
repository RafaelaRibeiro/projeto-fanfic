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

        <v-list-item-title>{{usuario.nome}}</v-list-item-title>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider class="ma-0"></v-divider>
      <v-list dense>
        <template v-for="item in items">
          <router-link
            :to="{name:item.path, params: {user: usuario.user}}"
            :key="item.path"
            outline
          >
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
                  <v-list-item-title>{{ child.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>

            <v-list-item v-else :key="item.text" link>
              <v-list-item-action>
                <v-badge
                  :content="item.notificacao"
                  :value="item.notificacao"
                  color="error"
                  overlap
                >
                  <template slot="badge">{{ item.notificacao }}</template>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-badge>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
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
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { userKey } from "@/global";

export default {
  name: "Menu",
  computed: mapState(["isMenuVisible", "usuario"]),
  miniNovo: {
    get() {
      return this.$store.state.drawer;
    },
    set(valor) {
      this.$store.commit("setDrawer", valor);
    }
  },

  data: () => ({
    mini: true,
    nome: {},
    usuarios: [],
    drawer: false,

    items: [
      {
        icon: "mdi-account",
        text: "Meu Perfil",
        path: "perfil",
        notificacao: 2,
        acao: ""
      },
      {
        icon: "mdi-bookshelf",
        text: "Minha Estante",
        path: "minhaEstante",
        notificacao: 0,
        acao: ""
      },

      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        text: "Minha Mesa",
        notificacao: 0,
        acao: "",
        model: false,
        children: [
          {
            icon: "mdi-lock-open-variant",
            text: "Obras Públicas",
            path: "obrasPublicas"
          },
          { icon: "mdi-lock", text: "Obras Privadas", path: "obrasPrivadas" },
          { icon: "mdi-plus", text: "Adicionar Obra", path: "obrasPrivadas" },
          {
            icon: "mdi-pencil-box-multiple",
            text: "Minhas Notas",
            path: "notas"
          }
        ]
      },
      { icon: "mdi-comment", text: "Comentários", notificacao: 0, acao: "" },
      { icon: "mdi-send", text: "Mensagens", notificacao: 0, acao: "" },
      { icon: "mdi-help-circle", text: "Help", notificacao: 0, acao: "" },
      { icon: "mdi-cog", text: "Configurações", notificacao: 0, acao: "" }
    ]
  }),

  methods: {
    logout() {
      localStorage.removeItem(userKey);
      this.$store.commit("setUser", null);
      this.$router.push({ name: "auth" });
    }
  }
};
</script>

<style>

</style>