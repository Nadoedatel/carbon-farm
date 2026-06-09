<script setup lang="ts">
/**
 * Базовая кнопка проекта.
 * Solid/outline варианты, primary/white цвета, три размера,
 * рендер как <a> или <button>, состояние загрузки.
 */
interface IProps {
  variant?: 'solid' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'white'
  as?: 'button' | 'a'
  href?: string
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  block?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  variant: 'solid',
  size: 'md',
  color: 'primary',
  as: 'button',
  href: undefined,
  type: 'button',
  loading: false,
  block: false,
})

const SIZE_CLASSES: Record<NonNullable<IProps['size']>, string> = {
  sm: 'px-3.5 py-[0.4rem] text-sm',
  md: 'px-5 py-2 text-sm',
  lg: 'px-7 py-3 text-base',
}

type TVariantMap = Record<NonNullable<IProps['variant']>, string>

const COLOR_VARIANT_CLASSES: Record<NonNullable<IProps['color']>, TVariantMap> = {
  primary: {
    solid: 'bg-primary hover:bg-primary-dark active:bg-primary-dark text-white border-primary hover:border-primary-dark',
    outline: 'bg-transparent hover:bg-surface active:bg-surface-dark text-primary border-primary',
  },
  white: {
    solid: 'bg-white hover:bg-white/90 active:bg-white/80 text-primary-dark border-white',
    outline: 'bg-transparent hover:bg-white/10 active:bg-white/20 text-white border-white',
  },
}

const classes = computed(() => [
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold leading-none',
  'no-underline cursor-pointer select-none border transition-all duration-200',
  'outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
  SIZE_CLASSES[props.size],
  COLOR_VARIANT_CLASSES[props.color][props.variant],
  { 'w-full': props.block },
  { 'opacity-55 cursor-not-allowed pointer-events-none': props.loading },
])
</script>

<template>
  <component
    :is="as"
    :class="classes"
    :href="as === 'a' ? href : undefined"
    :type="as === 'button' ? type : undefined"
    :disabled="as === 'button' && loading ? true : undefined"
  >
    <span
      v-if="loading"
      class="inline-block size-[1em] rounded-full border-2 border-current border-t-transparent animate-spin"
      aria-hidden="true"
    />
    <slot />
  </component>
</template>
