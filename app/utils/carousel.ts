/**
 * Утилиты для карусели/слайдера: расчёт индексов с циклическим обходом.
 * Используются в VImageSlider и VImageLightbox.
 */

/**
 * Возвращает предыдущий индекс с переходом на конец при достижении начала.
 * @param currentIndex — текущий индекс
 * @param length — длина массива
 */
export function getPrevIndex(currentIndex: number, length: number): number {
  if (length <= 1) return currentIndex
  return currentIndex === 0 ? length - 1 : currentIndex - 1
}

/**
 * Возвращает следующий индекс с переходом на начало при достижении конца.
 * @param currentIndex — текущий индекс
 * @param length — длина массива
 */
export function getNextIndex(currentIndex: number, length: number): number {
  if (length <= 1) return currentIndex
  return currentIndex === length - 1 ? 0 : currentIndex + 1
}
