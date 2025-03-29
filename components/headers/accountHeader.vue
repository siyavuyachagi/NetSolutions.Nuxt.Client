<template>
    <!-- Header -->
    <header class="flex items-center justify-between bg-gradient-to-r from-purple-50 to-purple-100 p-4 shadow">
        <div class="flex items-center">
            <button @click="emit('toggleSidebar')" class="text-gray-500 focus:outline-none">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <nuxt-link to="/account">
                <h1 class="ml-4 text-2xl font-bold text-gray-800">Client Dashboard</h1>
            </nuxt-link>
        </div>
        <div class="relative">
            <img :src="useAuthStore().user?.avatar" alt="Profile"
                class="w-10 h-10 rounded-full cursor-pointer border-2 border-primary-500"
                @click="toggleProfileDropdown" />
            <div v-if="isProfileDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                <nav class="py-1">
                    <nuxt-link to="/account/profile" class="block px-4 py-2 hover:bg-gray-100">Profile</nuxt-link>
                    <nuxt-link to="/account/profile" class="block px-4 py-2 hover:bg-gray-100">Settings</nuxt-link>
                    <nuxt-link to="/account/profile" class="block px-4 py-2 hover:bg-gray-100">Bookmarks</nuxt-link>
                    <button class="block px-4 py-2 hover:bg-gray-100 text-red-500 w-full text-start"
                        @click="authService.logout('/auth/login')">Logout</button>
                </nav>
            </div>
        </div>
    </header>
</template>
<script setup lang="ts">
import authService from '~/services/authService';
import { useAuthStore } from '@/stores/useAuthStore';

const emit = defineEmits(['toggleSidebar']);

// Profile dropdown
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