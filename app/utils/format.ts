/**
 * Форматирует число в рублях с разрядами
 * @param price - Цена в рублях
 */
export function formatPrice(price: number): string {
  return price.toLocaleString('ru-RU') + ' ₽'
}

/**
 * Форматирует число с разрядами
 * @param n - Число для форматирования
 */
export function formatNumber(n: number): string {
  return n.toLocaleString('ru-RU')
}
