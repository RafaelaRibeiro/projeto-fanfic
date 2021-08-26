<template>
  <v-card flat>
    <v-container fluid>
      <v-row>
        <v-col>
          <h4 class="font-weight-light pa-2">
            <v-icon x-large class="pa-3">mdi-magnify</v-icon>Pesquisar
          </h4>
        </v-col>
      </v-row>
      <v-row class="my-5 ">
        <v-col cols="12">
          <v-card class="deep-purple lighten-5 ">
            <v-row>
              <v-col cols="12">
                <h5 class="font-weight-light pa-2">Sobre a Obra</h5>
              </v-col>
            </v-row>
            <v-row class="mx-2 mb-n9">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="search.nome"
                  dense
                  label="Nome da Obra"
                  outlined
                  clearable
                  background-color="#FFF"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="search.autor"
                  dense
                  label="Autor"
                  outlined
                  clearable
                  background-color="#FFF"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mx-2 mb-n9">
              <v-col cols="12" md="6">
                <v-autocomplete
                  v-model="search.categoria"
                  :items="categorias"
                  :search-input.sync="searchCategoria"
                  label="Categoria"
                  item-text="nome"
                  item-value="id"
                  outlined
                  small-chips
                  clearable
                  hide-selected
                  dense
                  multiple
                  deletable-chips
                  @change="searchCategoria = ''"
                  background-color="#FFF"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6">
                <v-autocomplete
                  v-model="search.universo"
                  outlined
                  small-chips
                  clearable
                  hide-selected
                  dense
                  multiple
                  deletable-chips
                  label="Universo"
                  background-color="#FFF"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row class="mx-2 ">
              <v-col cols="12" md="4">
                <v-autocomplete
                  outlined
                  small-chips
                  clearable
                  hide-selected
                  dense
                  multiple
                  deletable-chips
                  label="Shipp Principal"
                  background-color="#FFF"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="4">
                <v-autocomplete
                  outlined
                  small-chips
                  clearable
                  hide-selected
                  dense
                  multiple
                  deletable-chips
                  label="Shipp Secundario"
                  background-color="#FFF"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="4">
                <v-autocomplete
                  outlined
                  small-chips
                  clearable
                  hide-selected
                  dense
                  multiple
                  deletable-chips
                  label="Não conter"
                  background-color="#FFF"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="my-5">
        <v-col>
          <v-card class="deep-purple lighten-5">
            <v-row>
              <v-col cols="12" md="7">
                <h5 class="font-weight-light pa-2">Caracteristicas da Obra</h5>
              </v-col>
            </v-row>
            <v-row class=" mt-n5">
              <v-col cols="12" md="7">
                <h6 class="font-weight-light pa-2">Temas</h6>
              </v-col>
            </v-row>
            <v-row class=" mt-n3 mx-3">
              <v-col>
                <v-checkbox
                  v-for="c in caracteristicas.slice(0, 4)"
                  :key="c.id"
                  dense
                  class="ma-0"
                  :label="c.nome"
                  :value="c.id"
                ></v-checkbox>
              </v-col>
              <v-col>
                <v-checkbox
                  v-for="c in caracteristicas.slice(4, 8)"
                  :key="c.id"
                  dense
                  class="ma-0"
                  :label="c.nome"
                  :value="c.id"
                ></v-checkbox>
              </v-col>
              <v-col>
                <v-checkbox
                  v-for="c in caracteristicas.slice(8, 12)"
                  :key="c.id"
                  dense
                  class="ma-0"
                  :label="c.nome"
                  :value="c.id"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="7">
                <h6 class="font-weight-light pa-2">Modalidades</h6>
              </v-col>
            </v-row>
            <v-row class=" mt-n3 mx-3">
              <v-col cols="4">
                <v-checkbox
                  v-for="m in modalidades.slice(0, 2)"
                  :key="m.id"
                  dense
                  class="ma-0"
                  :label="m.nome"
                  :value="m.id"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-for="m in modalidades.slice(2, 4)"
                  :key="m.id"
                  dense
                  class="ma-0"
                  :label="m.nome"
                  :value="m.id"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="7">
                <h6 class="font-weight-light pa-2">Classificação</h6>
              </v-col>
            </v-row>
            <v-row class=" mt-n3 mx-3">
              <v-col cols="4">
                <v-checkbox
                  v-for="classif in classificacao.slice(0, 2)"
                  :key="classif.cod"
                  dense
                  class="ma-0"
                  :value="classif.cod"
                >
                  <template v-slot:label>
                    <v-avatar class="ml-1" size="25" tile>
                      <img :src="classif.image" alt="Profile Image" />
                    </v-avatar>
                  </template>
                </v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-for="classif in classificacao.slice(2, 4)"
                  :key="classif.cod"
                  dense
                  class="ma-0"
                  :value="classif.cod"
                >
                  <template v-slot:label>
                    <v-avatar class="ml-1" size="25" tile>
                      <img :src="classif.image" alt="Profile Image" />
                    </v-avatar>
                  </template>
                </v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-for="classif in classificacao.slice(4, 6)"
                  :key="classif.cod"
                  dense
                  class="ma-0"
                  :value="classif.cod"
                  v-model="search.classificacao"
                >
                  <template v-slot:label>
                    <v-avatar class="ml-1" size="25" tile>
                      <img :src="classif.image" alt="Profile Image" />
                    </v-avatar>
                  </template>
                </v-checkbox>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="my-5">
        <v-col>
          <v-card class="deep-purple lighten-5">
            <v-row>
              <v-col cols="12" md="7">
                <h5 class="font-weight-light pa-2">Avisos</h5>
              </v-col>
            </v-row>
            <v-row class=" mt-n5">
              <v-col cols="12" md="7">
                <h6 class="font-weight-light pa-2">Conteúdos Sensíveis</h6>
              </v-col>
            </v-row>
            <v-row class=" mt-n3 mx-3">
              <v-col cols="4">
                <v-checkbox
                  v-for="aviso in avisos.slice(0, 5)"
                  :key="aviso.id"
                  dense
                  class="ma-0 "
                  :label="aviso.nome"
                  :value="aviso.id"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-for="aviso in avisos.slice(5, 10)"
                  :key="aviso.id"
                  dense
                  class="ma-0"
                  :label="aviso.nome"
                  :value="aviso.id"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-for="aviso in avisos.slice(10, 15)"
                  :key="aviso.id"
                  dense
                  class="ma-0 "
                  :label="aviso.nome"
                  :value="aviso.id"
                  input-value="true"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      {{ search }}
    </v-container>
  </v-card>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/global";
