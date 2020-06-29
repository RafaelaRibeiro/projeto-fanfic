<template>
  <div>
    <v-card min-height="200" outlined class="pa-2">
      <v-row>
        <v-col cols="3">
          <v-card flat class="d-flex mb-2">
            <v-img v-if="item.capa " :src="item.capa"></v-img>
            <!-- <v-img v-else src="@/assets/sem_imagem.jpg"></v-img> -->
            <b-img
              center
              v-else
              src="https://uploads.spiritfanfiction.com/fanfics/historias/201902/como-se-eu-fosse-flor-15878925-260520201109.jpg "
              fluid-grow
              alt="Imagem responsiva"
            >,</b-img>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="d-flex flex-column" flat>
            <span class="mb-2 subtitle-2 font-weight-medium">
              {{item.nome}}
            </span>
            <span>
              <span class="subtitle-2 font-weight-medium" >Total de Capitulos:</span>
              {{item.countCap}}
            </span>
            <span>
              <span class="subtitle-2 font-weight-medium" >Adicionado em:</span>
              {{item.dataAdicionado}}
            </span>
          </v-card>
        </v-col>
        <!-- <v-col cols="4">{{ dataFormatado}}</v-col> -->
      </v-row>

      <v-divider></v-divider>

      <v-row no-gutters justify="center">
        <v-col cols="12">
          <v-card flat class="d-flex justify-center">
            <b-btn size="sm" variant="light" v-b-tooltip.hover title="Adicionar Capítulo">
              <v-icon color="purple darken-4" small left>mdi-plus-thick</v-icon>
            </b-btn>

            <b-btn size="sm" variant="light" v-b-tooltip.hover title="Editar Obra">
              <v-icon color="purple darken-4" small left>mdi-file-edit</v-icon>
            </b-btn>

            <b-btn size="sm" variant="light" v-b-tooltip.hover title="Deletar Obra">
              <v-icon color="purple darken-4" small left>mdi-delete</v-icon>
            </b-btn>
            <b-btn size="sm" variant="light" v-b-tooltip.hover title="Lista de Capitulos">
              <v-icon color="purple darken-4" small left>mdi-file-multiple</v-icon>
            </b-btn>
            <b-btn size="sm" variant="light" disabled>|</b-btn>

            <b-btn size="sm" variant="light" v-b-tooltip.hover title="Comentários">
              <v-icon color="purple darken-4" small left>mdi-comment-multiple</v-icon>58
            </b-btn>

            <b-btn size="sm" variant="light" v-b-tooltip.hover title="Estantes">
              <v-icon left color="purple darken-4" small>mdi-bookshelf</v-icon>45
            </b-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'ItemEstante',
  props: ['item'],

  computed: {
    dataFormatado() {
      if (this.item.dataAdicionado) {
        return moment(String(this.item.dataAdicionado)).format('DD/MM/YYYY HH:mm')
      }

      return this.dataAdicionado
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