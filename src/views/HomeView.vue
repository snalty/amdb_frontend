<script setup lang="ts">
var genome = "hg19"
const BASE_API_URL = import.meta.env.VITE_API_URL
import { Cog6ToothIcon, CodeBracketSquareIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <div class="container mx-auto flex flex-col justify-center items-center flex-grow">
    <span class="text-7xl">AMDB</span>
    <span class="text-xl">A tool for querying AlphaMissense results</span>
    <div class="flex md:flex-row flex-col mt-3">
      <a class="bg-teal-500 p-2 m-2 text-white flex items-center rounded-lg shadow-sm hover:shadow-lg" :href="`${BASE_API_URL}/swagger-ui`"><Cog6ToothIcon class="h-5 w-5 mr-1" /><span>API Docs</span></a>
      <a class="bg-teal-500 p-2 m-2 text-white flex items-center rounded-lg shadow-sm hover:shadow-lg" href="https://github.com/snalty/amdb_frontend"><CodeBracketSquareIcon class="h-5 w-5 mr-1" /><span>Frontend source</span></a>
      <a class="bg-teal-500 p-2 m-2 text-white flex items-center rounded-lg shadow-sm hover:shadow-lg" href="https://github.com/snalty/amdb_backend"><CodeBracketSquareIcon class="h-5 w-5 mr-1" /><span>Backend source</span></a>
    </div>
  </div>
</template>
