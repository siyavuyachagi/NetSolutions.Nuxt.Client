<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Breadcrumb navigation -->
        <div class="mb-6">
            <div class="flex items-center text-sm text-neutral-500">
                <NuxtLink to="/" class="flex items-center hover:text-primary-500 transition">
                    <ArrowLeft class="h-4 w-4 mr-2" />
                    Back to Home
                </NuxtLink>
                <span class="mx-2">/</span>
                <NuxtLink :to="`/solution/${paymentTransaction?.solution?.id}`"
                    class="hover:text-primary-500 transition">
                    {{ paymentTransaction?.solution?.title }}
                </NuxtLink>
                <span class="mx-2">/</span>
                <span>Getting Started</span>
            </div>
        </div>

        <!-- Main content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left column - form and inputs -->
            <div class="lg:col-span-2 space-y-6">
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h1 class="text-2xl font-bold text-neutral-800 mb-4">You've baught {{
                        paymentTransaction?.solution?.title }}</h1>
                    <p class="text-neutral-600 mb-6">Tell us about your project requirements to help us understand your
                        needs better.</p>

                    <!-- Step content -->
                    <div class="space-y-6">

                        <!-- Success screen -->
                        <div class="text-center py-6">
                            <div class="flex justify-center mb-4">
                                <div class="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                                    <CheckCircle class="h-10 w-10 text-green-500" />
                                </div>
                            </div>
                            <h2 class="text-2xl font-bold text-neutral-800 mb-2">Request Submitted Successfully!</h2>
                            <p class="text-neutral-600 mb-6">Thank you for your interest in our services. We've received
                                your request and will contact you shortly. Download link will also be sent via
                                <a :href="`mailto:${paymentTransaction?.user?.email}`">{{ paymentTransaction?.user?.email }}</a>
                            </p>
                            <p class="text-sm text-neutral-500 mb-4">Reference ID: {{ paymentTransaction?.id }}</p>
                            <div class="flex justify-center space-x-4">
                                <NuxtLink to="/"
                                    class="px-6 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50">
                                    Back to Home
                                </NuxtLink>

                                <NuxtLink v-if="useAuthStore().isAuthenticated" to="/dashboard"
                                    class="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                                    Go to Dashboard
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right column - Package summary and help -->
            <div class="space-y-6">
                <!-- Selected package summary -->
                <!-- <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-lg font-semibold text-neutral-800 mb-4">
                        {{ paymentTransaction?.solution?.title }}
                    </h3>

                    <div class="border-t py-4">
                        <h4 class="font-medium text-neutral-800 mb-2">Included in this package:</h4>
                        <ul class="space-y-2">
                            <li v-for="feature in selectedPackage?.features" :key="feature?.id" class="flex items-start">
                                <CheckCircle class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span class="text-neutral-700 text-sm">{{ feature?.title }}</span>
                            </li>
                        </ul>
                    </div>

                    <div class="bg-neutral-50 rounded-lg p-4 mb-4">
                        <div class="flex justify-between items-center mb-2">
                            <h4 class="font-bold text-neutral-800">{{ selectedPackage?.name }}</h4>
                            <span :class="pkgColor(selectedPackage?.name)">
                                {{ selectedPackage?.name }}
                            </span>
                        </div>

                        <div v-if="selectedPackage?.price !== 0" class="mb-2">
                            <span class="text-xl font-bold text-neutral-800">R{{ solution?.price }}</span>
                            <span class="text-neutral-500 text-sm">/{{ `Total Price` }}</span>
                        </div>

                        <p class="text-neutral-600 text-sm mt-2">{{ selectedPackage?.description }}</p>
                    </div>

                    <div class="mt-4 pt-4 border-t">
                        <NuxtLink :to="`/services/${ourService?.id}`"
                            class="text-primary-500 hover:text-primary-600 text-sm flex items-center">
                            <ArrowLeft class="h-4 w-4 mr-1" />
                            Change package
                        </NuxtLink>
                    </div>
                </div> -->

                <!-- Need help section -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-lg font-semibold text-neutral-800 mb-4">Need Help?</h3>
                    <p class="text-neutral-600 mb-4">Have questions about our services or the application process?</p>

                    <div class="space-y-3">
                        <a href="#" class="flex items-center text-neutral-700 hover:text-primary-500 transition">
                            <MessageCircle class="h-5 w-5 mr-3 text-neutral-500" />
                            <span>Chat with Support</span>
                        </a>
                        <a href="#" class="flex items-center text-neutral-700 hover:text-primary-500 transition">
                            <Phone class="h-5 w-5 mr-3 text-neutral-500" />
                            <span>+27 123 456 7890</span>
                        </a>
                        <a href="#" class="flex items-center text-neutral-700 hover:text-primary-500 transition">
                            <Mail class="h-5 w-5 mr-3 text-neutral-500" />
                            <span>support@yourcompany.com</span>
                        </a>
                    </div>

                    <div class="mt-6">
                        <button
                            class="w-full border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-medium py-2 px-4 rounded-lg flex items-center justify-center">
                            <HelpCircle class="h-5 w-5 mr-2" />
                            View FAQ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
    ArrowLeft, ArrowRight, CheckCircle,
    MessageCircle, Phone, Mail, HelpCircle
} from 'lucide-vue-next';
import { useRoute } from 'vue-router';
import paymentTransactionService from '~/services/paymentTransactionService';

definePageMeta({
    validate(route) {
        if (!(route.params.id)) {
            return false
        }
        return true;
    },
})

// Get route and service ID
const route = useRoute();

const { data: paymentTransaction, status: paymentTransactionStatus, error: paymentTransactionError, refresh: paymentTransactionRefresh } =
    useAsyncData(`solution-purchase-success-${route.params.id}`, () => paymentTransactionService.getTransactionAsync(route.params.id as string));

onMounted(() => {
    paymentTransactionRefresh();
    console.log(paymentTransaction.value);
});
</script>
