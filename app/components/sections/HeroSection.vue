<script setup lang="ts">
import { HERO_STATS } from '~/constants/about'
import { SECTION_IDS } from '~/constants/navigation'

const HERO_BADGE = '🌱 Карбоновое земледелие'
const HERO_TITLE_MAIN = 'Карбоновые фермы'
const HERO_TITLE_ACCENT = 'для чистого будущего'
const HERO_DESCRIPTION = 'Создаём управляемые лесные угодья, которые поглощают углекислый газ и компенсируют выбросы предприятий. Каждое дерево — вклад в климатическое равновесие планеты.'
const CTA_PRIMARY_LABEL = 'Заказать консультацию'
const CTA_SECONDARY_LABEL = 'Узнать больше'
</script>

<template>
  <section
    id="hero"
    class="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white overflow-hidden"
  >
    <div class="max-w-[1280px] mx-auto px-6 pt-20 pb-16 md:grid md:grid-cols-2 md:gap-16 md:items-center relative">
      <div>
        <div class="inline-flex items-center gap-2 bg-white/15 border border-white/25 px-4 py-1.5 rounded-full text-sm mb-6">
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

      <div class="hidden md:flex items-center justify-center relative h-[320px]">
        <div class="absolute w-80 h-80 rounded-full bg-white opacity-10 -top-10 -right-10" />
        <div class="absolute w-[200px] h-[200px] rounded-full bg-emerald-200 opacity-10 bottom-5 left-5" />
        <div class="relative w-[280px] h-[200px]">
          <span class="absolute text-[5rem] leading-none left-0 bottom-0">🌲</span>
          <span class="absolute text-[7rem] leading-none left-[60px] bottom-0">🌳</span>
          <span class="absolute text-[4rem] leading-none left-[150px] bottom-0">🌲</span>
          <span class="absolute text-[6rem] leading-none left-[190px] bottom-0">🌳</span>
          <span class="absolute text-[3.5rem] leading-none left-[245px] bottom-0">🌲</span>
        </div>
      </div>
    </div>

    <div class="bg-black/20 border-t border-white/10">
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
