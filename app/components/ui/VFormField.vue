<script setup lang="ts">
/**
 * Поле формы: лейбл + input/textarea + анимированное сообщение об ошибке.
 * Поддерживает все стандартные типы input и textarea.
 */
interface IProps {
  id: string
  label: string
  required?: boolean
  type?: 'text' | 'tel' | 'email' | 'textarea'
  modelValue: string
  error?: string
  placeholder?: string
  autocomplete?: string
  rows?: number
}

const props = withDefaults(defineProps<IProps>(), {
  required: false,
  type: 'text',
  error: '',
  placeholder: '',
  autocomplete: undefined,
  rows: 4,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: []
}>()

const isTextarea = computed(() => props.type === 'textarea')

/** Тип для атрибута type на <input>, undefined для textarea */
const inputType = computed<'text' | 'tel' | 'email' | undefined>(() =>
  isTextarea.value ? undefined : props.type as 'text' | 'tel' | 'email',
)

const INPUT_BASE_CLASSES = 'w-full px-3.5 py-2.5 text-base font-[inherit] text-gray-800 bg-white border-[1.5px] border-surface-dark rounded-lg outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-gray-400 hover:border-primary-light focus:border-primary focus:shadow-[0_0_0_3px_color-mix(in_srgb,#1a5c38_15%,transparent)]'

const inputClasses = computed(() => [
  INPUT_BASE_CLASSES,
  isTextarea.value ? 'resize-y min-h-[7rem] leading-relaxed' : 'appearance-none',
  { '!border-red-600 !shadow-[0_0_0_3px_color-mix(in_srgb,#dc2626_12%,transparent)]': props.error },
])
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label
      class="text-sm font-semibold text-gray-800 select-none cursor-default"
      :for="id"
    >
      {{ label }}
      <span
        v-if="required"
        class="text-red-600 ml-0.5"
        aria-hidden="true"
      >*</span>
    </label>

    <textarea
      v-if="isTextarea"
      :id="id"
      :value="modelValue"
      :class="inputClasses"
      :placeholder="placeholder"
      :rows="rows"
      :required="required || undefined"
      :aria-required="required || undefined"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      @blur="emit('blur')"
    />
    <input
      v-else
      :id="id"
      :value="modelValue"
      :class="inputClasses"
      :type="inputType"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :required="required || undefined"
      :aria-required="required || undefined"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @blur="emit('blur')"
    >

    <div
      class="min-h-5 overflow-hidden"
      aria-live="polite"
    >
      <span
        class="block text-xs text-red-600 transition-[opacity,transform] duration-200 select-none"
        :class="error ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'"
      >
        {{ error || '\u00a0' }}
      </span>
    </div>
  </div>
</template>
