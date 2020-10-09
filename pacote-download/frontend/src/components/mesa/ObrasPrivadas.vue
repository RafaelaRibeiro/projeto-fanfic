<template>
  <v-card flat>
    <v-row>
      <v-col>
        <h1 class="display-1 font-weight-light mb-4">
          <i>
            <v-icon x-large class="pa-3">mdi-lock</v-icon>Minhas Obras Privadas
          </i>
        </h1>
      </v-col>
    </v-row>
    <v-row class="ma-1">
      <v-col cols="8">
        <div v-for="item in obras" :key="item.id">
          <ItemObras :item="item"></ItemObras>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import ItemObras from "./ItemObras";
import { mapState } from "vuex";
import axios from "axios";
import { baseApiUrl } from "../../global";
export default {
  name: "obrasPrivadas",
  components: { ItemObras },
  computed: { ...mapState(["usuario"]) },
  data() {
    return {
      obras: []
    };
  },

  methods: {
    getObrasPrivadas() {
      const url = ` ${baseApiUrl}/${this.$store.state.usuario.user}/mesa/obrasprivadas`;
      axios(url).then(res => {
        this.obras = this.obras.concat(res.data);
      });
    }
  },
  mounted() {
    this.getObrasPrivadas();
  }
};
</script>

<style>
</style>