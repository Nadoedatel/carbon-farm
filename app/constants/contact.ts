/** Контактный метод связи */
interface IContactMethod {
  readonly id: string
  readonly icon: string
  readonly title: string
  readonly value: string
  readonly href: string
  readonly hint: string
}

/** Телефон */
export const CONTACT_PHONE: IContactMethod = {
  id: 'phone',
  icon: '📞',
  title: 'Позвонить',
  value: '8 (800) 123-45-67',
  href: 'tel:+78001234567',
  hint: 'Бесплатно по России',
}

/** Email */
export const CONTACT_EMAIL: IContactMethod = {
  id: 'email',
  icon: '✉️',
  title: 'Написать',
  value: 'info@carbonfarm.ru',
  href: 'mailto:info@carbonfarm.ru',
  hint: 'Ответим в течение дня',
}

/** Telegram */
export const CONTACT_TELEGRAM: IContactMethod = {
  id: 'telegram',
  icon: '💬',
  title: 'Telegram',
  value: '@carbonfarm_ru',
  href: 'https://t.me/carbonfarm_ru',
  hint: 'Быстрые ответы',
}

/** Все способы связи */
export const CONTACT_METHODS = [CONTACT_PHONE, CONTACT_EMAIL, CONTACT_TELEGRAM] as const
