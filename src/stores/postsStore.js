import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    items: [],
    isLoading: false,
    error: null,
    page: 1,
    limit: 5,
    query: '',
    requestId: 0
  }),

  getters: {
    filteredItems: (state) => {
      return state.items.filter(item =>
        item.title.toLowerCase().includes(state.query.toLowerCase())
      )
    }
  },

  actions: {
    async fetchItems() {
      const currentRequest = ++this.requestId

      this.isLoading = true
      this.error = null

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${this.page}&_limit=${this.limit}`
        )

        const data = await response.json()

        if (currentRequest !== this.requestId) return

        this.items = data
      } catch (err) {
        if (currentRequest !== this.requestId) return

        this.error = 'Помилка завантаження'
        this.items = []
      } finally {
        if (currentRequest === this.requestId) {
          this.isLoading = false
        }
      }
    }
  }
})