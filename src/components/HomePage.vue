<template>
  <v-layout justify-center>
    <div class="todo">
      <v-layout>
      <v-text-field
          v-model="title"
          label="todo"
          />
      <v-btn @click="$store.dispatch('addTodo', { title }); title = ''">Add</v-btn>
      </v-layout>

      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <v-layout>
            <v-flex xs2 class="done" @click="$store.dispatch('doneTodo', todo.id)">✓</v-flex>
            <v-flex xs8 class="text-xs-left">{{todo.title}}</v-flex>
            <v-flex xs2 class="delete" @click="$store.dispatch('deleteTodo', todo.id)">✗</v-flex>
          </v-layout>
        </li>
      </ul>

      <ul>
        <li v-for="todo in doneTodos" :key="todo.id">
          <v-layout>
            <v-flex xs2></v-flex>
            <v-flex xs8 class="text-xs-left doned">{{todo.title}}</v-flex>
            <v-flex xs2 class="delete" @click="$store.dispatch('deleteTodo', todo.id)">✗</v-flex>
          </v-layout>
        </li>
      </ul>

      <p @click="$store.dispatch('deleteAccount', { router: $router })" class="deleteAccount">delete account</p>
    </div>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      title: ''
    }
  },

  computed: {
    todos() {
      return this.$store.state.todo.todos.filter(todo => !todo.done)
    },

    doneTodos() {
      return this.$store.state.todo.todos.filter(todo => todo.done)
    }
  },

  created() {
    this.$store.dispatch('validate', { router: this.$router })
    this.$store.dispatch('init')
  }
}
</script>

<style lang="stylus" scoped>
.todo {
  width: 300px;
}

li {
  list-style: none;
}

.done {
  cursor: pointer;
}

.delete {
  cursor: pointer;
}

.doned {
  text-decoration: line-through;
}

.deleteAccount {
  cursor: pointer;
  color: red;
}
</style>