<script setup lang="ts">
import { FARMS } from '~/constants/farms'

const LOCATION_ICON = '📍'
const UNIT_HA = 'га'
const UNIT_KG = 'кг'
const LABEL_TREES = 'деревьев'
const LABEL_AREA = 'площадь'
const LABEL_CO2 = 'CO₂ в год'
</script>

<template>
  <section id="farms" class="py-12 md:py-20 bg-surface">
    <div class="max-w-[1280px] mx-auto px-6">
      <VSectionHeader
        label="Портфолио"
        title="Реализованные фермы"
        description="Каждая ферма — это живой проект, который продолжает работать на климат. Смотрите, что мы уже сделали."
      />

      <div class="flex flex-col gap-6">
        <article
          v-for="farm in FARMS"
          :key="farm.id"
          class="bg-white border border-surface-dark rounded-2xl p-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-12 items-start transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(26,92,56,0.1)]"
        >
          <div>
            <VBadge
              variant="outline"
              shape="pill"
              size="md"
              class="mb-3"
            >
              {{ farm.year }}
            </VBadge>
            <h3 class="text-xl font-bold text-primary-dark mb-1.5">
              «{{ farm.name }}»
            </h3>
            <p class="text-sm text-gray-500 mb-4">
              {{ LOCATION_ICON }} {{ farm.region }}
            </p>
            <p class="text-sm leading-relaxed text-gray-600 mb-5 max-w-[40rem]">
              {{ farm.description }}
            </p>
            <div class="flex flex-wrap gap-2">
              <VBadge
                v-for="species in farm.species"
                :key="species"
                variant="outline"
                shape="rounded"
                size="sm"
              >
                {{ species }}
              </VBadge>
            </div>
          </div>

          <div class="flex flex-row md:flex-col gap-4 md:gap-5 min-w-[10rem]">
            <div class="text-left md:text-right">
              <span class="block text-2xl font-bold text-primary-dark leading-tight">{{ formatNumber(farm.treesCount) }}</span>
              <span class="text-xs text-gray-400">{{ LABEL_TREES }}</span>
            </div>
            <div class="text-left md:text-right">
              <span class="block text-2xl font-bold text-primary-dark leading-tight">{{ farm.area }} {{ UNIT_HA }}</span>
              <span class="text-xs text-gray-400">{{ LABEL_AREA }}</span>
            </div>
            <div class="text-left md:text-right">
              <span class="block text-2xl font-bold text-primary leading-tight">{{ formatNumber(farm.co2Annual) }} {{ UNIT_KG }}</span>
              <span class="text-xs text-gray-400">{{ LABEL_CO2 }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
