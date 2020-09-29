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
            <v-btn v-show="!url" small color="primary" @click.native="openFileDialog">Alterar</v-btn>
            <v-btn v-show="url" small color="primary" @click="savePerfil">Salvar</v-btn>

            <!-- <input type="file" id="file-upload" style="display: none" @change="onFileChange" /> -->
            <b-form-file
              v-model="imagemPerfil"
              id="file-upload"
              accept="image/jpeg, image/png, image/bmp"
              style="display: none"
              @change="onFileChange"
            ></b-form-file>
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
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
export default {
  name: 'Imagens',
  props: ['usuario'],
  data() {
    return {
      url: null,
      imagemPerfil: [],
    }
  },

  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      this.url = URL.createObjectURL(file)
    },
    openFileDialog() {
      document.getElementById('file-upload').click()
    },

    savePerfil() {
      var fd = new FormData()
      fd.append('file', this.imagemPerfil)
      axios
        .post(`${baseApiUrl}/perfil/1/upload`, fd)
        .then(() => {
          this.$toasted.global.defaultSuccess()
        })
        .catch(showError)
    },
  },
}
</script>

<style>
.altura {
  height: 220px;
}
</style>