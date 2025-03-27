<template>
    <div class="md:hidden">
        <!-- Mobile Burger Menu Button -->
        <button @click="toggleMobileMenu" class="text-neutral-700 p-2 focus:outline-none"
            aria-label="Toggle mobile menu">
            <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <!-- Mobile Menu Overlay -->
        <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="toggleMobileMenu"></div>

        <!-- Mobile Menu Slide-out Panel -->
        <div class="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out"
            :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'">
            <div class="p-4 border-b border-neutral-200 flex justify-between items-center">
                <nuxt-link to="/" @click="toggleMobileMenu">
                    <div class="flex items-center space-x-2">
                        <img src="/public/logo.png" alt="NetSolutions Logo" class="w-8 h-8">
                        <h1 class="text-xl font-bold text-primary-600">NetSolutions</h1>
                    </div>
                </nuxt-link>
                <button @click="toggleMobileMenu" class="text-neutral-700 p-2 focus:outline-none"
                    aria-label="Close mobile menu">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <nav class="py-4">
                <nuxt-link to="/" class="block px-4 py-3 text-neutral-700 hover:bg-neutral-100 transition"
                    @click="toggleMobileMenu">
                    Home
                </nuxt-link>

                <!-- Services Dropdown for Mobile -->
                <div>
                    <div @click="toggleServicesDropdown"
                        class="flex justify-between items-center px-4 py-3 text-neutral-700 hover:bg-neutral-100 transition cursor-pointer">
                        <span>Services</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-200"
                            :class="{ 'rotate-180': isServicesDropdownOpen }" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </div>

                    <!-- Services Submenu -->
                    <div v-if="isServicesDropdownOpen" class="bg-neutral-50 border-t border-b border-neutral-200">
                        <nuxt-link v-if="servicesStatus === 'success'" v-for="service in services" :key="service.id"
                            :to="`/services/${service.id}`"
                            class="block px-6 py-2 text-neutral-700 hover:bg-neutral-100 transition"
                            @click="toggleMobileMenu">
                            {{ service.name }}
                        </nuxt-link>
                    </div>
                </div>

                <nuxt-link to="/about" class="block px-4 py-3 text-neutral-700 hover:bg-neutral-100 transition"
                    @click="toggleMobileMenu">
                    About
                </nuxt-link>

                <nuxt-link to="/contact" class="block px-4 py-3 text-neutral-700 hover:bg-neutral-100 transition"
                    @click="toggleMobileMenu">
                    Contact
                </nuxt-link>

                <!-- Authentication Section for Mobile -->
                <div class="border-t border-neutral-200 mt-4 pt-4 px-4">
                    <template v-if="!authStore.isAuthenticated">
                        <nuxt-link to="/auth/login"
                            class="block w-full bg-primary-500 text-white px-4 py-2 rounded-full hover:bg-primary-600 transition text-center"
                            @click="toggleMobileMenu">
                            Login
                        </nuxt-link>
                    </template>
                    <template v-else>
                        <div class="flex items-center space-x-2 mb-4">
                            <img :src="authStore.user?.avatar" alt="User Avatar"
                                class="h-10 w-10 rounded-full object-cover" />
                            <span class="text-neutral-700">{{ authStore.user?.userName }}</span>
                        </div>
                        <div class="space-y-2">
                            <nuxt-link to="/account"
                                class="block px-4 py-2 text-neutral-700 hover:bg-neutral-100 transition"
                                @click="toggleMobileMenu">
                                Account
                            </nuxt-link>
                            <nuxt-link to="/account/profile"
                                class="block px-4 py-2 text-neutral-700 hover:bg-neutral-100 transition"
                                @click="toggleMobileMenu">
                                Profile
                            </nuxt-link>
                            <nuxt-link to="/account/settings"
                                class="block px-4 py-2 text-neutral-700 hover:bg-neutral-100 transition"
                                @click="toggleMobileMenu">
                                Settings
                            </nuxt-link>
                            <button @click="logout"
                                class="w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-100 transition flex items-center">
                                <LogOut class="h-4 w-4 mr-2" />
                                Logout
                            </button>
                        </div>
                    </template>
                </div>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { LogOut } from 'lucide-vue-next'
import { useAuthStore } from '~/stores/useAuthStore'
import businessServiceService from '~/services/businessServiceService'

// Authentication store
const authStore = useAuthStore()

// Services data
const {
    data: services,
    status: servicesStatus,
    refresh: servicesRefresh,
} = useAsyncData('services', () => businessServiceService.getServicesAsync())

// Mobile menu state
const isMobileMenuOpen = ref(false)
const isServicesDropdownOpen = ref(false)

// Toggle mobile menu
const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
    // Reset services dropdown when closing mobile menu
    if (!isMobileMenuOpen.value) {
        isServicesDropdownOpen.value = false
    }
}

// Toggle services dropdown in mobile menu
const toggleServicesDropdown = () => {
    isServicesDropdownOpen.value = !isServicesDropdownOpen.value
}

// Logout function
const logout = () => {
    authStore.update() // Assuming your store has a logout method
    isMobileMenuOpen.value = false
    // Navigation will likely be handled in the store or by a navigation guard
}

// Prevent scrolling when mobile menu is open
watch(isMobileMenuOpen, (isOpen) => {
    if (isOpen) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'unset'
    }
})

// Fetch services on mount
onMounted(() => {
    servicesRefresh()
})
</script>