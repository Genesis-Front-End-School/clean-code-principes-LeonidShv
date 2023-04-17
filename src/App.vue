<template>
  <header class="header">
    <p class="header-logo">Online courses. <b class="header-logo--highlight">Certificated</b></p>
    <img
      :src="avatarSrc"
      alt="user avatar"
      class="header-avatar"
    />
  </header>

  <RouterView class="routerView" />

  <footer class="footer">
    <p>© Copyright <b>2023</b></p>

    <p><strong>Genesis front-end</strong></p>
  </footer>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { getToken } from '@/api/index.js'
import { onMounted } from 'vue'
import { avatarSrc } from '@/constants/index.ts'

onMounted(async () => {
  const token = await getToken()
  document.cookie = `token=${token}`
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  line-height: var(--header-height);
  background-color: var(--dark);

  &-avatar {
    height: 30px;
    width: 30px;
    object-fit: cover;
    border-radius: 50%;
  }

  &-logo--highlight {
    color: var(--yellow);
  }
}

.routerView {
  height: calc(100vh - var(--header-height) - var(--footer-height));
  overflow: auto;
  padding: 24px 80px;
}

.footer {
  display: flex;
  justify-content: space-between;
  background-color: var(--dark);
  padding: 0 80px;
  line-height: var(--footer-height);
}
</style>
