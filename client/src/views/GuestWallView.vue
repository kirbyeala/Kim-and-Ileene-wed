<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { usePhotoStore } from '../stores/photos'
const store=usePhotoStore(),guestName=ref(''),message=ref(''),posting=ref(false),sent=ref(false),list=ref(null)
async function postGreeting(){if(!message.value.trim()||posting.value)return;posting.value=true;await store.postGreeting(guestName.value,message.value.trim());message.value='';posting.value=false;sent.value=true;setTimeout(()=>sent.value=false,2500)}
async function scrollToTop(){await nextTick();list.value?.$el?.scrollTo?.({top:0,behavior:'smooth'})}
watch(()=>store.greetings.length,scrollToTop);onMounted(scrollToTop)
</script>
<template>
 <div class="guest-wall">
  <div class="wall-glow glow-one"></div><div class="wall-glow glow-two"></div>
  <section class="wall-heading"><p class="eyebrow">KIM & ILEENE · 09.26.26</p><h1>Guest <em>Wall</em></h1><p>Leave a little love for the newlyweds. Your greeting will join the celebration—and appear live on the reception screen.</p><div class="wall-live"><i :class="{offline:!store.connected}"></i>{{store.connected?'Live now':'Reconnecting…'}}</div></section>
  <section class="wall-glass">
   <form class="greeting-form" @submit.prevent="postGreeting"><p class="eyebrow">LEAVE YOUR MESSAGE</p><h2>Write from the heart.</h2><label>Your name <span>optional</span><input v-model="guestName" maxlength="60" placeholder="How should we remember you?"></label><label>Your greeting <span>{{message.length}}/300</span><textarea v-model="message" maxlength="300" required placeholder="Share a wish, a memory, or a few words of love…"></textarea></label><button class="button" :disabled="posting||!message.trim()">{{posting?'Sending…':sent?'Greeting sent ♥':'Post your greeting'}}</button></form>
   <div class="wall-feed"><header><div><p class="eyebrow">LIVE MESSAGES</p><h2>With love, from everyone.</h2></div><span>{{store.greetings.length}}</span></header>
    <transition-group ref="list" name="wall-message" tag="div" class="wall-messages"><article v-for="g in store.greetings" :key="g._id"><div class="wall-avatar">{{(g.guestName||'G').charAt(0).toUpperCase()}}</div><div><p>{{g.message}}</p><footer><b>{{g.guestName||'A cherished guest'}}</b><span>{{new Date(g.createdAt).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}}</span></footer></div></article></transition-group>
    <div v-if="!store.greetings.length" class="wall-empty"><span>♡</span><p>Be the first to leave a little love.</p></div>
   </div>
  </section>
 </div>
</template>
