<template>
  <v-row>
    <v-col cols="8">
      <p
        style="white-space: pre-line"
        class="text--primary text-justify"
        v-if="!edit"
      >{{nota.conteudo}}</p>
      <v-textarea
        v-else
        v-model="nota.conteudo"
        rows="2"
        auto-grow
        outlined
        counter="255"
        maxlength="255"
        color="purple darken-4"
      />
    </v-col>

    <v-col v-if="!edit">
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <md-list class="md-dense">
          <md-list-item>
            <v-btn text @click.prevent="edit=!edit">
              <v-icon small left>mdi-pencil</v-icon>
              <span class="md-list-item-text">Editar Nota</span>
            </v-btn>
          </md-list-item>

          <md-list-item>
            <v-btn text @click="remove">
              <v-icon small left>mdi-delete</v-icon>
              <span class="md-list-item-text">Deletar Nota</span>
            </v-btn>
          </md-list-item>
        </md-list>
      </v-menu>
      <!-- <v-btn text @click.prevent="edit=!edit">
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
      </v-btn>-->
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
  watch: {
    notas() {
      this.getNotas()
    },
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