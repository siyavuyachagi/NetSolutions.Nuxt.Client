<template>
    <div class="min-h-screen bg-gray-50 p-6">
        <div class="container mx-auto">
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
                        <img src="https://placehold.co/600x400" alt="Profile"
                            class="w-10 h-10 rounded-full cursor-pointer" @click="toggleProfileDropdown" />
                        <div v-if="isProfileDropdownOpen"
                            class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                            <div class="py-1">
                                <nuxt-link to="/account/profile"
                                    class="block px-4 py-2 hover:bg-gray-100">Profile</nuxt-link>
                                <nuxt-link to="/dashboard/profile"
                                    class="block px-4 py-2 hover:bg-gray-100">Settings</nuxt-link>
                                <nuxt-link to=""
                                    class="block px-4 py-2 hover:bg-gray-100 text-red-500">Logout</nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Projects Overview -->
            <section class="grid md:grid-cols-3 gap-6">
                <div class="bg-white shadow rounded-lg p-6">
                    <h2 class="text-xl font-semibold mb-4 text-gray-800">Active Projects</h2>
                    <p class="text-3xl font-bold text-blue-600">{{ activeProjectsCount }}</p>
                </div>
                <div class="bg-white shadow rounded-lg p-6">
                    <h2 class="text-xl font-semibold mb-4 text-gray-800">Completed Projects</h2>
                    <p class="text-3xl font-bold text-green-600">{{ completedProjectsCount }}</p>
                </div>
                <div class="bg-white shadow rounded-lg p-6">
                    <h2 class="text-xl font-semibold mb-4 text-gray-800">Pending Communication</h2>
                    <p class="text-3xl font-bold text-yellow-600">{{ pendingCommunicationsCount }}</p>
                </div>
            </section>

            <!-- Projects List -->
            <section class="mt-8">
                <div class="bg-white shadow rounded-lg">
                    <div
                        class="p-6 border-b flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <h2 class="text-2xl font-semibold text-gray-800 w-full text-center md:text-left">Your Projects
                        </h2>
                        <div
                            class="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 w-full md:w-auto">
                            <input type="text" v-model="searchTerm" placeholder="Search projects..."
                                class="border rounded-lg px-3 py-2 w-full md:w-64" />
                            <select v-model="filterStatus" class="border rounded-lg px-3 py-2 w-full md:w-auto">
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-100 border-b">
                                <tr>
                                    <th class="p-4 text-left">Project Name</th>
                                    <th class="p-4 text-left">Status</th>
                                    <th class="p-4 text-left">Progress</th>
                                    <th class="p-4 text-left">Last Updated</th>
                                    <th class="p-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="project in filteredProjects" :key="project.id"
                                    class="border-b hover:bg-gray-50">
                                    <td class="p-4">{{ project.name }}</td>
                                    <td class="p-4">
                                        <span :class="{
                                            'bg-green-100 text-green-800': project.status === 'completed',
                                            'bg-blue-100 text-blue-800': project.status === 'active',
                                            'bg-yellow-100 text-yellow-800': project.status === 'pending'
                                        }" class="px-2 py-1 rounded-full text-xs font-medium">
                                            {{ project.status }}
                                        </span>
                                    </td>
                                    <td class="p-4">
                                        <div class="w-full bg-gray-200 rounded-full h-2.5">
                                            <div class="bg-blue-600 h-2.5 rounded-full"
                                                :style="{ width: `${project.progress}%` }"></div>
                                        </div>
                                    </td>
                                    <td class="p-4">{{ project.lastUpdated }}</td>
                                    <td class="p-4">
                                        <div class="flex space-x-2">
                                            <button @click="viewProjectDetails(project)"
                                                class="text-blue-500 hover:text-blue-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                    viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    <path fill-rule="evenodd"
                                                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                            <button @click="deleteProject(project)"
                                                class="text-red-500 hover:text-red-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                    viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd"
                                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <!-- Communication Section -->
            <section class="mt-8 grid md:grid-cols-2 gap-6">
                <div class="bg-white shadow rounded-lg">
                    <div class="p-6 border-b">
                        <h2 class="text-2xl font-semibold text-gray-800">Recent Messages</h2>
                    </div>
                    <div class="p-4">
                        <div v-for="message in recentMessages" :key="message.id" class="border-b py-3 last:border-b-0">
                            <div class="flex justify-between items-center mb-2">
                                <span class="font-medium text-gray-700">{{ message.sender }}</span>
                                <span class="text-sm text-gray-500">{{ message.timestamp }}</span>
                            </div>
                            <p class="text-gray-600">{{ message.content }}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white shadow rounded-lg">
                    <div class="p-6 border-b flex justify-between items-center">
                        <h2 class="text-2xl font-semibold text-gray-800">Send a Message</h2>
                    </div>
                    <form @submit.prevent="sendMessage" class="p-6">
                        <select v-model="selectedProject" class="w-full border rounded-lg px-3 py-2 mb-4" required>
                            <option value="">Select Project</option>
                            <option v-for="project in projects" :key="project.id" :value="project.id">
                                {{ project.name }}
                            </option>
                        </select>
                        <textarea v-model="messageContent" placeholder="Type your message..."
                            class="w-full border rounded-lg px-3 py-2 h-32 mb-4" required></textarea>
                        <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
                            Send Message
                        </button>
                    </form>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Sample data (would typically come from an API)
