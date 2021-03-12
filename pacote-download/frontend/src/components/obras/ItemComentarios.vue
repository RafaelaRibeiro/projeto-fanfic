<template>
  <div>
    <v-card class="px-5 pt-3 pb-7 text--primary text-justify" color="deep-purple lighten-5" flat outlined>
      <v-row>
        <v-col cols="12" md="2" class="d-flex justify-center">
          <v-avatar size="75">
            <v-img v-if="comentario.path" :src="comentario.path"></v-img>
            <v-img v-else src="@/assets/profile.png"></v-img>
          </v-avatar>
        </v-col>
        <v-col>
          <v-row>
            <v-col cols="6">
              <span class="md-body-2"> {{ comentario.nome }}</span>
            </v-col>

            <v-col cols="6" class="d-flex justify-end md-caption">
              <i> Comentado em {{ comentario.dataComentario }} </i>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="9" class="d-flex flex-column">
              <span class="mb-4">{{ comentario.conteudo }}</span>
              <span>
                <v-btn color="deep-purple darken-4" outlined text small> Responder </v-btn>
              </span>
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
      <v-row>
        <v-col cols="12" v-for="resposta in respostas" :key="resposta.id" class="mb-n3">
          <ItemResposta :resposta="resposta" />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import { baseApiUrl } from '@/global'
import ItemResposta from './ItemResposta'
export default {
  name: 'ItemComentarios',
  props: ['comentario'],
  components: { ItemResposta },
  data() {
    return {
      edicao: false,
      respostas: [],
    }
  },

  methods: {
    getResposta() {
      const url = ` ${baseApiUrl}/obra/${this.$route.params.obraId}/capitulo/${this.$route.params.numero}/comentario/${this.comentario.id}`
      axios.get(url).then((res) => (this.respostas = res.data))
    },
  },

  computed: {
    ...mapState(['usuario']),

    edit() {
      let condicao = false
      if (this.usuario.id == this.comentario.usuarioId) {
        condicao = true
      } else {
        condicao = false
      }
      return condicao
    },
  },

  mounted() {
    this.getResposta()
  },
}
</script>

<style>
.linha-vertical {
  height: 10px; /*Altura da linha*/
  border-left: 2px solid; /* Adiciona borda esquerda na div como ser fosse uma linha.*/
  margin-left: 70px;
}
</style>