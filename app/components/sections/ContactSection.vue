<script setup lang="ts">
import { CONTACT_METHODS } from '~/constants/contact'

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
const NAME_PATTERN = /^[a-zA-Zа-яёА-ЯЁ\s\-]+$/
/** Паттерн валидации российского телефона */
const PHONE_PATTERN = /^(\+7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/
/** Паттерн валидации email */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const INITIAL_FORM: IContactForm = {
  name: '',
  phone: '',
  email: '',
  message: '',
}

const form = reactive<IContactForm>({ ...INITIAL_FORM })
const errors = reactive<IContactFormErrors>({ name: '', phone: '', email: '' })
const isSubmitted = ref(false)
const isLoading = ref(false)

/** Валидация отдельного поля при потере фокуса */
function handleBlurName(): void {
  const trimmed = form.name.trim()
  if (trimmed.length < 2) {
    errors.name = 'Введите имя (минимум 2 символа)'
  }
  else if (!NAME_PATTERN.test(trimmed)) {
    errors.name = 'Имя может содержать только буквы, пробел и дефис'
  }
  else {
    errors.name = ''
  }
}

function handleBlurPhone(): void {
  if (!form.phone.trim()) {
    errors.phone = 'Введите номер телефона'
  }
  else if (!PHONE_PATTERN.test(form.phone.trim())) {
    errors.phone = 'Введите корректный номер (+7 или 8 и 10 цифр)'
  }
  else {
    errors.phone = ''
  }
}

function handleBlurEmail(): void {
  if (form.email && !EMAIL_PATTERN.test(form.email)) {
    errors.email = 'Введите корректный email'
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

async function handleSubmit(): Promise<void> {
  if (!validateForm()) return

  isLoading.value = true
  // Имитация отправки формы
  await new Promise<void>(resolve => setTimeout(resolve, 1000))
  isSubmitted.value = true
  isLoading.value = false
  Object.assign(form, INITIAL_FORM)
  Object.assign(errors, { name: '', phone: '', email: '' })
}
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="contact-section__container">
      <header class="contact-section__header">
        <p class="contact-section__label">
          Связаться
        </p>
        <h2 class="contact-section__title">
          Заказать консультацию
        </h2>
        <p class="contact-section__subtitle">
          Расскажите о вашем проекте — мы подберём оптимальное решение и рассчитаем стоимость
        </p>
      </header>

      <div class="contact-section__content">
        <div class="contact-section__methods">
          <a
            v-for="method in CONTACT_METHODS"
            :key="method.id"
            :href="method.href"
            class="contact-method"
            target="_blank"
            rel="noopener noreferrer"
          >
            <UIcon :name="method.icon" class="contact-method__icon" />
            <div class="contact-method__body">
              <span class="contact-method__title">{{ method.title }}</span>
              <span class="contact-method__value">{{ method.value }}</span>
              <span class="contact-method__hint">{{ method.hint }}</span>
            </div>
          </a>
        </div>

        <form
          v-if="!isSubmitted"
          class="contact-section__form"
          novalidate
          @submit.prevent="handleSubmit"
        >
          <div class="form-field">
            <label class="form-field__label" for="contact-name">
              Ваше имя
              <span class="form-field__required" aria-hidden="true">*</span>
            </label>
            <input
              id="contact-name"
              v-model="form.name"
              class="form-field__input"
              :class="{ 'form-field__input_error': errors.name }"
              type="text"
              placeholder="Иван Иванов"
              autocomplete="name"
              @blur="handleBlurName"
            >
            <div class="form-field__error-wrap" aria-live="polite">
              <span class="form-field__error" :class="{ 'form-field__error_visible': errors.name }">
                {{ errors.name || '&nbsp;' }}
              </span>
            </div>
          </div>

          <div class="form-field">
            <label class="form-field__label" for="contact-phone">
              Телефон
              <span class="form-field__required" aria-hidden="true">*</span>
            </label>
            <input
              id="contact-phone"
              v-model="form.phone"
              class="form-field__input"
              :class="{ 'form-field__input_error': errors.phone }"
              type="tel"
              placeholder="+7 (999) 000-00-00"
              autocomplete="tel"
              @blur="handleBlurPhone"
            >
            <div class="form-field__error-wrap" aria-live="polite">
              <span class="form-field__error" :class="{ 'form-field__error_visible': errors.phone }">
                {{ errors.phone || '&nbsp;' }}
              </span>
            </div>
          </div>

          <div class="form-field">
            <label class="form-field__label" for="contact-email">
              Email
            </label>
            <input
              id="contact-email"
              v-model="form.email"
              class="form-field__input"
              :class="{ 'form-field__input_error': errors.email }"
              type="email"
              placeholder="ivan@example.com"
              autocomplete="email"
              @blur="handleBlurEmail"
            >
            <div class="form-field__error-wrap" aria-live="polite">
              <span class="form-field__error" :class="{ 'form-field__error_visible': errors.email }">
                {{ errors.email || '&nbsp;' }}
              </span>
            </div>
          </div>

          <div class="form-field">
            <label class="form-field__label" for="contact-message">
              Расскажите о вашем проекте
            </label>
            <textarea
              id="contact-message"
              v-model="form.message"
              class="form-field__textarea"
              placeholder="Площадь участка, регион, цели..."
              rows="4"
            />
          </div>

          <UButton
            type="submit"
            color="primary"
            size="lg"
            block
            :loading="isLoading"
            class="mt-2"
          >
            Отправить заявку
          </UButton>

          <p class="contact-section__privacy">
            Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
          </p>
        </form>

        <div
          v-else
          class="contact-section__success"
        >
          <span class="contact-section__success-icon">✅</span>
          <h3>Заявка отправлена!</h3>
          <p>Мы свяжемся с вами в ближайшее время для обсуждения деталей проекта.</p>
          <UButton
            variant="outline"
            color="primary"
            @click="isSubmitted = false"
          >
            Отправить ещё
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ===== СЕКЦИЯ ===== */
.contact-section {
  padding: 5rem 0;
  background: white;
}

.contact-section__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.contact-section__header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.contact-section__label {
  font-size: var(--font-size-body-sm);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.contact-section__title {
  font-size: clamp(var(--font-size-h2), 3vw, 2.5rem);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-dark);
  margin-bottom: 1rem;
}

.contact-section__subtitle {
  font-size: var(--font-size-body);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
  max-width: 44rem;
  margin: 0 auto;
}

.contact-section__content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: start;
}

/* ===== СПОСОБЫ СВЯЗИ ===== */
.contact-section__methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-surface-dark);
  border-radius: 0.875rem;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
}

