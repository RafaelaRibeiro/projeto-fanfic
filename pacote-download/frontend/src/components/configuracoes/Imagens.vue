<template>
  <v-container>
    <v-card-title>Minhas Imagens</v-card-title>
    <v-row class="ml-2 mb-0">
      <v-col cols="12" md="5">
        <v-card-title>Perfil</v-card-title>
        <v-row class="altura">
          <v-col>
            <v-avatar size="160" tile class="mb-3">
              <img v-if="urlPerfil" :src="urlPerfil" />
              <v-img v-else :src="usuario.imagePerfil" ></v-img>
            </v-avatar>
          </v-col>
        </v-row>
        <v-row class="ml-2 mb-0" no-gutters>
          <v-col>
            <v-btn v-show="!urlPerfil" small color="primary" @click.native="openFileDialogPerfil">Alterar</v-btn>
            <v-btn v-show="urlPerfil" small color="primary" @click="savePerfil">Salvar</v-btn>

            <!-- <input type="file" id="file-upload" style="display: none" @change="onFileChange" /> -->
            <b-form-file
              v-model="imagemPerfil"
              id="file-upload-perfil"
              accept="image/jpeg, image/png, image/bmp"
              style="display: none"
              @change="onFileChangePerfil"
            ></b-form-file>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="5">
        <v-card-title>Banner</v-card-title>
        <v-row class="altura">
          <v-col>
          <img v-if="urlBanner" :src="urlBanner" />
              <v-img v-else :src="usuario.imageBanner"></v-img>
          </v-col>
        </v-row>
        <v-row class="ml-2 mb-0" no-gutters>
          <v-col>
            <v-btn v-show="!urlBanner" small color="primary" @click.native="openFileDialogBanner">Alterar</v-btn>
            <v-btn v-show="urlBanner" small color="primary" @click="saveBanner">Salvar</v-btn>

            <!-- <input type="file" id="file-upload" style="display: none" @change="onFileChange" /> -->
            <b-form-file
              v-model="imagemBanner"
              id="file-upload-banner"
              accept="image/jpeg, image/png, image/bmp"
              style="display: none"
              @change="onFileChangeBanner"
            ></b-form-file>
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
      urlPerfil: null,
      urlBanner: null,
      imagemPerfil: [],
      imagemBanner: [],
    }
  },

  methods: {
    onFileChangePerfil(e) {
      const file = e.target.files[0]
      this.urlPerfil = URL.createObjectURL(file)
    },
     onFileChangeBanner(e) {
      const file = e.target.files[0]
      this.urlBanner = URL.createObjectURL(file)
    },
    openFileDialogPerfil() {
      document.getElementById('file-upload-perfil').click()
    },
     openFileDialogBanner() {
      document.getElementById('file-upload-banner').click()
    },

    savePerfil() {
      var fd = new FormData()
      fd.append('file', this.imagemPerfil)

      // const options = {
      //   onUploadProgress: (progressEvent) => {
      
      //   let percent = parseInt(Math.round(progressEvent.loaded/progressEvent.total*100))
       
      //   // eslint-disable-next-line no-console
      //   console.log( `${progressEvent.loaded}kb of ${progressEvent.total}kb | ${percent}%` );
        
      //   }
      // }
      axios
        .post(`${baseApiUrl}/perfil/1/upload`, fd)
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(res)
          this.$toasted.global.defaultSuccess()
        })
        .catch(showError)
    },
    saveBanner() {
      var fd = new FormData()
      fd.append('file', this.imagemBanner)
      axios
        .post(`${baseApiUrl}/banner/1/upload`, fd)
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