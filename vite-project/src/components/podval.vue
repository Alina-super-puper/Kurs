<script setup>
</script>
<template>
  <div class="main-container">
    <!-- Основной контент страницы -->
    <div class="content">
      <!-- Все твои текущие компоненты тут (как твою страницу пользователя и заказы) -->
    </div>

    <!-- Подвал -->
    <footer class="site-footer">
      <div class="footer-content">
        <div class="footer-info">
          <h4>Связаться с нами</h4>
          <p>
            <img style="width: 30px; margin-right: 10px;" src="../img/tele.png" alt="">
            <a href="tel:+79991234567">+7 (999) 123-45-67</a>
          </p>
          <p>
            <img style="width: 30px; margin-right: 10px;" src="../img/email.png" alt="">
            <a href="mailto:info@example.com">info@example.com</a>
          </p>
        </div>
        <div class="footer-socials">
          <h4>Мы в соцсетях</h4>
          <div class="icons">
            <a href="" target="_blank"><i class="fa fa-vk"></i></a>
            <a href="#" target="_blank"><i class="fa fa-telegram"></i></a>
            <a href="#" target="_blank"><i class="fa fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 PetStore. Все права защищены.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.site-footer {
  background: #2c5140;
  color: #fff;
  padding: 2rem 1rem;
  font-family: Arial, sans-serif;
  border-radius: 1rem 1rem 0 0;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-info, .footer-socials {
  flex: 1 1 300px;
}

.footer-info h4, .footer-socials h4 {
  font-size: 20px;
  margin-bottom: 1rem;
  border-bottom: 2px solid #fff;
  padding-bottom: 0.5rem;
}

.footer-info p {
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  font-size: 16px;
}

.footer-info img {
  width: 24px;
  margin-right: 10px;
  filter: brightness(1.1);
}

.footer-info a, .footer-socials a {
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-info a:hover, .footer-socials a:hover {
  color: #c9f7c2;
  text-decoration: underline;
}

.footer-socials .icons {
  display: flex;
  gap: 1rem;
}

.footer-socials .icons a {
  font-size: 24px;
  color: #fff;
  transition: transform 0.3s ease, color 0.3s ease;
}

.footer-socials .icons a:hover {
  transform: scale(1.2);
  color: #9ee8af;
}

.footer-bottom {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  font-size: 14px;
  border-top: 1px solid rgba(255,255,255,0.2);
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .footer-info, .footer-socials {
    flex: 1 1 100%;
  }

  .footer-info p {
    justify-content: center;
  }

  .footer-socials .icons {
    justify-content: center;
  }
}
</style>