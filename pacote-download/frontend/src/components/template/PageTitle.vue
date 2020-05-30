<template>
  <div class="page-title">
      <h1>  <i v-if="icon" :class="icon" > {{ main}} </i> </h1>
  </div>
</template>

<script>
export default {
      name: 'PageTitle',
    props: ['icon','main']

}
</script>

<style>
.page-title h1 {
        margin:  0px;
        
    }

    
</style>