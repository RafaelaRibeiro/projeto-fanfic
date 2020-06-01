<template>
  <div class="item-estante">
    <v-card outlined class="d-flex align-center mb-4">
      <v-expand-x-transition>
        <v-checkbox v-show="expand=expNovo" color="indigo darken-3" :input-value="checkNovo" value></v-checkbox>
      </v-expand-x-transition>

      <v-card flat class="d-flex ma-2">
        <v-avatar size="100" tile class="d-none d-sm-block">
          <v-img v-if="item.capa " :src="item.capa"></v-img>
          <v-img v-else src="@/assets/sem_imagem.jpg"></v-img>
        </v-avatar>
      </v-card>

      <v-card flat>
        <v-card-title>
          <router-link :to="{ name: 'ObraById', params: { obraId: item.obraId } }">
            {{item.nome}}
           
          </router-link>
        </v-card-title>
        <v-card-text class="d-flex flex-column font-weight-regular text--primary">
          <div>
            <a style="color:black" v-if="item.prateleira===1">{{primeiraLinha}}</a>
            <span v-else>{{primeiraLinha}}</span>
          </div>

          <a style="color:black" v-if="item.prateleira===1">{{segundaLinha}}</a>
          <span v-else>{{segundaLinha}}</span>
          <p>{{terminada}}</p>
        </v-card-text>
      </v-card>

      <!-- <v-col cols="1">
        <v-menu  left offset-x>
          <template v-slot:activator="{ on }">
              
            <v-btn   v-on="on" class="mx-1" fab dark small color="purple darken-4" depressed>
              <v-icon  dark>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item link dense v-for="item in menu" :key="item.title">
              
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>-->
    </v-card>

    <!-- <v-checkbox v-model="item.terminada" :value="item.terminada"></v-checkbox> -->
  </div>
</template>

<script>
export default {
  name: 'ItemEstante',
  props: ['item'],
  data() {
    return {
      menu: [
        { id: 1, title: 'Remover da Prateleira' },
        { id: 1, title: 'Marcar como Lida' },
        { id: 1, title: 'Marcar como Predileto' },
      ],
    }
  },

  computed: {
    primeiraLinha() {
      if (this.item.prateleiraId === 1) {
        // return `Ultimo Capítulo Lido: ${this.item.ultimo} `;
        return 'Ultimo Capítulo Lido'
      } else if (this.item.prateleiraId === 2 || this.item.prateleiraId === 4) {
        return `Total de Capítulos: ${this.item.totalCapitulos} `
      } else {
        return ''
      }
    },
    segundaLinha() {
      if (this.item.prateleira === 1) {
        return `Próximo Capítulo: ${this.item.proximo} `
      } else if (this.item.prateleira === 2 || this.item.prateleira === 4) {
        return `Total de Palavras: ${this.item.totalPalavras} `
      } else {
        return ''
      }
    },

    terminada() {
      if (this.item.prateleira !== 3) {
        if (this.item.terminada === false) {
          return 'Terminada: Não'
        } else {
          return 'Terminada: Sim'
        }
      } else {
        return ''
      }
    },
    expNovo() {
      return this.$store.state.expandir
    },
    checkNovo() {
      return this.$store.state.checkTodos
    },
    intermed: {
      get() {
        return this.$store.state.intermediario
      },
      set(valor) {
        this.$store.commit('setIntermed', valor)
      },
    },
  },
}
</script>

<style >
/* .item-estante {
  border-radius: 8px;
  margin-bottom: 10px;
  background: #fff;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.item-estante-info a,
.item-estante-info a:hover {
  text-decoration: none;
  display: flex;
  align-items: flex-start;
  color: #000;
}

.item-estante-image img {
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.item-estante-info {
  display: flex;
  align-self: stretch;
  flex-direction: column;
} */
</style>