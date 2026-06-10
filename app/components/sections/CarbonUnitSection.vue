"<script setup lang="ts">
import {
  LAW_REFERENCE,
  LAW_TITLE,
  LAW_TEXT,
  REGISTRY_LAUNCH_YEAR,
  OPPORTUNITIES,
} from '~/constants/carbonUnit'
import { SECTION_IDS } from '~/constants/navigation'

const SECTION_EYEBROW = 'Рынок'
const SECTION_TITLE = 'Углеродная единица'
const SECTION_DESCRIPTION =
  'Углеродная единица (УЕ) — это подтверждённый эквивалент одной тонны CO₂, поглощённой вашим лесным проектом. Это актив с реальной рыночной стоимостью, которым можно торговать на официальном рынке.'
const LAW_BLOCK_LABEL = 'Правовая база'
const REGISTRY_BADGE_LABEL = `Реестр действует с ${REGISTRY_LAUNCH_YEAR} года`
const OPPORTUNITIES_TITLE = 'Возможности'
const CTA_TEXT = 'Готовы начать продавать углеродные единицы?'
const CTA_BUTTON_LABEL = 'Получить консультацию'

</script>

<template>
  <section :id="SECTION_IDS.carbonUnit" class="carbon-unit-section py-12 md:py-20 bg-white">
    <div class="max-w-[1280px] mx-auto px-6">
      <VSectionHeader
        :label="SECTION_EYEBROW"
        :title="SECTION_TITLE"
        :description="SECTION_DESCRIPTION"
      />

      <!-- Блок с правовой базой — тёмный -->
      <div class="law-block relative overflow-hidden bg-primary-dark rounded-3xl p-8 md:p-10 mb-16">
        <!-- Декоративные круги на фоне -->
        <div
          class="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/[0.03]"
          aria-hidden="true"
        />
        <div
          class="absolute -bottom-16 right-12 w-48 h-48 rounded-full bg-primary/50"
          aria-hidden="true"
        />

        <div class="relative z-10 flex flex-col md:flex-row md:items-start gap-6">
          <div
            class="law-block__icon shrink-0 w-14 h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center"
            aria-hidden="true"
          >
            <Icon name="lucide:scroll" :size="30" class="text-white/80" />
          </div>
          <div class="flex-1">
            <div class="flex flex-wrap items-center gap-3 mb-3">
              <span class="text-xs font-semibold uppercase tracking-[0.1em] text-white/60">
                {{ LAW_BLOCK_LABEL }}
              </span>
              <span class="inline-flex items-center select-none text-xs font-semibold px-3 py-1 rounded-md bg-white/10 border border-white/20 text-white/90">
                {{ LAW_REFERENCE }} «{{ LAW_TITLE }}»
              </span>
            </div>
            <p class="text-base leading-relaxed text-white/80 mb-5">
              {{ LAW_TEXT }}
            </p>
            <span class="inline-flex items-center select-none text-xs font-semibold px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-400/30 text-emerald-300">
              {{ REGISTRY_BADGE_LABEL }}
            </span>
          </div>
        </div>
      </div>

      <!-- Подзаголовок "Возможности" -->
      <h3 class="text-[clamp(1.25rem,2vw,1.75rem)] font-bold text-primary-dark text-center mb-10">
        {{ OPPORTUNITIES_TITLE }}
      </h3>

      <!-- Карточки возможностей -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div
          v-for="opportunity in OPPORTUNITIES"
          :key="opportunity.id"
          class="relative overflow-hidden bg-surface border border-surface-dark rounded-2xl p-7 transition duration-300 ease-in-out hover:shadow-[0_8px_32px_rgba(26,92,56,0.12)] hover:-translate-y-1"
        >
          <!-- Цветная акцентная линия сверху -->
          <div
            class="absolute top-0 inset-x-0 h-1 rounded-t-2xl"
            :class="opportunity.accentClass"
            aria-hidden="true"
          />

          <!-- Иконка в цветном контейнере -->
          <div
            class="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            :class="opportunity.iconClass"
            aria-hidden="true"
          >
            <Icon :name="opportunity.icon" :size="30" />
          </div>

          <h4 class="text-base font-bold text-primary-dark mb-3">
            {{ opportunity.title }}
          </h4>
          <p class="text-sm leading-normal text-gray-500">
            {{ opportunity.description }}
          </p>
        </div>
      </div>

      <!-- CTA-баннер -->
      <div class="flex flex-wrap items-center justify-center gap-6 bg-gradient-to-r from-primary-dark to-primary rounded-2xl px-8 py-7">
        <p class="text-base font-medium text-white/90">
          {{ CTA_TEXT }}
        </p>
        <VButton
          as="a"
          :href="`#${SECTION_IDS.contact}`"
          color="white"
          size="md"
        >
          {{ CTA_BUTTON_LABEL }}
        </VButton>
      </div>
    </div>
  </section>
</template>
