<script setup lang="ts">
import { HERO_STATS } from '~/constants/about'
import { SECTION_IDS } from '~/constants/navigation'
import type { EIndustry } from '~/constants/industries'
import { INDUSTRY_OPTIONS } from '~/constants/industries'
import type { ICompensationResult } from '~/utils/compensation'

// --- Hero copy ---
const HERO_BADGE = '🌱 Карбоновое земледелие'
const HERO_TITLE_MAIN = 'Карбоновые фермы'
const HERO_TITLE_ACCENT = 'для чистого будущего'
const HERO_DESCRIPTION = 'Создаём управляемые лесные угодья, которые поглощают углекислый газ и компенсируют выбросы предприятий. Каждое дерево — вклад в климатическое равновесие планеты.'
const CTA_PRIMARY_LABEL = 'Заказать консультацию'
const CTA_SECONDARY_LABEL = 'Узнать больше'

// --- Calculator ---
const CALC_TITLE = 'Быстрый расчёт'
const CALC_SUBTITLE = 'Узнайте, сколько леса нужно для компенсации выбросов'
const CALC_EMISSIONS_LABEL = 'Выбросы CO₂ (т/год)'
const CALC_EMISSIONS_PLACEHOLDER = 'Например, 1000'
const CALC_INDUSTRY_LABEL = 'Отрасль'
const CALC_INDUSTRY_PLACEHOLDER = 'Выберите отрасль'
const CALC_CTA_LABEL = 'Заказать точный расчёт'
const CALC_RESULT_AREA_LABEL = 'Лесных угодий'
const CALC_RESULT_TREES_LABEL = 'Деревьев'
const CALC_RESULT_ABSORPTION_LABEL = 'Поглощение CO₂/год'
const CALC_RESULT_AREA_UNIT = 'га'
const CALC_RESULT_TREES_UNIT = 'шт'
const CALC_RESULT_ABSORPTION_UNIT = 'т'

const emissions = ref<string>('')
const industry = ref<EIndustry | ''>('')

/** Расчёт компенсации выбросов с учётом отрасли */
const compensationResult = computed<ICompensationResult | null>(() => {
  const value = Number(emissions.value)
  if (!value || value <= 0 || !industry.value) return null
  return calculateCompensation(value, industry.value as EIndustry)
})
</script>

