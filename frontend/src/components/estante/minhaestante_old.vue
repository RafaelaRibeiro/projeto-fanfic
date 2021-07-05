<template>
  <div class="lista-fanfic">
    <h1 class="display-1 font-weight-light mb-4 " >
      <i>
        <v-icon x-large class="pa-3">{{icon}}</v-icon>Minha Estante
      </i>
    </h1>

    <v-card>
      <!-- <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" label="Pesquisar" single-line hide-details></v-text-field>
      </v-card-title> -->

      <v-container>
        <v-row>
          <v-col cols="6">
            <v-card flat color="purple darken-4" dark class="mb-3">
              <v-card-title>Acompanhando</v-card-title>
            </v-card> 
            <div v-for="item in lendo" :key="item.name">
              <ItemEstante :item="item"></ItemEstante>
            </div>
          </v-col>
          <v-col cols="6">
            <v-card flat  color="purple darken-4" dark class="mb-3">
              <v-card-title>Próximas Leituras</v-card-title>
            </v-card>
            <div v-for="item in pretendo" :key="item.name">
              <ItemEstante :item="item"></ItemEstante>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import ItemEstante from "./ItemEstante";
export default {
  name: "ListaFanfic",
  components: { ItemEstante },

  data() {
    return {
      icon: "mdi-bookshelf",
      search: "",
      titulo: "Minha Estante",

      headers: [
        { text: "", value: "capa" },
        { text: "História", align: "left", value: "name" },
        { text: "Lido por último", align: "left", value: "ultimo" },
        { text: "Próximo Capítulo", align: "left", value: "proximo" }
      ],
      lendo: [
        {
          name: "História 1",
          ultimo: 10,
          proximo: 11,
          capa:
            "https://www.transformativeworks.org/wp-content/uploads/2020/02/twif-kraken-750x410.png",
          lista: 'lendo'
        },
        {
          name: "História 2",
          ultimo: 10,
          proximo: 11,
          capa:
            "https://cdn.vox-cdn.com/thumbor/rZjoZRISYTjG1eNX2vW9hfX-RYo=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/16022716/jbareham_190410_ply0862_ao3_stock_0001.jpg",
          lista: 'lendo'
        },
      ],
      pretendo : [
        {
          name: "História 3",
          ultimo: 10,
          proximo: 11,
          capa: "https://images.freeimages.com/images/large-previews/313/coffee-1559191.jpg",
          lista: 'pretendo'
        },
        {
          name: "História 4",
          ultimo: 10,
          proximo: 11,
          lista: 'pretendo'
        },
        {
          name: "História 5",
          ultimo: 10,
          proximo: 11,
          lista: 'pretendo'
        },
        {
          name: "História 6",
          ultimo: 10,
          proximo: 11,
          lista: 'pretendo'
        },
        {
          name: "História 7",
          ultimo: 10,
          proximo: 11
        },
        {
          name: "História 8",
          ultimo: 10,
          proximo: 11,
          lista: 'pretendo'
        },
        {
          name: "História 9",
          ultimo: 10,
          proximo: 11,
          lista: 'pretendo'
        },
        {
          name: "História 10",
          ultimo: 10,
          proximo: 11,
          lista: 'pretendo'
        }
      ]
    };
  }
};
</script>

<style>
.text-start {
  width: 60px;
}
</style>
