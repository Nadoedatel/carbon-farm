<script setup lang="ts">
/** Навигационные ссылки с привязкой к секциям */
const NAV_LINKS = [
  { label: 'О проекте', href: '#about', sectionId: 'about' },
  { label: 'Деревья', href: '#trees', sectionId: 'trees' },
  { label: 'Наши фермы', href: '#farms', sectionId: 'farms' },
  { label: 'Контакты', href: '#contact', sectionId: 'contact' },
] as const

const isMenuOpen = ref(false)
const activeSection = ref('')

function handleMenuToggle(): void {
  isMenuOpen.value = !isMenuOpen.value
}

function handleNavClick(): void {
  isMenuOpen.value = false
}

/** Подсветка активного пункта при скролле через IntersectionObserver */
const observers: IntersectionObserver[] = []

onMounted(() => {
  NAV_LINKS.forEach(({ sectionId }) => {
    const el = document.getElementById(sectionId)
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection.value = sectionId
          }
        })
      },
      // Секция считается активной когда её верхняя треть в зоне видимости
      { threshold: 0.3 },
    )

    observer.observe(el)
    observers.push(observer)
  })
})

onUnmounted(() => {
  observers.forEach(o => o.disconnect())
})
</script>

<template>
  <header class="the-header">
    <div class="the-header__container">
      <a href="#" class="the-header__logo">
        <span class="the-header__logo-icon">🌲</span>
        <span class="the-header__logo-text">Карбоновая ферма</span>
      </a>

      <nav class="the-header__nav" :class="{ 'the-header__nav_open': isMenuOpen }">
        <a
          v-for="link in NAV_LINKS"
          :key="link.href"
          :href="link.href"
          class="the-header__nav-link"
          :class="{ 'the-header__nav-link_active': activeSection === link.sectionId }"
          @click="handleNavClick"
        >
          {{ link.label }}
        </a>
      </nav>

      <UButton
        class="the-header__cta"
        color="primary"
        size="md"
        as="a"
        href="#contact"
        @click="handleNavClick"
      >
        Получить консультацию
      </UButton>

      <button
        class="the-header__burger"
        :class="{ 'the-header__burger_open': isMenuOpen }"
        :aria-expanded="isMenuOpen"
        aria-label="Открыть меню"
        @click="handleMenuToggle"
      >
        <span class="the-header__burger-line" />
        <span class="the-header__burger-line" />
        <span class="the-header__burger-line" />
      </button>
    </div>
  </header>
</template>

<style scoped>
.the-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-surface-dark);
}

.the-header__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 4rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.the-header__logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--color-primary-dark);
  font-weight: var(--font-weight-bold);
  font-size: 1.125rem;
  user-select: none;
  flex-shrink: 0;
}

.the-header__logo:hover {
  color: var(--color-primary);
}

.the-header__logo-icon {
  font-size: 1.5rem;
}

.the-header__nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
}

.the-header__nav-link {
  padding: 0.4rem 0.75rem;
  border-radius: 0.5rem;
  color: #4a4a4a;
  text-decoration: none;
  font-size: var(--font-size-body-sm);
  user-select: none;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}

.the-header__nav-link:hover {
  color: var(--color-primary);
  background: var(--color-surface);
}

.the-header__nav-link_active {
  color: var(--color-primary);
  background: var(--color-surface);
  font-weight: var(--font-weight-semibold);
}

.the-header__cta {
  flex-shrink: 0;
}

/* ===== БУРГЕР ===== */
.the-header__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 0.4rem;
  background: none;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
}

.the-header__burger-line {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-primary-dark);
  border-radius: 2px;
  transition: transform 0.25s ease, opacity 0.25s ease;
  transform-origin: center;
}

/* Анимация в крестик */
.the-header__burger_open .the-header__burger-line:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.the-header__burger_open .the-header__burger-line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.the-header__burger_open .the-header__burger-line:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 768px) {
  .the-header__burger {
    display: flex;
  }

  .the-header__cta {
    display: none;
  }

  .the-header__nav {
    display: none;
    position: absolute;
    top: 4rem;
    left: 0;
    right: 0;
    flex-direction: column;
    background: white;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--color-surface-dark);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    gap: 0.25rem;
  }

  .the-header__nav_open {
    display: flex;
  }

  .the-header__nav-link {
    width: 100%;
    padding: 0.75rem 1rem;
  }
}
</style>
