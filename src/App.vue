<template>
  <router-view v-slot="{ Component, route }">
    <Layout
      v-if="route.meta.useLayout !== false"
      :title="route.meta.title as string"
      :show-back-button="route.meta.showBackButton as boolean"
    >
      <component :is="Component" />
    </Layout>
    <component v-else :is="Component" />
  </router-view>
</template>

<script setup lang="ts">
import { Layout } from '@presentation/layout'
</script>

