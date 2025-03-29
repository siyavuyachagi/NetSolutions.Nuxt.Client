<template>
    <div class="container mx-auto p-6">
        <div class="bg-gray-100 p-4 mb-4 rounded-lg shadow-sm">
            <nav class="text-sm font-medium">
                <ol class="flex space-x-2">
                    <!-- Home Link -->
                    <li>
                        <a href="/account" class="text-blue-600 hover:text-blue-800">Home</a>
                    </li>

                    <!-- Section 1 -->
                    <li class="flex items-center">
                        <svg class="w-4 h-4 mx-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                        <a href="#" class="text-blue-600 hover:text-blue-800">Account</a>
                    </li>

                    <!-- Section 4 -->
                    <li class="flex items-center">
                        <svg class="w-4 h-4 mx-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                        <span class="text-gray-400">Profile</span>
                    </li>
                </ol>
            </nav>
        </div>

        <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Profile Management</h2>

            <!-- Profile Header -->
            <div class="flex flex-col sm:flex-row items-center space-x-4 mb-6">
                <!-- Profile Image with Edit Button -->
                <div class="relative">
                    <img :src="client?.avatar" alt="Profile Image" class="w-16 h-16 rounded-full border mb-4 sm:mb-0">
                    <!-- Edit Button -->
                    <button class="absolute bottom-0 right-0 text-gray-500 hover:text-blue-500">
                        <Edit class="w-5 h-5" />
                    </button>
                </div>

                <!-- Profile Info -->
                <div>
                    <h3 class="text-xl font-semibold text-gray-700">{{ client?.firstName }} {{ client?.lastName }}</h3>
                    <p class="text-gray-500">{{ client?.organization?.name || 'N/A' }}</p>
                    <p class="text-gray-400 text-sm">Joined: {{client?.createdAt ? format(new Date(client.createdAt),"do MMM yyyy") : 'No specified' }}</p>
                </div>
            </div>

            <!-- Tabs -->
            <div class="flex flex-wrap border-b mb-4">
                <button v-for="tab in tabs" :key="tab.name" @click="activeTab = tab.name"
                    :class="['py-2 px-4 font-medium', activeTab === tab.name ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600', 'w-full sm:w-auto']">
                    {{ tab.label }}
                </button>
            </div>

            <!-- Tab Content -->
            <div v-if="activeTab === 'account'">
                <h3 class="text-xl font-semibold text-gray-700 mb-3">Account Information</h3>
                <div class="space-y-4">
                    <div>
                        <label class="block text-gray-700 font-medium">First Name</label>
                        <input type="text" v-model="user.firstName" class="border rounded-lg px-3 py-2 w-full">
                    </div>
                    <div>
                        <label class="block text-gray-700 font-medium">Last Name</label>
                        <input type="text" v-model="user.lastName" class="border rounded-lg px-3 py-2 w-full">
                    </div>
                    <div>
                        <label class="block text-gray-700 font-medium">Email</label>
                        <input type="email" v-model="user.email" class="border rounded-lg px-3 py-2 w-full">
                    </div>
                    <div>
                        <label class="block text-gray-700 font-medium">Bio</label>
                        <textarea v-model="user.bio" class="border rounded-lg px-3 py-2 w-full"></textarea>
                    </div>
                </div>
            </div>

            <div v-if="activeTab === 'security'">
                <h3 class="text-xl font-semibold text-gray-700 mb-3">Security Settings</h3>
                <div class="space-y-4">
                    <div>
                        <label class="block text-gray-700 font-medium">Email</label>
                        <input type="email" v-model="user.email" class="border rounded-lg px-3 py-2 w-full" disabled>
                    </div>
                    <div>
                        <label class="block text-gray-700 font-medium">Change Password</label>
                        <input type="password" v-model="user.password" class="border rounded-lg px-3 py-2 w-full" placeholder="Enter old password">
                    </div>
                </div>
            </div>

            <div v-if="activeTab === 'notifications'">
                <h3 class="text-xl font-semibold text-gray-700 mb-3">Notification Preferences</h3>
                <div class="space-y-4">
                    <label class="flex items-center space-x-3">
                        <input type="checkbox" v-model="user.notifications.email" class="form-checkbox">
                        <span>Email Notifications</span>
                    </label>
                    <label class="flex items-center space-x-3">
                        <input type="checkbox" v-model="user.notifications.sms" class="form-checkbox">
                        <span>SMS Notifications</span>
                    </label>
                </div>
            </div>

            <div v-if="activeTab === 'organization'">
                <h3 class="text-xl font-semibold text-gray-700 mb-3">Organization</h3>
                <div class="space-y-4">
                    <div>
                        <label class="block text-gray-700 font-medium">Organization Name</label>
                        <input type="text" v-model="organizationName" class="border rounded-lg px-3 py-2 w-full"
                            :disabled="organizationName === null">
                    </div>
                </div>
            </div>

            <div class="mt-6">
                <button @click="saveChanges"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto">Save
                    Changes</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns';
import { Edit } from 'lucide-vue-next';
import clientService from '~/services/clientService';

definePageMeta({
    layout: 'account',
    requiresAuth: true,
    roles: ['client']
});

const { data: client, status: clientStatus, error: clientError, refresh: clientRefresh } = useAsyncData(() =>
    clientService.getClientAsync(useAuthStore().user?.id as string)
);
console.log(client.value)
const activeTab = ref('account');
const tabs = [
    { name: 'account', label: 'Account Info' },
    { name: 'security', label: 'Security' },
    { name: 'notifications', label: 'Notifications' },
    { name: 'organization', label: 'Organization' }
];

const user = {
    profileImage: 'https://via.placeholder.com/150',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    bio: 'Software Developer at XYZ Corp.',
    dateJoined: 'January 10, 2022',
    password: '',
    notifications: {
        email: true,
        sms: false
    },
    organization: {
        name: 'XYZ Corp'
    }
}

function saveChanges() {
    alert('Profile changes saved successfully!');
}

const organizationName = computed({
    get: () => client?.value?.organization?.name || '',
    set: (value) => {
        if (client.value?.organization) {
            client.value.organization.name = value;
        }
    }
});

onMounted(() => {
    clientRefresh();
})
</script>
