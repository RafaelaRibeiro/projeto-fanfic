<template>
  <v-row>
    <v-col cols="8">
      <p v-if="!edit">{{nota.conteudo}}</p>
      <v-textarea
        v-else
        v-model="nota.conteudo"
        rows="2"
        auto-grow
        counter="255"
        maxlength="255"
        color="purple darken-4"
      />
    </v-col>

    <v-col v-if="!edit">
      <v-btn text @click.prevent="edit=!edit">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn text @click="remove">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-col>

    <v-col v-else>
      <v-btn text v-if="edit" @click="save">
        <v-icon>mdi-floppy</v-icon>
      </v-btn>
      <v-btn text v-if="edit" @click.prevent="edit=!edit">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-col>
  </v-row>

  <!-- <v-col>
        <b-btn size="sm" variant="light" v-b-tooltip.hover title="Editar Nota">
          <v-icon left color="purple darken-4">mdi-pencil</v-icon>
        </b-btn>
        <b-btn size="sm" variant="light" v-b-tooltip.hover title="Deletar Nota">
          <v-icon left color="purple darken-4">mdi-delete</v-icon>
        </b-btn>
  </v-col>-->
</template>

<script>
import { mapState } from 'vuex'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
export default {
  name: 'itemNotas',
  props: ['nota'],
  computed: { ...mapState(['usuario']) },
  data() {
    return {
      edit: false,
    }
  },

  methods: {
    save() {
      this.nota.usuarioId = this.usuarioId
      axios['put'](`${baseApiUrl}/${this.usuario.id}/mesa/notas/${this.nota.id}`, {
        conteudo: this.nota.conteudo,
        usuarioId: this.usuario.id,
      })
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.edit = false
        })
        .catch(showError)
    },

    remove() {
      axios
        .delete(`${baseApiUrl}/${this.usuario.id}/mesa/notas/${this.nota.id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.getNotas()
        })
        .catch(showError)
    },

    getNotas() {
      const url = ` ${baseApiUrl}/${this.usuario.user}/notas`
      axios(url).then(res => {
        this.nota = res.data
      })
    },
  },
}
</script>

<style>
</style>