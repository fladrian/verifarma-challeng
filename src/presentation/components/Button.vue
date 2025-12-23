<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <Icon v-if="icon" :icon="icon" :class="iconClasses" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  iconPosition?: 'left' | 'right'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'secondary',
  size: 'md',
  iconPosition: 'left',
  disabled: false,
  type: 'button',
  fullWidth: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center font-medium rounded-button transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-light',
    secondary: 'bg-background-secondary text-text-primary hover:bg-background-tertiary',
    tertiary: 'bg-background-tertiary text-text-primary hover:bg-gray-700',
    ghost: 'bg-transparent text-text-primary hover:bg-background-secondary',
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }
  
  const width = props.fullWidth ? 'w-full' : ''
  
  return `${base} ${variants[props.variant]} ${sizes[props.size]} ${width}`
})

const iconClasses = computed(() => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }
  
  const position = props.iconPosition === 'left' ? 'mr-2' : 'ml-2'
  
  return `${sizeMap[props.size]} ${position}`
})
</script>

