<script setup lang="ts">
import { TREES } from '~/constants/trees'
import { SECTION_IDS } from '~/constants/navigation'

const SECTION_EYEBROW = 'Каталог'
const SECTION_TITLE = 'Виды деревьев и цены'
const SECTION_DESCRIPTION = 'Подбираем состав деревьев под климатические условия вашего региона и задачи фермы. Цены указаны за одно дерево с посадкой.'
const TREE_ICON = '🌳'
const CO2_ICON = '💨'
const LIFESPAN_ICON = '⏳'
const UNIT_KG = 'кг'
const LABEL_CO2_PER_YEAR = 'CO₂ в год'
const LABEL_LIFESPAN = 'жизнеспособность'
const CTA_ORDER_LABEL = 'Заказать'
const CTA_CONSULT_LABEL = 'Получить бесплатную консультацию'
</script>

<template>
  <section id="trees" class="py-12 md:py-20 bg-white">
    <div class="max-w-[1280px] mx-auto px-6">
      <VSectionHeader
        :label="SECTION_EYEBROW"
        :title="SECTION_TITLE"
        :description="SECTION_DESCRIPTION"
      />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <article
          v-for="tree in TREES"
          :key="tree.id"
          class="bg-surface border border-surface-dark rounded-2xl p-6 flex flex-col gap-5 transition-[box-shadow,transform] duration-200 hover:shadow-[0_8px_24px_rgba(26,92,56,0.1)] hover:-translate-y-0.5"
        >
          <div class="flex justify-between items-start">
            <div class="min-h-6">
              <VBadge
                v-if="tree.badge"
                variant="solid"
                shape="pill"
                size="sm"
              >
                {{ tree.badge }}
              </VBadge>
            </div>
            <span class="text-[2.5rem] leading-none">{{ TREE_ICON }}</span>
          </div>

          <div>
            <h3 class="text-lg font-bold text-primary-dark mb-1">
              {{ tree.name }}
            </h3>
            <p class="text-sm text-gray-400 italic mb-2.5">
              {{ tree.latinName }}
            </p>
            <p class="text-sm leading-normal text-gray-600 grow">
              {{ tree.description }}
            </p>
          </div>

          <div class="flex flex-col gap-2.5 p-4 bg-white rounded-xl border border-surface-dark">
            <div class="flex items-center gap-2.5">
              <span class="text-xl shrink-0">{{ CO2_ICON }}</span>
              <div>
                <span class="text-sm font-semibold text-primary-dark block">{{ tree.co2PerYear }} {{ UNIT_KG }}</span>
                <span class="text-xs text-gray-400 block">{{ LABEL_CO2_PER_YEAR }}</span>
              </div>
            </div>
            <div class="flex items-center gap-2.5">
              <span class="text-xl shrink-0">{{ LIFESPAN_ICON }}</span>
              <div>
                <span class="text-sm font-semibold text-primary-dark block">до {{ tree.lifespan }} лет</span>
                <span class="text-xs text-gray-400 block">{{ LABEL_LIFESPAN }}</span>
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center pt-3 border-t border-surface-dark">
            <span class="text-xl font-bold text-primary">{{ formatPrice(tree.price) }}</span>
            <VButton
              as="a"
              :href="`#${SECTION_IDS.contact}`"
              variant="outline"
              size="sm"
            >
              {{ CTA_ORDER_LABEL }}
            </VButton>
          </div>
        </article>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-6 bg-surface border border-surface-dark rounded-2xl px-8 py-7">
        <p class="text-base text-gray-700">
          Не знаете, какие деревья выбрать?
        </p>
        <VButton
          as="a"
          :href="`#${SECTION_IDS.contact}`"
          size="md"
        >
          {{ CTA_CONSULT_LABEL }}
        </VButton>
      </div>
    </div>
  </section>
</template>
