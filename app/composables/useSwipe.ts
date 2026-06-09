import { onUnmounted } from 'vue'

interface ISwipeOptions {
  /** Минимальное смещение в px для срабатывания свайпа (по умолчанию 50) */
  threshold?: number
}

interface IUseSwipeReturn {
  /** Прикрепить обработчики свайпа к элементу */
  attachTo: (el: HTMLElement) => void
  /** Отсоединить обработчики свайпа */
  detachFrom: () => void
}

/**
 * Composable для определения горизонтального свайпа на тач-устройствах.
 * Использует пассивные слушатели touchstart/touchend.
 * Автоматически отсоединяет обработчики при уничтожении компонента.
 *
 * @param onSwipeLeft — колбэк при свайпе влево (следующий слайд)
 * @param onSwipeRight — колбэк при свайпе вправо (предыдущий слайд)
 * @param options — дополнительные настройки
 */
export function useSwipe(
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
  options: ISwipeOptions = {},
): IUseSwipeReturn {
  const threshold = options.threshold ?? 50

  let targetEl: HTMLElement | null = null
  let startX = 0
  let startY = 0

  function handleTouchStart(e: TouchEvent): void {
    const touch = e.touches.item(0)
    if (!touch) return
    startX = touch.clientX
    startY = touch.clientY
  }

  function handleTouchEnd(e: TouchEvent): void {
    const touch = e.changedTouches.item(0)
    if (!touch) return
    const deltaX = touch.clientX - startX
    const deltaY = touch.clientY - startY

    // Игнорируем преимущественно вертикальные жесты
    if (Math.abs(deltaX) < Math.abs(deltaY)) return
    if (Math.abs(deltaX) < threshold) return

    if (deltaX < 0) {
      onSwipeLeft()
    }
    else {
      onSwipeRight()
    }
  }

  function attachTo(el: HTMLElement): void {
    detachFrom()
    targetEl = el
    el.addEventListener('touchstart', handleTouchStart, { passive: true })
    el.addEventListener('touchend', handleTouchEnd, { passive: true })
  }

  function detachFrom(): void {
    if (!targetEl) return
    targetEl.removeEventListener('touchstart', handleTouchStart)
    targetEl.removeEventListener('touchend', handleTouchEnd)
    targetEl = null
  }

  onUnmounted(detachFrom)

  return { attachTo, detachFrom }
}
