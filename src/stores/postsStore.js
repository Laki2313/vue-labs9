import { defineStore } from 'pinia'

export const usePostsStore = defineStore('postsStore', {
  state: () => ({
    items: [],
    isLoading: false,
    error: null,
    page: 1,
    limit: 5,
    query: ''
  }),

  getters: {
    filteredItems(state) {
      if (!state.query) return state.items

      return state.items.filter(item =>
        item.title.toLowerCase().includes(state.query.toLowerCase())
      )
    }
  },

  actions: {
    async fetchItems() {
      this.isLoading = true
      this.error = null

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${this.page}&_limit=${this.limit}`
        )

        if (!response.ok) {
          throw new Error('Помилка завантаження')
        }

        const data = await response.json()
        this.items = data

      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    }
  }
})