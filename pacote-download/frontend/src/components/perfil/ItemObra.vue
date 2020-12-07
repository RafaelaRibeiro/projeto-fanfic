<template>
  <div class="item-estante">
    <v-card outlined class="d-flex align-center mb-4">
      <v-card flat class="d-flex ma-2">
        <v-avatar size="100" tile class="d-none d-sm-block">
          <v-img v-if="item.path" :src="item.path"></v-img>
          <v-img v-else src="@/assets/sem_imagem.jpg"></v-img>
        </v-avatar>
      </v-card>

      <v-card flat>
        <v-card-title>
          <router-link :to="{ name: 'ObraById', params: { obraId: item.obraId } }">
            {{ item.nome }}
          </router-link>
        </v-card-title>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ItemObra',
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
}
</script>

<style >
</style>