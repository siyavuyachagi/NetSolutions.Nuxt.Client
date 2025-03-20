<template>
    <div class="min-h-screen bg-gray-50 p-6">
        <!-- Breadcrumb navigation -->
        <div class="mb-6">
            <div class="flex items-center text-sm text-neutral-500">
                <NuxtLink to="/" class="flex items-center hover:text-primary-500 transition">
                    <ArrowLeft class="h-4 w-4 mr-2" />
                    Home
                </NuxtLink>
                <span class="mx-2">/</span>
                <span>Profile</span>
            </div>
        </div>

        <!-- Header -->
        <header class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold text-gray-800">Client Dashboard</h1>
            <div class="flex items-center space-x-4">
                <button @click="openNewProjectModal"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clip-rule="evenodd" />
                    </svg>
                    New Project
                </button>
                <div class="relative">
                    <img :src="useAuthStore().user?.avatar" alt="Profile" class="w-10 h-10 rounded-full cursor-pointer"
                        @click="toggleProfileDropdown" />
                    <div v-if="isProfileDropdownOpen"
                        class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                        <div class="py-1">
                            <nuxt-link to="/account/profile"
                                class="block px-4 py-2 hover:bg-gray-100">Profile</nuxt-link>
                            <nuxt-link to="/dashboard/profile"
                                class="block px-4 py-2 hover:bg-gray-100">Settings</nuxt-link>
                            <nuxt-link to="" class="block px-4 py-2 hover:bg-gray-100 text-red-500">Logout</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div class="container mx-auto max-w-4xl">
            <div class="grid md:grid-cols-3 gap-6">
                <!-- Profile Sidebar -->
                <div class="md:col-span-1 bg-white shadow rounded-lg p-6">
                    <div class="text-center">
                        <div class="relative inline-block mb-4">
                            <img :src="useAuthStore().user.avatar" alt="Profile Picture"
                                class="w-32 h-32 rounded-full object-cover mx-auto mb-4" />
                            <label
                                class="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer"
                                title="Change Profile Picture">
                                <input type="file" accept="image/*" class="hidden" @change="handleAvatarUpload" />
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </label>
                        </div>

                        <h2 class="text-2xl font-bold text-gray-800">{{ useAuthStore().user?.lastName }} {{
                            useAuthStore().user?.firstName }}</h2>
                        <p class="text-gray-600">{{ useAuthStore().user.roles.join(', ') }}</p>

                        <div class="mt-6 space-y-2">
                            <div class="flex items-center justify-center space-x-4">
                                <a href="#" class="text-blue-500 hover:text-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
                                    </svg>
                                </a>
                                <a href="#" class="text-blue-400 hover:text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </a>
                                <a href="#" class="text-red-500 hover:text-red-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.197-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 border-t pt-4">
                        <nav>
                            <button v-for="tab in profileTabs" :key="tab.id" @click="activeTab = tab.id" :class="{
                                'bg-blue-100 text-blue-700': activeTab === tab.id,
                                'text-gray-600 hover:bg-gray-100': activeTab !== tab.id
                            }" class="w-full text-left px-4 py-2 rounded-lg mb-2 transition">
                                {{ tab.label }}
                            </button>
                        </nav>
                    </div>
                </div>

                <!-- Profile Content -->
                <div class="md:col-span-2 bg-white shadow rounded-lg p-6">
                    <!-- Personal Information -->
                    <div v-if="activeTab === 'personal'">
                        <h3 class="text-xl font-semibold mb-6 text-gray-800">Personal Information</h3>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-gray-700 mb-2">First Name</label>
                                <input v-model="client.firstName" type="text"
                                    class="w-full border rounded-lg px-3 py-2" />
                            </div>
                            <div>
                                <label class="block text-gray-700 mb-2">Last Name</label>
                                <input v-model="client.lastName" type="text"
                                    class="w-full border rounded-lg px-3 py-2" />
                            </div>
                            <div>
                                <label class="block text-gray-700 mb-2">Email</label>
                                <input v-model="client.email" type="email" class="w-full border rounded-lg px-3 py-2" />
                            </div>
                            <div>
                                <label class="block text-gray-700 mb-2">Phone Number</label>
                                <input v-model="client.phoneNumber" type="tel"
                                    class="w-full border rounded-lg px-3 py-2" />
                            </div>
                        </div>
                    </div>

                    <!-- Account Settings -->
                    <div v-if="activeTab === 'account'">
                        <h3 class="text-xl font-semibold mb-6 text-gray-800">Account Settings</h3>
                        <div class="space-y-6">
                            <div>
                                <label class="block text-gray-700 mb-2">Change Password</label>
                                <div class="grid md:grid-cols-2 gap-4">
                                    <input type="password" placeholder="Current Password"
                                        class="w-full border rounded-lg px-3 py-2" />
                                    <input type="password" placeholder="New Password"
                                        class="w-full border rounded-lg px-3 py-2" />
                                </div>
                            </div>

                            <div>
                                <label class="flex items-center">
                                    <input type="checkbox" v-model="profile.notifications" class="mr-2" />
                                    <span>Receive email notifications</span>
                                </label>
                            </div>

                            <div>
                                <label class="block text-gray-700 mb-2">Two-Factor Authentication</label>
                                <div class="flex items-center justify-between">
                                    <span>Enable two-factor authentication</span>
                                    <button @click="toggleTwoFactor"
                                        :class="profile.twoFactor ? 'bg-green-500' : 'bg-gray-300'"
                                        class="relative inline-flex h-6 w-11 items-center rounded-full transition">
                                        <span :class="profile.twoFactor ? 'translate-x-6' : 'translate-x-1'"
                                            class="inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Professional Details -->
                    <div v-if="activeTab === 'professional'">
                        <h3 class="text-xl font-semibold mb-6 text-gray-800">Professional Details</h3>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-gray-700 mb-2">Company</label>
                                <input v-model="profile.company" type="text"
                                    class="w-full border rounded-lg px-3 py-2" />
                            </div>
                            <div>
                                <label class="block text-gray-700 mb-2">Job Title</label>
                                <input v-model="profile.jobTitle" type="text"
                                    class="w-full border rounded-lg px-3 py-2" />
                            </div>
                            <div class="md:col-span-2">
                                <label class="block text-gray-700 mb-2">About Me</label>
                                <textarea v-model="client.bio"
                                    class="w-full border rounded-lg px-3 py-2 h-32"></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- Save Changes Button -->
                    <div class="mt-6 text-right">
                        <button @click="saveChanges"
                            class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import clientService from '~/services/clientService';
