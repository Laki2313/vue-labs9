<template>
  <nav class="nav">
    <router-link to="/" class="link">Home</router-link>
    <router-link to="/catalog" class="link">Catalog</router-link>
    <router-link to="/about" class="link">About</router-link>
  </nav>
</template>

<style>
.nav {
  display: flex;
  gap: 20px;
  padding: 15px;
  background: #2c3e50;
}

.link {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

/* активна сторінка */
.router-link-active {
  border-bottom: 2px solid #42b983;
}
</style>