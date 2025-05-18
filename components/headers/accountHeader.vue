<!-- <template>
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
                    <nuxt-link to="/account/profile" class="block px-4 py-2 hover:bg-gray-100">Saved</nuxt-link>
                    <button class="block px-4 py-2 hover:bg-gray-100 text-red-500 w-full text-start"
                        @click="accountService.logout('/auth/login')">Logout</button>
                </nav>
            </div>
        </div>
    </header>
</template> -->
<template>
    <!-- Header -->
    <header class="flex items-center justify-between bg-gradient-to-r from-purple-50 to-purple-100 p-4 shadow">
        <div class="flex items-center">
            <button @click="emit('toggleSidebar')" class="text-gray-500 focus:outline-none">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <nuxt-link to="/">
                <h1 class="ml-4 text-2xl font-bold text-gray-800">Dashboard</h1>
            </nuxt-link>
        </div>
        <div class="flex items-center space-x-4">
            <!-- Notifications - visible on medium screens and larger -->
            <div class="relative hidden md:block">
                <button @click="toggleNotifications" class="text-gray-600 focus:outline-none"
                    aria-label="Notifications">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span v-if="notifications.length > 0"
                        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {{ notifications.length > 9 ? '9+' : notifications.length }}
                    </span>
                </button>
                <div v-if="isNotificationsOpen"
                    class="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-10">
                    <div class="p-2 border-b">
                        <h3 class="font-medium text-gray-800">Notifications</h3>
                    </div>
                    <div class="max-h-80 overflow-y-auto">
                        <div v-if="notifications.length === 0" class="p-4 text-center text-gray-500">
                            No new notifications
                        </div>
                        <div v-for="(notification, index) in notifications" :key="index"
                            class="p-3 border-b hover:bg-gray-50 cursor-pointer">
                            <div class="flex items-start">
                                <div class="flex-shrink-0">
                                    <div class="w-2 h-2 mt-2 rounded-full"
                                        :class="notification.read ? 'bg-gray-300' : 'bg-blue-500'"></div>
                                </div>
                                <div class="ml-3">
                                    <p class="text-sm font-medium text-gray-800">{{ notification.title }}</p>
                                    <p class="text-xs text-gray-500">{{ notification.time }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nuxt-link to="/notifications"
                        class="block p-2 text-xs text-center border-t text-primary-600 hover:text-primary-800 cursor-pointer">
                        View all notifications
                    </nuxt-link>
                </div>
            </div>

            <!-- Messages - visible on medium screens and larger -->
            <div class="relative hidden md:block">
                <button @click="toggleMessages" class="text-gray-600 focus:outline-none" aria-label="Messages">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span v-if="messages.length > 0"
                        class="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {{ messages.length > 9 ? '9+' : messages.length }}
                    </span>
                </button>
                <div v-if="isMessagesOpen" class="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-10">
                    <div class="p-2 border-b">
                        <h3 class="font-medium text-gray-800">Messages</h3>
                    </div>
                    <div class="max-h-80 overflow-y-auto">
                        <div v-if="messages.length === 0" class="p-4 text-center text-gray-500">
                            No new messages
                        </div>
                        <div v-for="(message, index) in messages" :key="index"
                            class="p-3 border-b hover:bg-gray-50 cursor-pointer">
                            <div class="flex items-start">
                                <img :src="message.sender.avatar" alt="Sender" class="w-8 h-8 rounded-full mr-3">
                                <div>
                                    <p class="text-sm font-medium text-gray-800">{{ message.sender.name }}</p>
                                    <p class="text-xs text-gray-600 truncate">{{ message.content }}</p>
                                    <p class="text-xs text-gray-500">{{ message.time }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nuxt-link to="/messages"
                        class="block p-2 text-xs text-center border-t text-primary-600 hover:text-primary-800 cursor-pointer">
                        View all notifications
                    </nuxt-link>

                </div>
            </div>

            <!-- Profile dropdown -->
            <div class="relative">
                <img :src="useAuthStore().user?.avatar" alt="Profile"
                    class="w-10 h-10 rounded-full cursor-pointer border-2 border-primary-500"
                    @click="toggleProfileDropdown" />
                <div v-if="isProfileDropdownOpen"
                    class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                    <nav class="py-1">
                        <!-- Mobile notifications and messages -->
                        <div class="md:hidden border-b">
                            <div class="flex justify-between px-4 py-2">
                                <button
                                    class="flex items-center text-gray-700 hover:text-primary-600 focus:outline-none">
                                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                    Notifications
                                    <span v-if="notifications.length > 0"
                                        class="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                                        {{ notifications.length }}
                                    </span>
                                </button>
                            </div>
                            <div class="flex justify-between px-4 py-2">
                                <button
                                    class="flex items-center text-gray-700 hover:text-primary-600 focus:outline-none">
                                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                    Messages
                                    <span v-if="messages.length > 0"
                                        class="ml-1 bg-blue-500 text-white text-xs rounded-full px-1.5">
                                        {{ messages.length }}
                                    </span>
                                </button>
                            </div>
                        </div>
                        <nuxt-link to="/account/profile" class="block px-4 py-2 hover:bg-gray-100">Profile</nuxt-link>
                        <nuxt-link to="/account/profile" class="block px-4 py-2 hover:bg-gray-100">Settings</nuxt-link>
                        <nuxt-link to="/account/profile" class="block px-4 py-2 hover:bg-gray-100">Saved</nuxt-link>
                        <button class="block px-4 py-2 hover:bg-gray-100 text-red-500 w-full text-start"
                            @click="accountService.logout('/auth/login')">Logout</button>
                    </nav>
                </div>
            </div>
        </div>
    </header>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore';
import accountService from '~/services/accountService';

const emit = defineEmits(['toggleSidebar']);

const isProfileDropdownOpen = ref(false);
const isNotificationsOpen = ref(false);
const isMessagesOpen = ref(false);

// Toggle functions
const toggleProfileDropdown = () => {
    isProfileDropdownOpen.value = !isProfileDropdownOpen.value;

    // Close other dropdowns if open
    if (isProfileDropdownOpen.value) {
        isNotificationsOpen.value = false;
        isMessagesOpen.value = false;
    }
};


const toggleMessages = () => {
    isMessagesOpen.value = !isMessagesOpen.value;

    // Close other dropdowns if open
    if (isMessagesOpen.value) {
        isProfileDropdownOpen.value = false;
        isNotificationsOpen.value = false;
    }
};

// Close dropdowns when clicking outside
// You would typically add this to your main layout
const handleClickOutside = (event: MouseEvent) => {
    const isOutsideClick = !(event.target as HTMLElement).closest('.relative');
    if (isOutsideClick) {
        isProfileDropdownOpen.value = false;
        isNotificationsOpen.value = false;
        isMessagesOpen.value = false;
    }
};

const toggleNotifications = () => {
    isNotificationsOpen.value = !isNotificationsOpen.value;

    // Close other dropdowns if open
    if (isNotificationsOpen.value) {
        isProfileDropdownOpen.value = false;
        isMessagesOpen.value = false;
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






const notifications = ref([
    { id: 1, title: 'Your project has been approved', time: '3 min ago', read: false },
    { id: 2, title: 'New comment on your project', time: '1 hour ago', read: false },
    { id: 3, title: 'Payment successfully processed', time: '2 hours ago', read: true }
]);

const messages = ref([
    {
        id: 1,
        sender: { name: 'John Doe', avatar: '/avatars/john.jpg' },
        content: 'Hey, do you have a minute to discuss the project?',
        time: '5 min ago'
    },
    {
        id: 2,
        sender: { name: 'Sarah Johnson', avatar: '/avatars/sarah.jpg' },
        content: 'I reviewed the documentation and found a few issues.',
        time: '30 min ago'
    }
]);
</script>