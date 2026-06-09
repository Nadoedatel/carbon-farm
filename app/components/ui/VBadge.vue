<script setup lang="ts">
/**
 * Универсальный бейдж/тег для статусов, категорий и лейблов.
 * Solid (зелёный фон) и outline (обводка) варианты, pill и rounded формы.
 */
interface IProps {
  variant?: 'solid' | 'outline'
  shape?: 'pill' | 'rounded'
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<IProps>(), {
  variant: 'solid',
  shape: 'pill',
  size: 'sm',
})

const VARIANT_CLASSES: Record<NonNullable<IProps['variant']>, string> = {
  solid: 'bg-primary text-white font-semibold',
  outline: 'bg-surface border border-surface-dark text-primary',
}

const SHAPE_CLASSES: Record<NonNullable<IProps['shape']>, string> = {
  pill: 'rounded-full',
  rounded: 'rounded-md',
}

const SIZE_CLASSES: Record<NonNullable<IProps['size']>, string> = {
  sm: 'text-xs px-2.5 py-1',
  md: 'text-sm font-semibold px-3 py-1',
}

const classes = computed(() => [
  'inline-flex items-center select-none',
  VARIANT_CLASSES[props.variant],
  SHAPE_CLASSES[props.shape],
  SIZE_CLASSES[props.size],
])
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
