<template>
  <div class="container">
    <v-container fluid>
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
            class="ml-3"
            name="input-7-1"
            v-model="usuario.sobreMim"
            auto-grow
            clearable
            outlined
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
      <v-row class="ml-2" justify="end">
        <v-col md="4">
          <v-btn dark class="ma-3" color="purple darken-4" @click="updatePerfil">
            <v-icon small left>mdi-floppy</v-icon>Salvar
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { baseApiUrl, showError,  } from '@/global'
import axios from 'axios'
import {mapGetters} from 'vuex'
import moment from 'moment'
export default {
  name: 'PerfilEditar',
  props: ['usuario'],

  data() {
    return {
      tab: null,
      dialog: false,
      mask: '##/##/####',
    }
  },
  computed: {
    ...mapGetters(['getUsuario'])
  },

  methods: {
    updatePerfil() {
      axios
        .put(`${baseApiUrl}/usuario/${this.getUsuario.id}`, {
          nome:this.usuario.nome,
          user:this.usuario.user,
          sobreMim:this.usuario.sobreMim,
          facebook:this.usuario.facebook,
          twitter:this.usuario.twitter,
          instagram:this.usuario.instagram,
          pinterest:this.usuario.pinterest,
          tumblr:this.usuario.tumblr,
          dataNasc:moment(this.usuario.dataNasc).format('YYYY-MM-DD')

        })
        .then(() => {
          this.$store.commit('setUser', {
          nome:this.usuario.nome,
          user:this.usuario.user,
          sobreMim:this.usuario.sobreMim,
          facebook:this.usuario.facebook,
          twitter:this.usuario.twitter,
          instagram:this.usuario.instagram,
          pinterest:this.usuario.pinterest,
          tumblr:this.usuario.tumblr,
          dataNasc:moment(this.usuario.dataNasc).format('YYYY-MM-DD'),
            token: this.getUsuario.token,
          exp: this.getUsuario.exp,
          iap: this.getUsuario.iap

          })
      
          this.$toast.success('Dados do perfil atualizados')
        })
        .catch(showError)
    },

    getUsuarios() {
      const url = `${baseApiUrl}/usuario/${this.getUsuario.id}`
      axios.get(url).then((res) => {
        this.usuario = res.data
      })
    },
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