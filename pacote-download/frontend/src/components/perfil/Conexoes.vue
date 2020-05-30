<template>
  <div>
    <input type="file" @change="onFileSelected" >
    <button @click="save">Salvar</button>

    <img :src="usuarios.imagemPerfil" >
  </div>
</template>

<script>
import { baseApiUrl, showError } from "../../global";
import axios from "axios"
export default {
data() {
  return {
    selectedFile: null,
    usuarios: {}
  }
},
methods: {
  onFileSelected(event) {
    this.selectedFile = event.target.files[0]
  },
   save() {
        const fd = new FormData()
        fd.append('image', this.selectedFile, this.selectedFile,name)
      axios["post"](`${baseApiUrl}/perfil/${this.usuarios.user}`, this.usuarios.imagemPerfil)
        .then(() => {
          this.$toasted.global.defaultSuccess();
        })
        .catch(showError);
    },
}

}
</script>

<style>

</style>