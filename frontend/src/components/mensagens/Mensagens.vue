<template>
  <v-container v-if="visible" fluid class="mt-1">
    <Loading />
  </v-container>
  <v-card flat v-else min-height="500px">
    <v-container fluid>
      <v-row>
        <v-col>
          <h4 class="font-weight-light pa-2"><v-icon x-large class="pa-3">mdi-send</v-icon>Mensagens</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <v-card outlined>
            <v-navigation-drawer permanent>
              <v-list-item class="ma-3">
                <v-list-item-title
                  ><v-btn small block color="deep-purple darken-4" dark> Nova Mensagem</v-btn></v-list-item-title
                >
              </v-list-item>
              <v-divider></v-divider>
              <md-list class="md-dense pa-0 mb-2" v-for="item in items" :key="item.text">
                <md-list-item>
                  <v-icon class="pr-6">{{ item.icon }}</v-icon>
                  <span color="red" class="md-list-item-text">{{ item.text }}</span>
                </md-list-item>
              </md-list>
            </v-navigation-drawer>
          </v-card>
        </v-col>
        <v-col cols="12" md="9">
          <v-card outlined>
            Mensagens
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import Loading from '../template/Loading'
export default {
  name: 'Mensagens',
  components: { Loading },

  data() {
    return {
      visible: false,
      selectedItem: 0,
      items: [
        { text: 'Caixa de entrada', icon: 'mdi-email-newsletter' },
        { text: 'Enviados', icon: 'mdi-send' },
        { text: 'Favoritos', icon: 'mdi-star' },
        { text: 'Spam', icon: 'mdi-alert-octagon' },

        { text: 'Lixeira', icon: 'mdi-delete' },
      ],
    }
  },
}
</script>

<style></style>
