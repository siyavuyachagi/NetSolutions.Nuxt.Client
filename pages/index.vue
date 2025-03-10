<template>
    <section>
        <div class="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
            <h2 class="text-2xl md:text-3xl font-bold text-neutral-800 w-full text-center md:text-left">
                Our Solutions
            </h2>

            <div class="w-full md:w-auto flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <!-- Search Input -->
                <div class="relative w-full md:w-auto">
                    <input type="text" placeholder="Search solutions..."
                        class="bg-neutral-100 pl-10 pr-4 py-2 rounded-full w-full md:min-w-[20rem] lg:min-w-[30rem] focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <svg class="absolute left-3 top-3 h-5 w-5 text-neutral-400" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>

                <!-- View Mode Toggle - Positioned Far Right on Small Screens -->
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

        <!-- Solutions Grid/List -->
        <div :class="[
            'grid gap-6',
            viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
        ]">
            <div v-for="solution in solutions" :key="solution.id"
                class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <h3 class="text-xl font-semibold text-neutral-800 mb-2">
                    {{ solution.name }}
                </h3>
                <p class="text-neutral-600 mb-4">{{ solution.description }}</p>
                <a href="#" class="text-primary-500 hover:underline">Learn More</a>
            </div>
        </div>
    </section>
</template>



<script setup lang="ts">
import { LayoutGrid, List } from 'lucide-vue-next'

// View mode state
const viewMode = ref('grid')

// Sample solutions data
const solutions = ref([
    {
        id: 1,
        name: 'Web Development Platform',
        description: 'Complete solution for building and deploying web applications.'
    },
    {
        id: 2,
        name: 'Cloud Management Suite',
        description: 'Comprehensive cloud infrastructure management tool.'
    },
    {
        id: 3,
        name: 'Mobile App Generator',
        description: 'Rapid development framework for cross-platform mobile apps.'
    },
    {
        id: 4,
        name: 'Enterprise Security System',
        description: 'Advanced cybersecurity solution for modern businesses.'
    },
    {
        id: 2,
        name: 'Cloud Management Suite',
        description: 'Comprehensive cloud infrastructure management tool.'
    },
    {
        id: 3,
        name: 'Mobile App Generator',
        description: 'Rapid development framework for cross-platform mobile apps.'
    },
    {
        id: 4,
        name: 'Enterprise Security System',
        description: 'Advanced cybersecurity solution for modern businesses.'
    },
    {
        id: 3,
        name: 'Mobile App Generator',
        description: 'Rapid development framework for cross-platform mobile apps.'
    },
    {
        id: 4,
        name: 'Enterprise Security System',
        description: 'Advanced cybersecurity solution for modern businesses.'
    }
])
</script>