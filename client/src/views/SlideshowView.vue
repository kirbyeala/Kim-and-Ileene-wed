<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { usePhotoStore } from '../stores/photos'

const store = usePhotoStore()

const index = ref(0)
const paused = ref(false)
const transition = ref('fade')
const cursor = ref(true)

const timer = ref()
const hideTimer = ref()

const items = computed(() => store.approved)

const current = computed(() => items.value[index.value] || null)

const greetings = computed(() =>
  [...store.greetings, ...store.approved.filter(photo => photo.message?.trim())]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 12)
)

const nearby = computed(() => {
  const length = items.value.length
  if (!length) return []

  return [-2, -1, 0, 1, 2].map(offset =>
    items.value[(index.value + offset + length) % length]
  )
})

const effects = [
  'fade',
  'zoom',
  'left',
  'right',
  'up',
  'down',
  'scale',
  'rotate',
  'kenburns',

  // New effects
  'flip',
  'blur',
  'float'
]

function next(direction = 1) {
  if (!items.value.length) return

  let newIndex

  // Prevent showing the same photo twice in a row
  do {
    newIndex = Math.floor(Math.random() * items.value.length)
  } while (
    items.value.length > 1 &&
    newIndex === index.value
  )

  index.value = newIndex

  transition.value =
    effects[Math.floor(Math.random() * effects.length)]

  schedule()
}

function schedule() {
  clearTimeout(timer.value)

  if (!paused.value) {
    const delay = 2000 + Math.random() * 1500
    timer.value = setTimeout(next, delay)
  }
}

function handleKey(event) {
  if (event.code === 'Space') {
    paused.value = !paused.value
    schedule()
  }

  if (event.key === 'ArrowRight') next()
  if (event.key === 'ArrowLeft') next(-1)

  if (event.key.toLowerCase() === 'f') {
    document.documentElement.requestFullscreen?.()
  }
}

function showCursor() {
  cursor.value = true

  clearTimeout(hideTimer.value)

  hideTimer.value = setTimeout(() => {
    cursor.value = false
  }, 3000)
}

onMounted(() => {
  window.addEventListener('keydown', handleKey)
  window.addEventListener('mousemove', showCursor)

  schedule()
  showCursor()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKey)
  window.removeEventListener('mousemove', showCursor)

  clearTimeout(timer.value)
  clearTimeout(hideTimer.value)
})

watch(
  () => items.value.length,
  () => {
    if (index.value >= items.value.length) {
      index.value = 0
    }
    schedule()
  }
)
</script>

<template>
  <div
    class="slideshow live-slideshow"
    :class="{ nocursor: !cursor }"
    @contextmenu.prevent
  >
    <section class="slide-stage">
      <div class="slide-photo">
        <transition :name="transition" mode="out-in">
          <img
            v-if="current"
            :key="current._id"
            :src="current.imageUrl"
            draggable="false"
          >
        </transition>

        <div v-if="!current" class="slide-empty">
          Waiting for beautiful moments…
        </div>

        <div v-if="current" class="slide-caption">
          <span>{{ current.guestName || 'A cherished guest' }}</span>
          <small>shared this beautiful moment</small>
        </div>
      </div>

      <div class="carousel-rail" aria-hidden="true">
        <div
          v-for="(photo, railIndex) in nearby"
          :key="`${photo._id}-${railIndex}`"
          :class="{ active: railIndex === 2 }"
        >
          <img :src="photo.imageUrl" draggable="false">
        </div>
      </div>

      <div class="slide-mark">
        K <i>&</i> I
      </div>

      <div class="slide-status">
        {{ paused ? 'PAUSED' : `${index + 1} / ${items.length}` }}
      </div>
    </section>

    <aside class="greetings-panel">
      <header>
        <div>
          <p>LIVE GREETINGS</p>
          <h1>Words of love</h1>
        </div>

        <span class="greetings-live">
          <i :class="{ offline: !store.connected }"></i>
          LIVE
        </span>
      </header>

      <transition-group
        name="greeting"
        tag="div"
        class="greetings-list"
      >
        <article
          v-for="greeting in greetings"
          :key="greeting._id"
        >
          <span class="quote-mark">“</span>

          <p>{{ greeting.message }}</p>

          <footer>
            — {{ greeting.guestName || 'A cherished guest' }}
          </footer>
        </article>
      </transition-group>

      <div
        v-if="!greetings.length"
        class="greetings-empty"
      >
        <span>♥</span>
        <p>Guest greetings will appear here live.</p>
      </div>

      <div class="greetings-footer">
        <span>September 26, 2026</span>
        <b>Kimmuel ❤️ Ileene</b>
      </div>
    </aside>
  </div>
</template>