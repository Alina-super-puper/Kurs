<template>
  <div class="about-page">
    
    <h2>О нас</h2>
    
   
    <p class="text">
      <strong>Le Paw</strong> — это больше, чем просто зоомагазин.  
      Это место, где любовь к животным превращается в заботу о каждой лапке и каждом хвостике.
      <br /><br />
      Наша история началась с мечты: создать пространство, где каждый питомец найдет лучшее.  
      Где забота будет искренней, а качество — безупречным.  
      Сегодня Le Paw — это команда людей, которые искренне любят животных и знают, что они заслуживают только лучшего.
    </p>

    <!-- <img class="flo" src="../img/bady.jfif" alt=""> -->

    <h4>Наши ценности</h4>
    <ul class="text">
      <li>
        <b>Любовь к животным:</b> мы считаем, что каждый питомец — полноценный член семьи. Всё, что мы делаем, мы делаем с заботой и вниманием к их нуждам.
      </li>
      <li>
        <b>Качество без компромиссов:</b> мы тщательно отбираем товары: проверяем состав кормов, тестируем прочность игрушек, следим за безопасностью каждой детали.
      </li>
      <li>
        <b>Честность и открытость:</b> мы всегда готовы помочь советом и подобрать лучший товар именно для вашего любимца, а не продать что угодно.
      </li>
      <li>
        <b>Ответственное отношение:</b> мы поддерживаем осознанное отношение к животным: правильное питание, регулярный уход и заботу.
      </li>
    </ul>

    <h4>Наши поставщики</h4>
    <p class="text">
      Мы сотрудничаем только с проверенными и надежными производителями, которые разделяют наши ценности.  
      Каждый бренд, который представлен на полках Le Paw, проходит строгий отбор:
    </p>
    <ul class="text">
      <li>Использование экологичных материалов и натуральных ингредиентов;</li>
      <li>Тестирование качества продукции на всех этапах производства;</li>
      <li>Репутация среди ветеринаров и владельцев животных.</li>
    </ul>
    <p class="text">
      Мы работаем с лучшими российскими и зарубежными брендами, чтобы вы могли быть уверены в каждом корме, каждой игрушке, каждой подстилке.
    </p>

    <h2 style="margin-top: 50px;">Наш магазин</h2>
    <hr />
    <div class="store-info">
      <div class="store-text">
        <h4>Адрес</h4>
        <p class="text">Парашютная ул., 61, корп. 1, Санкт-Петербург</p>

        <h4>Часы работы</h4>
        <p class="text">Пн–Сб: 10:00 — 20:00<br />Вс: 11:00 — 18:00</p>

        <h4>Контакты</h4>
        <p class="text">
          Телефон: +7 (999) 123-45-67<br />
          Email: info@lepaw.ru
        </p>
      </div>

      <div class="store-map">
        <iframe
          src="https://yandex.ru/map-widget/v1/?ll=30.250427%2C60.035579&z=16&pt=30.250427,60.035579,pm2rdl"
          width="100%"
          height="400"
          frameborder="0"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: H;
  src: url(../styles/tu.otf);
}

.about-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Helvetica, sans-serif;
  color: #333;
  line-height: 1.6;
}

h1, h2, h3, h4 {
  font-family: H;
  color: #1c5d30;
  margin-bottom: 0.5rem;
}

hr,    
hr:before,
hr:after {
    content: "";
    background: #005721;
    display: block;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    position: absolute;
    animation: anim-hr 6s linear infinite;
    border: 0;
    overflow: visible;
}
hr:before {
    left: -32px;
}
hr:after {
    left: 32px;
}
hr {
    position: relative;
    margin: 30px auto;
}

.text {
  font-size: 18px;
  margin-bottom: 1.5rem;
}

ul.text {
  padding-left: 1.5rem;
  list-style: disc;
}

ul.text li {
  margin-bottom: 1rem;
}

.store-info {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  background: #f6f9f6;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  margin-top: 2rem;
}

.store-text {
  flex: 1;
  min-width: 250px;
}

.store-text h4 {
  margin-top: 1rem;
  margin-bottom: 0.25rem;
}

.store-text p {
  margin: 0 0 1rem;
}

.store-map {
  flex: 2;
  min-width: 300px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

iframe {
  border: none;
  width: 100%;
  height: 100%;
  min-height: 300px;
  border-radius: 12px;
}

.flo {
  float: right;
  width: 700px;
  border-radius: 12px;
  margin-left: 2rem;
}
</style>
