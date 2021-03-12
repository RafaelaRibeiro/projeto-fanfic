<template>
  <v-card class="conexoes" min-height="250" min-width="250px">
    <v-row>
      <v-col>
        <v-card class="banner-conexoes">
          <v-img height="90px" :src="item.banner"> </v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-center" cols="12">
        <!-- <router-link class="mb-3" :to="{ name: 'perfil', params: { user: item.user } }">
          <v-avatar class="avatar-conexoes" color="white" size="75">
            <v-img :src="item.perfil"></v-img>
          </v-avatar>
        </router-link> -->

        <a :href="$router.resolve({ name: 'perfil', params: { user: item.user } }).href">
          <v-avatar class="avatar-conexoes" color="white" size="75"> <v-img :src="item.perfil"></v-img> </v-avatar
        ></a>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-center" cols="12">
        <!-- <router-link class="mb-3" :to="{ name: 'perfil', params: { user: item.user } }">
          <span class="md-subheading font-weight-medium">{{ item.nome }}</span>
          
        </router-link> -->

        <a :href="$router.resolve({ name: 'perfil', params: { user: item.user } }).href"
          ><span class="md-subheading font-weight-medium">{{ item.nome }}</span></a
        >
        <p class="text--primary">
          @{{ item.user }} <v-chip x-small v-if="conexao.bFId" color="deep-purple lighten-4">Segue Você </v-chip>
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center" cols="12" v-if="$store.state.usuario.id !== item.id">
        <v-btn v-if="!conexao.aFId" dark color="deep-purple darken-4" small class="mx-4">
          <v-icon small left>mdi-account-plus</v-icon>
          Seguir
        </v-btn>

        <v-hover v-else v-slot="{ hover }">
          <v-card flat>
            <v-btn v-if="!hover" dark color="teal darken-4" small width="170" class="mx-4">
              <v-icon small left>mdi-account-check</v-icon>
              Seguindo
            </v-btn>
            <v-btn v-if="hover" dark color="red darken-4" width="170" small class="mx-4">
              <v-icon small left>mdi-account-remove</v-icon>
              Deixar de seguir
            </v-btn>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
export default {
  name: 'itemConexoes',
  props: ['item'],
  data() {
    return {
      followingId: [],
      conexao: {},
    }
  },

  methods: {
    getFollow() {
      const url = `${baseApiUrl}/perfil/${this.$store.state.usuario.id}/conexao/${this.$route.params.user}`
      axios.get(url).then((res) => {
        this.conexao = res.data
      })
    },
  },

  mounted() {
    this.getFollow()
  },
}
</script>

<style>
.banner-conexoes {
  padding: 0;
  margin-top: -0.7rem;
}

.avatar-conexoes {
  margin-top: -4rem;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.3);
  display: inline-block;
  position: relative;
}
</style>