export default {
  name: "Search",
  data() {
    return {
      caracteristicas: [],
      avisos: [],
      modalidades: [],
      categorias: [],
      search: {
        classificacao: [],
      },
      searchCategoria: null,
      classificacao: [
        { nome: "Livre", cod: "livre", image: require("@/assets/livre.png") },
        {
          nome: "Acima de 10 Anos",
          cod: "10+",
          image: require("@/assets/10-anos.png"),
        },
        {
          nome: "Acima de 12 Anos",
          cod: "12+",
          image: require("@/assets/12-anos.png"),
        },
        {
          nome: "Acima de 14 Anos",
          cod: "14+",
          image: require("@/assets/14-anos.png"),
        },
        {
          nome: "Acima de 16 Anos",
          cod: "16+",
          image: require("@/assets/16-anos.png"),
        },
        {
          nome: "Acima de 18 Anos",
          cod: "18+",
          image: require("@/assets/18-anos.png"),
        },
      ],
    };
  },

  methods: {
    getCaracteristicas() {
      const url = ` ${baseApiUrl}/caracteristicas`;
      axios(url).then((res) => {
        this.caracteristicas = res.data;
      });
    },
    getModalidades() {
      const url = ` ${baseApiUrl}/modalidades`;
      axios(url).then((res) => {
        this.modalidades = res.data;
      });
    },
    getAvisos() {
      const url = ` ${baseApiUrl}/avisos`;
      axios(url).then((res) => {
        this.avisos = res.data;
      });
    },

    getCategorias() {
      const url = ` ${baseApiUrl}/categorias`;
      axios(url).then((res) => {
        this.categorias = res.data;
      });
    },
  },

  // computed: {
  //    classificacao() {
  //     let imagemClass = ''
  //     if (this.obras.classificacao === 'livre') return (imagemClass = require('@/assets/livre.png'))
  //     if (this.obras.classificacao === '10+') return (imagemClass = require('@/assets/10-anos.png'))
  //     if (this.obras.classificacao === '12+') return (imagemClass = require('@/assets/12-anos.png'))
  //     if (this.obras.classificacao === '14+') return (imagemClass = require('@/assets/14-anos.png'))
  //     if (this.obras.classificacao === '16+') return (imagemClass = require('@/assets/16-anos.png'))
  //     if (this.obras.classificacao === '18+') return (imagemClass = require('@/assets/18-anos.png'))

  //     return imagemClass
  //   },

  // },

  mounted() {
    this.getCaracteristicas();
    this.getModalidades();
    this.getAvisos();
    this.getCategorias();
  },
};
</script>

<style></style>
