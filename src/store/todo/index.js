import Vue from 'vue'
import { http } from '../../http'

export default {
  state: {
    todos: []
  },

  mutations: {
    addTodos(state, { todos }) {
      state.todos = []
      todos.forEach(todo => state.todos.push(todo))
    },

    addTodo(state, { todo }) {
      state.todos.unshift(todo)
    },

    doneTodo(state, { id }) {
      let index = state.todos.findIndex(todo => todo.id == id)
      let todo = state.todos[index]
      if (todo != undefined) {
        todo.done = true
      }
      Vue.set(state.todos, index, todo)
    },

    deleteTodo(state, { id }) {
      state.todos = state.todos.filter(todo => todo.id != id)
    }
  },

  actions: {
    init({ commit }, todo) {
      http.get('/todos').then(res => {
        commit('addTodos', { todos: res.data })
      })
    },

    addTodo({ commit }, todo) {
      todo.done = false
      http.post('/todos', todo).then(res => {
        todo.id = res.data.id
        commit('addTodo', { todo })
      })
    },

    doneTodo({ commit, state }, id) {
      let todo = state.todos.find(todo => todo.id == id)
      http
        .put(`/todos/${id}`, Object.assign({}, todo, { done: true }))
        .then(res => {
          commit('doneTodo', { id })
        })
    },

    deleteTodo({ commit }, id) {
      http.delete(`/todos/${id}`, id).then(res => {
        commit('deleteTodo', { id })
      })
    }
  }
}
