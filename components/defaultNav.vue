<template>
    <nav class="hidden md:flex space-x-6 items-center">
        <nuxt-link to="/" class="text-neutral-700 hover:text-primary-500 transition">Home</nuxt-link>

        <div class="relative" ref="servicesDropdownContainer">
            <div @click="toggleServicesDropdown" class="flex items-center cursor-pointer select-none">
                <span class="text-neutral-700 hover:text-primary-500 transition mr-2">
                    Services
                </span>
                <svg xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-neutral-500 transition-transform duration-200"
                    :class="{ 'rotate-180': isServicesDropdownOpen }" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2">
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </div>

            <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95"
                @mouseleave="() => isServicesDropdownOpen = false">
                <div v-if="isServicesDropdownOpen"
                    class="absolute left-0 mt-4 w-56 origin-top-left bg-white border border-neutral-200 rounded-lg shadow-lg z-20">
                    <div class="py-2">
                        <a href="#" class="block px-4 py-2 text-neutral-700 hover:bg-neutral-100 transition">
                            Web Development
                        </a>
                        <a href="#" class="block px-4 py-2 text-neutral-700 hover:bg-neutral-100 transition">
                            Mobile App Design
                        </a>
                        <a href="#" class="block px-4 py-2 text-neutral-700 hover:bg-neutral-100 transition">
                            UI/UX Consulting
                        </a>
                        <a href="#" class="block px-4 py-2 text-neutral-700 hover:bg-neutral-100 transition">
                            Cloud Solutions
                        </a>
                    </div>
                </div>
            </transition>
        </div>

        <a href="#" class="text-neutral-700 hover:text-primary-500 transition">About</a>
        <a href="#" class="text-neutral-700 hover:text-primary-500 transition">Contact</a>
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const servicesDropdownContainer = ref(null)
const isServicesDropdownOpen = ref(false)

const toggleServicesDropdown = () => {
    isServicesDropdownOpen.value = !isServicesDropdownOpen.value
}

const handleClickOutside = (event) => {
    // Check if the click is outside the dropdown container
    if (servicesDropdownContainer.value &&
        !servicesDropdownContainer.value.contains(event.target)) {
        isServicesDropdownOpen.value = false
    }
}

onMounted(() => {
    // Add event listener when component is mounted
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    // Remove event listener before component is destroyed
    document.removeEventListener('click', handleClickOutside)
})
</script>