<template>
  <section
    id="hero"
    class="relative text-white overflow-hidden"
  >
    <NuxtImg
      src="/abandoned-greenhouse-armenia.jpg"
      alt="Заброшенная теплица — символ упущенных возможностей в сельском хозяйстве"
      class="absolute inset-0 size-full object-cover"
      loading="eager"
      preload
    />
    <div class="absolute inset-0 bg-gradient-to-br from-primary-dark/90 via-primary/80 to-primary-light/70" />

    <div class="max-w-[1280px] mx-auto px-6 pt-20 pb-16 md:grid md:grid-cols-2 md:gap-16 md:items-center relative">
      <div>
        <div class="inline-flex items-center gap-2 bg-white/15 border border-white/25 px-4 py-1.5 rounded-full text-sm mb-6 select-none">
          {{ HERO_BADGE }}
        </div>
        <h1 class="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight mb-5">
          {{ HERO_TITLE_MAIN }}<br>
          <span class="text-emerald-200">{{ HERO_TITLE_ACCENT }}</span>
        </h1>
        <p class="text-base leading-relaxed text-white/85 mb-8 max-w-[32rem]">
          {{ HERO_DESCRIPTION }}
        </p>
        <div class="flex gap-4 flex-wrap">
          <VButton
            as="a"
            :href="`#${SECTION_IDS.contact}`"
            color="white"
            size="lg"
          >
            {{ CTA_PRIMARY_LABEL }}
          </VButton>
          <VButton
            as="a"
            :href="`#${SECTION_IDS.about}`"
            color="white"
            variant="outline"
            size="lg"
          >
            {{ CTA_SECONDARY_LABEL }}
          </VButton>
        </div>
      </div>

      <!-- Калькулятор компенсации -->
      <div class="hidden md:flex items-center justify-center">
        <div class="w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <p class="text-xs font-semibold uppercase tracking-widest text-emerald-300 mb-1">
            {{ CALC_TITLE }}
          </p>
          <p class="text-sm text-white/70 mb-5">
            {{ CALC_SUBTITLE }}
          </p>

          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1.5">
              <label
                for="calc-emissions"
                class="text-sm text-white/80 select-none"
              >
                {{ CALC_EMISSIONS_LABEL }}
              </label>
              <input
                id="calc-emissions"
                v-model="emissions"
                type="number"
                min="0"
                required
                :placeholder="CALC_EMISSIONS_PLACEHOLDER"
                class="bg-white/15 border border-white/25 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-emerald-300 focus:bg-white/20 transition"
              >
            </div>

            <div class="flex flex-col gap-1.5">
              <label
                for="calc-industry"
                class="text-sm text-white/80 select-none"
              >
                {{ CALC_INDUSTRY_LABEL }}
              </label>
              <select
                id="calc-industry"
                v-model="industry"
                required
                class="bg-white/15 border border-white/25 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-emerald-300 focus:bg-white/20 transition cursor-pointer appearance-none"
              >
                <option
                  value=""
                  disabled
                  class="text-gray-800"
                >
                  {{ CALC_INDUSTRY_PLACEHOLDER }}
                </option>
                <option
                  v-for="option in INDUSTRY_OPTIONS"
                  :key="option.value"
                  :value="option.value"
                  class="text-gray-800"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>

            <!-- Результат: всегда в DOM, чтобы не было прыжка -->
            <div
              class="flex flex-col gap-2 rounded-xl px-4 py-3 border transition-colors duration-300"
              :class="compensationResult
                ? 'bg-emerald-500/20 border-emerald-400/30'
                : 'bg-white/5 border-white/10'"
            >
              <div class="flex items-center justify-between">
                <span class="text-xs text-white/60 select-none">{{ CALC_RESULT_AREA_LABEL }}</span>
                <span
                  class="text-sm font-bold tabular-nums transition-colors duration-300"
                  :class="compensationResult ? 'text-emerald-200' : 'text-white/20'"
                >
                  {{ compensationResult ? `~${compensationResult.hectares} ${CALC_RESULT_AREA_UNIT}` : '—' }}
                </span>
              </div>
              <div class="flex items-center justify-between border-t border-white/10 pt-2">
                <span class="text-xs text-white/60 select-none">{{ CALC_RESULT_TREES_LABEL }}</span>
                <span
                  class="text-sm font-bold tabular-nums transition-colors duration-300"
                  :class="compensationResult ? 'text-emerald-200' : 'text-white/20'"
                >
                  {{ compensationResult ? `~${compensationResult.treesCount.toLocaleString('ru')} ${CALC_RESULT_TREES_UNIT}` : '—' }}
                </span>
              </div>
              <div class="flex items-center justify-between border-t border-white/10 pt-2">
                <span class="text-xs text-white/60 select-none">{{ CALC_RESULT_ABSORPTION_LABEL }}</span>
                <span
                  class="text-sm font-bold tabular-nums transition-colors duration-300"
                  :class="compensationResult ? 'text-emerald-200' : 'text-white/20'"
                >
                  {{ compensationResult ? `~${compensationResult.annualAbsorptionTons} ${CALC_RESULT_ABSORPTION_UNIT}` : '—' }}
                </span>
              </div>
            </div>

            <VButton
              as="a"
              :href="`#${SECTION_IDS.contact}`"
              color="white"
              size="md"
              class="w-full justify-center"
            >
              {{ CALC_CTA_LABEL }}
            </VButton>
          </div>
        </div>
      </div>
    </div>

    <div class="relative bg-black/20 border-t border-white/10">
      <div class="max-w-[1280px] mx-auto px-6 py-7 flex flex-wrap gap-8 justify-center">
        <div
          v-for="stat in HERO_STATS"
          :key="stat.label"
          class="flex flex-col items-center gap-1"
        >
          <span class="text-2xl font-bold text-emerald-200">{{ stat.value }}</span>
          <span class="text-sm text-white/70">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

