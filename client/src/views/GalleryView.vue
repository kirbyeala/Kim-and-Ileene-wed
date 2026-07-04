<script setup>
import { computed, ref } from 'vue'
import { usePhotoStore } from '../stores/photos'
import PhotoCard from '../components/PhotoCard.vue'
const store=usePhotoStore(), selected=ref(null), search=ref('')
const shown=computed(()=>store.approved.filter(p=>(p.guestName+p.message).toLowerCase().includes(search.value.toLowerCase())))
</script>
<template>
 <section class="page-hero gallery-head"><p class="eyebrow" style="font-size: 15px;">THE MEMORIES</p><h1>A day seen through<br><em>the eyes of love.</em></h1>
  <div class="live-pill"><i :class="{offline:!store.connected}"></i>{{store.count}} memories shared</div>
 </section>
 <section class="gallery-tools"><p>From our favorite people, with love.</p><input v-model="search" placeholder="Search a guest…"></section>
 <section class="masonry" @contextmenu.prevent><PhotoCard v-for="p in shown" :key="p._id" :photo="p" @open="selected=$event"/></section>
 <div v-if="selected" class="lightbox" @click.self="selected=null" @contextmenu.prevent><button @click="selected=null">×</button><img :src="selected.imageUrl" draggable="false"><div><b>{{selected.guestName}}</b><p>{{selected.message}}</p></div></div>
 <router-link to="/upload" class="floating-share">＋ <span>Share a photo</span></router-link>
</template>
