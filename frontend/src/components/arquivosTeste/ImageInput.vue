<template>
  <div @click="launchFilePicker()">
    <slot name="activator"></slot>
    <input
      type="file"
      ref="file"
      :name="uploadFieldName"
      @change="onFileChange(          $event.target.name, $event.target.files)"
      style="display:none"
    />
    <v-dialog v-model="errorDialog" max-width="300">
      <v-card>
        <v-card-text class="subheading">{{errorText}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="errorDialog = false" flat>Got it!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import { baseApiUrl } from "../../global";
// import axios from "axios"
export default {
  props: {            value: Object   },
 data: ()=> ({      errorDialog: null,      errorText: '',      uploadFieldName: 'file',      maxSize: 1024    }),
 methods: {      
   launchFilePicker(){        
     this.$refs.file.click();      },

onFileChange(fieldName, file) {        
  const { maxSize } = this 
 let imageFile = file[0] 
         //check if user actually selected a file
         if (file.length>0) {
           let size = imageFile.size / maxSize / maxSize         
            if (!imageFile.type.match('image.*')) {   
              // check whether the upload is an image
              this.errorDialog = true 
              this.errorText = 'Please choose an image file' 
              } else if (size>1) { 
                // check whether the size is greater than the size limit
                this.errorDialog = true
                this.errorText = 'Your file is too big! Please select an image under 1MB'  
                } else { 
                  // Append file into FormData & turn file into image URL
                let formData = new FormData() 
                let imageURL = URL.createObjectURL(imageFile)
                formData.append(fieldName, imageFile)
                this.$emit('input', { formData, imageURL })          }        }      }    
                       
 }
}
</script>

<style>
</style>