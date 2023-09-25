<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ref } from 'vue';
var genome = "hg19"
import { XMarkIcon } from '@heroicons/vue/24/solid' ;

let validationRegex = new RegExp(/(\d{1,2}|X|Y)-\d{1,}-[ACTG]-[ACTG]/)
let error = ref<string>();
let search = "";

let router = useRouter()

function validateSearch(genome: string, search: string) {
  if (validationRegex.test(search)) {
    router.push({name: 'results', params: { genome: genome, location: search} })
    error.value = ""
  } else {
    error.value = "Please enter a search query in the format 1-55523855-G-A"
  }
}
</script>

<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-fit md:h-16 items-center justify-between flex-col md:flex-row mx-3 md:m-0">
        <div class="flex items-center py-3">
          <div class="flex-shrink-0">
            <router-link to="/" class="text-white text-2xl">AMDB</router-link>
          </div>
        </div>
        <div class="w-screen md:w-auto px-2 md:px-0">
          <div class="flex items-baseline">
            <div class="bg-white border-gray-200 shadow-sm flex border-1 rounded-full flex-1 md:flex-grow-0 my-3 md:w-96">
              <div id="search">
                <select v-model="genome" class="bg-inherit block rounded-md border-0 p-1.5 m-1 text-gray-900">
                  <option selected>hg19</option>
                  <option>hg38</option>
                </select>
              </div>
              <input v-model="search" class="flex-grow md:w-96" placeholder="Search for position e.g 1-55523855-G-A" @keyup.enter="validateSearch(genome, search)" />
              <button class="mr-5" @click="validateSearch(genome, search)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
            </div>
            <div v-if="error" class="absolute top-14 text-red-900 bg-red-300 p-3 shadow-sm rounded-lg flex">
              Please enter a search query in the format 1-55523855-G-A 
              <button @click="error = ''">
                <XMarkIcon class="text-red-900 w-6 h-6 ml-3"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </Disclosure>
  <RouterView></RouterView>
  <footer class="bottom-0 w-full flex justify-center">
        <div class="bg-gray-200 rounded-lg p-2 md:px-16 m-3 ">
          <p>Data provided under the <a class="underline" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a> license.</p>
          <p>Data source: <a class="underline" href="https://github.com/google-deepmind/alphamissense" target="_blank" rel="noopener noreferrer">AlphaMissense - Google Deepmind</a></p>
        </div>
    </footer>
</template>

