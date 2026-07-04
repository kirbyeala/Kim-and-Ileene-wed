<script setup>
import { computed, ref } from 'vue'
import { api } from '../services/api'
import { usePhotoStore } from '../stores/photos'
const store=usePhotoStore(), token=ref(sessionStorage.getItem('admin-token')), username=ref(''),password=ref(''),error=ref(''),search=ref('')
const today=computed(()=>store.photos.filter(p=>new Date(p.createdAt).toDateString()===new Date().toDateString()).length)
const shown=computed(()=>store.photos.filter(p=>(p.guestName||'').toLowerCase().includes(search.value.toLowerCase())))
async function login(){try{const {data}=await api.post('/admin/login',{username:username.value,password:password.value});token.value=data.token;sessionStorage.setItem('admin-token',data.token)}catch{error.value='Those credentials didn’t match.'}}
async function remove(p){if(!confirm('Delete this photo permanently?'))return;try{await api.delete(`/photo/${p._id}`,{headers:{Authorization:`Bearer ${token.value}`}})}catch{}store.photos=store.photos.filter(x=>x._id!==p._id)}
function exportCsv(){const rows=[['Guest','Message','Date','URL'],...store.photos.map(p=>[p.guestName,p.message,p.createdAt,p.imageUrl])];const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([rows.map(r=>r.map(x=>`"${(x||'').replaceAll('"','""')}"`).join(',')).join('\n')],{type:'text/csv'}));a.download='wedding-photo-list.csv';a.click()}
</script>
<template>
 <section v-if="!token" class="admin-login"><form @submit.prevent="login"><div class="brand footer-brand"><span>K</span><i>&</i><span>I</span></div><p class="eyebrow">PRIVATE ADMIN</p><h1>Welcome back.</h1><label>Username<input v-model="username" required></label><label>Password<input v-model="password" type="password" required></label><p class="error">{{error}}</p><button class="button">Sign in</button></form></section>
 <section v-else class="admin-panel">
  <div class="admin-title"><div><p class="eyebrow">WEDDING COMMAND CENTER</p><h1>Good day.</h1></div><button class="text-link" @click="token=null;sessionStorage.removeItem('admin-token')">Sign out</button></div>
  <div class="stats"><article><span>Total memories</span><strong>{{store.count}}</strong></article><article><span>Uploaded today</span><strong>{{today}}</strong></article><article><span>Live connection</span><strong>{{store.connected?'Online':'Offline'}}</strong></article></div>
  <div class="admin-tools"><input v-model="search" placeholder="Search guest name…"><button class="button" @click="exportCsv">Export list</button></div>
  <div class="admin-grid"><article v-for="p in shown" :key="p._id"><img :src="p.imageUrl"><div><b>{{p.guestName||'Anonymous'}}</b><small>{{new Date(p.createdAt).toLocaleString()}}</small><p>{{p.message}}</p><button @click="remove(p)">Delete photo</button></div></article></div>
 </section>
</template>
