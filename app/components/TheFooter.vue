<script setup lang="ts">
import { NAV_LINKS } from '~/constants/navigation'
import { COMPANY_NAME, SUPPORT_TEXT } from '~/constants/company'
import { CONTACT_EMAIL, CONTACT_PHONE } from '~/constants/contact'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-primary-dark text-white/85 mt-20">
    <div class="max-w-[1280px] mx-auto px-6 pt-12 pb-8">
      <div class="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-8 md:gap-12 mb-10">
        <div>
          <a
            href="#"
            class="inline-flex items-center gap-2 no-underline text-white font-bold text-lg mb-3 select-none hover:text-white/80 focus-visible:outline-none focus-visible:text-white/80 transition-colors"
          >
            <NuxtImg
              src="/logo_without_name.svg"
              :alt="COMPANY_NAME"
              width="120"
              height="40"
              loading="lazy"
              class="h-10 w-auto object-contain brightness-0 invert"
            />
          </a>
          <p class="text-sm leading-normal text-white/60 max-w-[28rem]">
            Создаём леса, поглощающие углерод. Для планеты и будущих поколений.
          </p>
        </div>

        <nav aria-label="Навигация в подвале">
          <h3 class="text-xs font-semibold uppercase tracking-[0.08em] text-white/50 mb-3">
            Навигация
          </h3>
          <ul class="list-none p-0 m-0 flex flex-col gap-2">
            <li v-for="link in NAV_LINKS" :key="link.href">
              <a
                :href="link.href"
                class="text-white/75 no-underline text-sm cursor-pointer select-none hover:text-white focus-visible:outline-none focus-visible:text-white transition-colors"
              >{{ link.label }}</a>
            </li>
          </ul>
        </nav>

        <div class="flex flex-col gap-2">
          <h3 class="text-xs font-semibold uppercase tracking-[0.08em] text-white/50 mb-1">
            Контакты
          </h3>
          <a
            :href="CONTACT_PHONE.href"
            class="text-white/75 no-underline text-sm cursor-pointer select-none hover:text-white focus-visible:outline-none focus-visible:text-white transition-colors"
          >
            {{ CONTACT_PHONE.icon }} {{ CONTACT_PHONE.value }}
          </a>
          <a
            :href="CONTACT_EMAIL.href"
            class="text-white/75 no-underline text-sm cursor-pointer select-none hover:text-white focus-visible:outline-none focus-visible:text-white transition-colors"
          >
            {{ CONTACT_EMAIL.icon }} {{ CONTACT_EMAIL.value }}
          </a>
        </div>
      </div>

      <div class="h-px bg-white/10 mb-6" />

      <div class="flex flex-col md:flex-row items-start gap-8 mb-6">
        <div class="flex items-center gap-3 shrink-0">
          <div class="bg-white rounded-lg px-3 py-2 flex items-center justify-center">
            <NuxtImg
              src="/fond-sodeystviya-innovatsiyam.png"
              alt="Фонд содействия инновациям"
              loading="lazy"
              class="h-32 w-auto object-contain block"
            />
          </div>
          <div class="bg-white rounded-lg px-3 py-2 flex items-center justify-center">
            <NuxtImg
              src="/platforma-predprinimatelstva.png"
              alt="Платформа университетского технологического предпринимательства"
              loading="lazy"
              class="h-32 w-auto object-contain block"
            />
          </div>

        </div>
        <p class="text-xs leading-relaxed text-white/50">
          {{ SUPPORT_TEXT }}
        </p>
      </div>

      <div class="pt-4 border-t border-white/10">
        <p class="text-xs text-white/40 text-center">
          © {{ currentYear }} {{ COMPANY_NAME }}. Все права защищены.
        </p>
      </div>
    </div>
  </footer>
</template>
