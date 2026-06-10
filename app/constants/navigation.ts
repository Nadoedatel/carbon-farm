/** ID секций страницы */
export const SECTION_IDS = {
  hero: 'hero',
  about: 'about',
  carbonUnit: 'carbon-unit',
  trees: 'trees',
  farms: 'farms',
  contact: 'contact',
} as const

/** Навигационная ссылка */
interface INavLink {
  readonly label: string
  readonly href: string
  readonly sectionId: string
}

/** Общий список навигационных ссылок для Header и Footer */
export const NAV_LINKS: readonly INavLink[] = [
  { label: 'О проекте', href: `#${SECTION_IDS.about}`, sectionId: SECTION_IDS.about },
  { label: 'Углеродные единицы', href: `#${SECTION_IDS.carbonUnit}`, sectionId: SECTION_IDS.carbonUnit },
  { label: 'Деревья', href: `#${SECTION_IDS.trees}`, sectionId: SECTION_IDS.trees },
  { label: 'Наши фермы', href: `#${SECTION_IDS.farms}`, sectionId: SECTION_IDS.farms },
  { label: 'Контакты', href: `#${SECTION_IDS.contact}`, sectionId: SECTION_IDS.contact },
] as const
