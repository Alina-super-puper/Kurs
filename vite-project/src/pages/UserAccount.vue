<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { kart } from '../composables/useProduct.js'
import { useCart } from '../composables/useCart.js'

const user = ref(null)
const orders = ref([])
const showPassword = ref(false)
const router = useRouter()
const { addToCart } = useCart()
const pet = ref({
  type: '',
  name: '',
  birthday: '',
  preferences: ''
})

function loadPetProfile() {
  const data = JSON.parse(localStorage.getItem(`petProfile_${user.value?.name}`))
  if (data) pet.value = data
}

function savePetProfile() {
  if (user.value?.name) {
    localStorage.setItem(`petProfile_${user.value.name}`, JSON.stringify(pet.value))
  }
}

function getProduct(id) {
  return kart.find(p => p.id === id) || {}
}
function getImage(id) {
  const product = getProduct(id)
  return product.image ? product.image.replace('../img2/', '/img2/') : ''
}
function getName(id) {
  return getProduct(id).nasvanie || 'Без названия'
}
function getPrice(id) {
  return getProduct(id).rubli || 0
}

function logout() {
  const user = JSON.parse(localStorage.getItem('user'))

  // Удаляем временную корзину (если вдруг есть)
  localStorage.removeItem('cartItems')

  // Удаляем текущего пользователя
  localStorage.removeItem('user')

  // Перезагружаем страницу, чтобы сбросить кеш
  router.push('/').then(() => location.reload())
}

onMounted(() => {
  const stored = JSON.parse(localStorage.getItem('user'))
  if (!stored?.isAuthenticated) return router.push('/')
  user.value = stored

  const allOrders = JSON.parse(localStorage.getItem('orders') || '[]')
  orders.value = allOrders.filter(o => o.user === user.value.name)

  loadPetProfile() // загрузить анкету
})
</script>

<template>
  <div class="cabinet">
    <div class="left-column">
      <h2 style="font-family:H; color: darkgreen;">Добро пожаловать, {{ user?.name }}</h2>
      <p>Телефон: {{ user?.phone || 'Не указан' }}</p>
      <div class="pet-profile">
  <h3>Питомец</h3>
  <select v-model="pet.type">
    <option disabled value="">Выберите тип</option>
    <option>Кошка</option>
    <option>Собака</option>
    <option>Хомяк</option>
    <option>Птица</option>
  </select>
  <input v-model="pet.name" placeholder="Имя питомца" />
  <input type="date" v-model="pet.birthday" />
  <input v-model="pet.preferences" placeholder="Вкусовые предпочтения" />
  <div style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
  <button class="underline-one" @click="savePetProfile">Сохранить</button>
  <button class="underline-one" @click="logout">Выйти</button>
</div>
</div>
      
    </div>

    <div class="right-column">
      <h3 style="font-family:H; color: darkgreen;">Ваши заказы</h3>
      <div v-for="order in orders" :key="order.id" class="order">
        <p><strong>Имя:</strong> {{ order.name }} {{ order.surname }}</p>
        <p><strong>Тип доставки:</strong> {{ order.deliveryType === 'pickup' ? 'Самовывоз' : 'Доставка' }}</p>
        <p><strong>Адрес:</strong>
          {{
            typeof order.address === 'string'
              ? order.address
              : `${order.address.city}, ${order.address.street} ${order.address.house}, ${order.address.zip}`
          }}
        </p>
        <p><strong>Оплата:</strong> {{ order.paymentMethod }}</p>
        <p><strong>Статус:</strong> {{ order.status }}</p>

        <div class="items">
          <h4>Товары:</h4>
          
          <div v-if="order.items && order.items.length">
            <div v-for="item in order.items" :key="item.id" class="item-card">
              
              <RouterLink :to="`/detali/${item.id}`"><img :src="item.image" alt="товар" class="thumb" /></RouterLink>
              <div class="info">
                <p><strong>{{ item.nasvanie }}</strong></p>
                <p>{{ item.rubli }} ₽</p>
              </div>
               <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
<link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>
              <button class="btn btn-2 btn-sep icon-cart" @click="addToCart(item) ">В корзину</button>
            </div>
          </div>
          <div v-else>
            <p>Нет информации о товарах.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: H;
  src: url(../styles/tu.otf);
}
.pet-profile {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pet-profile input,
.pet-profile select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-family: H;
}
.underline-one {
  width: min(12.5vw, 100%);
  font-family: H;
  font-size: 1rem;
  color: white;
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 0.5rem;
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0), rgba(47, 91, 53, 0.866)), 
    url('../img/der6.jpg');
  background-size: cover;
  background-position: center;
  background-blend-mode: multiply;
  cursor: pointer;
  transition: filter 0.3s ease, transform 0.2s ease;
  box-shadow: 0 0.25rem 0.375rem rgba(0,0,0,0.2);
}

.underline-one:hover {
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), 
    url('../img/der6.jpg');
  transform: scale(1.03);
}
.btn {
  
  border: none;
  font-family: 'Lato';
  font-size: inherit;
  color: inherit;
  background: none;
  cursor: pointer;
  /* размер основной кнопки */
  padding: 0.5rem 0.75rem;
  display: inline-block;
  margin: 0.5rem auto 0 auto;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  outline: none;
  position: relative;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  font-size: 0.8125rem;
  width: min(10vw, 9.375rem);
}

.btn:after {
  content: '';
  position: absolute;
  z-index: -1;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}

/* Pseudo elements for icons */
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


/* Icon separator */
.btn-sep {
  padding: 10px 20px 10px 50px;
}

.btn-sep:before {
  background: rgba(0,0,0,0.15);
}





/* Button 2 */
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


/* Icons */

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
  margin: 4px 0; /* Уменьшаем вертикальные отступы */
}

.cabinet {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.left-column {
  border-right: 1px solid #ccc;
  padding-right: 1.5rem;
}

/* .logout {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #05386B;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
} */

.right-column .order {
  border: 1px solid #379683;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.items {
  margin-top: 1rem;
}

.item-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
  background: #f9f9f9;
}

.item-card .thumb {
  height: 50px;
  width: auto;
  margin-right: 1rem;
}

.item-card .info {
  flex-grow: 1;
}
@media (max-width: 768px) {
  .cabinet {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .left-column {
    border-right: none;
    border-bottom: 1px solid #ccc;
    padding-right: 0;
    padding-bottom: 1rem;
  }

  .item-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .item-card .thumb {
    height: auto;
    width: 100%;
    max-height: 200px;
    object-fit: contain;
    margin-right: 0;
  }

  .btn {
    width: 200px;
    text-align: center;
  }

  .underline-one {
    width: 100%;
  }

  .pet-profile input,
  .pet-profile select {
    width: 100%;
  }

  .right-column .order {
    padding: 1rem 0.5rem;
  }
}

@media (max-width: 480px) {
  .cabinet {
    padding: 0.5rem;
  }

  .order p,
  .order strong,
  .order h4 {
    font-size: 14px;
  }

  .btn {
    font-size: 12px;
  }

  .underline-one {
    font-size: 14px;
  }
}

</style>