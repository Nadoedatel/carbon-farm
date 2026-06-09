import type { EIndustry } from '~/constants/industries'

/** Опция выбора отрасли в селекте */
export interface IIndustryOption {
  value: EIndustry
  label: string
}
