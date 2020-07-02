<template>
  <v-container>
    <v-card-title>Minhas Imagens</v-card-title>
    <v-row class="ml-2 mb-0">
      <v-col cols="12" md="5">
        <v-card-title>Perfil</v-card-title>
        <v-row>
          <v-col>
            <v-avatar size="150" tile class="mb-3">
              <v-img :src="usuario.imagemPerfil"></v-img>
            </v-avatar>
          </v-col>
        </v-row>
        <v-row class="ml-2 mb-0" no-gutters>
          <v-col>
            <v-btn small color="primary">Alterar</v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="5">
        <v-card-title>Banner</v-card-title>
        <v-row>
          <v-col>
            <v-img :src="usuario.imagemCapa"></v-img>
          </v-col>
        </v-row>
        <v-row class="ml-2 mb-0" no-gutters>
          <v-col>
            <v-btn small color="primary">Alterar</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Imagens',
  props: ['usuario'],
}
</script>

<style>
</style>