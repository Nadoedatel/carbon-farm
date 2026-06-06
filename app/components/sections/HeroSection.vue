<script setup lang="ts">
import { HERO_STATS } from '~/constants/about'
</script>

<template>
  <section class="hero-section" id="hero">
    <div class="hero-section__container">
      <div class="hero-section__content">
        <div class="hero-section__badge">
          🌱 Карбоновое земледелие
        </div>
        <h1 class="hero-section__title">
          Карбоновые фермы<br>
          <span class="hero-section__title-accent">для чистого будущего</span>
        </h1>
        <p class="hero-section__description">
          Создаём управляемые лесные угодья, которые поглощают углекислый газ и компенсируют выбросы предприятий.
          Каждое дерево — вклад в климатическое равновесие планеты.
        </p>
        <div class="hero-section__actions">
          <UButton size="lg" as="a" href="#contact" color="primary">
            Заказать консультацию
          </UButton>
          <UButton size="lg" variant="outline" as="a" href="#about" color="primary">
            Узнать больше
          </UButton>
        </div>
      </div>

      <div class="hero-section__visual">
        <div class="hero-section__circle hero-section__circle_1" />
        <div class="hero-section__circle hero-section__circle_2" />
        <div class="hero-section__illustration">
          <span class="hero-section__tree hero-section__tree_1">🌲</span>
          <span class="hero-section__tree hero-section__tree_2">🌳</span>
          <span class="hero-section__tree hero-section__tree_3">🌲</span>
          <span class="hero-section__tree hero-section__tree_4">🌳</span>
          <span class="hero-section__tree hero-section__tree_5">🌲</span>
        </div>
      </div>
    </div>

    <div class="hero-section__stats">
      <div class="hero-section__stats-container">
        <div
          v-for="stat in HERO_STATS"
          :key="stat.label"
          class="hero-section__stat"
        >
          <span class="hero-section__stat-value">{{ stat.value }}</span>
          <span class="hero-section__stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 60%, var(--color-primary-light) 100%);
  color: white;
  overflow: hidden;
}

.hero-section__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 5rem 1.5rem 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
}

.hero-section__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 0.4rem 1rem;
  border-radius: 2rem;
  font-size: var(--font-size-body-sm);
  margin-bottom: 1.5rem;
  width: fit-content;
}

.hero-section__title {
  font-size: clamp(var(--font-size-h1), 4vw, 3rem);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  margin-bottom: 1.25rem;
}

.hero-section__title-accent {
  color: #a8f0c6;
}

.hero-section__description {
  font-size: var(--font-size-body);
  line-height: var(--line-height-relaxed);
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 2rem;
  max-width: 32rem;
}

.hero-section__actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-section__visual {
  position: relative;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-section__circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.12;
}

.hero-section__circle_1 {
  width: 320px;
  height: 320px;
  background: white;
  top: -40px;
  right: -40px;
}

.hero-section__circle_2 {
  width: 200px;
  height: 200px;
  background: #a8f0c6;
  bottom: 20px;
  left: 20px;
}

.hero-section__illustration {
  position: relative;
  width: 280px;
  height: 200px;
}

.hero-section__tree {
  position: absolute;
  line-height: 1;
}

.hero-section__tree_1 { font-size: 5rem; left: 0; bottom: 0; }
.hero-section__tree_2 { font-size: 7rem; left: 60px; bottom: 0; }
.hero-section__tree_3 { font-size: 4rem; left: 150px; bottom: 0; }
.hero-section__tree_4 { font-size: 6rem; left: 190px; bottom: 0; }
.hero-section__tree_5 { font-size: 3.5rem; left: 245px; bottom: 0; }

.hero-section__stats {
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.hero-section__stats-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.75rem 1.5rem;
  display: flex;
  gap: 3rem;
  justify-content: center;
}

.hero-section__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.hero-section__stat-value {
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-bold);
  color: #a8f0c6;
}

.hero-section__stat-label {
  font-size: var(--font-size-body-sm);
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 768px) {
  .hero-section__container {
    grid-template-columns: 1fr;
    padding: 3rem 1.5rem 2.5rem;
    gap: 2rem;
  }

  .hero-section__visual {
    display: none;
  }

  .hero-section__stats-container {
    gap: 2rem;
    flex-wrap: wrap;
  }
}
</style>
