<template>
  <v-content v-if="isMenuVisible" class="deep-purple lighten-5">
    <v-row justify="center" class="mx-3">
      <v-col md="12">
        <v-card elevation="7">
          <router-view></router-view>
        </v-card>
      </v-col>
    </v-row>

    <v-btn bottom color="deep-purple darken-4" dark fab fixed right @click="dialog = !dialog">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title color="white" class="deep-purple darken-4 font-weight-light">
          <i class="white--text">Minhas Notas</i>
        </v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col cols="12">
              <v-textarea
                v-model="nota.conteudo"
                rows="2"
                auto-grow
                counter="255"
                maxlength="255"
                color="deep-purple darken-4"
                prepend-icon="mdi-text"
                placeholder="Notas"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="reset">Cancelar</v-btn>
          <v-btn text @click="save">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-content>
  <router-view v-else></router-view>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import { baseApiUrl, showError } from '../../global'
export default {
  name: 'Content',
  computed: mapState(['isMenuVisible', 'usuario']),
  data() {
    return {
      dialog: false,
      nota: {},
      usuarios: {},
    }
  },
  methods: {
    save() {
      axios['post'](`${baseApiUrl}/${this.usuario.user}/notas`, {
        conteudo: this.nota.conteudo,
        usuarioId: this.usuario.id,
      })
        .then(() => {
          this.reset()
        })
        .catch(showError)
    },
    reset() {
      this.nota = {}
      this.dialog = false
    },
  },
}
</script>

<style >
</style>