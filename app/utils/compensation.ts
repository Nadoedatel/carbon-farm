import { INDUSTRY_ABSORPTION_COEFFICIENTS } from '~/constants/industries'
import type { EIndustry } from '~/constants/industries'

/** Среднее поглощение CO₂ лесом, тонн/га/год */
const CO2_ABSORPTION_RATE_PER_HA = 5

/** Типичная плотность леса, деревьев/га */
const AVG_TREES_PER_HA = 500

/** Результат расчёта компенсации выбросов лесом */
export interface ICompensationResult {
  /** Необходимая площадь леса, га */
  hectares: number
  /** Приблизительное количество деревьев */
  treesCount: number
  /** Годовое поглощение CO₂ рассчитанной площадью, тонн */
  annualAbsorptionTons: number
}

/**
 * Рассчитывает требования к лесной компенсации для заданного объёма выбросов CO₂ и отрасли.
 * Использует отраслевые коэффициенты поглощения из INDUSTRY_ABSORPTION_COEFFICIENTS.
 * @param emissionsTons - годовые выбросы CO₂, тонн/год
 * @param industry - тип отрасли предприятия
 */
export function calculateCompensation(emissionsTons: number, industry: EIndustry): ICompensationResult {
  const coefficient = INDUSTRY_ABSORPTION_COEFFICIENTS[industry]
  const adjustedEmissions = emissionsTons * coefficient
  const hectares = Math.ceil(adjustedEmissions / CO2_ABSORPTION_RATE_PER_HA)
  const treesCount = hectares * AVG_TREES_PER_HA
  const annualAbsorptionTons = hectares * CO2_ABSORPTION_RATE_PER_HA

  return { hectares, treesCount, annualAbsorptionTons }
}
