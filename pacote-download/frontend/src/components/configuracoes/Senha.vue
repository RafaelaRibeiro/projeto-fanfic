<template>
  <v-container fluid>
    <v-card-title>Alterar Senha</v-card-title>
    <v-row>
      <v-col cols="6">
         <!-- <v-text-field v-model="user.oldPassword" autocomplete="new-password" label="Senha Atual" type="password" color="purple darken-4" outlined></v-text-field> -->

        
   
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
         <v-text-field v-model="user.newPassord" autocomplete="new-password"  label="Nova Senha" type="password" color="purple darken-4" outlined></v-text-field>
         <v-text-field v-model="user.confirmPassord" label="Confirmar Senha" color="purple darken-4" outlined></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Senha',
  props: ['usuario'],
  data(){
    return {
      user: {
        oldPassword: 'teste'
      }
    }
  }

}
</script>

<style>
</style>