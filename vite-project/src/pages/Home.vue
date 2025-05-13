<script setup>
import Car from '../components/Carusell.vue'
import nav2 from '../components/header2.vue'
import car2 from '../components/cardCarusel.vue'
import ask from '../pages/ASK.vue'
import reco from '../components/rec.vue'
</script>

<template>
  <div>
    <Car />
    <RouterView />
    <nav2 />
    
    <div class="carousel-section">
      
      <div class="carousel-bg">
        <div class="reco-header">
        <h2 style="color: darkgreen; font-size: 30px;">Новинки</h2><img class="cat-img" src="../img/ccc.png" alt="">
      </div>
        <car2 />
        <div class="reco-header">
  <h2>Рекомендуем</h2>
  <img class="cat-img" src="../img/kat.png" alt="">
</div>
        <reco/>
    
        <ask />
      </div>
    </div>
  </div>
</template>
<style scoped>
.reco-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: 50px;
  margin-top: 50px;
}

.reco-header h2 {
  font-family: H;
  font-size: 30px;
  color: darkgreen;
  margin: 0;
}

.cat-img {
  width: 60px;
  height: auto;
}
.carousel-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0px;
}

.carousel-bg {
  background: white;
  padding: 2rem;
  margin-top: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: calc(100% - 100px); /* немного уже, чем экран */
  max-width: 1200px; /* ограничиваем максимальную ширину */
}
@font-face {
    font-family: H;
    src: url(../styles/tu.otf);
}
h2{
  font-family: H;
  margin-left: 50px;
  margin-top: 50px;
}
.articles-section {
  padding: 2rem;
}
.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}
</style>
  
  