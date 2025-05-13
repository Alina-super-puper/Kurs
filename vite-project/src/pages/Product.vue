<script setup>
import { ref, computed, watch } from 'vue'
import { kart } from '../composables/useProduct'
import { useRoute } from 'vue-router'
import { useCart } from '../composables/useCart'// КОРЗИНА ДАН
import { useLove } from '../composables/useLove'// ИЗБРАННОЕ ДАН
// СЕРДЕШКО
import heartEmpty from '../img/hert1.png'
import heartFilled from '../img/hert2.png'

// ФУНКЦИЯ ДОБАВЛЕНИЯ ТОВАРА В КОРЗИНУ
const { addToCart } = useCart()
// ЕТА ДЛЯ ИЗБРАННОГО ИНИЦ ДОБАВ УДАЛ
const { favorites, addToFavorites, removeFromFavorites, initFavorites } = useLove()
const route = useRoute()

// КАТЕГОРИЯ ИЗ ИАРШРУТА
const Scategoria = ref(route.query.kategor || '')
const Sbrand = ref('')
const Shto = ref('')
const rubFrom = ref(null)
const rubTo = ref(null)

// ЧТОБ ПОКАЗВАЛО ШО ИЗБРАННОЕ У ПОЛЬЗОВАТЕЛЯ
const user = JSON.parse(localStorage.getItem('user'))
initFavorites(user?.name || 'guest')

// ЦЕ ФИЛЬТРАЦИЯ
const filter = computed(() => {
  return kart.filter(p =>
    (!Scategoria.value || p.kategor === Scategoria.value) &&
    (!Shto.value || p.tovar === Shto.value) &&
    (!Sbrand.value || p.brand === Sbrand.value) &&
    (rubFrom.value === null || p.rubli >= rubFrom.value) &&
    (rubTo.value === null || p.rubli <= rubTo.value)
  )
})

// ШТО ДОСТУПНА
const availableCategories = computed(() => {
  const set = new Set(kart
    .filter(p =>
      (!Shto.value || p.tovar === Shto.value) &&
      (!Sbrand.value || p.brand === Sbrand.value)
    )
    .map(p => p.kategor)
  )
  return Array.from(set)
})

const availableTypes = computed(() => {
  const set = new Set(kart
    .filter(p =>
      (!Scategoria.value || p.kategor === Scategoria.value) &&
      (!Sbrand.value || p.brand === Sbrand.value)
    )
    .map(p => p.tovar)
  )
  return Array.from(set)
})

const availableBrands = computed(() => {
  const set = new Set(kart
    .filter(p =>
      (!Scategoria.value || p.kategor === Scategoria.value) &&
      (!Shto.value || p.tovar === Shto.value)
    )
    .map(p => p.brand)
  )
  return Array.from(set)
})

// ОЧИСТКА СЛЕДИМ ТИП ЕСЛИ ФИЛЬТР НЕ ДОСТУПЕН ТО ЕГО НЕМА
watch([Scategoria, Shto, Sbrand], () => {
  if (Scategoria.value && !availableCategories.value.includes(Scategoria.value)) {
    Scategoria.value = ''
  }
  if (Shto.value && !availableTypes.value.includes(Shto.value)) {
    Shto.value = ''
  }
  if (Sbrand.value && !availableBrands.value.includes(Sbrand.value)) {
    Sbrand.value = ''
  }
})

// ОТОБРАЖЕНИЕ КНОПКИ СЕРДЕЧКА ЕСЛИ В ИЗБРАННОМ
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
function clearFilters() {
  Scategoria.value = ''
  Shto.value = ''
  Sbrand.value = ''
  rubFrom.value = null
  rubTo.value = null
}
</script>

<template>
  <div class="derevo">
    <div class="products-container">
      <div class="filters">
        <div class="filters-card">
        <div v-if="filter.length === 0">
  
</div>
          <select v-model="Scategoria">
  <option value="">Все категории</option>
  <option v-for="c in availableCategories" :key="c" :value="c">{{ c }}</option>
</select>

<select v-model="Shto">
  <option value="">Все товары</option>
  <option v-for="f in availableTypes" :key="f" :value="f">{{ f }}</option>
</select>

