<template>
  <v-container>
    <v-card-title>Minhas Imagens</v-card-title>
    <v-row class="ml-2 mb-0">
      <v-col cols="12" md="5">
        <v-card-title>Perfil</v-card-title>
        <v-row class="altura">
          <v-col>
            <v-avatar size="160" tile class="mb-3">
              <img v-if="url" :src="url" />
              <v-img v-else :src="usuario.imagePerfil"></v-img>
            </v-avatar>
          </v-col>
        </v-row>
        <v-row class="ml-2 mb-0" no-gutters>
          <v-col>
            <v-btn small color="primary">Alterar</v-btn>
            <v-file-input show-size counter multiple label="File input" @change="onFileChange"></v-file-input>
            <!-- <input type="file" @change="onFileChange" /> -->
            <!-- <md-file v-model="single" /> -->
            <b-form-file id="file-small" size="sm" @change="onFileChange"></b-form-file>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="5">
        <v-card-title>Banner</v-card-title>
        <v-row class="altura">
          <v-col>
            <v-img :src="usuario.imageBanner"></v-img>
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
  data() {
    return {
      url: null,
    }
  },

  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      this.url = URL.createObjectURL(file)
    },
  },
}
</script>

<style>
.altura {
  height: 220px;
}
</style>