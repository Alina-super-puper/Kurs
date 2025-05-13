<script setup>
import { ref } from 'vue'
import { useUsers } from '@/composables/useUsers'

const emit = defineEmits(['close', 'success'])// МОДАЛКА
const mode = ref('select')// РЕЖИМС АВТОРИЗАЦИЯ ИЛЬ РЕГИСТРАЦИЯ

// ДАННЫЕ ФОРМ
const username = ref('')
const password = ref('')
const phone = ref('')
const error = ref('')

// ФУНШИ ИЗ УЗЕРСУЗЕРА
const { addUser, findUserByName, findUserByPhone } = useUsers() // Поиск пользователя по телефону

// ПРОВЕРЯЕМС ПАРОЛЬ
function validatePassword(pass) {
  const regex = /^[A-Za-z0-9]+$/
  return pass.length >= 8 && regex.test(pass)
}
// ПРОВЕРЯЕМС ТЕЛЕФОН
function validatePhone(value) {
  const regex = /^\+7\d{10}$/
  return regex.test(value)
}
// ЗПИСУЕМ СЮДА ВСЕ БЕЗ ВСЯКИХ ПРОБЕЛОВ И ПРОВЕРЯЕМ ЧТОБ ВСЕ ЗАПОЛНИЛИ
function submit() {
  const name = username.value.trim()
  const pass = password.value.trim()
  const userPhone = phone.value.trim()
  error.value = ''

  if (!name || !pass || (mode.value === 'register' && !userPhone)) {
    error.value = 'Все поля обязательны'
    return
  }

// ЕСЛИ РЕГИСТРАЦИЯ
  if (mode.value === 'register') {
    // СМОРИМ НОРМ ЛИ ТЕЛЕФОН
    if (!validatePhone(userPhone)) {
      error.value = 'Номер телефона должен быть в формате +7XXXXXXXXXX'
      return
    }

    if (findUserByName(name)) {
      error.value = 'Пользователь с таким логином уже существует'
      return
    }

    if (findUserByPhone(userPhone)) {
      error.value = 'Пользователь с таким номером телефона уже зарегистрирован'
      return
    }
    // НОРМ ЛИ ПАРОЛЬ
    if (!validatePassword(pass)) {
      error.value = 'Пароль должен содержать минимум 8 символов, только латиницу и цифры'
      return
    }
    // РЕГЕСТРИРУЕМС
    
    addUser(name, pass, userPhone)
    localStorage.setItem('user', JSON.stringify({ isAuthenticated: true, name, phone: userPhone }))// СОХР ПОЛЬЗ
    emit('success')
    emit('close')
  }
// ЕСЛИ ЛОГИН
  if (mode.value === 'login') {
    const user = findUserByName(name)
    if (!user) {
      error.value = 'Аккаунт не найден. Пожалуйста, проверьте введённые данные!'
      return
    }
    if (user.password !== pass) {
      error.value = 'Неверный пароль'
      return
    }

    localStorage.setItem('user', JSON.stringify({ isAuthenticated: true, name }))
    emit('success')
    emit('close')
  }
}

</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <template v-if="mode === 'select'">
        <button class="close-btn" @click="$emit('close')">
          <img class="log-kab" src="../img/krest.png" alt="Кабинет" />
        </button>

        <div class="select-content">
          <img class="top-image" src="../img/reg1.png" alt="Регистрация" />
          <div class="btn-group">
            <button class="underline-one" @click="mode = 'login'">Уже зарегистрированы?</button>
            <button class="underline-one" @click="mode = 'register'">Зарегистрироваться</button>
          </div>
        </div>
      </template>

      <template v-else>
        <h3 class="zag">{{ mode === 'login' ? 'Авторизация' : 'Регистрация' }}</h3>
        <div class="form-group">
          <label class="input-wrapper">
            <img src="../img/reg4.png" alt="Кот" class="cat-img" />
            <input class="inp" v-model="username" placeholder="Логин" />
          </label>
          <input class="inp" v-model="password" type="password" placeholder="Пароль" />
          <input v-if="mode === 'register'" class="inp" v-model="phone" type="tel"
            placeholder="Телефон (+7XXXXXXXXXX)" />
        </div>
        <p class="error" v-if="error">{{ error }}</p>
        <div class="btn-group">
          <button class="underline-one" @click="submit">Продолжить</button>
          <button class="underline-one" @click="mode = 'select'">Назад</button>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: H;
  src: url(../styles/tu.otf);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 18, 3, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  box-sizing: border-box;
}

.modal-content {
  position: relative;
  background: #e8f4ee;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  max-height: 100%;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  color: #2c5140;
  overflow-y: auto;
  box-sizing: border-box;
}

.modal-content input {
  margin: 0.5rem 0;
  padding: 0.5rem;
  width: 100%;
}

.zag {
  font-family: H;
}

.input-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
}

.cat-img {
  position: absolute;
  top: -50px;
  left: 60%;
  transform: translateX(-50%);
  width: 60px;
  height: auto;
  z-index: 2;
}

.inp {
  width: 100%;
  max-width: 300px;
  height: 40px;
  padding: 0 15px;
  font-size: 16px;
  border: 2px solid #2c5140;
  border-radius: 50px;
  box-sizing: border-box;
  text-align: center;
  font-family: inherit;
  background: white;
}

.select-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.top-image {
  max-width: 150px;
  margin-bottom: 1rem;
}

.select-text {
  margin-bottom: 1.5rem;
  font-size: 16px;
  line-height: 1.4;
  max-width: 90%;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}

.underline-one {
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.underline-one:hover {
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    url('../img/der6.jpg');
  transform: scale(1.03);
}

.log-kab {
  width: 20px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
}

.btn-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.error {
  color: rgb(132, 14, 14);
  margin: 0.5rem 0;
}

/* 📱 Мобильная адаптация */
@media (max-width: 600px) {
  .modal-content {
    padding: 1rem;
    width: 100%;
    height: auto;
    max-height: 90%;
    border-radius: 8px;
  }

  .inp {
    max-width: 100%;
    font-size: 14px;
    height: 38px;
  }

  .underline-one {
    font-size: 14px;
    padding: 8px 16px;
  }

  .top-image {
    max-width: 100px;
  }

  .cat-img {
    top: -35px;
    width: 45px;
  }

  .zag {
    font-size: 20px;
  }
}
</style>