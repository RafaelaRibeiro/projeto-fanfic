<template>
  <div v-if="isMenuVisible" class="header">
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp"
      app>
       <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 700px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Fanfics</span>
      </v-toolbar-title>

      <v-flex align-center layout py-2>
        <v-text-field class="mr-4 purple-input" label="Pesquisar..." hide-details color="purple" />

        <v-btn icon class="mr-3">
          <v-icon>mdi-apps</v-icon>
        </v-btn>

        <v-btn icon class="mr-3">
          <v-badge color="error" overlap>
            <template slot="badge">{{ notifications.length }}</template>
            <v-icon color="tertiary">mdi-bell</v-icon>
          </v-badge>
        </v-btn>

          
      </v-flex>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Header",
  computed: mapState(['isMenuVisible']), 
    min: {
      get() {
        return this.$store.state.drawer;
      },
      set(valor) {
        this.$store.commit("setDrawer", valor);
      }
    }
  ,
  data() {
    return {
      
      drawer: null,
      notifications: [
        "Mike, John responded to your email",
        "You have 5 new tasks",
        "You're now a friend with Andrew",
        "Another Notification",
        "Another One"
      ]
    };
  }
};
</script>

<style>
</style>