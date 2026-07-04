<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const open = ref(false)
const route = useRoute()

const darkNav = computed(() =>
  ['/gallery', '/upload'].includes(route.path)
)
</script>

<template>
  <header
    class="nav-shell"
    :class="{ 'dark-nav': darkNav }"
  >
    <router-link to="/" class="brand" aria-label="Home">
      <span>K</span><i>&</i><span>I</span>
    </router-link>

    <button
      class="nav-toggle"
      @click="open = !open"
      aria-label="Toggle navigation"
    >
      ☰
    </button>

    <nav :class="{ open }">
      <router-link to="/" @click="open = false">Our Day</router-link>
      <router-link to="/gallery" @click="open = false">Memories</router-link>
      <router-link to="/guest-wall" @click="open = false">Guest Wall</router-link>
      <router-link to="/upload" class="nav-cta" @click="open = false">
        Share a photo
      </router-link>
    </nav>
  </header>
</template>