<script setup lang="ts">
import { ApiReference } from '@scalar/api-reference'
import '@scalar/api-reference/style.css'
</script>

<template>
  <ApiReference
    :configuration="{
      url: '/api_spec.json',
    }" />
</template>