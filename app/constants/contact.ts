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
  icon: 'lucide:phone',
  title: 'Позвонить',
  value: '8 (930) 062-67-88',
  href: 'tel:+79300626788',
  hint: 'Бесплатно по России',
}

/** Email */
export const CONTACT_EMAIL: IContactMethod = {
  id: 'email',
  icon: 'lucide:mail',
  title: 'Написать',
  value: 'dashaprokopova.0208@mail.ru',
  href: 'mailto:dashaprokopova.0208@mail.ru',
  hint: 'Ответим в течение дня',
}

/** Telegram */
export const CONTACT_TELEGRAM: IContactMethod = {
  id: 'telegram',
  icon: 'lucide:send',
  title: 'Telegram',
  value: '@multik_0_0',
  href: 'https://t.me/multik_0_0',
  hint: 'Быстрые ответы',
}

/** Все способы связи */
export const CONTACT_METHODS = [CONTACT_PHONE, CONTACT_EMAIL, CONTACT_TELEGRAM] as const
