<script setup>
import { computed, ref } from 'vue'
import confetti from 'canvas-confetti'
import { api } from '../services/api'
import { usePhotoStore } from '../stores/photos'
const store=usePhotoStore(), files=ref([]), name=ref(''), message=ref(''), progress=ref(0), uploading=ref(false), success=ref(false), dragging=ref(false)
const totalSize=computed(()=>files.value.reduce((a,f)=>a+f.size,0))
function add(list){ const valid=[...list].filter(f=>/^image\/(jpeg|png|webp)$/.test(f.type)&&f.size<=10*1024*1024); files.value=[...files.value,...valid].slice(0,20).map(f=>Object.assign(f,{preview:URL.createObjectURL(f)})) }
function drop(e){dragging.value=false;add(e.dataTransfer.files)}
async function upload(){
 if(!files.value.length)return; uploading.value=true
 try{ const fd=new FormData();files.value.forEach(f=>fd.append('photos',f));fd.append('guestName',name.value);fd.append('message',message.value);await api.post('/upload',fd,{onUploadProgress:e=>progress.value=Math.round(e.loaded/e.total*100)})}
 catch{store.addDemo(files.value,name.value,message.value);progress.value=100}
 uploading.value=false;success.value=true;confetti({particleCount:120,spread:75,colors:['#b79a61','#f7ead2','#fff']})
}
function reset(){files.value=[];progress.value=0;success.value=false;message.value=''}
</script>
<template>
 <section class="page-hero compact"><p class="eyebrow">KIM & ILEENE · 08.29.26</p><h1>Share your<br><em>beautiful moments.</em></h1><p>Every photo tells a part of our story. We’d love to see the day through your eyes.</p></section>
 <section class="upload-wrap">
  <div v-if="success" class="success-card">
   <div class="heart">♥</div><p class="eyebrow">MEMORY SHARED</p><h2>Thank you, {{name||'dear friend'}}!</h2><p>Your {{files.length>1?`${files.length} photos are`:'photo is'}} now part of our wedding story.</p>
   <button class="button" @click="reset">Share more moments</button><router-link class="text-link" to="/gallery">See it in the gallery →</router-link>
  </div>
  <form v-else @submit.prevent="upload" class="upload-card">
   <div class="step-label"><span>01</span><div><b>Choose your photos</b><small>Up to 20 photos · 10MB each</small></div></div>
   <label class="dropzone" :class="{dragging}" @dragover.prevent="dragging=true" @dragleave="dragging=false" @drop.prevent="drop">
    <input type="file" accept="image/jpeg,image/png,image/webp" multiple capture="environment" @change="add($event.target.files)">
    <span class="upload-icon">↥</span><b>Drop your photos here</b><small>or tap to choose from your device</small><span class="browse">Browse photos</span>
   </label>
   <div v-if="files.length" class="previews"><div v-for="(f,i) in files" :key="f.preview"><img :src="f.preview"><button type="button" @click="files.splice(i,1)">×</button></div></div>
   <div v-if="files.length" class="file-count">{{files.length}} photo{{files.length>1?'s':''}} selected · {{(totalSize/1048576).toFixed(1)}} MB</div>
   <div class="step-label"><span>02</span><div><b>Add a personal touch</b><small>Both fields are optional</small></div></div>
   <div class="form-row"><label>Your name<input v-model="name" maxlength="60" placeholder="How should we remember you?"></label><label>A little note<textarea v-model="message" maxlength="240" placeholder="Leave a wish for the newlyweds…"></textarea></label></div>
   <div v-if="uploading" class="progress-line"><span :style="{width:progress+'%'}"></span><b>{{progress}}%</b></div>
   <button class="button submit" :disabled="!files.length||uploading">{{uploading?'Sharing your memories…':`Share ${files.length||''} ${files.length===1?'memory':'memories'}`}} <span>♥</span></button>
   <p class="privacy">Your photos will appear in our live wedding gallery. By sharing, you’re giving the couple permission to enjoy and keep these memories.</p>
  </form>
 </section>
</template>
