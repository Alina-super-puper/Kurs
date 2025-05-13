<template>

  < <div class="about-page">
    
    <h2 style="margin-top: 50px; color:  #2c5140;">Контакты</h2>
    <hr>
    <div class="store-info">
      <div class="store-text">
        <h4>Адрес</h4>
        <p class="text">Парашютная ул., 61, корп. 1, Санкт-Петербург</p>

        <h4>Часы работы</h4>
        <p class="text">Пн–Сб: 10:00 — 20:00<br>Вс: 11:00 — 18:00</p>

        <h4 >Контакты</h4>
        <p class="text">Телефон: +7 (999) 123-45-67<br>Email: info@lepaw.ru</p>
      </div>

      <div class="store-map">
        <iframe src="https://yandex.ru/map-widget/v1/?ll=30.250427%2C60.035579&z=16&pt=30.250427,60.035579,pm2rdl"
          width="100%" height="400" frameborder="0"></iframe>
      </div>
    </div>
    </div>
</template>

<style scoped>
.flo{
  float: right;
  width: 700px;
  
}
.text{
  width: 1000px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
   
}
.about-page {
  padding: 2rem;
  font-family: H, sans-serif;
}

.store-info {
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
  gap: 2rem;
}

.store-text {
  flex: 1;
  min-width: 250px;
}

.store-map {
  flex: 2;
  min-width: 300px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

h1, h2, h3, h4 {
  color:  #2c5140;
  font-family: H, sans-serif;
}
</style>