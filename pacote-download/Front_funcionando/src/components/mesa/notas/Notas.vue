<template>
  <v-card>
    <v-row>
      <v-col>
        <h1 class="display-1 font-weight-light mb-2">
          <i>
            <v-icon x-large class="pa-3">mdi-pencil-box-multiple</v-icon>Minhas Notas
          </i>
        </h1>
      </v-col>
    </v-row>

    <v-row class="ma-2">
      <v-col>
        <ol>
          <li v-for="nota in notas" :key="nota.id">
            <div>
              <ItemNotas :nota="nota"></ItemNotas>
            </div>
          </li>
        </ol>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import { baseApiUrl } from '@/global'
import axios from 'axios'
import ItemNotas from './ItemNotas'
export default {
  name: 'Notas',
  components: { ItemNotas },
  data() {
    return {
      edit: false,
      notas: [],
      notabyId: {},
      nota: {},
    }
  },
  methods: {
    getNotas() {
      const url = ` ${baseApiUrl}/${this.usuario.user}/notas`
      axios(url).then(res => {
        this.notas = res.data
      })
    },
  },

  // watch: {
  //   notas() {
  //     this.getNotas()
  //   },
  // },

  computed: { ...mapState(['usuario']) },
  mounted() {
    this.getNotas()
  },
}
</script>

<style>
</style>