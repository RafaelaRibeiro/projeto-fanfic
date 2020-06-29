<template>
  <v-card color="#FFF" flat min-height="300px">
    <v-row justify="center">
      <v-col cols="7">
        <v-card-title class="display-1 font-weight-light mb-4">Sobre Mim</v-card-title>
        <v-card-text class="text-justify">{{usuario.sobreMim}}</v-card-text>
        
      </v-col>

      <v-col cols="4">
        <v-card-title class="display-1 font-weight-light mb-4">Minhas Redes</v-card-title>

        <v-btn icon class="ma-5" :href="'http://twitter.com/' + usuario.twitter" target="_blank">
          <v-avatar size="48px" item>
            <v-img src="@/assets/twitter.png" alt="twitter" />
          </v-avatar>
        </v-btn>
        <v-btn icon class="ma-5" :href="'http://facebook.com/' + usuario.facebook" target="_blank">
          <v-avatar size="48px" item>
            <v-img src="@/assets/facebook.png" alt="Facebook" />
          </v-avatar>
        </v-btn>
        <v-btn
          icon
          class="ma-5"
          :href="'http://instagram.com/' + usuario.instagram"
          target="_blank"
        >
          <v-avatar size="48px" item>
            <v-img src="@/assets/instagran.png" alt="Facebook" />
          </v-avatar>
        </v-btn>
        <v-btn
          icon
          class="ma-5"
          :href="'http://pinterest.com/' + usuario.pinterest"
          target="_blank"
        >
          <v-avatar size="48px" item>
            <v-img src="@/assets/pinterest.png" alt="Facebook" />
          </v-avatar>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'Sobre',
  props: ['usuario'],

  data() {
    return {
      editar: false,
    }
  },
}
</script>

<style>
.teste {
  font-family: 'arial';
}
</style>