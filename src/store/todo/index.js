export default {
  state: {
    todos: []
  },

  mutations: {
    addTodo(state, { todo }) {
      state.todos.add(todo)
    }
  }
}
