<template>
   <v-card>
                <v-toolbar dark color="primary">
                  <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Editar Perfil</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn dark text @click="dialog = false">Save</v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                
                
                
                   
              </v-card>
</template>

<script>
export default {
    data() {
        return {
            dialog: false
        }
    }

}
</script>

<style>

</style>