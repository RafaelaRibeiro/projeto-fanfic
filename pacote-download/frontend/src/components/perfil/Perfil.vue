<template>
  <div class="conteiner">
    <v-row>
      <v-col>
        <v-card class="perfil-banner">
          <v-img
            height="300px"
            src="https://www.ceperfil.com.br/wp-content/uploads/2016/10/fundo-banner-aprovados.jpg"
          >
            <v-overlay :absolute="absolute" :value="overlay"></v-overlay>
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="sub-banner">
      <v-col class="avatar" cols="3">
        <v-avatar class="profile" color="grey" size="160">
          <v-img v-for="usuario in usuarios" :key="usuario.user" :src="usuario.imagemPerfil"></v-img>

          <v-overlay :absolute="absolute" :value="overlay">
            <!-- <v-file-input prepend-icon="mdi-camera"></v-file-input> -->
          </v-overlay>
        </v-avatar>
      </v-col>
      <v-col v-for="perfil in usuarios" :key="perfil.user">
        <div>
          <strong>Nome:</strong>
          {{perfil.nome}}
        </div>
        <div>
          <strong>Usuario:</strong>
          {{perfil.user}}
        </div>
      </v-col>
      <v-col>
        <v-app-bar flat color="#fff">
          <v-spacer></v-spacer>
          <!-- <v-btn depressed small>
              <v-icon>mdi-account-multiple-plus</v-icon>
              <span>Seguir</span>
          </v-btn>-->

          <v-btn depressed small @click="editarPerfil">
            <v-icon>mdi-account-edit</v-icon>
            <span>Editar Perfil</span>
          </v-btn>

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
              <div v-for="usuario in usuarios" :key="usuario.id">
                <Sobre v-if="editar" :usuario="usuario"></Sobre>
                <PerfilEditar v-else :usuario="usuario"></PerfilEditar>
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

          <!-- <b-tabs v-model="tabIndex" pills card justified no-fade>
            <b-tab title="Sobre" :title-link-class="linkClass(0)">
              <div v-for="usuario in usuarios" :key="usuario.id">
                <Sobre v-if="editar" :usuario="usuario"></Sobre>
                <PerfilEditar v-else :usuario="usuario"></PerfilEditar>
              </div>
            </b-tab>

            <b-tab title="Estante" :title-link-class="linkClass(1)">
              <EstantePerfil />
            </b-tab>

            <b-tab title="Obras" :title-link-class="linkClass(2)">
              <ObrasPerfil />
            </b-tab>
            <b-tab title="Sugestoes" :title-link-class="linkClass(3)">
              <Sugestoes />
            </b-tab>
            <b-tab title="Conexoes" :title-link-class="linkClass(4)">
              <Conexoes />
            </b-tab>
          </b-tabs>-->
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
import PerfilEditar from './PerfilEditar'

export default {
  name: 'Perfil',

  components: {
    ObrasPerfil,
    EstantePerfil,
    Sobre,
    Sugestoes,
    Conexoes,
    PerfilEditar,
  },

  data() {
    return {
      tabIndex: 0,
      tab: null,
      dialog: false,
      usuarios: {},
      absolute: true,
      overlay: false,
      file2: null,
      editar: true,

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
      const url = `${baseApiUrl}/perfil/${this.usuarios.user}`
      axios(url).then(res => (this.usuarios = res.data))
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
      this.usuarios.user = to.params.user
      this.getUsuarios()
    },
  },

  mounted() {
    this.usuarios.user = this.$route.params.user

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