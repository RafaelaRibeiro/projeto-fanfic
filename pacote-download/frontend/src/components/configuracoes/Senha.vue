<template>
  <v-container fluid>
    <v-card-title>Alterar Senha</v-card-title>
    <v-row>
      <v-col cols="6">
         <md-field>
      <label>Password toggle</label>
      <md-input v-model="user.oldPassword" style="display:none" type="password"></md-input>
    </md-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
         <v-text-field v-model="user.newPassord" type="password" label="Nova Senha" color="purple darken-4" outlined></v-text-field>
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