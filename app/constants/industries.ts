import type { IIndustryOption } from '~/types/industry'

/** Отрасли промышленности для расчёта компенсации выбросов */
export enum EIndustry {
  Manufacturing = 'manufacturing',
  Energy = 'energy',
  Transport = 'transport',
  Agriculture = 'agriculture',
  Construction = 'construction',
  Other = 'other',
}

/**
 * Коэффициенты поглощения по отраслям.
 * Отражают нормативные мультипликаторы, масштабирующие требования к компенсации выбросов.
 */
export const INDUSTRY_ABSORPTION_COEFFICIENTS: Record<EIndustry, number> = {
  [EIndustry.Energy]: 1.2,
  [EIndustry.Manufacturing]: 1.1,
  [EIndustry.Transport]: 1.0,
  [EIndustry.Construction]: 1.0,
  [EIndustry.Other]: 1.0,
  [EIndustry.Agriculture]: 0.9,
}

/** Список отраслей для отображения в UI-селекте */
export const INDUSTRY_OPTIONS: IIndustryOption[] = [
  { value: EIndustry.Manufacturing, label: 'Производство' },
  { value: EIndustry.Energy, label: 'Энергетика' },
  { value: EIndustry.Transport, label: 'Транспорт' },
  { value: EIndustry.Agriculture, label: 'Сельское хозяйство' },
  { value: EIndustry.Construction, label: 'Строительство' },
  { value: EIndustry.Other, label: 'Другое' },
]