.contact-method:hover {
  box-shadow: 0 4px 16px rgba(15, 61, 37, 0.1);
  transform: translateY(-1px);
  border-color: var(--color-primary-light);
}

.contact-method__icon {
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  color: var(--color-primary);
}

.contact-method__body {
  display: flex;
  flex-direction: column;
}

.contact-method__title {
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-tertiary);
  margin-bottom: 0.2rem;
}

.contact-method__value {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-dark);
  margin-bottom: 0.15rem;
}

.contact-method__hint {
  font-size: var(--font-size-caption);
  color: var(--color-text-tertiary);
}

/* ===== ФОРМА ===== */
.contact-section__form {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 2rem;
  background: var(--color-surface);
  border: 1px solid var(--color-surface-dark);
  border-radius: 1rem;
}

/* ===== ПОЛЯ ФОРМЫ ===== */
.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.form-field__label {
  font-size: var(--font-size-body-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  user-select: none;
  cursor: default;
}

.form-field__required {
  color: var(--color-error, #dc2626);
  margin-left: 0.15rem;
}

.form-field__input,
.form-field__textarea {
  width: 100%;
  padding: 0.625rem 0.875rem;
  font-size: var(--font-size-body);
  font-family: inherit;
  color: var(--color-text-primary);
  background: white;
  border: 1.5px solid var(--color-surface-dark);
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  /* убираем браузерные стили */
  -webkit-appearance: none;
  appearance: none;
}

.form-field__input::placeholder,
.form-field__textarea::placeholder {
  color: var(--color-text-tertiary);
}

.form-field__input:hover,
.form-field__textarea:hover {
  border-color: var(--color-primary-light);
}

.form-field__input:focus,
.form-field__textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 15%, transparent);
}

.form-field__input_error {
  border-color: var(--color-error, #dc2626) !important;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-error, #dc2626) 12%, transparent) !important;
}

.form-field__textarea {
  resize: vertical;
  min-height: 7rem;
  line-height: var(--line-height-relaxed);
}

/* Резервируем высоту, чтобы ошибка не сдвигала верстку */
.form-field__error-wrap {
  min-height: 1.25rem;
  overflow: hidden;
}

.form-field__error {
  display: block;
  font-size: var(--font-size-caption);
  color: var(--color-error, #dc2626);
  /* начальное состояние — скрыто, но место занято */
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 0.2s ease, transform 0.2s ease;
  user-select: none;
}

.form-field__error_visible {
  opacity: 1;
  transform: translateY(0);
}

.contact-section__privacy {
  font-size: var(--font-size-caption);
  color: var(--color-text-tertiary);
  text-align: center;
  line-height: var(--line-height-normal);
  user-select: none;
}

/* ===== СООБЩЕНИЕ УСПЕХА ===== */
.contact-section__success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem 2rem;
  background: var(--color-surface);
  border: 1px solid var(--color-surface-dark);
  border-radius: 1rem;
  text-align: center;
}

.contact-section__success-icon {
  font-size: 4rem;
  line-height: 1;
  animation: scaleIn 0.3s ease;
}

.contact-section__success h3 {
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-dark);
}

.contact-section__success p {
  font-size: var(--font-size-body);
  color: var(--color-text-secondary);
  max-width: 24rem;
  line-height: var(--line-height-normal);
}

/* ===== АНИМАЦИИ ===== */
@keyframes scaleIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* ===== АДАПТИВ ===== */
@media (max-width: 768px) {
  .contact-section {
    padding: 3rem 0;
  }

  .contact-section__content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact-section__form {
    padding: 1.25rem;
  }
}

@media (max-width: 480px) {
  .contact-section__header {
    margin-bottom: 2rem;
  }

  .contact-section__form {
    padding: 1rem;
    gap: 1rem;
  }
}
</style>
