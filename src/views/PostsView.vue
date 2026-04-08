<template>
  <div>
    <h1>Пости</h1>

    <p v-if="store.isLoading">Завантаження...</p>
    <p v-else-if="store.error">{{ store.error }}</p>

    <ul v-else>
      <li v-for="post in store.items" :key="post.id">
        {{ post.title }}
      </li>
    </ul>
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