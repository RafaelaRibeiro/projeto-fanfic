<template>
  <v-row no-gutters class="loading">
    <v-col align-self="center" class="text-center" cols="12">
      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'loader',
  props: ['visible'],
}
</script>s
<style lang="scss">
.loading {
  height: 80vh;
}
</style>