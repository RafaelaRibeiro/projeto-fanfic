<template>
  <div class="conteiner">
    <v-row>
      <v-col>
        <v-card class="perfil-banner">
          <v-img v-if="usuario.imagePerfil" height="300px" :src="usuario.imageBanner"></v-img>

          <v-img v-else height="300px" src="@/assets/banner-teste.png"></v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="sub-banner">
      <v-col class="avatar" cols="3">
        <v-avatar class="profile" color="grey" size="150">
          <v-img v-if="usuario.imagePerfil" :src="url + '/' + usuario.imagePerfil"></v-img>
          <v-img v-else src="@/assets/profile.png"></v-img>
        </v-avatar>
      </v-col>
      <v-col>
        <div>
          <strong>Nome:</strong>
          {{ usuario.nome }}
        </div>
        <div>
          <strong>Usuario:</strong>
          {{ usuario.user }}
        </div>
      </v-col>
      <v-col>
        <v-app-bar flat color="#fff">
          <v-spacer></v-spacer>
          <!-- <v-btn depressed small>
              <v-icon>mdi-account-multiple-plus</v-icon>
              <span>Seguir</span>
          </v-btn>-->

          <v-menu top offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="item in items" :key="item.id">
                <v-list-item-action>
                  <v-icon small>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-app-bar>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row>
      <v-col>
        <template>
          <v-tabs
            background-color="deep-purple lighten-5"
            v-model="tab"
            fixed-tabs
            active-class=" primary font-weight-bold text-white shadow p-3 mb-2 rounded "
          >
            <v-tabs-slider color="white"></v-tabs-slider>
            <v-tab v-for="titulo in titulos" :key="titulo.id">{{ titulo.text }}</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item :transition="false" :reverse-transition="false">
              <div>
                <Sobre :usuario="usuario"></Sobre>
              </div>
            </v-tab-item>
            <v-tab-item :transition="false" :reverse-transition="false">
              <EstantePerfil />
            </v-tab-item>
            <v-tab-item :transition="false" :reverse-transition="false">
              <ObrasPerfil />
            </v-tab-item>
            <v-tab-item :transition="false" :reverse-transition="false">
              <Sugestoes />
            </v-tab-item>
            <v-tab-item :transition="false" :reverse-transition="false">
              <Conexoes />
            </v-tab-item>
          </v-tabs-items>
        </template>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import ObrasPerfil from './ObrasPerfil'
import EstantePerfil from './EstantePerfil'
import Sugestoes from './Sugestoes'
import Sobre from './Sobre'
import Conexoes from './Conexoes'

export default {
  name: 'Perfil',

  components: {
    ObrasPerfil,
    EstantePerfil,
    Sobre,
    Sugestoes,
    Conexoes,
  },

  data() {
    return {
      tabIndex: 0,
      tab: null,
      dialog: false,
      usuario: {},
      absolute: true,
      overlay: false,
      file2: null,
      editar: true,
      url: baseApiUrl,

      items: [
        { id: 1, icon: 'mdi-book', text: 'Bloquear' },
        { id: 2, icon: 'mdi-alert-circle', text: 'Denunciar Usuário' },
      ],
      titulos: [
        { id: 1, text: 'Perfil', conteudo: 'Sobre' },
        { id: 2, text: 'Estante', conteudo: 'Estante' },
        { id: 3, text: 'Obras', conteudo: 'Obras' },
        { id: 4, text: 'Sugestões', conteudo: 'Sugestões' },
        { id: 5, text: 'Conexões', conteudo: 'Seguidores' },
      ],
    }
  },

  methods: {
    getUsuarios() {
      const url = `${baseApiUrl}/perfil/${this.usuario.user}`
      axios(url).then((res) => (this.usuario = res.data))
    },

    editarPerfil() {
      this.overlay = !this.overlay
      this.editar = !this.editar
    },

    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ['bg-primary', 'h6 font-weight-bold text-white shadow p-3 mb-5 bg-white rounded']
      } else {
        return ['bg-light', 'h6 font-weight-bold shadow p-3 mb-5 bg-white rounded ']
      }
    },
  },

  watch: {
    $route(to) {
      this.usuario.user = to.params.user
      this.getUsuarios()
    },
  },

  mounted() {
    this.usuario.user = this.$route.params.user

    this.getUsuarios()
  },
}
</script>

<style>
.perfil-content {
  background: #fff;

  padding: 0;
}
.perfil-banner {
  padding: 0;
  margin-top: -0.8rem;
}

.profile {
  margin-top: -7rem;
  border: 2px solid #fff;
  margin-left: 50px;
  /* border-radius: 0%; */
  position: relative;
  cursor: pointer;
  display: inline-block;

  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.3);
}

.sub-menu {
  padding-top: 0;
  font-size: 0.1rem;
}

/* .v-toolbar__content {
    border: 1px solid red;
} */
</style>