<template>
    <header class="bg-white shadow-md">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <!-- Logo and Brand -->
            <nuxt-link to="/" class="hidden md:flex">
                <div class="flex items-center space-x-4">
                    <img src="/public/logo.png" alt="NetSolutions Logo" class="w-10 h-10 cursor-pointer">
                    <h1 class="text-2xl font-bold text-primary-600">NetSolutions</h1>
                </div>
                <div class="md:hidden sr-only">NetSolutions</div>
            </nuxt-link>

            <!-- Desktop Navigation -->
            <DesktopNav />

            <!-- Mobile Burger Menu -->
            <MobileNav />

            <!-- Authentication Section -->
            <div class="flex items-center space-x-4">
                <!-- When user is NOT logged in -->
                <nuxt-link v-if="!authStore.isAuthenticated" to="/auth/login"
                    class="flex bg-primary-500 text-white px-4 py-2 rounded-full hover:bg-primary-600 transition items-center gap-2">
                    <LogIn class="h-4 w-4" /> Login
                </nuxt-link>


                <!-- When user IS logged in - Dropdown Menu -->
                <div v-else class="relative z-10">
                    <img :src="useAuthStore().user?.avatar" alt="Profile"
                        class="w-10 h-10 rounded-full cursor-pointer border-2 border-primary-500"
                        @click="toggleProfileDropdown" />
                    <div v-if="isProfileDropdownOpen"
                        class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                        <nav class="py-1">
                            <nuxt-link to="/account" class="block px-4 py-2 hover:bg-gray-100">Account</nuxt-link>
                            <nuxt-link to="/account/settings"
                                class="block px-4 py-2 hover:bg-gray-100">Settings</nuxt-link>
                            <button class="flex px-4 py-2 hover:bg-gray-100 text-red-500 w-full text-start"
                                @click="authService.logout('/auth/login')">
                                <LogOut />
                                Logout
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { LogOut, LogIn } from 'lucide-vue-next';
import { useAuthStore } from '~/stores/useAuthStore';
import DesktopNav from '../navs/desktopNav.vue';
import MobileNav from '../navs/mobileNav.vue';
import authService from '~/services/authService';

// Get auth store instance
const authStore = useAuthStore();

const isProfileDropdownOpen = ref(false);

const toggleProfileDropdown = (event: Event) => {
    event.stopPropagation();
    isProfileDropdownOpen.value = !isProfileDropdownOpen.value;
};

const handleClickOutside = (event: MouseEvent) => {
    // Close dropdown if click is outside the dropdown
    if (isProfileDropdownOpen.value) {
        isProfileDropdownOpen.value = false;
    }
};

onMounted(() => {
    // Add click event listener to the document
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    // Remove event listener when component is unmounted
    document.removeEventListener('click', handleClickOutside);
});
</script>