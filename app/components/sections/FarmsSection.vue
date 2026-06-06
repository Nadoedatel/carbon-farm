<script setup lang="ts">
import { FARMS } from '~/constants/farms'
</script>

<template>
  <section class="farms-section" id="farms">
    <div class="farms-section__container">
      <header class="farms-section__header">
        <p class="farms-section__label">
          Портфолио
        </p>
        <h2 class="farms-section__title">
          Реализованные фермы
        </h2>
        <p class="farms-section__subtitle">
          Каждая ферма — это живой проект, который продолжает работать на климат. Смотрите, что мы уже сделали.
        </p>
      </header>

      <div class="farms-section__list">
        <article
          v-for="farm in FARMS"
          :key="farm.id"
          class="farm-card"
        >
          <div class="farm-card__left">
            <div class="farm-card__year-badge">
              {{ farm.year }}
            </div>
            <h3 class="farm-card__name">
              «{{ farm.name }}»
            </h3>
            <p class="farm-card__region">
              📍 {{ farm.region }}
            </p>
            <p class="farm-card__desc">
              {{ farm.description }}
            </p>
            <div class="farm-card__species">
              <span
                v-for="species in farm.species"
                :key="species"
                class="farm-card__species-tag"
              >{{ species }}</span>
            </div>
          </div>

          <div class="farm-card__right">
            <div class="farm-card__stat">
              <span class="farm-card__stat-value">{{ formatNumber(farm.treesCount) }}</span>
              <span class="farm-card__stat-label">деревьев</span>
            </div>
            <div class="farm-card__stat">
              <span class="farm-card__stat-value">{{ farm.area }} га</span>
              <span class="farm-card__stat-label">площадь</span>
            </div>
            <div class="farm-card__stat farm-card__stat_accent">
              <span class="farm-card__stat-value">{{ formatNumber(farm.co2Annual) }} кг</span>
              <span class="farm-card__stat-label">CO₂ в год</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.farms-section {
  padding: 5rem 0;
  background: var(--color-surface);
}

.farms-section__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.farms-section__header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.farms-section__label {
  font-size: var(--font-size-body-sm);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.farms-section__title {
  font-size: clamp(var(--font-size-h2), 3vw, 2.5rem);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-dark);
  margin-bottom: 1rem;
}

.farms-section__subtitle {
  font-size: var(--font-size-body);
  line-height: var(--line-height-relaxed);
  color: #555;
  max-width: 44rem;
  margin: 0 auto;
}

.farms-section__list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.farm-card {
  background: white;
  border: 1px solid var(--color-surface-dark);
  border-radius: 1rem;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 3rem;
  align-items: start;
  transition: box-shadow 0.2s;
}

.farm-card:hover {
  box-shadow: 0 8px 24px rgba(26, 92, 56, 0.1);
}

.farm-card__year-badge {
  display: inline-flex;
  align-items: center;
  background: var(--color-surface);
  border: 1px solid var(--color-surface-dark);
  color: var(--color-primary);
  font-size: var(--font-size-body-sm);
  font-weight: var(--font-weight-semibold);
  padding: 0.25rem 0.75rem;
  border-radius: 2rem;
  margin-bottom: 0.75rem;
  user-select: none;
}

.farm-card__name {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-dark);
  margin-bottom: 0.375rem;
}

.farm-card__region {
  font-size: var(--font-size-body-sm);
  color: #777;
  margin-bottom: 1rem;
}

.farm-card__desc {
  font-size: var(--font-size-body-sm);
  line-height: var(--line-height-relaxed);
  color: #555;
  margin-bottom: 1.25rem;
  max-width: 40rem;
}

.farm-card__species {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.farm-card__species-tag {
  background: var(--color-surface);
  border: 1px solid var(--color-surface-dark);
  color: var(--color-primary);
  font-size: var(--font-size-caption);
  padding: 0.25rem 0.625rem;
  border-radius: 0.375rem;
  user-select: none;
}

.farm-card__right {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-width: 10rem;
}

.farm-card__stat {
  text-align: right;
}

.farm-card__stat_accent .farm-card__stat-value {
  color: var(--color-primary);
}

.farm-card__stat-value {
  display: block;
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-dark);
  line-height: 1.2;
}

.farm-card__stat-label {
  font-size: var(--font-size-caption);
  color: #888;
}

@media (max-width: 768px) {
  .farms-section {
    padding: 3rem 0;
  }

  .farm-card {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .farm-card__right {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .farm-card__stat {
    text-align: left;
  }
}
</style>
