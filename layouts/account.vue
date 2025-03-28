<template>
    <div class="relative min-h-screen">
        <!-- Sidebar Backdrop -->
        <div v-if="sidebarOpen" class="fixed inset-0 bg-black opacity-50 z-20" @click="toggleSidebar"></div>

        <!-- Sidebar -->
        <div :class="[
            'fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        ]">
            <div class="p-6">
                <h2 class="text-2xl font-bold text-gray-800">Menu</h2>
            </div>
            <nav class="p-4">
                <ul>
                    <li class="mb-4">
                        <nuxt-link to="/account/" class="text-gray-700 hover:text-blue-600">Dashboard</nuxt-link>
                    </li>
                    <li class="mb-4">
                        <nuxt-link to="/account/projects" class="text-gray-700 hover:text-blue-600">Projects</nuxt-link>
                    </li>
                    <li class="mb-4">
                        <nuxt-link to="/solutions" class="text-gray-700 hover:text-blue-600">Solutions</nuxt-link>
                    </li>
                </ul>
            </nav>
        </div>

        <!-- Main Content Area -->
        <div class="relative z-10">
            <HeadersAccountHeader @toggle-sidebar="toggleSidebar" />

            <!-- Main Dashboard Content -->
            <main class="p-6">
                <slot></slot>
            </main>
        </div>
    </div>
    <!-- Main Content
    <main class="flex-grow container mx-auto px-4 py-8">
        <slot></slot>
    </main> -->

    <FootersDefaultFooter />
</template>


<script setup lang="ts">
useHead({
    title: 'HetSolutions | Client Dashboard',
})
// Sidebar toggle (always togglable)
const sidebarOpen = ref(false);
const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
};
</script>