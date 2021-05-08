<template>
    <b-container>
        <p>{{ toDoItem | json}}</p>
    </b-container>
</template>

<script>
export default {
  name: 'ToDoItem',
  props: {
    toDoItem: {
      type: Object,
      required: true
    }
  }
}
</script>
