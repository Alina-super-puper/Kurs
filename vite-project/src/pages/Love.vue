
<script setup>
import { useLove } from '../composables/useLove'
import { useCart } from '../composables/useCart'
import { useRouter } from 'vue-router'
import { ref, onMounted, computed, watch } from 'vue'

const router = useRouter()
const { favorites, removeFromFavorites, initFavorites } = useLove()
const { addToCart } = useCart()
const isAuthenticated = ref(false)

const totalItems = computed(() =>
  favorites.value.reduce((sum, item) => sum + item.quantity, 0)
)

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'))
  isAuthenticated.value = !!user?.isAuthenticated
  if (user?.name) {
    initFavorites(user.name)
  }
})

watch(favorites, (newVal) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user?.name) {
    localStorage.setItem(`favorites_${user.name}`, JSON.stringify(newVal))
  }
}, { deep: true })

function handleAddAllToCart() {
  favorites.value.forEach(item => addToCart(item))
  alert('Все товары добавлены в корзину')
}
</script>

<template>
  <div class="cart-container">
    <div class="cart-left">
      <h2 style="font-family: H; color: #033a20;">Избранное <span style="color: green;">{{ totalItems }}</span> товаров</h2>
      <div v-if="favorites.length === 0" class="empty-cart">
        <img style="width: 200px;" src="../img/liv.png" alt="Кот">
      </div>
      <div v-for="item in favorites" :key="item.id" class="cart-item">
        <RouterLink :to="`/detali/${item.id}`">
          <img class="foto" :src="item.image" alt="" />
        </RouterLink>
        <div class="info">
          <h3>{{ item.nasvanie }}</h3>
          <p>{{ item.opisanie }}</p>
          <p class="price">Цена: {{ item.rubli }} ₽</p>
          <button class="log-kar" @click="removeFromFavorites(item.id)">Удалить</button>
        </div>
      </div>
    </div>

    <div class="cart-summary">
      <h3 class="zov">Добавить всё в корзину</h3>
      <p><strong>Всего:</strong> <span style="font-size: 25px; color: green;">{{ totalItems }}</span></p>
      <div class="bat">
        <button @click="handleAddAllToCart" class="underline-one">Добавить в корзину</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: H;
  src: url(../styles/tu.otf);
}

.cart-container {
  font-family: Arial, Helvetica, sans-serif;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
}

.cart-left {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 10px;
}

.cart-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccc;
  padding-bottom: 1rem;
}

.cart-item img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.info {
  flex: 1;
}

.info input {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0.5rem 0;
  padding: 0.3rem;
  width: min(100px, 100%);
}

.quantity-price {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: flex-start;
}

.price {
  white-space: nowrap;
}

.num {
  width: min(100px, 100%);
  padding: 5px;
  border: 2px solid green;
  border-radius: 5px;
  color: green;
  background-color: #f0fff0;
  font-weight: bold;
  text-align: center;
}
.num:focus {
  outline: none;
  border-color: #228B22;
  box-shadow: 0 0 5px rgba(34, 139, 34, 0.5);
}
.num::-webkit-outer-spin-button,
.num::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.cart-summary {
  font-family: Arial, Helvetica, sans-serif;
  position: sticky;
  top: 2rem;
  align-self: start;
  max-height: 80vh;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cart-summary h3 {
  margin-bottom: 1rem;
}

.underline-one {
  margin-left: 50px;
  width: 250px;
  font-family: H;
  font-size: 16px;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0), rgba(47, 91, 53, 0.866)), 
    url('../img/der6.jpg');
  background-size: cover;
  background-position: center;
  background-blend-mode: multiply;
  cursor: pointer;
  transition: filter 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
}

.underline-one:hover {
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), 
    url('../img/der6.jpg');
  transform: scale(1.03);
}

.empty-cart {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  text-align: center;
}

.log-kar {
  font-family: H;
  font-size: 10px;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0), rgba(47, 91, 53, 0.866)), 
    url('../img/der6.jpg');
  background-size: cover;
  background-position: center;
  background-blend-mode: multiply;
  cursor: pointer;
  transition: filter 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
}
.log-kar:hover {
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), 
    url('../img/der6.jpg');
  transform: scale(1.03);
}

.zov {
  color: #0a6630;
  font-family: H;
}

@media (max-width: 768px) {
  .cart-container {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .cart-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .cart-item img {
    width: 150px;
    height: 150px;
    height: auto;
  }

  .info {
    width: 100%;
  }

  .quantity-price {
    flex-direction: column;
    align-items: flex-start;
  }

  .cart-summary {
    position: static;
    max-height: none;
    box-shadow: none;
    border: none;
    padding: 1rem;
    margin-top: 2rem;
  }

  .underline-one {
    margin-left: 0;
    width: 100%;
  }
}
  
</style>