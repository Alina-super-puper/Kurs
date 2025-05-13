/// src/composables/useUsers.js
import { ref, watch } from 'vue'

const users = ref([])
// МАССИВ ПОЛЬЗОВАТЕЛЬ
try {
  const saved = localStorage.getItem('users')
  users.value = saved ? JSON.parse(saved) : []
} catch (error) {
  console.error('Error loading users:', error)
  users.value = []
}
// СЛЕДИТ СОХРАНЯЕТ АКТУАЛОЧКУ 
watch(users, (newVal) => {
  localStorage.setItem('users', JSON.stringify(newVal))
}, { deep: true })
// ДОБАВЛЯЕМ НОАВОГО ПОЛЬЗОВАТЕЛЯ
function addUser(name, password, phone) {
  if (findUserByName(name)) {
    throw new Error('Пользователь с таким именем уже существует')
  }
  if (findUserByPhone(phone)) {
    throw new Error('Пользователь с таким телефоном уже существует')
  }
  // ВЫЧИСЛЯЕМ АЙДИШКУ
  const id = users.value.length ? users.value[users.value.length - 1].id + 1 : 1
  users.value.push({ id, name, password, phone })
}
// ИЩЕТ ПОЛЬЗОВАТЕЛЕЙ ЕСЛИ ЧЕ ВОЗВРАЩАЕТ ЧТОБ ЗНАЛИ ЧТО ТАКОВ ЕСТЬ
function findUserByName(name) {
  return users.value.find(user => user.name === name)
}
// ПО ТЕЛЕФОНУ
function findUserByPhone(phone) {
  return users.value.find(user => user.phone === phone)
}
// ПО ПАРОЛЮ
function getUserById(id) {
  return users.value.find(user => user.id === id)
}
// ПО АЙДИ
function getUserByPassword(password) {
  return users.value.find(user => user.password === password)
}
// ОТПРАВЛЯЕМ УСЕ ЕТО ТУДААААА
export function useUsers() {
  return {
    users,
    addUser,
    findUserByName,
    findUserByPhone,
    getUserById,
    getUserByPassword
  }
}      

