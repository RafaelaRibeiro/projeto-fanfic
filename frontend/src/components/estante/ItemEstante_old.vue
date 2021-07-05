<template>
  <div class="item-estante">
    <v-row>
      <a>
        <div class="item-estante-image d-none d-sm-block">
          <img v-if="item.capa " :src="item.capa" height="80" width="107" alt="Article" />
          <img v-else src="@/assets/sem_imagem.jpg" height="80" width="107" alt="Article" />
        </div>
      </a>

      <div class="item-estante-info">
        <a > <h3>{{item.name}}</h3> </a>
        <a v-if="item.prateleira===1">{{primeiraLinha}}</a>
        <span v-else>{{primeiraLinha}}</span>
        <a v-if="item.prateleira===1" >{{segundaLinha}}</a>  
        <span v-else>{{segundaLinha}}</span>    
        <p> {{terminada}} </p>
      </div>
    </v-row>

    <template>
  <div class="item-estante">
    <v-container>
      <v-row dense>
        <v-col cols="2">
          <v-avatar size="100" tile class="d-none d-sm-block">
            <v-img v-if="item.capa " :src="item.capa"></v-img>
            <v-img v-else src="@/assets/sem_imagem.jpg"></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="9" class="item-estante-info ml-4  " >
          <h3 class="mb-2"  v-text="item.name"></h3>
          <a  style="color:#000" >{{primeiraLinha}}</a>
          <a style="color:#000" >{{segundaLinha}}</a>
          <p >{{terminada}}</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

    <!-- <v-checkbox v-model="item.terminada" :value="item.terminada"></v-checkbox> -->
  </div>
</template>

<script>
export default {
  name: "ItemEstante",
  props: ["item"],
  data() {
    return {
      teste: ""
    };
  },

  computed: {
    primeiraLinha() {
      if (this.item.prateleira === 1 ) {
        return `Ultimo Capítulo Lido: ${this.item.ultimo} `;
      } else if (this.item.prateleira ===2 || this.item.prateleira ===4) {
        return `Total de Capitutos: ${this.item.totalCapitulos} `
      } else {
        return ''
      }
    },
    segundaLinha() {
        if (this.item.prateleira === 1 ) {
        return `Próximo Capítulo: ${this.item.proximo} `;
      } else if (this.item.prateleira ===2 || this.item.prateleira ===4) {
        return `Total de Palavras: ${this.item.totalPalavras} `
      } else {
        return ''
      }
    },
    
    terminada() {
      if (this.item.prateleira!==3) {
        if (this.item.terminada === false) {
          return "Terminada: Não";
        } else {
          return "Terminada: Sim";
        }
      } else {
        return "";
      }
    },
   
  }
};
</script>

<style>
.item-estante {
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

.item-estante-image {
  padding: 0 18px;
  margin-right: 15;
}

.item-estante-image img {
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.item-estante-info {
  display: flex;
  align-self: stretch;
  flex-direction: column;
}
</style>