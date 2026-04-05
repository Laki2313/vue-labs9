<template>
  <div class="not-found">
    <h1>404 😢</h1>
    <p>Сторінку не знайдено</p>

    <div class="buttons">

      <router-link to="/" class="btn">На головну</router-link>


      <button @click="goBack" class="btn back">Назад</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()

    const goBack = () => {
      router.back()
    }

    return { goBack }
  }
}
</script>

<style>
.not-found {
  text-align: center;
  padding: 50px;
}

.buttons {
  margin-top: 20px;
}

.btn {
  margin: 10px;
  padding: 10px 15px;
  background: #42b983;
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 5px;
}

.back {
  background: #35495e;
}
</style>