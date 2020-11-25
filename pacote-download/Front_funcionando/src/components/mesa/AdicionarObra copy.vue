<template>
  <v-card>
    <v-container fluid>
      <v-row>
        <v-col>
          <h1 class="display-1 font-weight-light mb-4">
            <i>
              <v-icon x-large class="pa-3">mdi-plus-box</v-icon>Adicionar Obra
            </i>
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8">
          <v-text-field outlined value label="Título"></v-text-field>
          <v-textarea outlined auto-grow label="Sinopse"></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-autocomplete
            v-model="friends"
            :items="categorias"
            outlined
            hint
            color="blue-grey lighten-2"
            label="Categorias"
            item-text="name"
            item-value="name"
            multiple
          >
            <template v-slot:selection="data">
              <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click="data.select"
                @click:close="remove(data.item)"
              >{{ data.item.id }}</v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
              </template>
              <template v-else>
                <v-list-item-content>
                  <v-list-item-title v-html="data.item.name"></v-list-item-title>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="4">
          <v-autocomplete
            v-model="friends"
            :items="list"
            outlined
            color="blue-grey lighten-2"
            label="Universos"
            item-text="nome"
            item-value="nome"
            multiple
          >
            <template v-slot:selection="data">
              <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click="data.select.id = search"
                @click:close="remove(data.item)"
              >{{ data.item.nome }}</v-chip>
            </template>
            <template v-slot:item="data">
             
              <template >
                <v-list-item-content>
                  <v-list-item-title v-html="data.item.nome"></v-list-item-title>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      autoUpdate: true,
      friends: [],
      search: [],

      name: "Midnight Crew",
      categorias: [
        { name: "Animes e Mangás", id: 1 },
        { name: "Bandas", id: 2 },
        { name: "Cartoons" , id: 3 },
        { name: "Celebridades", id: 4 },

        { name: "Filmes", id: 5 },
        { name: "Games ", id: 6 },
        { name: "Livros e HQs", id: 7 },
        { name: "Obras Originais", id: 8 },
        { name: "Séries e TV", id: 9 }
      ],

      universos: [
        {nome:'teste 1', categoria: 1},
        {nome:'teste 2', categoria: 1},
        {nome:'teste 3', categoria: 2},
        {nome:'teste 4', categoria: 3},
        {nome:'teste 5', categoria: 1},
        {nome:'teste 6', categoria: 4},
        {nome:'teste 7', categoria: 4},
        {nome:'teste 8', categoria: 5},
        {nome:'teste 9', categoria: 5},
        {nome:'teste 10', categoria: 5},
        {nome:'teste 11', categoria: 6},
        {nome:'teste 12', categoria: 7},
        {nome:'teste 13', categoria: 7},
        {nome:'teste 14', categoria: 8},
        {nome:'teste 16', categoria: 9},
        {nome:'teste 18', categoria: 2},
      ]
    };
  },

  methods: {
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    }
  },

  computed: {
    list() {
     
      const a = this.universos.filter(e => {
        return e.categoria === this.search
      })
      return a
    }
  }
};
</script>

<style>
</style>