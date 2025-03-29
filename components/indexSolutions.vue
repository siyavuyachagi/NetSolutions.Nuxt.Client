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
                    <button @click="viewMode = 'grid'"
                        class="px-4 py-2 rounded-full transition-all duration-300 ease-in-out" :class="viewMode === 'grid'
                            ? 'bg-primary-500 text-white shadow-md'
                            : 'text-neutral-600 hover:bg-neutral-200'">
                        <LayoutGrid class="h-5 w-5" />
                    </button>
                    <button @click="viewMode = 'list'"
                        class="px-4 py-2 rounded-full transition-all duration-300 ease-in-out" :class="viewMode === 'list'
                            ? 'bg-primary-500 text-white shadow-md'
                            : 'text-neutral-600 hover:bg-neutral-200'">
                        <List class="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="solutionsStatus === 'pending'" :class="['grid gap-6', viewMode === 'grid'
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        : 'grid-cols-1']">
        <div v-for="i in 6" :key="i" class="bg-white rounded-lg shadow-md p-6 flex flex-col relative animate-pulse">
            <!-- Skeleton Category Ribbon -->
            <div class="absolute -top-1 -left-2">
                <div class="relative">
                    <div class="py-1 px-3 flex items-center ribbon bg-neutral-300" style="width: 80px; height: 24px">
                    </div>
                </div>
            </div>
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
    <div v-else :class="['grid gap-6', viewMode === 'grid'
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        : 'grid-cols-1']">
        <div v-for="solution in paginatedSolutions" :key="solution.id"
            class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition flex flex-col relative">

            <!-- Category Ribbon -->
            <div class="absolute -top-1 -left-2">
                <div class="relative">
                    <div class="absolute -bottom-2 -right-2 w-0 h-0 border-t-8 border-l-8 border-t-transparent border-l-transparent"
                        :class="getRibbonShadowClass(solution.discriminator)"></div>
                    <div :class="['py-1 px-3 flex items-center ribbon', getRibbonClass(solution.discriminator)]">
                        <span class="text-white text-xs font-medium">{{ solution.discriminator || 'Web App'
                        }}</span>
                    </div>
                </div>
            </div>

            <h3 class="text-xl font-semibold text-neutral-800 mb-2 mt-5">
                {{ solution.name }}
            </h3>
            <p class="text-neutral-600 mb-4 line-clamp-6 md:line-clamp-3">
                {{ solution.description }}
            </p>
            <!-- Tech Stack Pills -->
            <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="stack in solution.technologyStacks" :key="stack.id"
                    class="bg-primary-100 text-primary-600 text-sm px-3 py-1 rounded-full">
                    {{ stack.name }}
                </span>
            </div>
            <hr class="text-gray-200 my-3" />
            <div class="flex justify-center space-x-4 mb-6">
                <NuxtLink v-if="solution.previewUrl" :to="solution.previewUrl" target="_blank"
                    class="text-gray-500 hover:text-primary-400 transition">
                    <ExternalLink />
                </NuxtLink>
                <!-- Add other icons similarly -->
            </div>
            <NuxtLink :to="`/solutions/${solution.id}`"
                class="text-center bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition mt-auto">
                Details
            </NuxtLink>
        </div>
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
import { ExternalLink, LayoutGrid, List } from 'lucide-vue-next';
import type { TechnologyStack } from '~/interface/TechnologyStack';
import solutionService from '~/services/solutionService';

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

// Get color class for ribbon based on solution discriminator
const getRibbonClass = (discriminator: string) => {
    switch (discriminator?.toLowerCase()) {
        case 'web application':
            return 'bg-blue-600';
        case 'uiuxdesign':
            return 'bg-purple-600';
        case 'mobile development':
            return 'bg-green-600';
        case 'graphic design':
            return 'bg-orange-500';
        default:
            return 'bg-blue-600';
    }
};

// Get shadow color for ribbon
const getRibbonShadowClass = (discriminator: string) => {
    switch (discriminator?.toLowerCase()) {
        case 'webdevelopment':
            return 'border-r-blue-800';
        case 'uiuxdesign':
            return 'border-r-purple-800';
        case 'mobiledevelopment':
            return 'border-r-green-800';
        case 'graphicdesign':
            return 'border-r-orange-700';
        default:
            return 'border-r-blue-800';
    }
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
        solution.technologyStacks.some((s: TechnologyStack) => s.name.toLowerCase().includes(query))
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
    console.log(solutions.value)
})
</script>

<style scoped>
.ribbon {
    position: relative;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 10px 50%);
}

.ribbon:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 8px;
    height: 8px;
    background: inherit;
    filter: brightness(70%);
    clip-path: polygon(0 0, 100% 0, 100% 100%);
}
</style>