// useCart.js
import { ref, computed, watch } from 'vue'

const cartItems = ref([])
let currentUser = null

function initCart(userName) {
  currentUser = userName
  const savedCart = localStorage.getItem(`cartItems_${userName}`)
  cartItems.value = savedCart ? JSON.parse(savedCart) : []
}

watch(cartItems, (newCart) => {
  if (currentUser) {
    localStorage.setItem(`cartItems_${currentUser}`, JSON.stringify(newCart))
  }
}, { deep: true })

export function useCart() {
  const addToCart = (product) => {
    const existing = cartItems.value.find(p => p.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      cartItems.value.push({ ...product, quantity: 1 })
    }
  }

  const removeFromCart = (id) => {
    cartItems.value = cartItems.value.filter(p => p.id !== id)
  }

  const updateQuantity = (id, qty) => {
    const item = cartItems.value.find(p => p.id === id)
    if (item && qty > 0) {
      item.quantity = qty
    }
  }

  const total = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.rubli * item.quantity, 0)
  )

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    total,
    initCart
  }
}