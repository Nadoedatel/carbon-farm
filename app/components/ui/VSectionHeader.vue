<script setup lang="ts">
/**
 * Стандартный заголовок секции: лейбл-тег, заголовок h2 и описание.
 * Используется во всех секциях страницы.
 */
interface IProps {
  label?: string
  title: string
  description?: string
  centered?: boolean
}

withDefaults(defineProps<IProps>(), {
  label: undefined,
  description: undefined,
  centered: true,
})
</script>

<template>
  <header
    class="mb-14"
    :class="{ 'text-center': centered }"
  >
    <p
      v-if="label"
      class="text-sm font-semibold uppercase tracking-[0.1em] text-primary mb-2"
    >
      {{ label }}
    </p>
    <h2 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-primary-dark mb-4">
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="text-base leading-relaxed text-gray-600"
      :class="{ 'max-w-[44rem] mx-auto': centered }"
    >
      {{ description }}
    </p>
  </header>
</template>
