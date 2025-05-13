<template>
  <div class="faq" id="ask-section">
    <h1 style="color: green;">Часто задаваемые вопросы</h1>

    <div v-for="(item, index) in faqList" :key="index" class="faq-item">
      <div @click="toggle(index)" class="question">
        {{ item.question }}
      </div>
      <div v-show="item.open" class="answer">
        {{ item.answer }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const faqList = ref([
  { question: 'Какие товары для кошек у вас есть?', answer: 'У нас есть корма, игрушки, лежанки и многое другое!', open: false },
  { question: 'Как оформить доставку?', answer: 'Вы можете оформить доставку при оформлении заказа на сайте или по телефону.', open: false },
  { question: 'Работаете ли вы в выходные?', answer: 'Да, наш магазин открыт каждый день с 10:00 до 21:00.', open: false },
  { question: 'Можно ли привезти питомца в магазин?', answer: 'Конечно! Мы всегда рады гостям на четырех лапах (и не только!). Только убедитесь, что питомец находится под контролем (на поводке или в переноске).', open: false },
  { question: 'Какие корма вы продаете?', answer: 'Мы предлагаем корма только проверенных брендов, включая премиальные и супер-премиальные линии. Всегда поможем подобрать питание под индивидуальные потребности вашего любимца.', open: false },
  { question: 'Можно ли вернуть или обменять товар?', answer: 'Да, возврат и обмен возможен в течение 14 дней при наличии чека и сохранении товарного вида упаковки.', open: false },
  { question: 'Где находится ваш магазин?', answer: 'Наш адрес: Санкт-Петербург, Парашютная ул., 61, корп. 1. Удобный подъезд и парковка!', open: false },
  { question: 'Предоставляете ли вы консультации по выбору товаров?', answer: 'Конечно! Наши специалисты всегда помогут подобрать лучшее питание, аксессуары и товары для здоровья вашего питомца.', open: false },
  { question: 'Как узнать о новых поступлениях и акциях?', answer: 'Подпишитесь на нашу рассылку или следите за новостями в соцсетях — мы регулярно обновляем информацию о новинках и выгодных предложениях!', open: false },
  
])

function toggle(index) {
  faqList.value[index].open = !faqList.value[index].open
}
</script>

<style scoped>
.faq {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: H;
}

.faq-item {
  border-bottom: 1px solid #ccc;
  padding: 1rem 0;
}

.question {
  font-weight: bold;
  cursor: pointer;
  color: #004413;
  transition: 0.3s;
}

.question:hover {
  color: #379683;
}

.answer {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  margin-top: 0.5rem;
  color: #546d50;
  transition: all 0.3s ease;
}
</style>