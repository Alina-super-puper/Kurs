// useCart.js
import { ref, watch } from 'vue'

const favorites = ref([])
let currentUser = null

function initFavorites(userName) {
  currentUser = userName
  const saved = localStorage.getItem(`favorites_${userName}`)
  favorites.value = saved ? JSON.parse(saved) : []
}

watch(favorites, (newVal) => {
  if (currentUser) {
    localStorage.setItem(`favorites_${currentUser}`, JSON.stringify(newVal))
  }
}, { deep: true })

export function useLove() {
  const addToFavorites = (product) => {
    const exists = favorites.value.find(p => p.id === product.id)
    if (!exists) {
      favorites.value.push({ ...product, quantity: 1 })
    }
  }

  const removeFromFavorites = (id) => {
    favorites.value = favorites.value.filter(p => p.id !== id)
  }

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    initFavorites
  }
}