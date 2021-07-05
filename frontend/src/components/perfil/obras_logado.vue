<template>
  <v-card flat min-height="300px">
    <v-row>
      <v-col cols="8">
        <i class="display-1 font-weight-light mb-4 text--primary">Minhas Obras</i>
        <div v-for="item in filterShipp" :key="item.id">
          <ItemObra :item="item"> </ItemObra>
        </div>
      </v-col>
      <v-col>
         <i class="display-1 font-weight-light mb-4 text--primary">Lista</i>
         
  <div  v-for="shipp in shippObras" :key="shipp.id">

 

  <v-select
          v-model="e6"
          :items="shipp.nome"
          :menu-props="{ maxHeight: '400' }"
          label="Select"
          multiple
          hint="Pick your favorite states"
          persistent-hint
        ></v-select>

         </div>
          

<!--  
                       <v-list>
              <v-list-item-group>
                <v-list-item v-for="shipp in shippObras" :key="shipp.id">
                  <v-list-item-content>
                    <v-list-item-title  @click="search = shipp.id"> {{shipp.nome}} ({{shipp.shippCount}})  </v-list-item-title>
                     
                  </v-list-item-content>
                  
                </v-list-item>

                <v-list-item >
                  <v-list-item-content>
                    <v-list-item-title  @click="search = ''"> Todas as Obras  </v-list-item-title>
                     
                  </v-list-item-content>
                  
                </v-list-item>
              </v-list-item-group>
              
            </v-list>
           -->
      
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import ItemObra from './ItemObra'
import axios from "axios";
import { baseApiUrl } from "../../global";
export default {
  name: "obrasPerfil",
  components: { ItemObra },
  data() {
    return {
      e6: [],
      obras: [],
      shippObras: [],
      search: '',
    };
  },

  methods: {
    getObrasPerfil() {
      const url = ` ${baseApiUrl}/perfil/${this.usuario.id}/obras`;
      axios(url).then(res => {
        this.obras = this.obras.concat(res.data);
      });
    },
    getObrasPerfilShipp() {
      const url = ` ${baseApiUrl}/perfil/${this.usuario.id}/obras/shipp`;
      axios(url).then(res => {
        this.shippObras = this.shippObras.concat(res.data);
      });
    }
  },

  computed: {
     ...mapState(['usuario']),
    filterShipp() {
      if(this.search==='') {
        return this.obras
      } else {
        const a = this.obras.filter(e => {
        return e.shippId === this.search;
      });
      return a;
      }
      
    }
    },

  mounted() {
    this.getObrasPerfil()
    this.getObrasPerfilShipp()
  }
};
</script>

<style>
</style>