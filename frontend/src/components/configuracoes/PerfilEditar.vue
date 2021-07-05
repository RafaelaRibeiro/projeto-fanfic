<template>
  <div class="container">
    <v-container fluid>
      <v-card-title>Meus Dados</v-card-title>
      <v-row class="ml-2 mb-0">
        <v-col cols="12" md="5">
          <v-text-field v-model="usuario.nome" label="Nome" color="deep-purple darken-4" outlined></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field v-model="usuario.user" label="Usuario" color="deep-purple darken-4" outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row class="ml-2 mt-0">
        <v-col cols="12" md="5">
          <!-- <v-text-field
            v-model="usuario.dataNasc"
            label="Data de Nascimento"
            color="deep-purple darken-4"
            outlined
          ></v-text-field> -->

          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="computedDateFormatted"
                label="Data de Nascimento"
                readonly
                outlined
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="usuario.dataNasc"
              locale="pt-br"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>
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
            color="deep-purple darken-4"
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
            placeholder="perfil"
            outlined
            color="deep-purple darken-4"
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
            color="deep-purple darken-4"
            prepend-inner-icon="mdi-facebook"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="ml-2 mb-n2">
        <v-col cols="12" md="5">
          <v-text-field
            v-model="usuario.instagram"
            label="Instagram"
            placeholder="perfil"
            prefix="http://instagram.com/"
            outlined
            color="deep-purple darken-4"
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
      <v-row class="ml-2">
        <v-col cols="12" md="5">
          <v-text-field
            v-model="usuario.spotify"
            label="Spotify"
            placeholder="Playlist"
            outlined
            prepend-inner-icon="mdi-spotify"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="ml-2" justify="end">
        <v-col md="4">
          <v-btn dark class="ma-3" color="deep-purple darken-4" @click="updatePerfil">
            <v-icon small left>mdi-floppy</v-icon>Salvar
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'PerfilEditar',
  props: ['usuario'],
  perfil: {
    get() {
      return this.$store.state.usuario.nome
    },
    set(valor) {
      this.$store.commit('setUser', valor)
    },
  },

  data() {
    return {
      tab: null,
      dialog: false,
      mask: '##/##/####',
      menu: false,
    }
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.usuario.dataNasc)
    },
    ...mapGetters(['getUsuario']),
  },

  methods: {
    updatePerfil() {
      axios
        .put(`${baseApiUrl}/usuario/${this.getUsuario.id}`, {
          nome: this.usuario.nome,
          user: this.usuario.user,
          sobreMim: this.usuario.sobreMim,
          facebook: this.usuario.facebook,
          twitter: this.usuario.twitter,
          instagram: this.usuario.instagram,
          pinterest: this.usuario.pinterest,
          tumblr: this.usuario.tumblr,
          spotify: this.usuario.spotify,
          dataNasc: this.usuario.dataNasc,
        })
        .then(() => {
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
    save(date) {
      this.$refs.menu.save(date)
    },

    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
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