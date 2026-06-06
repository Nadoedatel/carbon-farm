<script setup lang="ts">
const SUPPORT_TEXT = 'Проект реализован при поддержке Фонда содействия инновациям в рамках программы «Студенческий стартап» мероприятия «Платформа университетского технологического предпринимательства» федерального проекта «Технологии».'

const FOOTER_LINKS = [
  { label: 'О проекте', href: '#about' },
  { label: 'Деревья', href: '#trees' },
  { label: 'Наши фермы', href: '#farms' },
  { label: 'Контакты', href: '#contact' },
] as const

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="the-footer">
    <div class="the-footer__container">
      <div class="the-footer__top">
        <div class="the-footer__brand">
          <a href="#" class="the-footer__logo">
            <span>🌲</span>
            <span>Карбоновая ферма</span>
          </a>
          <p class="the-footer__tagline">
            Создаём леса, поглощающие углерод. Для планеты и будущих поколений.
          </p>
        </div>

        <nav class="the-footer__nav" aria-label="Навигация в подвале">
          <h3 class="the-footer__nav-title">
            Навигация
          </h3>
          <ul class="the-footer__nav-list">
            <li v-for="link in FOOTER_LINKS" :key="link.href">
              <a :href="link.href" class="the-footer__nav-link">{{ link.label }}</a>
            </li>
          </ul>
        </nav>

        <div class="the-footer__contact">
          <h3 class="the-footer__nav-title">
            Контакты
          </h3>
          <a href="tel:+78001234567" class="the-footer__contact-link">
            📞 8 (800) 123-45-67
          </a>
          <a href="mailto:info@carbonfarm.ru" class="the-footer__contact-link">
            ✉️ info@carbonfarm.ru
          </a>
        </div>
      </div>

      <div class="the-footer__divider" />

      <div class="the-footer__support">
        <div class="the-footer__support-logos">
          <div class="the-footer__support-logo-wrap">
            <NuxtImg
              src="/fond-sodeystviya-innovatsiyam.png"
              alt="Фонд содействия инновациям"
              loading="lazy"
              class="the-footer__support-logo"
            />
          </div>
          <div class="the-footer__support-logo-wrap">
            <NuxtImg
              src="/platforma-predprinimatelstva.png"
              alt="Платформа университетского технологического предпринимательства"
              loading="lazy"
              class="the-footer__support-logo"
            />
          </div>
        </div>
        <p class="the-footer__support-text">
          {{ SUPPORT_TEXT }}
        </p>
      </div>

      <div class="the-footer__bottom">
        <p class="the-footer__copyright">
          © {{ currentYear }} Карбоновая ферма. Все права защищены.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.the-footer {
  background: var(--color-primary-dark);
  color: rgba(255, 255, 255, 0.85);
  margin-top: 5rem;
}

.the-footer__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 1.5rem 2rem;
}

.the-footer__top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2.5rem;
}

.the-footer__logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: white;
  font-weight: var(--font-weight-bold);
  font-size: 1.125rem;
  margin-bottom: 0.75rem;
  user-select: none;
}

.the-footer__logo:hover {
  color: rgba(255, 255, 255, 0.8);
}

.the-footer__tagline {
  font-size: var(--font-size-body-sm);
  line-height: var(--line-height-normal);
  color: rgba(255, 255, 255, 0.6);
  max-width: 28rem;
}

.the-footer__nav-title {
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.75rem;
}

.the-footer__nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.the-footer__nav-link {
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  font-size: var(--font-size-body-sm);
  cursor: pointer;
  user-select: none;
  transition: color 0.2s;
}

.the-footer__nav-link:hover {
  color: white;
}

.the-footer__contact {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.the-footer__contact-link {
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  font-size: var(--font-size-body-sm);
  cursor: pointer;
  transition: color 0.2s;
}

.the-footer__contact-link:hover {
  color: white;
}

.the-footer__divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.12);
  margin-bottom: 1.5rem;
}

.the-footer__support {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.the-footer__support-logos {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.the-footer__support-logo-wrap {
  background: white;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.the-footer__support-logo {
  height: 8rem;
  width: auto;
  object-fit: contain;
  display: block;
}

.the-footer__support-text {
  font-size: var(--font-size-caption);
  line-height: var(--line-height-relaxed);
  color: rgba(255, 255, 255, 0.5);
}

.the-footer__bottom {
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.the-footer__copyright {
  font-size: var(--font-size-caption);
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
}

@media (max-width: 768px) {
  .the-footer__top {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .the-footer__support {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
