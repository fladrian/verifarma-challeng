<template>
  <div
    v-if="totalPages > 1"
    class="flex justify-center items-center space-x-4 mt-8"
  >
    <Button
      variant="secondary"
      icon="mdi:chevron-left"
      :disabled="currentPage === 1"
      @click="handlePrevious"
    />
    <span class="text-text-secondary">
      Página {{ currentPage }} de {{ totalPages }}
    </span>
    <Button
      variant="secondary"
      icon="mdi:chevron-right"
      icon-position="right"
      :disabled="currentPage === totalPages"
      @click="handleNext"
    />
  </div>
</template>

<script setup lang="ts">
import { Button } from '@presentation/shared/components'

interface Props {
  currentPage: number
  totalPages: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:currentPage': [page: number]
  change: [page: number]
}>()

const handlePrevious = () => {
  if (props.currentPage > 1) {
    const newPage = props.currentPage - 1
    emit('update:currentPage', newPage)
    emit('change', newPage)
  }
}

const handleNext = () => {
  if (props.currentPage < props.totalPages) {
    const newPage = props.currentPage + 1
    emit('update:currentPage', newPage)
    emit('change', newPage)
  }
}
</script>

