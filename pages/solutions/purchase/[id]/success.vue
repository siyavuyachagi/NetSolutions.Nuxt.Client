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
                <NuxtLink :to="`/solution/${solution?.id}`" class="hover:text-primary-500 transition">
                    {{ solution?.name }}
                </NuxtLink>
                <span class="mx-2">/</span>
                <span>Purchase</span>
                <span class="mx-2">/</span>
                <span>Success</span>
            </div>
        </div>

        <!-- Main content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left column - form and inputs -->
            <div class="lg:col-span-2 space-y-6">
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h1 class="text-2xl font-bold text-neutral-800 mb-4">You've baught {{
                        solution?.name }}</h1>
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
                                <a :href="`mailto:${applicationUser?.email}`"
                                    class="text-neutral-700 hover:text-primary-500 transition">
                                    {{ applicationUser?.email }}
                                </a>
                            </p>
                            <p class="text-sm text-neutral-500 mb-4">Reference ID: {{ paymentTransaction?.id }}</p>
                            <div class="flex justify-center space-x-4">
                                <NuxtLink to="/"
                                    class="flex px-6 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50">
                                    <Home class="h-5 w-5 mr-2" />
                                    Back to Home
                                </NuxtLink>

                                <NuxtLink v-if="useAuthStore().isAuthenticated" to="/dashboard"
                                    class="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                                    Go to Dashboard
                                </NuxtLink>

                                <DownloadSolutionButton v-if="solution" :solution-id="solution?.id" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right column - Package summary and help -->
            <div class="space-y-6">
                <!-- Selected package summary -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-lg font-semibold text-neutral-800 mb-4">
                        {{ solution?.name }}
                    </h3>


                    <div class="bg-neutral-50 rounded-lg p-4 mb-4">
                        <!-- <div class="flex justify-between items-center mb-2">
                            <h4 class="font-bold text-neutral-800">{{ selectedPackage?.name }}</h4>
                            <span :class="pkgColor(selectedPackage?.name)">
                                {{ selectedPackage?.name }}
                            </span>
                        </div> -->

                        <div v-if="paymentTransaction?.amount !== 0" class="mb-2">
                            <span class="text-xl font-bold text-neutral-800">R{{ paymentTransaction?.amount }}</span>
                            <span class="text-neutral-500 text-sm">/{{ `Total Price` }}</span>
                        </div>

                        <p class="text-neutral-600 text-sm mt-4 line-clamp-6">{{ solution?.description }}</p>
                    </div>

                    <div class="border-t py-4">
                        <h4 class="font-medium text-neutral-800 mb-2">Features included:</h4>
                        <ul class="space-y-2">
                            <li v-for="feature in solution?.features" :key="feature?.id" class="flex items-start">
                                <CheckCircle class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span class="text-neutral-700 text-sm">{{ feature?.title }}</span>
                            </li>
                        </ul>
                    </div>

                    <!-- <div class="mt-4 pt-4 border-t">
                        <NuxtLink :to="`/services/${ourService?.id}`"
                            class="text-primary-500 hover:text-primary-600 text-sm flex items-center">
                            <ArrowLeft class="h-4 w-4 mr-1" />
                            Change package
                        </NuxtLink>
                    </div> -->
                </div>

                <!-- Need help section -->
                <ContactSupport />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import {
    ArrowLeft, CheckCircle,
    Home} from 'lucide-vue-next';
import { useRoute } from 'vue-router';
import paymentTransactionService from '~/services/paymentTransactionService';
import ContactSupport from '~/components/cards/contact-support.vue';
import solutionService from '~/services/solutionService';
import DownloadSolutionButton from '~/components/solutions/download-solution-button.vue';
import applicationUserService from '~/services/applicationUserService';

definePageMeta({
    validate(route) {
        if (!(route.params.id) || !(route.query.uid) || !(route.query.pid)) {
            return false
        }
        return true;
    },
});

// Get route and service ID
const route = useRoute();

const { data: solution, status: solutionStatus, error: solutionError, refresh: solutionRefresh } =
    useAsyncData(`solution-${route.params.id}`, () => solutionService.getSolutionAsync(route.params.id as string));

const { data: applicationUser, status: applicationUserStatus, error: applicationUserError, refresh: applicationUserRefresh } =
    useAsyncData(`application-user-${route.query.uid}`, () => applicationUserService.getApplicationUserAsync(route.query.uid as string));

const { data: paymentTransaction, status: paymentTransactionStatus, error: paymentTransactionError, refresh: paymentTransactionRefresh } =
    useAsyncData(`solution-purchase-success-${route.query.pid}`, () => paymentTransactionService.getTransactionAsync(route.query.pid as string));

const status = computed(() => {
    if ([solutionStatus.value, applicationUserStatus.value, paymentTransactionStatus.value].includes('error')) {
        return 'error';
    }
    if ([solutionStatus.value, applicationUserStatus.value, paymentTransactionStatus.value].includes('pending')) {
        return 'pending';
    }
    return 'success';
});


onMounted(() => {
    solutionRefresh();
    applicationUserRefresh();
    paymentTransactionRefresh();
    console.log(solution.value);
    console.log(paymentTransaction.value);
});
</script>
