<template>
  <v-row
    :style="{
      backgroundImage: 'url(' + require('@/assets/resendToken.jpeg') + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'right',
    }"
    dense
    class="pt-15"
    justify="center"
  >
    <v-col cols="12" sm="5" class="text-center">
      <v-card flat max-width="460px">
        <v-row>
          <v-col>
            <span class="md-headline d-flex justify-center"> Olá, {{ usuario.nome }}!</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="md-headline d-flex justify-center"> Seu código de ativação expirou. </span>
          </v-col>
        </v-row>

        <v-row>
          <v-col> <span>Deseja receber um novo código de ativação?</span> </v-col>
        </v-row>

        <v-row>
          <v-col>
            <!-- <v-text-field
              dense
              v-model="usuario.email"
              label="E-mail"
              type="email"
              color="deep-purple darken-4"
              outlined
            ></v-text-field> -->
            <span> {{ usuario.email }} </span>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn block dark color="deep-purple darken-4" class="mr-3" elevation="4" @click="resendActived">Sim</v-btn>
          </v-col>
          <v-col>
            <v-btn block dark color="deep-purple darken-4" class="mr-3 mb-3" elevation="4">Não</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <v-col cols="6" class="mt-n2"> </v-col>
  </v-row>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, showError } from '../../global'
export default {
  name: 'ReenviarAtivacao',
  data() {
    return {
      usuario: {},
    }
  },
  methods: {
    getUserbyToken() {
      axios
        .get(`${baseApiUrl}/resendToken/${this.$route.params.token}`)
        .then((res) => {
          this.usuario = res.data
        })
        .catch(showError, this.$router.push({ path: `/login` }))
    },
    resendActived() {
      axios
        .put(`${baseApiUrl}/resendToken/${this.$route.params.token}`, {
          email: this.usuario.email,
        })
        .then(() => {
          this.$toast.success('E-mail enviado com sucesso')
        })
        .catch(showError)
    },
  },
  mounted() {
    this.getUserbyToken()
  },
}
</script>

<style>
</style>