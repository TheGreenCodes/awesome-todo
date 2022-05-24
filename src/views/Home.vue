<template>
  <div class="home">
    <h2>Welcome to TheGreenCodes awesome to-do list</h2>
    <div class="container">
      <b-card class="list-container">
        <h4 v-if="todoItems.length < 1">You have no existing todo!</h4>
        <div v-else>
          <ul class="list-group">
            <li
              v-for="(item, index) in todoItems"
              :key="index"
              data-test="todos"
              class="list-group-item"
            >
              <h5 class="d-flex justify-start">
                {{ item.title }}
              </h5>

              <article class="d-flex justify-start">
                {{ item.content }}
              </article>
            </li>
          </ul>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      todoItems: [],
      errorFound: null,
    };
  },
  created() {
    this.getToDoItems();
  },
  methods: {
    getToDoItems() {
      axios
        .get("todos/")
        .then((res) => {
          this.todoItems = res.data;
        })
        .catch((error) => {
          // console.log(error);
          this.errorFound = error;
        });
    },
  },
};
</script>

<style scoped>
.list-container {
  max-width: 170%;
}
</style>
