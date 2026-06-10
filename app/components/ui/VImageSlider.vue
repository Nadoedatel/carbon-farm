<script setup lang="ts">
import { onMounted, ref } from 'vue'

/**
 * UI-компонент слайдера изображений.
 * Поддерживает навигацию стрелками (desktop), точками, свайпом (mobile).
 * При клике на изображение эмитит событие open-lightbox с индексом.
 */

interface IProps {
  /** Массив путей к изображениям */
  images: string[]
  /** Базовый alt-текст; к нему добавляется номер слайда */
  altBase: string
  /** Tailwind-класс соотношения сторон (по умолчанию aspect-video) */
  aspectRatio?: string
}

const props = withDefaults(defineProps<IProps>(), {
  aspectRatio: 'aspect-video',
})

const emit = defineEmits<{
  /** Пользователь кликнул на изображение — открыть лайтбокс */
  'open-lightbox': [index: number]
}>()

const currentIndex = ref<number>(0)
const direction = ref<'next' | 'prev'>('next')
const rootRef = ref<HTMLElement | null>(null)

const { attachTo } = useSwipe(handleNext, handlePrev)

function handlePrev(): void {
  direction.value = 'prev'
  currentIndex.value = getPrevIndex(currentIndex.value, props.images.length)
}

function handleNext(): void {
  direction.value = 'next'
  currentIndex.value = getNextIndex(currentIndex.value, props.images.length)
}

function handleDotClick(index: number): void {
  direction.value = index > currentIndex.value ? 'next' : 'prev'
  currentIndex.value = index
}

function handleImageClick(): void {
  emit('open-lightbox', currentIndex.value)
}

onMounted(() => {
  if (rootRef.value) {
    attachTo(rootRef.value)
  }
})
</script>

<template>
  <div ref="rootRef" class="VImageSlider relative overflow-hidden rounded-xl select-none">
    <!-- Изображение со слайдовой анимацией -->
    <div :class="aspectRatio" class="w-full relative overflow-hidden">
      <Transition :name="`slide-${direction}`">
        <NuxtImg
          :key="currentIndex"
          :src="images[currentIndex]"
          :alt="`${altBase}, фото ${currentIndex + 1}`"
          sizes="sm:100vw md:50vw lg:600px"
          loading="lazy"
          class="absolute inset-0 w-full h-full object-cover cursor-pointer"
          @click="handleImageClick"
        />
      </Transition>
    </div>

    <!-- Стрелки (только desktop) -->
    <template v-if="images.length > 1">
      <button
        type="button"
        aria-label="Предыдущее фото"
        class="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 items-center justify-center w-9 h-9 rounded-full bg-black/40 text-white cursor-pointer hover:bg-black/60 active:scale-95 transition-all duration-150"
        @click="handlePrev"
      >
        <Icon name="lucide:chevron-left" class="w-5 h-5" aria-hidden="true" />
      </button>

      <button
        type="button"
        aria-label="Следующее фото"
        class="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-center w-9 h-9 rounded-full bg-black/40 text-white cursor-pointer hover:bg-black/60 active:scale-95 transition-all duration-150"
        @click="handleNext"
      >
        <Icon name="lucide:chevron-right" class="w-5 h-5" aria-hidden="true" />
      </button>
    </template>

    <!-- Нижняя панель: точки + счётчик -->
    <div class="absolute bottom-2 inset-x-0 flex items-center justify-between px-3 pointer-events-none">
      <!-- Точки -->
      <div v-if="images.length > 1" class="flex gap-1.5 pointer-events-auto">
        <button
          v-for="(img, i) in images"
          :key="img"
          type="button"
          :aria-label="`Перейти к фото ${i + 1}`"
          :aria-current="i === currentIndex ? 'true' : undefined"
          :class="i === currentIndex ? 'bg-white w-4' : 'bg-white/50 w-2'"
          class="h-2 rounded-full transition-all duration-200 cursor-pointer hover:bg-white/80"
          @click="handleDotClick(i)"
        />
      </div>
      <div v-else />

      <!-- Счётчик -->
      <span class="text-xs text-white bg-black/40 rounded px-1.5 py-0.5 leading-none">
        {{ currentIndex + 1 }} / {{ images.length }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.35s ease, opacity 0.35s ease;
}

/* Следующий слайд: приезжает справа, уходит влево */
.slide-next-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-next-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Предыдущий слайд: приезжает слева, уходит вправо */
.slide-prev-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-prev-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
