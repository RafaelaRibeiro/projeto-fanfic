<template>
  <div>
    <v-card class="px-5 text--primary text-justify" color="deep-purple lighten-5" flat outlined>
      <v-row>
        <v-col cols="12" md="1" class="mr-3 mt-3">
          <v-avatar size="75">
            <v-img v-if="comentario.path" :src="comentario.path"></v-img>
            <v-img v-else src="@/assets/profile.png"></v-img>
          </v-avatar>
        </v-col>
        <v-col>
          <v-row>
            <v-col>
              <span class="md-body-2"> {{ comentario.nome }}</span>
            </v-col>

            <v-col class="d-flex justify-end md-caption">
              <i> Comentado em {{ comentario.dataComentario }} </i>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="10" class="d-flex flex-column">
              <span class="mb-4">{{ comentario.conteudo }}</span>
              <span>
                <v-btn color="deep-purple darken-4" text small> Responder </v-btn>
              </span>
            </v-col>
            <v-col>
              <v-btn v-show="edit" text small @click="edicao = !edicao">
                <v-icon color="deep-purple darken-4">mdi-pencil</v-icon>
                <md-tooltip md-direction="top">Editar</md-tooltip>
              </v-btn>
              <v-btn v-show="edit" text small>
                <v-icon color="deep-purple darken-4">mdi-delete</v-icon>
                <md-tooltip md-direction="top">Deletar</md-tooltip>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <!-- <v-row justify="center">
      <v-col>
        <v-card class="px-5 text--primary text-justify" color="deep-purple lighten-5" flat outlined>
          <v-row>
            <v-col cols="12" sm="6">
              <v-card-title class="subtitle-1 font-weight-bold">{{ comentario.nome }}</v-card-title>
            </v-col>
            <v-col cols="12" sm="6">
              <v-card-subtitle class="d-flex justify-end">
                <i> Comentado em {{ comentario.dataComentario }} </i>
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="2">
              <v-avatar size="108" tile>
                <v-img v-if="comentario.path" :src="comentario.path"></v-img>
                <v-img v-else src="@/assets/profile.png"></v-img>
              </v-avatar>
            </v-col>
            <v-col>
              <p v-if="edicao">
                <v-textarea
                  v-model="comentario.conteudo"
                  color="deep-purple darken-4"
                  class="text-justfy"
                  outlined
                  auto-grow
                ></v-textarea>
                <v-btn tile large dark color="deep-purple darken-4" @click="edicao = false" depressed
                  >Salvar Comentário</v-btn
                >
              </p>

              <p v-else>{{ comentario.conteudo }}</p>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="d-flex justify-end">
              <v-btn v-show="edit" text small @click="edicao = !edicao">
                <v-icon color="deep-purple darken-4">mdi-pencil</v-icon>
                <md-tooltip md-direction="top">Editar</md-tooltip>
              </v-btn>
              <v-btn v-show="edit" text small>
                <v-icon color="deep-purple darken-4">mdi-delete</v-icon>
                <md-tooltip md-direction="top">Deletar</md-tooltip>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row> -->

    <!-- <v-row justify="end">
      <v-col cols="11">
        <v-card class="px-5 text--primary text-justify" color="blue lighten-5" flat outlined>
          <v-row>
            <v-col cols="12" sm="6">
              <v-card-title class="subtitle-1 font-weight-bold">{{ comentario.nome }}</v-card-title>
            </v-col>
            <v-col cols="12" sm="6">
              <v-card-subtitle class="d-flex justify-end">
                <i> Comentado em {{ comentario.dataComentario }} </i>
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="2">
              <v-avatar size="108" tile>
                <v-img v-if="comentario.path" :src="comentario.path"></v-img>
                <v-img v-else src="@/assets/profile.png"></v-img>
              </v-avatar>
            </v-col>
            <v-col>
              <p v-if="edicao">
                <v-textarea
                  v-model="comentario.conteudo"
                  color="deep-purple darken-4"
                  class="text-justfy"
                  outlined
                  auto-grow
                ></v-textarea>
                <v-btn tile large dark color="deep-purple darken-4" @click="edicao = false" depressed
                  >Salvar Comentário</v-btn
                >
              </p>

              <p v-else>{{ comentario.conteudo }}</p>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="d-flex justify-end">
              <v-btn v-show="edit" text small @click="edicao = !edicao">
                <v-icon color="blue darken-4">mdi-pencil</v-icon>
                <md-tooltip md-direction="top">Editar</md-tooltip>
              </v-btn>
              <v-btn v-show="edit" text small>
                <v-icon color="blue darken-4">mdi-delete</v-icon>
                <md-tooltip md-direction="top">Deletar</md-tooltip>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ItemComentarios',
  props: ['comentario'],
  data() {
    return {
      edicao: false,
    }
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
}
</script>

<style>
</style>