import { useAuthStore } from '~/stores/useAuthStore';

definePageMeta({
    requiresAuth: true,
    roles: ['Client'],
    layout: 'account'
});
const {
    data: client,
    status: clientStatus,
    error: clientError,
    refresh: clientRefresh
} = useAsyncData(() => clientService.getClientAsync(useAuthStore().user.id));
console.log(await client.value);

// const {
//     data: userRoles,
//     status: userRolesStatus,
//     error: userRolesError,
//     refresh: userRolesRefresh
// } = useAsyncData(() => accountService.getUserRoles(useAuthStore().user.id));
// console.log(await userRoles.value);

const activeTab = ref('personal')

const profileTabs = [
    { id: 'personal', label: 'Personal Information' },
    { id: 'account', label: 'Account Settings' },
    { id: 'professional', label: 'Professional Details' }
]

const profile = ref({
    fullName: 'John Doe',
    companyRole: 'Software Developer',
    avatarUrl: '',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1 (555) 123-4567',
    company: 'Tech Innovations Inc.',
    jobTitle: 'Senior Software Engineer',
    aboutMe: 'Passionate developer with 5+ years of experience in web technologies.',
    notifications: true,
    twoFactor: false
})

const handleAvatarUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            profile.value.avatarUrl = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const toggleTwoFactor = () => {
    profile.value.twoFactor = !profile.value.twoFactor
}

const saveChanges = () => {
    // Implement save logic
    console.log('Saving profile changes', profile.value)
    // Here you would typically call an API to update the profile
}
</script>