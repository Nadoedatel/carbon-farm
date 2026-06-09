<script setup lang="ts">
import { BENEFITS, STEPS } from '~/constants/about'

const SECTION_EYEBROW = 'Что такое'
const SECTION_TITLE = 'Карбоновая ферма'
const SECTION_DESCRIPTION = 'Карбоновая ферма — это управляемый лесной массив, созданный специально для поглощения углекислого газа из атмосферы. Это не просто лесопосадка — это точно рассчитанная экосистема с измеримым климатическим эффектом.'
const HOW_IT_WORKS_TITLE = 'Как это работает'
</script>

<template>
  <section id="about" class="py-12 md:py-20">
    <div class="max-w-[1280px] mx-auto px-6">
      <VSectionHeader
        :label="SECTION_EYEBROW"
        :title="SECTION_TITLE"
        :description="SECTION_DESCRIPTION"
      />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        <div
          v-for="benefit in BENEFITS"
          :key="benefit.id"
          class="bg-white border border-surface-dark rounded-2xl p-7 text-center transition-[box-shadow,transform] duration-200 hover:shadow-[0_8px_24px_rgba(26,92,56,0.1)] hover:-translate-y-0.5"
        >
          <span class="text-[2.5rem] block mb-4">{{ benefit.icon }}</span>
          <h3 class="text-base font-bold text-primary-dark mb-3">
            {{ benefit.title }}
          </h3>
          <p class="text-sm leading-normal text-gray-500">
            {{ benefit.text }}
          </p>
        </div>
      </div>

      <div class="bg-primary-dark rounded-3xl p-8 md:p-12 text-white">
        <h2 class="text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-center mb-10">
          {{ HOW_IT_WORKS_TITLE }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="step in STEPS"
            :key="step.id"
          >
            <div class="w-10 h-10 bg-emerald-200/20 border-2 border-emerald-200 text-emerald-200 rounded-full flex items-center justify-center font-bold text-base mb-4">
              {{ step.id }}
            </div>
            <h3 class="text-base font-bold mb-2">
              {{ step.title }}
            </h3>
            <p class="text-sm leading-normal text-white/70">
              {{ step.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
