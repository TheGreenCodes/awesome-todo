<template>
  <div class="home">
    <h2>Welcome to TheGreenCodes awesome to-do list</h2>
    <div class="container">
      <b-card class="list-container">
        <h4 v-if="todoItems.length < 1" class="empty-list">
          You have no existing todo!
        </h4>
        <div v-else>
          <b-list-group>
            <b-list-group-item
              v-for="(item, index) in todoItems"
              :key="index"
              data-test="todos"
            >
              <h5 class="d-flex justify-start">
                {{ item.title }}
              </h5>

              <article class="d-flex justify-start">
                {{ item.content }}
              </article>
            </b-list-group-item>
          </b-list-group>
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
