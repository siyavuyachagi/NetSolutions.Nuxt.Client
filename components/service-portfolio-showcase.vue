<template>
    <div v-if="solutionsStatus === 'pending'" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-neutral-800 mb-4">Portfolio Showcase</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="n in 4" :key="n" class="p-4 bg-neutral-50 rounded-lg animate-pulse">
                <div class="w-full h-40 bg-neutral-200 rounded-md mb-3"></div>
                <div class="h-4 bg-neutral-300 rounded w-3/4 mb-2"></div>
                <div class="flex items-center mt-2 space-x-2">
                    <div class="h-3 w-20 bg-primary-300 rounded"></div>
                    <div class="h-3 w-3 bg-primary-300 rounded-full"></div>
                </div>
            </div>
        </div>
    </div>

    <div v-else-if="solutionsStatus === 'error'"
        class="bg-red-50 border border-red-200 rounded-lg shadow-sm p-6 flex flex-col items-center justify-center space-y-4">
        <svg class="h-12 w-12 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-center text-red-700">
            Oops! We couldn’t load your solutions.
        </p>
        <button @click="solutionsRefresh()"
            class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition">
            Retry
        </button>
    </div>


    <div v-else class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-neutral-800 mb-4">Portfolio Showcase</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <nuxt-link v-for="solution in filteredSolutions" :key="solution.id"
                class="p-4 bg-neutral-50 hover:bg-primary-50 rounded-lg transition" :to="`/solutions/${solution.id}`">
                <img :src="solution?.images[0].viewLink" :alt="solution?.name"
                    class="w-full h-40 object-cover rounded-md mb-3" />
                <h3 class="font-medium text-neutral-800">{{ solution?.name }}</h3>
                <div class="flex items-center text-sm text-primary-500 mt-2">
                    <span>View details</span>
                    <ArrowRight class="h-4 w-4 ml-1" />
                </div>
            </nuxt-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import solutionService from '~/services/solutionService';
import type { BusinessService, Solution } from '~/types/response';


const props = defineProps<{
    businessService: BusinessService;
}>();

const route = useRoute();

const { data: solutions, status: solutionsStatus, refresh: solutionsRefresh } = useAsyncData(`solutions-${route.params.id}`, () => solutionService.getSolutionsAsync());
const filteredSolutions = computed(() => {
    if (!solutions.value || !props.businessService?.id) return [];
    return solutions.value.filter(
        (s: Solution) => s.project?.businessServiceId === props.businessService.id
    ) || solutions.value.slice(0, 4);
});

onMounted(() => {
    solutionsRefresh()

    console.log(solutions.value)
})
</script>