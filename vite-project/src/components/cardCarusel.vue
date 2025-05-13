<!-- КАРТОЧКИ НОВИНКИ НА ГЛАВНОЙ !!!-->
<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { kart } from '../composables/useProduct'
import { useCart } from '../composables/useCart'
import { useLove } from '../composables/useLove'
import heartEmpty from '../img/hert1.png'
import heartFilled from '../img/hert2.png'

const { addToCart } = useCart()
const { favorites, addToFavorites, removeFromFavorites, initFavorites } = useLove()

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'))
  initFavorites(user?.name || 'guest')
})

const nowinki = computed(() => kart.filter(p => p.nowinki))
const currentIndex = ref(0)
const cardsPerPage = 4


const visibleCards = computed(() => {
  return nowinki.value.slice(currentIndex.value, currentIndex.value + cardsPerPage)
})

function next() {
  if (currentIndex.value + cardsPerPage < nowinki.value.length) {
    currentIndex.value += cardsPerPage
  }
}

function prev() {
  if (currentIndex.value - cardsPerPage >= 0) {
    currentIndex.value -= cardsPerPage
  }
}

function isFavorite(p) {
  return favorites.value.some(f => f.id === p.id)
}

function toggleFavorite(p) {
  if (isFavorite(p)) {
    removeFromFavorites(p.id)
  } else {
    addToFavorites(p)
  }
}
</script>

<template>
  <div class="carousel-wrapper">
    <button class="arrow left" @click="prev">‹</button>
    <div class="carousel">
      <div
        class="product-card"
        v-for="p in visibleCards"
        :key="p.id"
      >
        <div class="top-left-buttons">
          <button class="fav-btn" @click="toggleFavorite(p)">
            <img
              :src="isFavorite(p) ? heartFilled : heartEmpty"
      alt="Избранное" 
      style="width: 30px; height: 30px;"
      class="heart-icon"
            />
          </button>
        </div>
        <RouterLink :to="`/detali/${p.id}`">
          <img class="we" :src="p.image" alt="" />
        </RouterLink>
        <h3>{{ p.nasvanie }}</h3>
        <p>{{ p.opisanie }}</p>
        <p class="underline-one">{{ p.rubli }} ₽</p>
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
        <button @click="addToCart(p)" class="btn btn-2 btn-sep icon-cart">
          В корзину
        </button>
      </div>
    </div>
    <button class="arrow right" @click="next">›</button>
  </div>
</template>



<style scoped>
@font-face {
    font-family: H;
    src: url(../styles/tu.otf);
}
/* КНОПКИ */
.btn {
  font-family: H;
  border: none;
  font-family: 'Lato';
  font-size: inherit;
  color: inherit;
  background: none;
  cursor: pointer;
  padding: 8px 12px; 
  display: inline-block;
  margin: 8px auto 0 auto;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  outline: none;
  position: relative;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  font-size: 13px;
  width: 150px;
}

.btn:after {
  content: '';
  position: absolute;
  z-index: -1;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}


.btn:before {
  font-family: 'FontAwesome';
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  position: relative;
  -webkit-font-smoothing: antialiased;
}

.btn-sep {
  padding: 10px 20px 10px 50px;
}

.btn-sep:before {
  background: rgba(0,0,0,0.15);
}

.btn-2 {
  font-family: H;
  background: #2ecc71;
  color: #fff;
}

.btn-2:hover {
  background: #0a6630;
}

.btn-2:active {
  background: #27ae60;
  top: 2px;
}

.btn-2:before {
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  line-height: 2.2;
  font-size: 120%;
  width: 30px;
}
.icon-cart:before {
  content: "\f07a";
}

.icon-heart:before {
  content: "\f55a";
}

.icon-info:before {
  content: "\f05a";
}

.icon-send:before {
  content: "\f1d8";
}
.carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  gap: 1rem;
  overflow: hidden;
}

.carousel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.arrow {
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #2c5140;
  user-select: none;
}

.product-card {
  position: relative; /* ← добавь это */
  padding: 1rem;
  border: 1px solid #004413;
  text-align: center;
  align-items: center;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  max-width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-card img.we {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.heart-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.top-left-buttons {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
}

.fav-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  box-shadow: none;
  border-radius: 0;
  color: inherit;
  transition: none;
}

.fav-btn:hover {
  transform: scale(1.1);
}



.btn:hover {
  background-color: #0a6630;
}

h3, p {
  margin: 4px 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
}
@media (max-width: 1200px) {
  .carousel {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .carousel {
    grid-template-columns: repeat(2, 1fr);
  }
  .arrow {
    font-size: 1.5rem;
  }
}

@media (max-width: 600px) {
  .carousel-wrapper {
    flex-direction: row;
    gap: 1rem;
  }

  .carousel {
    grid-template-columns: 1fr;
    width: 100%;
    padding: 0 1rem;
  }

  .product-card {
    max-width: 200px;
  }

  .btn {
    width: 100%;
  }

  .arrow {
    font-size: 1.5rem;
  }

  .product-card img.we {
    height: 200px;
  }

  h3 {
    font-size: 16px;
  }

  p {
    font-size: 13px;
  }
}

</style>
