/** Способы связи */
export const CONTACT_METHODS = [
  {
    id: 'phone',
    icon: 'i-heroicons-phone',
    title: 'Позвонить',
    value: '8 (800) 123-45-67',
    href: 'tel:+78001234567',
    hint: 'Бесплатно по России',
  },
  {
    id: 'email',
    icon: 'i-heroicons-envelope',
    title: 'Написать',
    value: 'info@carbonfarm.ru',
    href: 'mailto:info@carbonfarm.ru',
    hint: 'Ответим в течение дня',
  },
  {
    id: 'telegram',
    icon: 'i-heroicons-chat-bubble-left-ellipsis',
    title: 'Telegram',
    value: '@carbonfarm_ru',
    href: 'https://t.me/carbonfarm_ru',
    hint: 'Быстрые ответы',
  },
] as const
