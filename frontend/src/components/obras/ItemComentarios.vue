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
          <v-row class="mb-n6">
            <v-col cols="12" md="9" class="d-flex flex-column ">
              <span>{{ comentario.conteudo }}</span>
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
      <v-row>
        <v-col class="mt-n3">
          <v-expansion-panels flat v-model="panel" style="background-color:#EDE7F6;">
            <v-expansion-panel color="red" v-model="panel">
              <v-expansion-panel-header hide-actions>
                <v-row>
                  <v-col cols="12" md="2"> </v-col>
                  <v-col>
                    <v-btn color="deep-purple darken-4" outlined text small>
                      Responder
                    </v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="12" md="2"> </v-col>
                  <v-col>
                    <v-textarea
                      v-model="responder"
                      color="deep-purple darken-4"
                      class="text-justfy"
                      background-color="white"
                      outlined
                      auto-grow
                      clearable
                      label="Responda esse comentário"
                      clear-icon="cancel"
                      rows="2"
                      row-height="20"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row justify="center" class="mt-n5">
                  <v-col cols="12" sm="2"></v-col>
                  <v-col cols="12" sm="10" class="d-flex justify-end">
                    <v-btn small dark class="mr-2" color="red darken-4" @click="cancelar">Cancelar</v-btn>
                    <v-btn small dark color="deep-purple darken-4" @click="salvarResposta">Salvar</v-btn>
                  </v-col>
                </v-row></v-expansion-panel-content
              >
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import { baseApiUrl, showError } from '@/global'
import ItemResposta from './ItemResposta'
export default {
  name: 'ItemComentarios',
  props: ['comentario'],
  components: { ItemResposta },
  data() {
    return {
      edicao: false,
      respostas: [],
      responder: null,
      showResponder: false,
      panel: null,
    }
  },

  methods: {
    salvarResposta() {
      const url = ` ${baseApiUrl}/obra/${this.comentario.obraId}/capitulo/${this.$route.params.numero}/comentario/${this.comentario.id}`
      axios
        .post(url, {
          usuarioId: this.$store.state.usuario.id,
          obraId: this.comentario.obraId,
          capituloId: this.comentario.capituloId,
          conteudo: this.responder,
          comentarioId: this.comentario.id,
        })
        .then(() => {
          this.$toast.success('Seu comentário foi salvo')
          this.responder = null
          ;(this.panel = null), this.getResposta()
        })
        .catch(showError)
    },

    getResposta() {
      const url = ` ${baseApiUrl}/obra/${this.$route.params.obraId}/capitulo/${this.$route.params.numero}/comentario/${this.comentario.id}`
      axios.get(url).then(res => (this.respostas = res.data))
    },

    open() {
      this.panel = 0
    },

    cancelar() {
      this.panel = null
      this.responder = null
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

.v-item-group .v-expansion-panels .v-expansion-panel {
  box-shadow: none;
  -webkit-box-shadow: none;
  background-color: inherit;
}

.theme--light.v-expansion-panels .v-expansion-panel {
  background-color: inherit;
}
</style>
