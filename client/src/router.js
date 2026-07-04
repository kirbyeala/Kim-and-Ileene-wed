import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import UploadView from './views/UploadView.vue'
import GalleryView from './views/GalleryView.vue'
import SlideshowView from './views/SlideshowView.vue'
import AdminView from './views/AdminView.vue'
import GuestWallView from './views/GuestWallView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/upload', component: UploadView },
    { path: '/gallery', component: GalleryView },
    { path: '/guest-wall', component: GuestWallView },
    { path: '/slideshow', component: SlideshowView },
    { path: '/admin', component: AdminView }
  ],
  scrollBehavior: () => ({ top: 0 })
})
