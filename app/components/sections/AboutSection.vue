<script setup lang="ts">
import { BENEFITS, STEPS } from '~/constants/about'
</script>

<template>
  <section class="about-section" id="about">
    <div class="about-section__container">
      <header class="about-section__header">
        <p class="about-section__label">
          Что такое
        </p>
        <h2 class="about-section__title">
          Карбоновая ферма
        </h2>
        <p class="about-section__subtitle">
          Карбоновая ферма — это управляемый лесной массив, созданный специально для поглощения углекислого газа из атмосферы.
          Это не просто лесопосадка — это точно рассчитанная экосистема с измеримым климатическим эффектом.
        </p>
      </header>

      <div class="about-section__benefits">
        <div
          v-for="benefit in BENEFITS"
          :key="benefit.id"
          class="about-section__benefit"
        >
          <span class="about-section__benefit-icon">{{ benefit.icon }}</span>
          <h3 class="about-section__benefit-title">
            {{ benefit.title }}
          </h3>
          <p class="about-section__benefit-text">
            {{ benefit.text }}
          </p>
        </div>
      </div>

      <div class="about-section__how">
        <h2 class="about-section__how-title">
          Как это работает
        </h2>
        <div class="about-section__steps">
          <div
            v-for="step in STEPS"
            :key="step.id"
            class="about-section__step"
          >
            <div class="about-section__step-number">
              {{ step.id }}
            </div>
            <h3 class="about-section__step-title">
              {{ step.title }}
            </h3>
            <p class="about-section__step-text">
              {{ step.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  padding: 5rem 0;
}

.about-section__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.about-section__header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.about-section__label {
  font-size: var(--font-size-body-sm);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.about-section__title {
  font-size: clamp(var(--font-size-h2), 3vw, 2.5rem);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-dark);
  margin-bottom: 1rem;
}

.about-section__subtitle {
  font-size: var(--font-size-body);
  line-height: var(--line-height-relaxed);
  color: #555;
  max-width: 44rem;
  margin: 0 auto;
}

.about-section__benefits {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 5rem;
}

.about-section__benefit {
  background: white;
  border: 1px solid var(--color-surface-dark);
  border-radius: 1rem;
  padding: 1.75rem;
  text-align: center;
  transition: box-shadow 0.2s, transform 0.2s;
}

.about-section__benefit:hover {
  box-shadow: 0 8px 24px rgba(26, 92, 56, 0.1);
  transform: translateY(-2px);
}

.about-section__benefit-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 1rem;
}

.about-section__benefit-title {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-dark);
  margin-bottom: 0.75rem;
}

.about-section__benefit-text {
  font-size: var(--font-size-body-sm);
  line-height: var(--line-height-normal);
  color: #666;
}

.about-section__how {
  background: var(--color-primary-dark);
  border-radius: 1.5rem;
  padding: 3rem;
  color: white;
}

.about-section__how-title {
  font-size: clamp(var(--font-size-h2), 2.5vw, 2rem);
  font-weight: var(--font-weight-bold);
  text-align: center;
  margin-bottom: 2.5rem;
}

.about-section__steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.about-section__step {
  position: relative;
}

.about-section__step-number {
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(168, 240, 198, 0.2);
  border: 2px solid #a8f0c6;
  color: #a8f0c6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.about-section__step-title {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-bold);
  margin-bottom: 0.5rem;
  color: white;
}

.about-section__step-text {
  font-size: var(--font-size-body-sm);
  line-height: var(--line-height-normal);
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 1024px) {
  .about-section__benefits {
    grid-template-columns: repeat(2, 1fr);
  }

  .about-section__steps {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .about-section {
    padding: 3rem 0;
  }

  .about-section__benefits {
    grid-template-columns: 1fr;
  }

  .about-section__how {
    padding: 2rem 1.25rem;
  }

  .about-section__steps {
    grid-template-columns: 1fr;
  }
}
</style>
