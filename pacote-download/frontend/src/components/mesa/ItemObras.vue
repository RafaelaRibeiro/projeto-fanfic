<template>
  <div>
    <v-card outlined>
      <v-row class="mr-1">
        <v-col cols="2">
          <v-card flat class="ma-2">
            <v-avatar size="100" tile class="d-none d-sm-block">
              <v-img v-if="item.capa" :src="item.capa"></v-img>
              <v-img
                v-else
                src=" https://omextemplates.content.office.net/support/templates/pt-br/lt22301254.png"
              ></v-img>
            </v-avatar>
          </v-card>
        </v-col>
        <v-col cols="8">
          <v-card class="d-flex flex-column" flat>
            <span class="mb-2 subtitle-2 font-weight-medium">{{ item.nome }}</span>
            <span>
              <span class="subtitle-2 font-weight-medium">Total de Capitulos:</span>
              {{ item.countCap }}
            </span>
            <span>
              <span class="subtitle-2 font-weight-medium">Adicionado em:</span>
              {{ item.dataAdicionado }}
            </span>

            <v-card flat class="d-flex">
              <!-- <b-btn size="sm" variant="light" disabled>|</b-btn> -->

              <b-btn size="sm" variant="light" v-b-tooltip.hover title="Comentários">
                <v-icon color="purple darken-4" small left>mdi-comment-multiple</v-icon>58
              </b-btn>

              <b-btn size="sm" variant="light" v-b-tooltip.hover title="Estantes">
                <v-icon left color="purple darken-4" small>mdi-bookshelf</v-icon>45
              </b-btn>
            </v-card>
          </v-card>
        </v-col>
        <v-col cols="2" align="end">
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </template>

            <md-list class="md-dense">
              <md-list-item>
                <v-icon small left>mdi-view-list</v-icon>
                <span class="md-list-item-text">Lista de Capitulos</span>
              </md-list-item>
              <md-list-item :to="{ name: 'adicionarCapitulo', params: { id: item.id } }">
                <v-icon small left>mdi-plus-thick</v-icon>
                <span class="md-list-item-text">Adicionar Capítulos</span>
              </md-list-item>

              <md-list-item :to="{ name: 'EditarObra', params: { id: item.id } }">
                <v-icon small left>mdi-file-edit</v-icon>

                <span class="md-list-item-text">Editar Obra</span>
              </md-list-item>

              <md-list-item @click="active = true">
                <v-icon small left>mdi-delete</v-icon>
                <span class="md-list-item-text">Deletar Obra</span>
              </md-list-item>
            </md-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-card>
    <md-dialog :md-active.sync="active">
      <md-dialog-title>Solicictação de Exclusão</md-dialog-title>
      <v-card>teste</v-card>
    </md-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
export default {
  name: 'ItemEstante',
  props: ['item'],
  data() {
    return {
      active: false,
    }
  },

  computed: {
    dataFormatado() {
      if (this.item.dataAdicionado) {
        return moment(String(this.item.dataAdicionado)).format('DD/MM/YYYY HH:mm')
      }

      return this.dataAdicionado
    },
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