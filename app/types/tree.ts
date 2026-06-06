/** Дерево в каталоге */
export interface ITree {
  id: string
  name: string
  latinName: string
  price: number
  /** Поглощение CO₂ в кг/год */
  co2PerYear: number
  /** Средняя продолжительность жизни в годах */
  lifespan: number
  description: string
  badge: string | null
}