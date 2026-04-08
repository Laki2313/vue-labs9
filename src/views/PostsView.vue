<template>
  <div>
    <h1>Пости</h1>

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

<script>
import { onMounted } from 'vue'
import { usePostsStore } from '../stores/postsStore'

export default {
  setup() {
    const store = usePostsStore()

    onMounted(() => {
      store.fetchItems()
    })

    return { store }
  }
}
</script>