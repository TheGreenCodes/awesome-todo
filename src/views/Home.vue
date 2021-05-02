<template>
  <div class="home">
    <h2>Welcome to TheGreenCodes awesome to-do list</h2>
    <div class="container">
      <b-card title="Card title" sub-title="Card subtitle" class="list-container">

      </b-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import ListContainer from '@/components/ListContainer.vue'

export default {
  name: 'Home',
  components: {
    // ListContainer
  }
}
</script>

<style scoped>
.list-container{
    max-width: 170%;
}
</style>
