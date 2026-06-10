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
          class="bg-white border border-surface-dark rounded-2xl p-7 text-center transition duration-300 ease-in-out hover:shadow-[0_8px_32px_rgba(26,92,56,0.12)] hover:-translate-y-1"
        >
          <Icon :size="30" :name="benefit.icon" class="mb-4 text-primary" aria-hidden="true" />
          <h3 class="text-base font-bold text-primary-dark mb-3">
            {{ benefit.title }}
          </h3>
          <p class="text-sm leading-normal text-gray-500">
            {{ benefit.text }}
          </p>
        </div>
      </div>

      <div class="relative overflow-hidden rounded-3xl p-8 md:p-12 text-white">
        <NuxtImg
          src="/forest-bg.jpg"
          class="absolute inset-0 w-full h-full object-cover"
          sizes="sm:100vw md:100vw lg:1280px"
          quality="75"
          loading="lazy"
          alt=""
          aria-hidden="true"
        />
        <div class="absolute inset-0 bg-primary-dark/70" />
        <div class="relative z-10">
          <h2 class="text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-center mb-10">
            {{ HOW_IT_WORKS_TITLE }}
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-y-4">
            <template
              v-for="(step, index) in STEPS"
              :key="step.id"
            >
              <div class="h-full bg-white/[0.06] border border-white/10 rounded-2xl p-6 transition-colors duration-200 hover:bg-white/[0.30]">
                <div class="w-10 h-10 bg-emerald-400 text-emerald-950 rounded-xl flex items-center justify-center font-bold text-base mb-4 select-none">
                  {{ step.id }}
                </div>
                <h3 class="text-sm font-bold mb-2">
                  {{ step.title }}
                </h3>
                <p class="text-sm leading-relaxed text-white/80">
                  {{ step.text }}
                </p>
              </div>
              <div
                v-if="index < STEPS.length - 1"
                class="hidden lg:flex justify-center items-start pt-7 px-2 text-white text-xl select-none"
                aria-hidden="true"
              >
                →
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
