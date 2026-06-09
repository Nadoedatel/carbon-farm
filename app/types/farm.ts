/** Реализованная карбоновая ферма */
export interface IFarm {
  id: string
  name: string
  region: string
  year: number
  treesCount: number
  /** Площадь в гектарах */
  area: number
  /** Поглощение CO₂ в кг/год */
  co2Annual: number
  description: string
  species: string[]
  /** Пути к фотографиям фермы из /public (опционально) */
  images?: string[]
}
