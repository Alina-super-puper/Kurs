<script setup>
import { reactive } from 'vue';

const propsmodel = defineProps({
    textmodel: null,
})


const emit3 = defineEmits([
    "CloseModel"
])

function ich() {
    emit3("CloseModel")
}
</script>
<template>
    <div class="mod1">
        <div class="mod-main">
            <h2 class="mod1h3">Корзина пуста, невозможно перейти к оформлению.</h2>
            <br><br><br>
            <button class="underline-one" @click="ich()">ОК</button>
        </div>
        <div class="modal-back"></div>
    </div>
</template>
<style scoped>
@font-face {
    font-family: H;
    src: url(../styles/tu.otf);
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
    url('../img/der6.jpg'); /* полупрозрачный тёмный слой + текстура */
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
    url('../img/der6.jpg'); /* уменьшаем затемнение при наведении */
  transform: scale(1.03);
}
     
h2{
    font-size: 20;
    margin-right: 0px;
    margin-top: 100px;
}
.mod1 {
     position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(9, 42, 14, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; 
 
}

.mod-main {
     position: relative; 
  background: #e8f4ee;
  padding: 2rem;
  border-radius: 10px;
  width: 500px;
  height: 400px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  color: #2c5140;
}

.mod1h3,
.mod1btn {
    z-index: 10001;
    position: relative;
}

</style>