<script setup lang="ts">
import { CONTACT_METHODS } from '~/constants/contact'
import { HERO_STATS } from '~/constants/about'

/** Данные формы обратной связи */
interface IContactForm {
  name: string
  phone: string
  email: string
  message: string
}

/** Ошибки валидации формы */
interface IContactFormErrors {
  name: string
  phone: string
  email: string
}

/** Паттерн валидации имени: только буквы (рус/лат), пробелы, дефисы */
const NAME_PATTERN = /^[a-zA-Zа-яёА-ЯЁ\s-]+$/
/** Паттерн валидации российского телефона */
const PHONE_PATTERN = /^(\+7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/
/** Паттерн валидации email */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const MIN_NAME_LENGTH = 2
const SUBMIT_TIMEOUT_MS = 1000

const ERROR_NAME_SHORT = `Введите имя (минимум ${MIN_NAME_LENGTH} символа)`
const ERROR_NAME_INVALID = 'Имя может содержать только буквы, пробел и дефис'
const ERROR_PHONE_EMPTY = 'Введите номер телефона'
const ERROR_PHONE_INVALID = 'Введите корректный номер (+7 или 8 и 10 цифр)'
const ERROR_EMAIL_INVALID = 'Введите корректный email'

const STATS_LABEL = 'Наши результаты'

const SECTION_EYEBROW = 'Связаться'
const SECTION_TITLE = 'Заказать консультацию'
const SECTION_DESCRIPTION = 'Расскажите о вашем проекте — мы подберём оптимальное решение и рассчитаем стоимость'

const LABEL_NAME = 'Ваше имя'
const LABEL_PHONE = 'Телефон'
const LABEL_EMAIL = 'Email'
const LABEL_MESSAGE = 'Расскажите о вашем проекте'

const BTN_SUBMIT_LABEL = 'Отправить заявку'
const BTN_SUBMIT_LOADING = 'Отправка...'
const BTN_SEND_AGAIN = 'Отправить ещё'

const SUCCESS_TITLE = 'Заявка отправлена!'
const SUCCESS_DESCRIPTION = 'Мы свяжемся с вами в ближайшее время для обсуждения деталей проекта.'

const INITIAL_FORM: IContactForm = {
  name: '',
  phone: '',
  email: '',
  message: '',
}

const INITIAL_ERRORS: IContactFormErrors = { name: '', phone: '', email: '' }

const form = reactive<IContactForm>({ ...INITIAL_FORM })
const errors = reactive<IContactFormErrors>({ ...INITIAL_ERRORS })
const isSubmitted = ref(false)
const isLoading = ref(false)

/** Валидация отдельного поля при потере фокуса */
function handleBlurName(): void {
  const trimmed = form.name.trim()
  if (trimmed.length < MIN_NAME_LENGTH) {
    errors.name = ERROR_NAME_SHORT
  }
  else if (!NAME_PATTERN.test(trimmed)) {
    errors.name = ERROR_NAME_INVALID
  }
  else {
    errors.name = ''
  }
}

function handleBlurPhone(): void {
  if (!form.phone.trim()) {
    errors.phone = ERROR_PHONE_EMPTY
  }
  else if (!PHONE_PATTERN.test(form.phone.trim())) {
    errors.phone = ERROR_PHONE_INVALID
  }
  else {
    errors.phone = ''
  }
}

function handleBlurEmail(): void {
  if (form.email && !EMAIL_PATTERN.test(form.email)) {
    errors.email = ERROR_EMAIL_INVALID
  }
  else {
    errors.email = ''
  }
}

/** Валидация всей формы перед отправкой */
function validateForm(): boolean {
  handleBlurName()
  handleBlurPhone()
  handleBlurEmail()
  return !errors.name && !errors.phone && !errors.email
}

function handleSendAgain(): void {
  isSubmitted.value = false
}

async function handleSubmit(): Promise<void> {
  if (!validateForm()) return

  isLoading.value = true
  // Имитация отправки формы
  await new Promise<void>(resolve => setTimeout(resolve, SUBMIT_TIMEOUT_MS))
  isSubmitted.value = true
  isLoading.value = false
  Object.assign(form, INITIAL_FORM)
  Object.assign(errors, INITIAL_ERRORS)
}
</script>

<template>
  <section id="contact" class="py-12 md:py-20 bg-white">
    <div class="max-w-[1280px] mx-auto px-6">
      <VSectionHeader
        :label="SECTION_EYEBROW"
        :title="SECTION_TITLE"
        :description="SECTION_DESCRIPTION"
      />

      <div class="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 md:gap-16">
        <div class="flex flex-col gap-4">
          <a
            v-for="method in CONTACT_METHODS"
            :key="method.id"
            :href="method.href"
            class="flex items-center gap-4 px-6 py-5 bg-surface border border-surface-dark rounded-[0.875rem] no-underline cursor-pointer select-none transition-[box-shadow,transform,border-color] duration-200 hover:shadow-[0_4px_16px_rgba(15,61,37,0.1)] hover:-translate-y-px hover:border-primary-light focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,#1a5c38_15%,transparent)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="text-[2.25rem] shrink-0">{{ method.icon }}</span>
            <div class="flex flex-col">
              <span class="text-xs font-semibold uppercase tracking-[0.06em] text-gray-400 mb-0.5">{{ method.title }}</span>
              <span class="text-base font-bold text-primary-dark mb-0.5">{{ method.value }}</span>
              <span class="text-xs text-gray-400">{{ method.hint }}</span>
            </div>
          </a>

          <div class="flex flex-col px-6 py-5 bg-surface border border-surface-dark rounded-[0.875rem] grow">
            <span class="text-xs font-semibold uppercase tracking-[0.06em] text-gray-400 mb-4">
              {{ STATS_LABEL }}
            </span>
            <div class="flex flex-col divide-y divide-surface-dark">
              <div
                v-for="stat in HERO_STATS"
                :key="stat.label"
                class="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
              >
                <span
                  class="text-3xl shrink-0 select-none"
                  aria-hidden="true"
                >{{ stat.icon }}</span>
                <div class="flex flex-col">
                  <span class="text-2xl font-bold text-primary-dark leading-tight tabular-nums">{{ stat.value }}</span>
                  <span class="text-xs text-gray-400 mt-0.5">{{ stat.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form
          v-if="!isSubmitted"
          class="flex flex-col gap-1 p-8 bg-surface border border-surface-dark rounded-2xl"
          novalidate
          @submit.prevent="handleSubmit"
        >
          <VFormField
            id="contact-name"
            v-model="form.name"
            :label="LABEL_NAME"
            required
            :error="errors.name"
            placeholder="Иван Иванов"
            autocomplete="name"
            @blur="handleBlurName"
          />

          <VFormField
            id="contact-phone"
            v-model="form.phone"
            :label="LABEL_PHONE"
            required
            type="tel"
            :error="errors.phone"
            placeholder="+7 (999) 000-00-00"
            autocomplete="tel"
            @blur="handleBlurPhone"
          />

          <VFormField
            id="contact-email"
            v-model="form.email"
            :label="LABEL_EMAIL"
            type="email"
            :error="errors.email"
            placeholder="ivan@example.com"
            autocomplete="email"
            @blur="handleBlurEmail"
          />

          <VFormField
            id="contact-message"
            v-model="form.message"
            type="textarea"
            :label="LABEL_MESSAGE"
            placeholder="Площадь участка, регион, цели..."
            :rows="4"
          />

          <VButton
            type="submit"
            :loading="isLoading"
            block
            size="lg"
            class="mt-2"
          >
            {{ isLoading ? BTN_SUBMIT_LOADING : BTN_SUBMIT_LABEL }}
          </VButton>

          <p class="text-xs text-gray-400 text-center leading-normal select-none mt-1">
            Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
          </p>
        </form>

        <div
          v-else
          class="flex flex-col items-center gap-4 px-8 py-12 bg-surface border border-surface-dark rounded-2xl text-center"
        >
          <span class="text-[4rem] leading-none success-icon">✅</span>
          <h3 class="text-2xl font-bold text-primary-dark">
            {{ SUCCESS_TITLE }}
          </h3>
          <p class="text-base text-gray-500 max-w-[24rem] leading-normal">
            {{ SUCCESS_DESCRIPTION }}
          </p>
          <VButton
            variant="outline"
            @click="handleSendAgain"
          >
            {{ BTN_SEND_AGAIN }}
          </VButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes scaleIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.success-icon {
  animation: scaleIn 0.3s ease;
}
</style>
