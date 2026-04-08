<template>
  <div>
    <h1>Пости</h1>

    <input
      v-model="store.query"
      @input="store.fetchItems"
      placeholder="Пошук..."
    />

    <div class="pagination">
      <button
        @click="prevPage"
        :disabled="store.page === 1"
      >
        Попередня
      </button>

      <span>Сторінка: {{ store.page }}</span>

      <button @click="nextPage">
        Наступна
      </button>
    </div>

    <p v-if="store.isLoading">Завантаження...</p>

    <p v-else-if="store.error">{{ store.error }}</p>

    <ul v-else-if="store.items.length">
      <li v-for="item in store.items" :key="item.id">
        {{ item.title }}
      </li>
    </ul>

    <p v-else>Немає даних</p>
  </div>
</template>

<script setup>
import { usePostsStore } from '../stores/postsStore'

const store = usePostsStore()

const nextPage = () => {
  store.page++
  store.fetchItems()
}

const prevPage = () => {
  if (store.page > 1) {
    store.page--
    store.fetchItems()
  }
}
</script>