<select v-model="Sbrand">
  <option value="">Все бренды</option>
  <option v-for="b in availableBrands" :key="b" :value="b">{{ b }}</option>
</select>
          <input type="number" v-model.number="rubFrom" placeholder="Цена от" min="0" class="price-input" />
          <input type="number" v-model.number="rubTo" placeholder="Цена до" min="0" class="price-input" /> 
         <button @click="clearFilters" class="clear-button">Сбросить фильтры</button>
        </div>
       
      </div>
  <div v-if="filter.length === 0">
  <p style="font-family: H;">Нет товаров, подходящих под выбранные фильтры.</p>
</div>
      <div class="card-grid">
        <div v-for="p in filter" :key="p.id" class="product-card">
        
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

          <button @click="addToCart(p)" class="btn btn-2 btn-sep icon-cart">В корзину</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.heart-icon {
  width: 3rem;
  height: 3rem;
  object-fit: contain;
}
.btn {
  
 border: none;
  font-family: 'Lato';
  font-size: 1rem;
  color: inherit;
  background: none;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  display: inline-block;
  margin: 0.5rem auto 0 auto;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  font-weight: 700;
  outline: none;
  position: relative;
  transition: all 0.3s;
  width: 10rem;
}

.btn:after {
   content: '';
  position: absolute;
  z-index: -1;
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
  padding: 0.625rem 1.25rem 0.625rem 3.125rem;
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
  top: 0.125rem;
}

.btn-2:before {
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  line-height: 2.2;
  font-size: 1.2rem;
  width: 2rem;
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

.product-card h3,
.product-card p,
.product-card button {
  margin: 0.25rem 0;
}




.price-input {
  width: 6rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  font-family: H;
}

.derevo{
  display: flex;
  align-items: center;
  justify-content: center;
}
.rubl{
  color: #ddd;
  font-family: H;
}
.filters-card {
  background-image: url('../img/der6.jpg'); 
  background-size: cover; 
  background-position: center; 
  border-radius: 0.75rem;
  padding: 1rem 1.5rem;
  box-shadow: 0 0.25rem 0.75rem rgba(255, 255, 255, 0);
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  min-width: 50vw; 
}
select {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  background-color: #fff;
  cursor: pointer;
  transition: border-color 0.2s ease;
  font-family: H;
  font-size: 1rem;
}
select:focus {
  border-color: #007bff;
  outline: none;
}
input[type="range"] {
  appearance: none;
  height: 0.375rem;
  background: #ddd;
  border-radius: 0.3rem;
  outline: none;
  width: 12.5rem;
  
}
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  background: #2c5243;
  cursor: pointer;
  box-shadow: 0 0 2px rgba(0,0,0,0.3);
}
@font-face {
    font-family: H;
    src: url(../styles/tu.otf);
}
h2, h3{
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  
}
p{
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  
}


.products-container {
  
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* центрирует всё внутри */

}
.filters {
  padding: 1rem 2rem;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 3 колонки */
  gap: 1rem;
  justify-content: center; /* центрирует сетку */
  padding: 0 2rem; /* отступы по бокам */
  max-width: 1200px; /* ограничим ширину сетки */
  margin: 0 auto; /* центрируем всю сетку */
}
.product-card {
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
  justify-content: space-between; /* распределяет контент по вертикали */
  
}
.product-card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
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

.product-card {
  position: relative;
  /* остальное уже есть */
}
.clear-button {
  background: linear-gradient(135deg, #2c5243, #3fae77);
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-family: H;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.clear-button:hover {
  background: linear-gradient(135deg, #3fae77, #2c5243);
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
}

.clear-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
@media (max-width: 1200px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .filters-card {
    min-width: unset;
    width: 100%;
    padding: 1rem;
    flex-direction: column;
    align-items: stretch;
  }
  .filters {
    padding: 1rem;
  }
  .price-input, select {
    width: 100%;
    font-size: 1rem;
  }
}

@media (max-width: 600px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
  .product-card {
    max-width: 200px;
  }
  .filters-card {
    gap: 0.5rem;
  }
  .heart-icon {
    width: 36px;
    height: 36px;
  }
  .btn {
    width: 100%;
  }
}
</style>