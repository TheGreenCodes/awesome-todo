<template>
  <div class="home">
    <h2>Welcome to TheGreenCodes awesome to-do list</h2>
    <div class="container">
      <b-card class="list-container">
        <h4 v-if="!todoItems">You have no existing todo!</h4>

      </b-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      todoItems: null
    }
  },
  created () {
    this.getToDoItems()
  },
  methods: {
    getToDoItems () {
      axios.get('https://my-json-server.typicode.com/TheGreenCodes/awesome-todo-database/todos')
        .then(res => {
          this.todoItems = res.data
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<style scoped>
.list-container{
    max-width: 170%;
}
</style>
