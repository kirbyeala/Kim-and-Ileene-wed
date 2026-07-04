<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
const now=ref(Date.now()), target=new Date('2026-09-25T15:00:00+08:00').getTime()
let timer
onMounted(()=>timer=setInterval(()=>now.value=Date.now(),1000)); onUnmounted(()=>clearInterval(timer))
const units=computed(()=>{let d=Math.max(0,target-now.value);return [
 ['Days',Math.floor(d/86400000)],['Hours',Math.floor(d/3600000)%24],['Minutes',Math.floor(d/60000)%60],['Seconds',Math.floor(d/1000)%60]
]})
</script>
<template><div class="countdown"><div v-for="[label,value] in units" :key="label"><strong>{{String(value).padStart(2,'0')}}</strong><span>{{label}}</span></div></div></template>
