<template>
  <div class="checkout">
    <h2 class="checkout-title">Оформление заказа</h2>

    <div class="form-group">
      <input v-model="name" placeholder="Имя" :class="{ invalid: errors.name }" required />
      <span v-if="errors.name" class="error">{{ errors.name }}</span>

      <input v-model="surname" placeholder="Фамилия" :class="{ invalid: errors.surname }" required />
      <span v-if="errors.surname" class="error">{{ errors.surname }}</span>
    </div>

    <!-- Вкладки "Доставка" и "Самовывоз" -->
    <div class="tabs">
      <button class="underline-one" @click="activeTab = 'pickup'">Самовывоз</button>
      <button class="underline-one" @click="activeTab = 'delivery'">Доставка</button>
    </div>

    <!-- Самовывоз -->
    <div v-show="activeTab === 'pickup'" class="pickup-section">
      <label for="pickup-select">Выберите пункт самовывоза:</label>
      <select id="pickup-select" v-model="selectedAddress" required>
        <option disabled value="">Выберите адрес</option>
        <option v-for="point in pickupPoints" :key="point" :value="point">{{ point }}</option>
      </select>
      <p v-if="selectedAddress">Вы выбрали: {{ selectedAddress }}</p>
    </div>

    <!-- Доставка -->
    <div v-show="activeTab === 'delivery'" class="delivery-section">
      <div class="form-group">
        <input v-model="city" placeholder="Город" required />
      </div>
      <div class="form-group">
        <input v-model="street" placeholder="Улица" required />
      </div>
      <div class="form-group">
        <input v-model="house" placeholder="Дом" required />
      </div>
      <div class="form-group">
        <input v-model="zip" placeholder="Почтовый индекс" :class="{ invalid: errors.zip }" required />
        <span v-if="errors.zip" class="error">{{ errors.zip }}</span>
      </div>
    </div>

    <div class="form-group">
      <label>Способ оплаты:</label>
      <select v-model="paymentMethod" :class="{ invalid: !paymentMethod }" required>
        <option disabled value="">Выберите способ оплаты</option>
        <option>Картой онлайн</option>
        <option>Наложенный платеж</option>
        <option>Наличными при получении</option>
      </select>
    </div>

    <button class="f" @click="submitOrder">Оформить заказ</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const surname = ref('')
const city = ref('')
const street = ref('')
const house = ref('')
const zip = ref('')
const deliveryType = ref('pickup')
const paymentMethod = ref('')
const selectedAddress = ref(null)
const pickupPoints = [
  'г. Москва, ул. Ленина, д. 10',
  'г. Санкт-Петербург, Невский проспект, д. 42',
  'г. Казань, ул. Баумана, д. 5',
  'г. Новосибирск, ул. Красный проспект, д. 120'
]

const errors = ref({
  name: '',
  surname: '',
  zip: ''
})

const router = useRouter()

const activeTab = ref('pickup') // Переменная для активной вкладки

// -----------------------------
// Проверка имени на русском
// -----------------------------
function isValidRussianName(value) {
  const trimmed = value.trim()

  if (trimmed.length < 2) return false

  const onlyRussianLetters = /^[А-Яа-яЁё]+$/.test(trimmed)
  if (!onlyRussianLetters) return false

  const firstLetter = trimmed.charAt(0)
  if (firstLetter !== firstLetter.toUpperCase()) return false

  const rest = trimmed.slice(1)
  if (rest !== rest.toLowerCase()) return false

  return true
}

// -----------------------------
// Проверка и установка ошибок
// -----------------------------
function validateForm() {
  errors.value.name = isValidRussianName(name.value)
    ? ''
    : 'Имя должно начинатся с заглавной буквы, содержать только русские буквы.'

  errors.value.surname = isValidRussianName(surname.value)
    ? ''
    : 'Фамилия должна начинатся с заглавной буквы, содержать только русские буквы.'

  const zipIsValid = /^\d{6}$/.test(zip.value)
  errors.value.zip =
    deliveryType.value === 'delivery' && !zipIsValid
      ? 'Индекс должен содержать 6 цифр'
      : ''

  return !errors.value.name && !errors.value.surname && !errors.value.zip
}

// -----------------------------
// Отправка заказа
// -----------------------------
function submitOrder() {
  if (!validateForm()) return

  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Гость' }
  const cartKey = `cartItems_${user.name}`
  const cartItems = JSON.parse(localStorage.getItem(cartKey) || '[]')

  const order = {
    id: Date.now(),
    user: user.name,
    name: name.value,
    surname: surname.value,
    deliveryType: activeTab.value,
    address:
      activeTab.value === 'delivery'
        ? {
            city: city.value,
            street: street.value,
            house: house.value,
            zip: zip.value
          }
        : selectedAddress.value || 'Самовывоз',
    paymentMethod: paymentMethod.value,
    status: 'В ожидании',
    items: cartItems // ← добавляем товары!
  }

  const orders = JSON.parse(localStorage.getItem('orders') || '[]')
  orders.push(order)
  localStorage.setItem('orders', JSON.stringify(orders))

  // очищаем корзину пользователя
  localStorage.removeItem(cartKey)

  router.push('/cabinet')
}

</script>
<style scoped>
.underline-one {
  margin: 5px;
  width: min(200px, 100%);
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
.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}





.tab-content {
  display: flex;
  flex-direction: column;
}
.invalid {
  border-color: rgb(179, 36, 36);
}

.error {
  color: rgb(179, 36, 36);
  font-size: 0.875rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
}
@font-face {
  font-family: H;
  src: url(../styles/tu.otf);
}

.checkout {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ededed;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: Arial, Helvetica, sans-serif;
  color: #2c5140;
  display: flex;
  flex-direction: column;
  align-items: center; /* Центрируем контент по горизонтали */
}

.checkout-title {
  font-family: H;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #2c5140;
}

.form-group {
  width: 100%;
  max-width: 400px; /* Ограничиваем максимальную ширину для ввода */
  padding-right: 30px;
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input,
select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #2c5140;
  border-radius: 50px;
  font-size: 1rem;
  font-family: inherit;
  background: white;
  text-align: center;
}
/* input.invalid,
select.invalid {
  border-color: rgb(86, 0, 0);
} */

.f {
  width: 100%;
  max-width: 400px; /* Ограничиваем максимальную ширину кнопки */
  padding: 0.9rem;
  font-size: 1.1rem;
  font-family: H;
  border-radius: 8px;
  color: white;
  border: none;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(47, 91, 53, 0.9)), url('../img/der6.jpg');
  background-size: cover;
  background-position: center;
  background-blend-mode: multiply;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: filter 0.3s ease, transform 0.2s ease;
  margin-top: 1rem; /* Отступ сверху */
}




.store-map {
  width: 100%;
  height: 300px;
  margin: 1rem 0;
  background-color: #efefef;
  border-radius: 8px;
}

/* Радио кнопки */

</style>