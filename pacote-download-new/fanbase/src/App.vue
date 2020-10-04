<template>
  <v-app id="app">
    <Header />
    <Menu />
    <Content />
  </v-app>
</template>

<script>
import Menu from "./components/template/Menu";
import Header from "./components/template/Header";
import Content from "./components/template/Content";

export default {
  name: "App",

  components: {
    Header,
    Menu,

    Content,
  },

  data: () => ({
    //
  }),
};
</script>
