<template>
  <div>
    <v-card outlined>
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
          </v-card>
        </v-col>
        <v-col cols="9" sm="9">
          <v-card class="d-flex flex-column ma-2" flat>
            <router-link class="mb-2" :to="{ name: 'ObraById', params: { obraId: item.obraId } }">
              <span class="md-subheading font-weight-medium">{{ item.nome }}</span>
            </router-link>
            <span>
              <span class="Subheading font-weight-medium">Total de Capitulos:</span>
              {{ item.countCap }}
            </span>
            <span>
              <span class="Subheading font-weight-medium">Adicionado em:</span>
              {{ item.dataAdicionado }}
            </span>

            <v-card flat class="d-flex">
              <!-- <b-btn size="sm" variant="light" disabled>|</b-btn> -->

              <b-btn size="sm" variant="light" v-b-tooltip.hover title="Comentários">
                <v-icon color="deep-purple darken-4" small left>mdi-comment-multiple</v-icon>{{ item.comentarios }}
              </b-btn>

              <b-btn size="sm" variant="light" v-b-tooltip.hover title="Estantes">
                <v-icon left color="deep-purple darken-4" small>mdi-bookshelf</v-icon>{{ item.estantes }}
              </b-btn>
            </v-card>
          </v-card>
        </v-col>
        <v-col cols="1" sm="1" align="end">
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <md-list class="md-dense">
              <md-list-item v-if="item.countCap > 0" :to="{ name: 'listaCapitulos', params: { obraId: item.id } }">
                <v-icon small left>mdi-view-list</v-icon>
                <span class="md-list-item-text">Lista de Capitulos</span>
              </md-list-item>
              <md-list-item v-if="item.prateleiraId === 5" :to="{ name: 'adicionarCapitulo', params: { id: item.id } }">
                <v-icon small left>mdi-plus-thick</v-icon>
                <span class="md-list-item-text">Adicionar Capítulos</span>
              </md-list-item>

              <md-list-item :to="{ name: 'EditarObra', params: { obraId: item.obraId } }">
                <v-icon small left>mdi-file-edit</v-icon>

                <span class="md-list-item-text">Editar Obra</span>
              </md-list-item>

              <md-list-item @click="dialog = true">
                <v-icon small left>mdi-delete</v-icon>
                <span class="md-list-item-text">Deletar Obra</span>
              </md-list-item>
            </md-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog v-model="dialog" max-width="500" height="500px">
      <v-card align="center">
        <v-row align="center" justify="center" no-gutters>
          <v-avatar class="mt-8 mb-6" size="90">
            <v-img src="@/assets/delete-alert.png"></v-img>
          </v-avatar>
        </v-row>
        <span class="md-subheading d-flex justify-center ma-5"
          >A obra ficará suspensa por 30 dias, após esse período será excluída defitivamente.</span
        >
        <span class="md-subheading d-flex justify-center ma-5">Confirma excluir a obra e todos os seus capítulos?</span>

        <v-row align="center" justify="center" no-gutters>
          <v-card-actions>
            <v-btn dark color="deep-purple darken-4" class="mr-3 mb-3" @click="dialog = false" elevation="4">Sim</v-btn>
            <v-btn dark color="deep-purple darken-4" class="mr-3 mb-3" @click="dialog = false" elevation="4">Não</v-btn>
          </v-card-actions>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
export default {
  name: 'ItemEstante',
  props: ['item'],
  data() {
    return {
      dialog: false,
    }
  },

  methods: {
    remove() {
      const id = this.item.obraId
      axios
        .delete(`${baseApiUrl}/mesa/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess()
        })
        .catch(showError)
    },
    onConfirm() {
      this.value = 'Agreed'
    },
    onCancel() {
      this.value = 'Disagreed'
    },
  },
}
</script>

<style >
/* .item-estante {
  border-radius: 8px;
  margin-bottom: 10px;
  background: #fff;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.item-estante-info a,
.item-estante-info a:hover {
  text-decoration: none;
  display: flex;
  align-items: flex-start;
  color: #000;
}

.item-estante-image img {
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.item-estante-info {
  display: flex;
  align-self: stretch;
  flex-direction: column;
} */
</style>