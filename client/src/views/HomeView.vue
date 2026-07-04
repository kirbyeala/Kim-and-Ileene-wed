<script setup>
import CountdownTimer from '../components/CountdownTimer.vue'
</script>
<template>
  <section class="hero">
    <div class="hero-bg"></div><div class="hero-shade"></div>
    <div class="hero-copy">
      <p class="eyebrow light">WE’RE GETTING MARRIED</p>
      <h1>Kimmuel <em>&</em> Ileene</h1>
      <p class="date">SEPTEMBER 26, 2026 · UNITED KINGDOM</p>
      <router-link to="/upload" class="button button-light">Share your photos <span>↗</span></router-link>
      <router-link to="/slideshow" class="hero-slide-link">Live slideshow <span>→</span></router-link>
    </div>
    <div class="scroll-note">SCROLL TO CELEBRATE <i></i></div>
  </section>
  <section class="intro section">
    <p class="eyebrow">TOGETHER WITH OUR FAMILIES AND FRIENDS</p>
    <h2>One beautiful day.<br><em>A lifetime of memories.</em></h2>
    <p class="lead">Your eyes, your moments, your memories. Help us preserve every laugh, happy tear, and dance-floor story from our most treasured day.</p>
    <CountdownTimer/>
  </section>
  <section class="venue">
      <div class="venue-image"></div>
      <div class="venue-card">
        <p class="eyebrow">THE CELEBRATION</p><h2>See you<br>at the altar.</h2>
        <p>Saturday, September 26, 2026<br>at three in the afternoon</p>
        <div class="rule"></div><p><span style="font-weight: 900; font-size: 20px;">Pag-Asa Centre Reading</span><br>Emmanuel Church - Southlake Crescent, Woodley, United Kingdom</p>
        <a href="https://www.google.com/maps/place/Emmanuel+Church+Woodley/@51.4451825,-0.9046742,677m/data=!3m2!1e3!4b1!4m6!3m5!1s0x4876848bbd41cd71:0x98583a3e4e9b7429!8m2!3d51.4451825!4d-0.9020993!16s%2Fm%2F03cx6hn?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener">View on map ↗</a>
      </div>
    </section>
  <section class="memory-cta section">
    <p class="script">Through your eyes</p><h2>Capture the joy.<br>Share the love.</h2>
    <p>No account, no fuss.<br> Just choose your favorite moments and they’ll join our live wedding gallery.</p>
    <router-link to="/upload" class="button">Share a memory <span>↗</span></router-link>
    <router-link to="/gallery" class="text-link">Explore the gallery →</router-link>
  </section>
  <footer><div class="brand footer-brand"><span>Kimmuel</span><i>&</i><span>Ileene</span></div><p>Made with love for September 26, 2026</p></footer>
</template>
