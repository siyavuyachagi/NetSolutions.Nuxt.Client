<template>
    <!-- Projects Overview -->
    <section class="grid md:grid-cols-3 gap-6">
        <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-800">Active Projects</h2>
            <p class="text-3xl font-bold text-blue-600">{{ client?.projects.length }}</p>
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
            <div class="p-6 border-b flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <h2 class="text-2xl font-semibold text-gray-800 w-full text-center md:text-left">Your
                    Projects</h2>
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
                            <!-- <th class="p-4 text-left">Progress</th> -->
                            <th class="p-4 text-left">Last Updated</th>
                            <th class="p-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="project in client?.projects" :key="project.id" class="border-b hover:bg-gray-50">
                            <td class="p-4">{{ project.name }}</td>
                            <td class="p-4">
                                <span :class="getStatusClasses(project.status)">
                                    {{ project.status }}
                                </span>
                            </td>
                            <!-- <td class="p-4">
                                <div class="w-full bg-gray-200 rounded-full h-2.5">
                                    <div class="bg-blue-600 h-2.5 rounded-full"
                                        :style="{ width: project.progress ? `${project.progress}%` : `${Math.floor(Math.random() * 100)}%` }">
                                    </div>
                                </div>
                            </td> -->
                            <td class="p-4">{{ format(new Date(project.createdAt), "do MMM yyyy p") }}</td>
                            <td class="p-4">
                                <div class="flex space-x-2">
                                    <button @click="viewProjectDetails(project)"
                                        class="text-blue-500 hover:text-blue-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fill-rule="evenodd"
                                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                    <button @click="deleteProject(project)" class="text-red-500 hover:text-red-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path fill-rule="evenodd"
                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="client?.projects.length === 0">
                            <td colspan="5" class="p-4 text-center text-gray-500">No projects found.</td>
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
                    <option v-for="project in client?.projects" :key="project.id" :value="project.id">
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
</template>

<script setup lang="ts">
import { format } from 'date-fns';
import { useAsyncData } from 'nuxt/app';
import clientService from '~/services/clientService'
import { useAuthStore } from '~/stores/useAuthStore'

definePageMeta({
    layout: 'account',
    requiresAuth: true,
    roles: ['client']
});


const { data: client, status: clientStatus, error: clientError, refresh: clientRefresh } = useAsyncData(() =>
    clientService.getClientAsync(useAuthStore().user?.id as string)
);

// const { data: projects, status: projectsStatus, error: projectsError, refresh: projectsRefresh } = useAsyncData(() =>
//     projectService.getUserProjectsAsync(useAuthStore().user?.id as string)
// );
console.log(await client.value);
// console.log(await projects.value);
// Recent messages
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
]);

// Dashboard statistics computed from client.projects if available
const activeProjectsCount = computed(() => {
    return client.value?.projects.filter((project: any) => project.status.toLowerCase() === 'active').length || 0;
});
const completedProjectsCount = computed(() => {
    return client.value?.projects.filter((project: any) => project.status.toLowerCase() === 'completed').length || 0;
});
const pendingCommunicationsCount = computed(() => recentMessages.value.length);

// Search and filter
const searchTerm = ref('');
const filterStatus = ref('');

// const filteredProjects = computed(() => {
//     if (!client.value?.projects) return [];
//     return client.value.projects.filter((project: any) => {
//         const matchesSearch = project.title.toLowerCase().includes(searchTerm.value.toLowerCase());
//         const matchesStatus = !filterStatus.value || project.status.toLowerCase() === filterStatus.value.toLowerCase();
//         return matchesSearch && matchesStatus;
//     });
// });

// Project actions
const viewProjectDetails = (project: any) => {
    console.log('View project details', project);
};

const deleteProject = (project: any) => {
    if (!client.value?.projects) return;
    const index = client.value.projects.findIndex((p: any) => p.id === project.id);
    if (index !== -1) {
        client.value.projects.splice(index, 1);
    }
};

// Message functionality
const selectedProject = ref('');
const messageContent = ref('');

const sendMessage = () => {
    console.log('Sending message', {
        projectId: selectedProject.value,
        message: messageContent.value
    });
    selectedProject.value = '';
    messageContent.value = '';
};

// Utility: Get status classes based on project status
const getStatusClasses = (status: string) => {
    const baseClasses = "px-2 py-1 rounded text-xs font-medium";
    switch (status) {
        case 'Not Started':
            return `${baseClasses} bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300`;
        case 'Planning Phase':
            return `${baseClasses} bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300`;
        case 'In Progress':
            return `${baseClasses} bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300`;
        case 'On Hold':
            return `${baseClasses} bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300`;
        case 'Awaiting Approval':
            return `${baseClasses} bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300`;
        case 'Testing & QA':
            return `${baseClasses} bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300`;
        case 'Deployment Phase':
            return `${baseClasses} bg-teal-200 text-teal-700 dark:bg-teal-800 dark:text-teal-200`;
        case 'Maintenance & Support':
            return `${baseClasses} bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300`;
        case 'Completed Successfully':
            return `${baseClasses} bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300`;
        case 'Cancelled/Terminated':
            return `${baseClasses} bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300`;
        default:
            return baseClasses;
    }
};

onMounted(() => {
    clientRefresh()
})
</script>
