<script setup lang="ts">
import { NAV_LINKS, SECTION_IDS } from '~/constants/navigation'
import { COMPANY_NAME, CTA_CONSULT_LABEL } from '~/constants/company'

const INTERSECTION_THRESHOLD = 0.3
const ARIA_LABEL_OPEN = 'Открыть меню'
const ARIA_LABEL_CLOSE = 'Закрыть меню'

const isMenuOpen = ref(false)
const activeSection = ref('')

function handleMenuToggle(): void {
  isMenuOpen.value = !isMenuOpen.value
}

function handleNavClick(): void {
  isMenuOpen.value = false
}

/** Подсветка активного пункта при скролле через IntersectionObserver */
const observers: IntersectionObserver[] = []

onMounted(() => {
  NAV_LINKS.forEach(({ sectionId }) => {
    const el = document.getElementById(sectionId)
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection.value = sectionId
          }
        })
      },
      // Секция считается активной когда её верхняя треть в зоне видимости
      { threshold: INTERSECTION_THRESHOLD },
    )

    observer.observe(el)
    observers.push(observer)
  })
})

onUnmounted(() => {
  observers.forEach(o => o.disconnect())
})
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-surface-dark">
    <div class="max-w-[1280px] mx-auto px-6 h-16 flex items-center gap-8">
      <a
        href="#"
        class="flex items-center gap-2 no-underline text-primary-dark font-bold text-lg shrink-0 select-none hover:text-primary focus-visible:outline-none focus-visible:text-primary transition-colors"
      >
        <NuxtImg
          src="/logo_without_name.svg"
          :alt="COMPANY_NAME"
          width="120"
          height="40"
          loading="eager"
          preload
          class="h-10 w-auto object-contain"
        />
      </a>

      <nav
        :class="isMenuOpen
          ? 'flex flex-col absolute top-16 left-0 right-0 bg-white px-6 py-4 border-b border-surface-dark shadow-lg gap-1 z-50'
          : 'hidden md:flex md:items-center md:gap-1 md:flex-1'"
      >
        <a
          v-for="link in NAV_LINKS"
          :key="link.href"
          :href="link.href"
          class="px-3 py-1.5 rounded-lg text-gray-600 no-underline text-sm select-none cursor-pointer transition-colors hover:text-primary hover:bg-surface focus-visible:outline-none focus-visible:text-primary focus-visible:bg-surface"
          :class="{ 'text-primary bg-surface font-semibold': activeSection === link.sectionId }"
          @click="handleNavClick"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="hidden md:flex shrink-0">
        <VButton
          as="a"
          :href="`#${SECTION_IDS.contact}`"
          size="sm"
          @click="handleNavClick"
        >
          {{ CTA_CONSULT_LABEL }}
        </VButton>
      </div>

      <button
        class="md:hidden flex flex-col gap-[5px] p-1.5 bg-transparent border-none cursor-pointer shrink-0 ml-auto"
        :aria-expanded="isMenuOpen"
        :aria-label="isMenuOpen ? ARIA_LABEL_CLOSE : ARIA_LABEL_OPEN"
        @click="handleMenuToggle"
      >
        <span
          class="block w-6 h-0.5 bg-primary-dark rounded transition duration-200 origin-center"
          :class="{ 'translate-y-[7px] rotate-45': isMenuOpen }"
        />
        <span
          class="block w-6 h-0.5 bg-primary-dark rounded transition duration-200"
          :class="{ 'opacity-0 scale-x-0': isMenuOpen }"
        />
        <span
          class="block w-6 h-0.5 bg-primary-dark rounded transition duration-200 origin-center"
          :class="{ '-translate-y-[7px] -rotate-45': isMenuOpen }"
        />
      </button>
    </div>
  </header>
</template>
