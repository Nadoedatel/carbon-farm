<script setup lang="ts">
import { TREES } from '~/constants/trees'
</script>

<template>
  <section class="trees-section" id="trees">
    <div class="trees-section__container">
      <header class="trees-section__header">
        <p class="trees-section__label">
          Каталог
        </p>
        <h2 class="trees-section__title">
          Виды деревьев и цены
        </h2>
        <p class="trees-section__subtitle">
          Подбираем состав деревьев под климатические условия вашего региона и задачи фермы.
          Цены указаны за одно дерево с посадкой.
        </p>
      </header>

      <div class="trees-section__grid">
        <article
          v-for="tree in TREES"
          :key="tree.id"
          class="tree-card"
        >
          <div class="tree-card__top">
            <div class="tree-card__badges">
              <span
                v-if="tree.badge"
                class="tree-card__badge"
              >{{ tree.badge }}</span>
            </div>
            <span class="tree-card__icon">🌳</span>
          </div>

          <div class="tree-card__body">
            <h3 class="tree-card__name">
              {{ tree.name }}
            </h3>
            <p class="tree-card__latin">
              {{ tree.latinName }}
            </p>
            <p class="tree-card__desc">
              {{ tree.description }}
            </p>
          </div>

          <div class="tree-card__stats">
            <div class="tree-card__stat">
              <span class="tree-card__stat-icon">💨</span>
              <div>
                <span class="tree-card__stat-value">{{ tree.co2PerYear }} кг</span>
                <span class="tree-card__stat-label">CO₂ в год</span>
              </div>
            </div>
            <div class="tree-card__stat">
              <span class="tree-card__stat-icon">⏳</span>
              <div>
                <span class="tree-card__stat-value">до {{ tree.lifespan }} лет</span>
                <span class="tree-card__stat-label">жизнеспособность</span>
              </div>
            </div>
          </div>

          <div class="tree-card__footer">
            <span class="tree-card__price">{{ formatPrice(tree.price) }}</span>
            <UButton
              variant="outline"
              color="primary"
              size="sm"
              as="a"
              href="#contact"
            >
              Заказать
            </UButton>
          </div>
        </article>
      </div>

      <div class="trees-section__cta">
        <p>Не знаете, какие деревья выбрать?</p>
        <UButton size="lg" color="primary" as="a" href="#contact">
          Получить бесплатную консультацию
        </UButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trees-section {
  padding: 5rem 0;
  background: white;
}

.trees-section__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.trees-section__header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.trees-section__label {
  font-size: var(--font-size-body-sm);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.trees-section__title {
  font-size: clamp(var(--font-size-h2), 3vw, 2.5rem);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-dark);
  margin-bottom: 1rem;
}

.trees-section__subtitle {
  font-size: var(--font-size-body);
  line-height: var(--line-height-relaxed);
  color: #555;
  max-width: 44rem;
  margin: 0 auto;
}

.trees-section__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.tree-card {
  background: var(--color-surface);
  border: 1px solid var(--color-surface-dark);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  transition: box-shadow 0.2s, transform 0.2s;
}

.tree-card:hover {
  box-shadow: 0 8px 24px rgba(26, 92, 56, 0.1);
  transform: translateY(-2px);
}

.tree-card__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.tree-card__badges {
  min-height: 1.5rem;
}

.tree-card__badge {
  background: var(--color-primary);
  color: white;
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-semibold);
  padding: 0.25rem 0.625rem;
  border-radius: 2rem;
  user-select: none;
}

.tree-card__icon {
  font-size: 2.5rem;
  line-height: 1;
}

.tree-card__name {
  font-size: 1.125rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-dark);
  margin-bottom: 0.25rem;
}

.tree-card__latin {
  font-size: var(--font-size-body-sm);
  color: #888;
  font-style: italic;
  margin-bottom: 0.625rem;
}

.tree-card__desc {
  font-size: var(--font-size-body-sm);
  line-height: var(--line-height-normal);
  color: #555;
  flex: 1;
}

.tree-card__stats {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 1rem;
  background: white;
  border-radius: 0.75rem;
  border: 1px solid var(--color-surface-dark);
}

.tree-card__stat {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.tree-card__stat-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.tree-card__stat-value {
  font-size: var(--font-size-body-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-dark);
  display: block;
}

.tree-card__stat-label {
  font-size: var(--font-size-caption);
  color: #888;
  display: block;
}

.tree-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-surface-dark);
}

.tree-card__price {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.trees-section__cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-surface-dark);
  border-radius: 1rem;
  padding: 1.75rem 2rem;
  flex-wrap: wrap;
}

.trees-section__cta p {
  font-size: var(--font-size-body);
  color: #444;
}

@media (max-width: 1024px) {
  .trees-section__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .trees-section {
    padding: 3rem 0;
  }

  .trees-section__grid {
    grid-template-columns: 1fr;
  }
}
</style>
