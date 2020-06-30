<template>
  <div class="container">
    <v-container fluid>
      <v-card-title>Minhas Imagens</v-card-title>
      <v-row class="ml-2 mb-0">
        <v-col cols="12" md="5">
          <v-card-title>Perfil</v-card-title>
          <v-row>
            <v-col>
              <v-avatar size="150" tile class="mb-3">
                <v-img :src="usuario.imagemPerfil"></v-img>
              </v-avatar>
            </v-col>
          </v-row>
          <v-row class="ml-2 mb-0" no-gutters>
            <v-col>
              <v-btn small color="primary">Alterar</v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="5">
          <v-card-title>Banner</v-card-title>
          <v-row>
            <v-col>
              <v-img :src="usuario.imagemCapa"></v-img>
            </v-col>
          </v-row>
          <v-row class="ml-2 mb-0" no-gutters>
            <v-col>
              <v-btn small color="primary">Alterar</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-card-title>Meus Dados</v-card-title>
      <v-row class="ml-2 mb-0">
        <v-col cols="12" md="5">
          <v-text-field v-model="usuario.nome" label="Nome" color="purple darken-4" outlined></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field v-model="usuario.user" label="Usuario" color="purple darken-4" outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row class="ml-2 mt-0">
        <v-col cols="12" md="5">
          <v-text-field
            v-mask="mask"
            v-model="usuario.dataNasc"
            label="Data de Nascimento"
            placeholder="dd/mm/aaaa"
            color="purple darken-4"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-card-title>Sobre Mim</v-card-title>
      <v-row>
        <v-col cols="10">
          <v-textarea
            class="ma-3 pa-1"
            name="input-7-1"
            auto-grow
            clearable
            color="purple darken-4"
            :value="usuario.sobreMim"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-card-title>Minhas Redes</v-card-title>
      <v-row class="ml-2 mb-n2">
        <v-col cols="12" md="5">
          <v-text-field
            v-model="usuario.twitter"
            label="Twitter"
            placeholder
            outlined
            color="purple darken-4"
            prefix="http://twitter.com/"
            prepend-inner-icon="mdi-twitter"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            v-model="usuario.facebook"
            label="Facebook"
            prefix="http://facebook.com.br/"
            outlined
            placeholder="perfil"
            color="purple darken-4"
            prepend-inner-icon="mdi-facebook"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="ml-2">
        <v-col cols="12" md="5">
          <v-text-field
            v-model="usuario.instagram"
            label="Instagram"
            placeholder="perfil"
            prefix="http://instagram.com/"
            outlined
            color="purple darken-4"
            prepend-inner-icon="mdi-instagram"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            v-model="usuario.pinterest"
            label="Pinterest"
            placeholder="perfil"
            prefix="http://pinterest.com/"
            outlined
            prepend-inner-icon="mdi-pinterest"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-btn class="ma-3" color="success" @click="uploadPerfil">Salvar</v-btn>
          <v-btn class="ma-3" color="error">Cancelar</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
export default {
  name: 'Perfil',

  computed: mapState(['usuario']),

  data() {
    return {
      tab: null,
      dialog: false,
      usuarios: {},
      absolute: true,
      overlay: false,
      file2: null,
      mask: '##/##/####',
      editUsuario: [],

      items: [
        { id: 1, icon: 'mdi-book', text: 'Bloquear' },
        { id: 2, icon: 'mdi-alert-circle', text: 'Denunciar Usuário' },
      ],
      // titulos: [
      //   { id: 1, text: "Perfil", conteudo: "Sobre" },
      //   { id: 2, text: "Estante", conteudo: "Estante" },
      //   { id: 3, text: "Obras", conteudo: "Obras" },
      //   { id: 4, text: "Sugestões", conteudo: "Sugestões" },
      //   { id: 5, text: "Conexões", conteudo: "Seguidores" }
      // ]
    }
  },

  methods: {
    uploadPerfil() {
      axios
        .put(`${baseApiUrl}/perfil/${this.usuario.id}`, this.usuario)
        .then(() => {
          this.$toasted.global.defaultSuccess()
        })
        .catch(showError)
    },

    loadUsuario() {
      axios.get(`${baseApiUrl}/perfil/${this.usuario.user}`).then(res => {
        this.editUsuario = res.data
      })
    },
  },

  mounted() {
    this.loadUsuario()
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