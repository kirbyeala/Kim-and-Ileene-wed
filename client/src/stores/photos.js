import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import { api, API_URL } from '../services/api'

const samples = [
  'photo-1519741497674-611481863552','photo-1511285560929-80b456fea0bc',
  'photo-1519225421980-715cb0215aed','photo-1519741347686-c1e0aadf4611',
  'photo-1507504031003-b417219a0fde','photo-1507504031003-b417219a0fde',
  'photo-1520854221256-17451cc331bf','photo-1465495976277-4387d4b0e4a6'
].map((id,i)=>({ _id:`sample-${i}`, imageUrl:`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`, guestName:['Mia','James','Sofia','The Santos Family'][i%4], message:['A love worth celebrating.','To forever!','Beautiful beginnings.','With all our love.'][i%4], createdAt:new Date(Date.now()-i*3600000).toISOString(), approved:true }))

export const usePhotoStore = defineStore('photos', {
  state: () => ({ photos: [], greetings:[], loading:false, connected:false, demo:false, socket:null }),
  getters: { approved: s=>s.photos.filter(p=>p.approved!==false), count: s=>s.photos.length },
  actions: {
    async fetchPhotos(){
      this.loading=true
      try { const {data}=await api.get('/photos'); this.photos=data.photos||data; this.demo=false }
      catch { this.photos=JSON.parse(localStorage.getItem('wedding-demo-photos')||'null')||samples; this.demo=true }
      finally { this.loading=false }
    },
    async fetchGreetings(){
      try { const {data}=await api.get('/greetings'); this.greetings=data.greetings||data }
      catch { this.greetings=JSON.parse(localStorage.getItem('wedding-demo-greetings')||'[]') }
    },
    async postGreeting(guestName,message){
      try { const {data}=await api.post('/greetings',{guestName,message});if(!this.greetings.some(g=>g._id===data.greeting._id))this.greetings.unshift(data.greeting);return data.greeting }
      catch { const greeting={_id:`greeting-${Date.now()}`,guestName:guestName||'A cherished guest',message,createdAt:new Date().toISOString()};this.greetings.unshift(greeting);localStorage.setItem('wedding-demo-greetings',JSON.stringify(this.greetings.slice(0,100)));return greeting }
    },
    connect(){
      this.socket=io(import.meta.env.VITE_SOCKET_URL||API_URL,{transports:['websocket','polling'],reconnection:true})
      this.socket.on('connect',()=>this.connected=true)
      this.socket.on('disconnect',()=>this.connected=false)
      this.socket.on('photo:new',p=>{ if(!this.photos.some(x=>x._id===p._id)) this.photos.unshift(p) })
      this.socket.on('photo:deleted',id=>this.photos=this.photos.filter(p=>p._id!==id))
      this.socket.on('greeting:new',g=>{ if(!this.greetings.some(x=>x._id===g._id)) this.greetings.unshift(g) })
      this.socket.on('greeting:deleted',id=>this.greetings=this.greetings.filter(g=>g._id!==id))
    },
    addDemo(files,name,message){
      const added=files.map((f,i)=>({_id:`local-${Date.now()}-${i}`,imageUrl:URL.createObjectURL(f),guestName:name||'A cherished guest',message,createdAt:new Date().toISOString(),approved:true}))
      this.photos.unshift(...added)
      return added
    }
  }
})
