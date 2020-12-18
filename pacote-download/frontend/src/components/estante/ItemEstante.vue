<template>
  <div class="item-estante">
    <v-card outlined class="d-flex align-center mb-4">
      <!-- <v-expand-x-transition>
        <v-checkbox
          v-show="(expand = expNovo)"
          color="deep-deep-purple darken-4"
          :input-value="checkNovo"
          value
        ></v-checkbox>
      </v-expand-x-transition> -->

      <v-row class="mr-1">
        <v-col cols="12" sm="2" class="d-flex child-flex" align-self="center">
          <v-card flat class="ma-2">
            <v-img
              max-height="125"
              max-width="125"
              in-height="45"
              min-width="45"
              contain
              v-if="item.path"
              :src="item.path"
            ></v-img>
            <v-img
              max-height="125"
              max-width="125"
              contain
              min-height="45"
              min-width="45"
              v-else
              src="@/assets/sem_imagem.jpg"
            ></v-img>
          </v-card>
        </v-col>
        <v-col cols="9" sm="9">
          <v-card class="d-flex flex-column" flat>
            <router-link class="mb-3" :to="{ name: 'ObraById', params: { obraId: item.obraId } }">
              <span class="mb-2 subtitle-2 font-weight-medium">Título: </span>
              {{ item.nome }}
            </router-link>
            <span>
              <span class="subtitle-2 font-weight-medium">Total de Capitulos:</span>
              {{ item.countCap }}
            </span>
            <span v-if="item.prateleiraId === 1">
              <span class="subtitle-2 font-weight-medium">Ultimo Capitulo Lido:</span>
              {{ item.uNumero }}
            </span>

            <span>
              <span class="subtitle-2 font-weight-medium">Terminada:</span>
              {{ item.prateleiraId }}
            </span>
          </v-card>
        </v-col>
        <v-col cols="1">
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <md-list class="md-dense">
              <md-list-item @click="dialog = true">
                <v-icon small left>mdi-playlist-remove</v-icon>
                <span class="md-list-item-text">Remover da Estante</span>
              </md-list-item>

              <md-list-item v-if="item.prateleiraId != 4" @click="arquivarObra">
                <v-icon small left>mdi-dresser</v-icon>

                <span class="md-list-item-text">Arquivar Obra</span>
              </md-list-item>
              <md-list-item v-show="item.prateleiraId === 4">
                <v-icon small left>mdi-restore</v-icon>

                <span class="md-list-item-text">Restaurar Obra</span>
              </md-list-item>
            </md-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-card>

    <v-dialog v-model="dialog" max-width="500" height="500px">
      <v-card align="center">
        <v-row align="center" justify="center" no-gutters>
          <v-avatar class="mt-8 mb-1" size="90">
            <v-img src="@/assets/playlist-remove.png"></v-img>
          </v-avatar>
        </v-row>

        <span class="md-subheading d-flex justify-center ma-5">Confirma remover a obra da sua estante?</span>

        <v-row align="center" justify="center" no-gutters>
          <v-card-actions>
            <v-btn dark color="deep-purple darken-4" class="mr-3 mb-3" @click="removeEstante" elevation="4">Sim</v-btn>
            <v-btn dark color="deep-purple darken-4" class="mr-3 mb-3" @click="dialog = false" elevation="4">Não</v-btn>
          </v-card-actions>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, showError } from '@/global'
export default {
  name: 'ItemEstante',
  props: ['item'],
  data() {
    return {
      menu: [
        { id: 1, title: 'Remover da Prateleira' },
        { id: 1, title: 'Marcar como Lida' },
        { id: 1, title: 'Marcar como Predileto' },
      ],
      dialog: false,
    }
  },

  methods: {
    removeEstante() {
      axios
        .delete(`${baseApiUrl}/${this.$store.state.usuario.id}/estante/${this.item.id}`)
        .then(() => {
          this.dialog = false
          this.$toast.success('Obra retirada da estante')
        })
        .catch(showError)
    },

    arquivarObra() {
      axios
        .put(`${baseApiUrl}/${this.$store.state.usuario.id}/estante/${this.item.id}`)
        .then(() => {
          this.$toast.success('Obra Arquiva')
        })
        .catch(showError)
    },
  },

  computed: {
    // expNovo() {
    //   return this.$store.state.expandir
    // },
    // checkNovo() {
    //   return this.$store.state.checkTodos
    // },
    // intermed: {
    //   get() {
    //     return this.$store.state.intermediario
    //   },
    //   set(valor) {
    //     this.$store.commit('setIntermed', valor)
    //   },
    // },
  },
}
</script>

<style >
</style>