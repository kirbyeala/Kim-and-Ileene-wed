<script setup>
import { onMounted } from 'vue'
import { usePhotoStore } from './stores/photos'
import AppHeader from './components/AppHeader.vue'
const store=usePhotoStore()
onMounted(()=>{store.fetchPhotos();store.fetchGreetings();store.connect()})
</script>
<template>
  <AppHeader v-if="$route.path!='/slideshow'" />
  <main><router-view /></main>
</template>
