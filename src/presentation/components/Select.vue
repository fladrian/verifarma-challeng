<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-text-secondary mb-2"
    >
      {{ label }}
    </label>
    <select
      :id="id"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      class="w-full px-4 py-2.5 bg-background-secondary border border-gray-700 rounded-button text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      @blur="$emit('blur', $event)"
    >
      <slot />
    </select>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string
  label?: string
  modelValue: string
  disabled?: boolean
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false,
})

defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
}>()
</script>

