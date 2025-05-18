<template>
    <div class="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <h2 class="text-2xl md:text-3xl font-bold text-neutral-800 w-full text-center md:text-left">
            Our Solutions
        </h2>

        <div class="w-full md:w-auto flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <!-- Search Input -->
            <div class="relative w-full md:w-auto">
                <input v-model="searchQuery" type="text" placeholder="Search solutions..."
                    class="bg-neutral-100 pl-10 pr-4 py-2 rounded-full w-full md:min-w-[20rem] lg:min-w-[30rem] focus:outline-none focus:ring-2 focus:ring-primary-500"
                    @input="onSearchInput" />
                <svg class="absolute left-3 top-3 h-5 w-5 text-neutral-400" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            <!-- View Mode Toggle -->
            <div class="w-full hidden md:flex md:w-auto justify-end">
                <div class="flex items-center bg-neutral-100 rounded-full p-1 space-x-1">
                    <button @click="setViewMode('grid')"
                        class="px-4 py-2 rounded-full transition-all duration-300 ease-in-out" :class="getViewMode === 'grid'
                            ? 'bg-primary-500 text-white shadow-md'
                            : 'text-neutral-600 hover:bg-neutral-200'">
                        <LayoutGrid class="h-5 w-5" />
                    </button>
                    <button @click="setViewMode('list')"
                        class="px-4 py-2 rounded-full transition-all duration-300 ease-in-out" :class="getViewMode === 'list'
                            ? 'bg-primary-500 text-white shadow-md'
                            : 'text-neutral-600 hover:bg-neutral-200'">
                        <List class="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    </div>


    <!-- Loading Skeleton -->
    <div v-if="solutionsStatus === 'pending'" :class="['grid gap-6', getViewMode === 'grid'
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        : 'grid-cols-1']">
        <div v-for="i in 6" :key="i" class="bg-white rounded-lg shadow-md p-6 flex flex-col relative animate-pulse">
            <!-- Skeleton Title -->
            <div class="h-6 bg-neutral-200 rounded w-3/4 mb-4 mt-5"></div>
            <!-- Skeleton Description -->
            <div class="space-y-2 mb-4">
                <div class="h-4 bg-neutral-200 rounded w-full"></div>
                <div class="h-4 bg-neutral-200 rounded w-full"></div>
                <div class="h-4 bg-neutral-200 rounded w-3/4"></div>
            </div>
            <!-- Skeleton Tech Pills -->
            <div class="flex flex-wrap gap-2 mb-4">
                <div class="h-6 bg-neutral-200 rounded-full w-16"></div>
                <div class="h-6 bg-neutral-200 rounded-full w-20"></div>
                <div class="h-6 bg-neutral-200 rounded-full w-24"></div>
            </div>
            <hr class="text-gray-200 my-3" />
            <!-- Skeleton Icons -->
            <div class="flex justify-center space-x-4 mb-6">
                <div class="h-6 w-6 bg-neutral-200 rounded-full"></div>
                <div class="h-6 w-6 bg-neutral-200 rounded-full"></div>
            </div>
            <!-- Skeleton Button -->
            <div class="h-10 bg-neutral-200 rounded-lg w-full mt-auto"></div>
        </div>
    </div>

    <!-- Error State -->
    <div v-else-if="solutionsError" class="text-center py-8">
        <p class="text-lg text-red-600">Failed to load solutions</p>
        <button @click="solutionsRefresh()"
            class="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
            Try Again
        </button>
    </div>

    <!-- No results message -->
    <div v-else-if="filteredSolutions.length === 0 && searchQuery" class="text-center py-8">
        <p class="text-lg text-neutral-600">No solutions found matching "{{ searchQuery }}"</p>
    </div>

    <!-- Solutions Grid/List -->
    <div v-else :class="['grid gap-6', getViewMode === 'grid'
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        : 'grid-cols-1']">

        <template v-for="solution in paginatedSolutions" :key="solution.id">
            <SolutionCard :solution="solution" />
        </template>
    </div>

    <!-- Pagination Controls -->
    <div v-if="filteredSolutions.length > 0 && solutionsStatus === 'success'"
        class="flex justify-center mt-8 space-x-4 select-none">
        <button @click="prevPage" :disabled="currentPage === 1"
            class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:bg-neutral-300 disabled:cursor-not-allowed">
            Previous
        </button>
        <span class="px-4 py-2 text-neutral-800">
            Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button @click="nextPage" :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:bg-neutral-300 disabled:cursor-not-allowed">
            Next
        </button>
    </div>
</template>

<script setup lang="ts">
import { LayoutGrid, List } from 'lucide-vue-next';
import solutionService from '~/services/solutionService';
import SolutionCard from './index/solutionCard.vue';
import type { TechnologyStack } from '~/types/response';

const VIEWMODE_STORAGE_KEY = "ns_index_viewmode";

// Fetch solutions
const {
    data: solutions,
    status: solutionsStatus,
    refresh: solutionsRefresh,
    error: solutionsError,
} = useAsyncData('solutions-index', () => solutionService.getSolutionsAsync())

// Search query
const searchQuery = ref('');

// Pagination
const currentPage = ref(1);
const pageSize = 9; // Number of solutions per page

// View mode
const viewMode = ref('grid');

// Reset page when searching
const onSearchInput = () => {
    currentPage.value = 1;
};

// Computed properties
const filteredSolutions = computed(() => {
    if (!solutions.value) return [];

    if (!searchQuery.value.trim()) return solutions.value;

    const query = searchQuery.value.toLowerCase().trim();
    return solutions.value.filter(solution =>
        solution.name.toLowerCase().includes(query) ||
        solution.description.toLowerCase().includes(query) ||
        solution.discriminator?.toLowerCase().includes(query) ||
        solution.technologyStacks.some((ts: TechnologyStack) => ts.name.toLowerCase().includes(query))
    );
});

const totalPages = computed(() => {
    return Math.max(1, Math.ceil(filteredSolutions.value.length / pageSize));
});

const paginatedSolutions = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    return filteredSolutions.value.slice(start, end);
});

const getViewMode = computed(() => viewMode.value);

const setViewMode = (mode: string) => {
    viewMode.value = mode;
    localStorage.setItem(VIEWMODE_STORAGE_KEY, mode);
};


// Ensure current page is valid when filtered results change
watch(filteredSolutions, () => {
    if (currentPage.value > totalPages.value) {
        currentPage.value = totalPages.value;
    }
});

// Pagination functions
const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};
// console.log(await solutions.value)
onMounted(() => {
    solutionsRefresh();
    const stored = localStorage.getItem(VIEWMODE_STORAGE_KEY);
    if (stored) viewMode.value = stored;
    console.log(solutions.value)
})
</script>