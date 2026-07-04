<script setup>
defineProps({photo:Object})
defineEmits(['open'])
</script>
<template>
 <button class="photo-card" @click="$emit('open',photo)" @contextmenu.prevent>
  <img :src="photo.imageUrl" :alt="photo.message || `Wedding memory shared by ${photo.guestName}`" loading="lazy" draggable="false">
  <span class="photo-overlay"><b>{{photo.guestName||'A cherished guest'}}</b><small>{{photo.message}}</small></span>
 </button>
</template>
