<template>
  <div class="app">
    <h1>Каталог постів</h1>

    <input v-model="query" placeholder="Пошук..." class="search" />

    <p v-if="isLoading">Завантаження...</p>

    <p v-else-if="error">Помилка: {{ error }}</p>

    <p v-else-if="filteredItems.length === 0">Нічого не знайдено</p>

    <ul v-else>
      <li v-for="item in filteredItems" :key="item.id">
        <b>{{ item.title }}</b>
        <button @click="selectItem(item)">Деталі</button>
      </li>
    </ul>

    <div v-if="selectedItem" class="details">
      <h2>Деталі поста</h2>
      <h3>{{ selectedItem.title }}</h3>
      <p>{{ selectedItem.body }}</p>
      <button @click="selectedItem = null">Закрити</button>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="page === 1">
        ⬅️ Попередня
      </button>

      <span>Сторінка: {{ page }}</span>

      <button @click="nextPage" :disabled="!hasMore">
        Наступна ➡️
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'

export default {
  setup() {
    const items = ref([])
    const isLoading = ref(false)
    const error = ref(null)
    const selectedItem = ref(null)

    const query = ref('')
    const page = ref(1)
    const limit = 5
    const hasMore = ref(true)

    let controller = null 

    const filteredItems = computed(() => {
      return items.value.filter(item =>
        item.title.toLowerCase().includes(query.value.toLowerCase())
      )
    })

    const loadItems = async () => {

      if (controller) controller.abort()
      controller = new AbortController()

      isLoading.value = true
      error.value = null

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${page.value}&_limit=${limit}`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('Помилка сервера')
        }

        const data = await response.json()
        items.value = data

        hasMore.value = data.length === limit

      } catch (err) {
        if (err.name !== 'AbortError') {
          error.value = err.message
          items.value = []
        }
      } finally {
        isLoading.value = false
      }
    }

    const nextPage = () => {
      page.value++
      loadItems()
    }

    const prevPage = () => {
      if (page.value > 1) {
        page.value--
        loadItems()
      }
    }

    const selectItem = (item) => {
      selectedItem.value = item
    }

    onMounted(() => {
      loadItems()
    })

    return {
      items,
      isLoading,
      error,
      selectedItem,
      selectItem,
      query,
      filteredItems,
      page,
      nextPage,
      prevPage,
      hasMore
    }
  }
}
</script>

<style>
.app {
  padding: 20px;
  font-family: Arial;
}

.search {
  margin-bottom: 20px;
  padding: 8px;
  width: 250px;
}

li {
  margin-bottom: 10px;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
}

.details {
  margin-top: 30px;
  padding: 15px;
  border: 1px solid #ccc;
}

.pagination {
  margin-top: 30px;
}

.pagination button {
  margin: 0 10px;
}
</style>