const projects = ref([
    {
        id: 1,
        name: 'Website Redesign',
        status: 'active',
        progress: 65,
        lastUpdated: '2024-03-05'
    },
    {
        id: 2,
        name: 'Mobile App Development',
        status: 'pending',
        progress: 30,
        lastUpdated: '2024-03-03'
    },
    {
        id: 3,
        name: 'E-commerce Platform',
        status: 'completed',
        progress: 100,
        lastUpdated: '2024-02-28'
    }
])

const recentMessages = ref([
    {
        id: 1,
        sender: 'Project Manager',
        content: 'Updated design mockups are ready for review.',
        timestamp: '2 hours ago'
    },
    {
        id: 2,
        sender: 'Client',
        content: 'Can we schedule a meeting to discuss the latest changes?',
        timestamp: 'Yesterday'
    }
])

// Dashboard statistics
const activeProjectsCount = computed(() =>
    projects.value.filter(p => p.status === 'active').length
)
const completedProjectsCount = computed(() =>
    projects.value.filter(p => p.status === 'completed').length
)
const pendingCommunicationsCount = computed(() =>
    recentMessages.value.length
)

// Search and filter
const searchTerm = ref('')
const filterStatus = ref('')

const filteredProjects = computed(() => {
    return projects.value.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.value.toLowerCase())
        const matchesStatus = !filterStatus.value || project.status === filterStatus.value
        return matchesSearch && matchesStatus
    })
})

// Profile dropdown
const isProfileDropdownOpen = ref(false)
const toggleProfileDropdown = () => {
    isProfileDropdownOpen.value = !isProfileDropdownOpen.value
}

// New project modal
const openNewProjectModal = () => {
    // Implement new project modal logic
    console.log('Open new project modal')
}

// Project actions
const viewProjectDetails = (project) => {
    // Implement project details view
    console.log('View project details', project)
}

const deleteProject = (project) => {
    // Implement project deletion
    const index = projects.value.findIndex(p => p.id === project.id)
    if (index !== -1) {
        projects.value.splice(index, 1)
    }
}

// Message functionality
const selectedProject = ref('')
const messageContent = ref('')

const sendMessage = () => {
    // Implement message sending logic
    console.log('Sending message', {
        projectId: selectedProject.value,
        message: messageContent.value
    })

    // Reset form
    selectedProject.value = ''
    messageContent.value = ''
}
</script>