<template>
    <header class="bg-white shadow-md">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <!-- Logo and Brand -->
            <div class="flex items-center space-x-4">
                <img src="/public/logo.png" alt="NetSolutions Logo" class="w-10 h-10 cursor-pointer"
                    @click="useRouter().push('/')">
                <h1 class="text-2xl font-bold text-primary-600 hidden md:block">NetSolutions</h1>
            </div>

            <!-- Navigation Links -->
            <NavsDefaultNav />

            <!-- Authentication Section -->
            <div class="flex items-center space-x-4">
                <!-- When user is NOT logged in -->
                <nuxt-link v-if="!authStore.isAuthenticated" to="/auth/login"
                    class="bg-primary-500 text-white px-4 py-2 rounded-full hover:bg-primary-600 transition flex items-center gap-2">
                    <LogIn class="h-4 w-4" /> Login
                </nuxt-link>

                <!-- When user IS logged in - Dropdown Menu -->
                <div v-else class="relative" id="user-dropdown">
                    <button @click="toggleDropdown"
                        class="flex items-center space-x-2 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition">
                        <img :src="authStore.user?.avatar" alt="User Avatar"
                            class="h-8 w-8 rounded-full object-cover" />
                        <span class="text-gray-700 pr-1">{{ authStore.user?.userName }}</span>
                        <ChevronDown class="h-4 w-4 text-gray-500" />
                    </button>

                    <!-- Dropdown Content -->
                    <nav v-if="isDropdownOpen"
                        class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1">
                        <nuxt-link to="/account" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Account
                        </nuxt-link>
                        <nuxt-link to="/account/profile"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Profile
                        </nuxt-link>
                        <nuxt-link to="/account/settings"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Settings
                        </nuxt-link>
                        <div class="border-t border-gray-100 my-1"></div>
                        <button @click="logout"
                            class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <div class="flex items-center">
                                <LogOut class="h-4 w-4 mr-2" />
                                Logout
                            </div>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { LogOut, LogIn, ChevronDown } from 'lucide-vue-next';
import { useAuthStore } from '~/stores/useAuthStore';

// Get auth store instance
const authStore = useAuthStore();

// Dropdown state
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

// Close dropdown when clicking outside
const closeDropdown = (event: MouseEvent) => {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown && !dropdown.contains(event.target as Node)) {
        isDropdownOpen.value = false;
    }
};

// Add and remove event listeners
onMounted(() => {
    document.addEventListener('click', closeDropdown);
});

onUnmounted(() => {
    document.removeEventListener('click', closeDropdown);
});

// Logout function - implement with your auth service
const logout = () => {
    authStore.update(); // Assuming your store has a logout method
    isDropdownOpen.value = false;
    // Navigation will likely be handled in the store or by a navigation guard
};
</script>