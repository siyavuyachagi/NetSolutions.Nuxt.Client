<template>
    <div
        class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col h-full">

        <!-- Card Header with gradient background -->
        <div class="bg-gradient-to-r from-primary-200 to-primary-400 p-5">
            <h3 class="text-xl font-bold text-white mb-1">
                {{ solution.name }}
            </h3>
        </div>

        <!-- Category tag as a pill below header -->
        <div class="px-5 -mt-3">
            <span
                class="inline-block bg-white dark:bg-gray-800 text-primary-600 text-xs font-medium px-3 py-1 rounded-full shadow-sm border border-primary-200 dark:border-primary-800">
                {{ solution.discriminator || 'Web App' }}
            </span>
        </div>

        <!-- Card Body -->
        <div class="p-5 flex-grow flex flex-col">
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-5 line-clamp-4">
                {{ solution.description }}
            </p>

            <!-- Tech Stack Tags -->
            <div class="flex flex-wrap gap-2 mb-5 mt-auto">
                <span v-for="stack in solution.technologyStacks" :key="stack.id"
                    class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-3 py-1 rounded-full">
                    {{ stack.name }}
                </span>
            </div>

            <!-- Card Footer with Actions -->
            <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div class="flex space-x-3">
                    <NuxtLink v-if="solution.previewUrl" :to="solution.previewUrl" target="_blank"
                        class="text-gray-500 hover:text-primary-500 transition-colors">
                        <ExternalLink class="w-5 h-5" />
                    </NuxtLink>
                    <!-- Add other action icons here -->
                </div>

                <NuxtLink :to="`/solutions/${solution.id}`"
                    class="inline-flex items-center text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors">
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Solution } from '~/models/types';
import { ExternalLink } from 'lucide-vue-next';

const props = defineProps<{
    solution: Solution;
}>();
</script>