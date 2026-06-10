<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from 'vue'

/**
 * Fullscreen лайтбокс для просмотра изображений.
 * Рендерится через <Teleport to="body"> поверх всего контента.
 * Поддерживает навигацию стрелками, клавиатурой (←/→/Esc) и закрытие по клику на backdrop.
 */

interface IProps {
  /** Массив путей к изображениям */
  images: string[]
  /** Текущий индекс изображения */
  currentIndex: number
  /** Флаг видимости лайтбокса */
  isOpen: boolean
  /** Базовый alt-текст; к нему добавляется номер */
  altBase: string
}

const props = defineProps<IProps>()

const emit = defineEmits<{
  /** Закрыть лайтбокс */
  close: []
  /** Обновить текущий индекс */
  'update:currentIndex': [index: number]
}>()

const closeBtnRef = ref<HTMLButtonElement | null>(null)
const direction = ref<'next' | 'prev'>('next')

function handleClose(): void {
  emit('close')
}

function handlePrev(): void {
  direction.value = 'prev'
  emit('update:currentIndex', getPrevIndex(props.currentIndex, props.images.length))
}

function handleNext(): void {
  direction.value = 'next'
  emit('update:currentIndex', getNextIndex(props.currentIndex, props.images.length))
}

function handleKeyDown(e: KeyboardEvent): void {
  const handler = KEY_HANDLER_MAP[e.key]
  if (handler) handler()
}

/** Карта клавиш → обработчики (объявлена после функций, на которые ссылается) */
const KEY_HANDLER_MAP: Record<string, () => void> = {
  Escape: handleClose,
  ArrowLeft: handlePrev,
  ArrowRight: handleNext,
}

// Объединённый вотчер: блокировка скролла + фокус + подписка на keydown
watch(
  () => props.isOpen,
  async (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      await nextTick()
      closeBtnRef.value?.focus()
    }
    else {
      document.removeEventListener('keydown', handleKeyDown)
    }
  },
)

onUnmounted(() => {
  // Сбрасываем на случай уничтожения компонента при открытом лайтбоксе
  document.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="isOpen"
        role="dialog"
        aria-modal="true"
        :aria-label="`Просмотр фото: ${altBase}`"
        class="VImageLightbox fixed inset-0 z-[100] flex items-center justify-center bg-black/85 select-none"
        @click.self="handleClose"
      >
        <!-- Кнопка закрытия -->
        <button
          ref="closeBtnRef"
          type="button"
          aria-label="Закрыть просмотр"
          class="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white cursor-pointer hover:bg-white/25 active:scale-95 transition-all duration-150 z-10"
          @click="handleClose"
        >
          <Icon name="lucide:x" class="w-5 h-5" aria-hidden="true" />
        </button>

        <!-- Стрелка влево -->
        <button
          v-if="images.length > 1"
          type="button"
          aria-label="Предыдущее фото"
          class="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white cursor-pointer hover:bg-white/25 active:scale-95 transition-all duration-150 z-10"
          @click="handlePrev"
        >
          <Icon name="lucide:chevron-left" class="w-6 h-6" aria-hidden="true" />
        </button>

        <!-- Изображение со слайдовой анимацией -->
        <Transition :name="`lb-slide-${direction}`" mode="out-in">
          <NuxtImg
            :key="currentIndex"
            :src="images[currentIndex]"
            :alt="`${altBase}, фото ${currentIndex + 1}`"
            sizes="sm:100vw md:90vw lg:1200px"
            loading="lazy"
            class="max-w-[90vw] max-h-[90dvh] object-contain rounded-lg shadow-2xl"
          />
        </Transition>

        <!-- Стрелка вправо -->
        <button
          v-if="images.length > 1"
          type="button"
          aria-label="Следующее фото"
          class="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white cursor-pointer hover:bg-white/25 active:scale-95 transition-all duration-150 z-10"
          @click="handleNext"
        >
          <Icon name="lucide:chevron-right" class="w-6 h-6" aria-hidden="true" />
        </button>

        <!-- Счётчик -->
        <span class="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70 bg-black/30 rounded px-2 py-1 leading-none">
          {{ currentIndex + 1 }} / {{ images.length }}
        </span>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Анимация открытия/закрытия лайтбокса */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
  transform: scale(0.97);
}

/* Анимация смены слайда внутри лайтбокса */
.lb-slide-next-enter-active,
.lb-slide-next-leave-active,
.lb-slide-prev-enter-active,
.lb-slide-prev-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.lb-slide-next-enter-from {
  transform: translateX(40px);
  opacity: 0;
}
.lb-slide-next-leave-to {
  transform: translateX(-40px);
  opacity: 0;
}

.lb-slide-prev-enter-from {
  transform: translateX(-40px);
  opacity: 0;
}
.lb-slide-prev-leave-to {
  transform: translateX(40px);
  opacity: 0;
}
</style>
