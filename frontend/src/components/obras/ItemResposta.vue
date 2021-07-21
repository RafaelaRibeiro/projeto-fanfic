<template>
  <v-row justify="end">
    <v-col cols="12">
      <v-card class="px-5 py-3 text--primary text-justify" color="blue lighten-5" flat outlined>
        <v-row>
          <v-col cols="1" class="d-flex justify-center">
            <v-icon> mdi-reply mdi-rotate-180 </v-icon>
          </v-col>
          <v-col cols="12" md="2" class="d-flex justify-center">
            <v-avatar size="75">
              <v-img v-if="resposta.path" :src="resposta.path"></v-img>
              <v-img v-else src="@/assets/profile.png"></v-img>
            </v-avatar>
          </v-col>
          <v-col>
            <v-row>
              <v-col cols="6">
                <span class="md-body-2"> {{ resposta.nome }}</span>
              </v-col>

              <v-col cols="6" class="d-flex justify-end md-caption">
                <i> Comentado em {{ resposta.dataComentario }} </i>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="9" class="d-flex flex-column">
                <span class="mb-4">{{ resposta.conteudo }}</span>
              </v-col>
              <v-col cols="12" md="3" class="d-flex justify-end">
                <v-btn v-show="edit" icon @click="edicao = !edicao">
                  <v-icon small color="deep-purple darken-4">mdi-pencil</v-icon>
                  <md-tooltip md-direction="top">Editar</md-tooltip>
                </v-btn>

                <v-btn v-show="edit" icon>
                  <v-icon small color="deep-purple darken-4">mdi-delete</v-icon>
                  <md-tooltip md-direction="top">Deletar</md-tooltip>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ItemResposta',
  props: ['resposta'],

  computed: {
    ...mapState(['usuario']),

    edit() {
      let condicao = false
      if (this.usuario.id == this.resposta.usuarioId) {
        condicao = true
      } else {
        condicao = false
      }
      return condicao
    },
  },
}
</script>

<style></style>
