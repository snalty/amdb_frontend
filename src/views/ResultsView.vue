<script setup lang="ts">
const BASE_API_URL = "http://localhost:8000/variant"
import { useRoute } from 'vue-router'
import { watchEffect, ref } from 'vue';
import { LinkIcon } from '@heroicons/vue/24/solid'

let route = useRoute()

let results = ref(null)
let loading = ref(true);

let search = route.params.location.toString();
let [chrom, pos, ref_allele, alt] = search.split('-');
let genome = route.params.genome.toString();

watchEffect(async () => {
  // this effect will run immediately and then
  // re-run whenever currentBranch.value changes
  loading.value = true;
  search = route.params.location.toString().trim();
  [chrom, pos, ref_allele, alt] = search.split('-');
  genome = route.params.genome.toString();

  results.value = null;

  const url = `${BASE_API_URL}?chrom=chr${chrom}&pos=${pos}&ref_allele=${ref_allele}&alt_allele=${alt}&genome=${route.params.genome}`

  results.value = await (await fetch(url)).json()

  loading.value = false;
})


</script>

<template>
    <div class="container mx-auto w-full">
        <h1 class="text-3xl my-6">Result for <span class="font-bold">{{ search }}</span> on <span class="font-bold">{{ genome }}</span></h1>
        <div class="w-full flex justify-center" v-if="loading">
            <svg class="animate-spin" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" class="spinner_ajPY"/></svg>
        </div>
        <div v-else-if="!results.length == 0">
            <div v-for="result in results" class="bg-white shadow-sm w-full flex justify-evenly divide-x-2">
                <div class="py-3 pl-3">
                    <div class="text-sm font-bold text-gray-500">UNIPROT ID:</div>
                    <div class="text-3xl py-3 flex flex-row">
                        <a class="flex items-center" v-bind:href="`https://www.uniprot.org/uniprotkb/${ result.uniprot_id }/entry`">
                           {{ result.uniprot_id }} <LinkIcon class="text-slate-500 w-6 h-6" />
                        </a>
                    </div>
                </div>
                <div class="py-3 pl-3">
                    <div class="text-sm font-bold text-gray-500">TRANSCRIPT ID:</div>
                    <div class="text-3xl py-3">
                        <a v-if="result.genome == 'hg38'" class="flex items-center" v-bind:href="`https://www.ensembl.org/id/${ result.transcript_id }`">
                           {{ result.transcript_id }} <LinkIcon class="text-slate-500 w-6 h-6" />
                        </a>
                        <a v-else-if="result.genome == 'hg19'" class="flex items-center" v-bind:href="`https://grch37.ensembl.org/id/${ result.transcript_id }`">
                           {{ result.transcript_id }} <LinkIcon class="text-slate-500 w-6 h-6" />
                        </a>
                    </div>
                </div>
                <div class="py-3 pl-3">
                    <div class="text-sm font-bold text-gray-500">PROTEIN CONSEQUENCE:</div>
                    <div class="text-3xl py-3">{{ result.protein_variant }}</div>
                </div>
                <div class="py-3 pl-3">
                    <div class="text-sm font-bold text-gray-500">ALPHAMISSENSE PATHOGENICITY:</div>
                    <div class="text-3xl py-3">{{ result.am_pathogenicity }}</div>
                </div>
                <div class="py-3 pl-3">
                    <div class="text-sm font-bold text-gray-500">ALPHAMISSENSE CLASSIFICATION:</div>

                    <div v-if="result.am_class == 'benign'" class="text-3xl bg-green-800 w-fit my-2 py-1 px-2 text-white rounded-lg">
                        Benign
                    </div>
                    <div v-if="result.am_class == 'likely_benign'" class="text-3xl bg-lime-600 w-fit my-2 py-1 px-2 text-white rounded-lg">
                        Likely benign
                    </div>
                    <div v-else-if="result.am_class == 'ambiguous'" class="text-3xl bg-gray-500 w-fit my-2 py-1 px-2 text-white rounded-lg">Ambiguous</div>
                    <div v-else-if="result.am_class == 'likely_pathogenic'" class="text-3xl bg-orange-600 w-fit my-2 py-1 px-2 text-white rounded-lg">Likely pathogenic</div>
                    <div v-else-if="result.am_class == 'pathogenic'" class="text-3xl bg-red-800 w-fit my-2 py-1 px-2 text-white rounded-lg">Pathogenic</div>
                    
                </div>
            </div>
        </div>
        <div v-else>
            No results returned for this query
        </div>
    </div>
   
</template>
