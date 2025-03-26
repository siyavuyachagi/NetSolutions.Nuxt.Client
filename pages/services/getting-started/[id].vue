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
                <NuxtLink :to="`/services/${businessServicePackage?.businessService?.id}`"
                    class="hover:text-primary-500 transition">
                    {{ businessServicePackage?.businessService?.name }}
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
                    <h1 class="text-2xl font-bold text-neutral-800 mb-4">Get started with {{
                        businessServicePackage?.businessService?.name }}</h1>
                    <p class="text-neutral-600 mb-6">Tell us about your project requirements to help us understand your
                        needs better.</p>

                    <!-- Progress steps -->
                    <div class="mb-8">
                        <div class="flex items-center justify-between">
                            <div v-for="(step, index) in steps" :key="index"
                                class="flex flex-col items-center w-full relative">
                                <div :class="[
                                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium z-10',
                                    currentStep > index + 1
                                        ? 'bg-primary-500 text-white'
                                        : currentStep === index + 1
                                            ? 'bg-primary-100 text-primary-600 border-2 border-primary-500'
                                            : 'bg-neutral-100 text-neutral-400'
                                ]">
                                    {{ index + 1 }}
                                </div>
                                <div class="text-xs mt-2 text-center"
                                    :class="currentStep >= index + 1 ? 'text-primary-600 font-medium' : 'text-neutral-500'">
                                    {{ step.label }}
                                </div>
                                <!-- Connector line -->
                                <div v-if="index < steps.length - 1" :class="[
                                    'absolute top-4 w-full h-0.5 left-1/2',
                                    currentStep > index + 1 ? 'bg-primary-500' : 'bg-neutral-200'
                                ]"></div>
                            </div>
                        </div>
                    </div>


                    <!-- Step content -->
                    <form @submit.prevent="goToNextStep" class="space-y-6">
                        <!-- Step 1: Project Requirements -->
                        <div v-if="currentStep === 1">
                            <div class="space-y-4">
                                <div>
                                    <label for="name" class="block text-sm font-medium text-neutral-700 mb-1">Project
                                        Name <small class="text-error">*</small></label>
                                    <input type="text" id="name" v-model="projectDetailsModel.name.value"
                                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                        :class="{ 'border-red-500': projectDetailsModel.name.errors?.length }"
                                        placeholder="Give your project a name" />
                                    <p v-if="projectDetailsModel.name.errors?.length" class="mt-1 text-sm text-red-600">
                                        {{
                                            projectDetailsModel.name.errors[0]
                                        }}</p>
                                </div>

                                <div>
                                    <label for="description"
                                        class="block text-sm font-medium text-neutral-700 mb-1">Project
                                        Description <small class="text-error">*</small></label>
                                    <textarea id="description" v-model="projectDetailsModel.description.value" rows="5"
                                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none min-h-10 max-h-80"
                                        :class="{ 'border-red-500': projectDetailsModel.description.errors?.length }"
                                        placeholder="Describe your project requirements in detail"
                                        autocomplete="on"></textarea>
                                    <p v-if="projectDetailsModel.description.errors?.length"
                                        class="mt-1 text-sm text-red-600">{{
                                            projectDetailsModel.description.errors[0] }}</p>
                                </div>

                                <!-- <div>
                                    <label for="timeline"
                                        class="block text-sm font-medium text-neutral-700 mb-1">Desired Timeline
                                        <small class="text-error">*</small></label>
                                    <select id="timeline" v-model="projectDetailsModel.timeline.value"
                                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                        :class="{ 'border-red-500': projectDetailsModel.timeline.errors?.length }">
                                        <option value="" disabled selected>Select a timeline</option>
                                        <option value="urgent">Urgent (< 1 month)</option>
                                        <option value="standard">Standard (1-3 months)</option>
                                        <option value="flexible">Flexible (3-6 months)</option>
                                        <option value="longterm">Long-term (6+ months)</option>
                                    </select>
                                    <p v-if="projectDetailsModel.timeline.errors?.length"
                                        class="mt-1 text-sm text-red-600">
                                        {{
                                            projectDetailsModel.timeline.errors[0] }}</p>
                                </div> -->

                                <TimelineSelector @update:timeline="updateTimeline"
                                    :errors="projectDetailsModel.timeline.errors"></TimelineSelector>

                                <div>
                                    <label for="projectName"
                                        class="block text-sm font-medium text-neutral-700 mb-1">Target audience
                                        <small>(Optional)</small></label>
                                    <input type="text" id="projectName"
                                        v-model="projectDetailsModel.targetAudience.value"
                                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                        placeholder="What are your target auddience" />
                                </div>
                            </div>
                        </div>

                        <!-- Step 2: File Attachments -->
                        <div v-if="currentStep === 2">
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-neutral-700 mb-2">Supporting
                                        Documents</label>
                                    <div class="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors"
                                        :class="{ 'border-primary-400 bg-primary-50': isDragging }"
                                        @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false"
                                        @drop.prevent="handleFileDrop">
                                        <div class="space-y-2">
                                            <CloudUpload class="h-10 w-10 mx-auto text-neutral-400" />
                                            <p class="text-neutral-600">Drag and drop your files here, or</p>
                                            <label for="fileUpload"
                                                class="inline-block bg-primary-50 px-4 py-2 rounded text-primary-600 font-medium cursor-pointer hover:bg-primary-100 transition">
                                                Browse Files
                                                <input type="file" id="fileUpload" multiple class="hidden"
                                                    @change="handleFileChange" />
                                            </label>
                                            <p class="text-xs text-neutral-500">Supported file types: {{
                                                allowedExtensions.join(', ') }} (Max 5MB per file)</p>
                                        </div>
                                    </div>
                                    <p v-if="attachmentsModel.files.errors?.length" class="mt-1 text-sm text-error">
                                        <span v-for="error in attachmentsModel.files.errors" :key="error">{{ error
                                            }}</span>
                                    </p>
                                </div>

                                <!-- File list -->
                                <div v-if="attachmentsModel.files.value.length" class="mt-4">
                                    <h3 class="text-sm font-medium text-neutral-700 mb-2">Uploaded Files ({{
                                        attachmentsModel.files.value.length }})</h3>
                                    <ul class="space-y-2">
                                        <li v-for="(file, index) in attachmentsModel.files.value" :key="index"
                                            class="flex items-center justify-between p-3 bg-neutral-50 rounded-md">
                                            <div class="flex items-center">
                                                <div class="p-2 bg-neutral-100 rounded mr-3">
                                                    <FileText
                                                        v-if="file.type.includes('pdf') || file.type.includes('doc')"
                                                        class="h-5 w-5 text-neutral-600" />
                                                    <Image v-else-if="file.type.includes('image')"
                                                        class="h-5 w-5 text-neutral-600" />
                                                    <File v-else class="h-5 w-5 text-neutral-600" />
                                                </div>
                                                <div>
                                                    <p class="text-sm font-medium text-neutral-700 truncate max-w-xs">{{
                                                        file.name }}</p>
                                                    <p class="text-xs text-neutral-500">{{ formatFileSize(file.size) }}
                                                    </p>
                                                </div>
                                            </div>
                                            <button type="button" @click="removeFile(index)"
                                                class="p-1 rounded-full hover:bg-neutral-200 text-neutral-500 transition">
                                                <X class="h-4 w-4" />
                                            </button>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <label for="additionalNotes"
                                        class="block text-sm font-medium text-neutral-700 mb-1">Additional Notes</label>
                                    <textarea id="additionalNotes" v-model="attachmentsModel.additionalNotes.value"
                                        rows="3"
                                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none resize-none"
                                        placeholder="Any additional information you'd like to share"></textarea>
                                </div>
                            </div>
                        </div>

                        <!-- Step 3: Contact Information -->
                        <div v-if="currentStep === 3">
                            <div class="space-y-4">
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label for="firstName"
                                            class="block text-sm font-medium text-neutral-700 mb-1">First Name</label>
                                        <input type="text" id="firstName" v-model="contactInfo.firstName.value"
                                            class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                            :class="{ 'border-red-500': contactInfo.firstName.errors?.length }"
                                            placeholder="Your first name" />
                                        <p v-if="contactInfo.firstName.errors?.length"
                                            class="mt-1 text-sm text-red-600">{{
                                                contactInfo.firstName.errors[0]
                                            }}</p>
                                    </div>

                                    <div>
                                        <label for="lastName"
                                            class="block text-sm font-medium text-neutral-700 mb-1">Last Name</label>
                                        <input type="text" id="lastName" v-model="contactInfo.lastName.value"
                                            class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                            :class="{ 'border-red-500': contactInfo.lastName.errors?.length }"
                                            placeholder="Your last name" />
                                        <p v-if="contactInfo.lastName.errors?.length" class="mt-1 text-sm text-red-600">
                                            {{ contactInfo.lastName.errors[0]
                                            }}</p>
                                    </div>
                                </div>

                                <div>
                                    <label for="email" class="block text-sm font-medium text-neutral-700 mb-1">Email
                                        Address</label>
                                    <input type="email" id="email" v-model="contactInfo.email.value"
                                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                        :class="{ 'border-red-500': contactInfo.email.errors?.length }"
                                        placeholder="your@email.com" />
                                    <p v-if="contactInfo.email.errors?.length" class="mt-1 text-sm text-red-600">{{
                                        contactInfo.email.errors[0] }}</p>
                                </div>

                                <div>
                                    <label for="phone" class="block text-sm font-medium text-neutral-700 mb-1">Phone
                                        Number</label>
                                    <input type="tel" id="phone" v-model="contactInfo.phoneNumber.value"
                                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                        :class="{ 'border-red-500': contactInfo.phoneNumber.errors?.length }"
                                        placeholder="Your phone number" />
                                    <p v-if="contactInfo.phoneNumber.errors?.length" class="mt-1 text-sm text-red-600">
                                        {{
                                            contactInfo.phoneNumber.errors[0] }}</p>
                                </div>

                                <div>
                                    <label for="company"
                                        class="block text-sm font-medium text-neutral-700 mb-1">Company/Organization</label>
                                    <input type="text" id="company" v-model="contactInfo.organization.value"
                                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                        placeholder="Your company or organization (if applicable)"
                                        autocomplete="organization" />
                                </div>

                                <div>
                                    <label class="flex items-center">
                                        <input type="checkbox" v-model="contactInfo.acceptTerms.value"
                                            class="h-4 w-4 text-primary-600 focus:ring-primary-500" />
                                        <span class="ml-2 text-sm text-neutral-700">
                                            I agree to the <a href="#" class="text-primary-600 hover:underline">Terms of
                                                Service</a> and
                                            <a href="#" class="text-primary-600 hover:underline">Privacy Policy</a>
                                        </span>
                                    </label>
                                    <p v-if="contactInfo.acceptTerms.errors?.length" class="mt-1 text-sm text-red-600">
                                        {{
                                            contactInfo.acceptTerms.errors[0] }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Success screen -->
                        <div v-if="currentStep > steps.length" class="text-center py-6">
                            <div class="flex justify-center mb-4">
                                <div class="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                                    <CheckCircle class="h-10 w-10 text-green-500" />
                                </div>
                            </div>
                            <h2 class="text-2xl font-bold text-neutral-800 mb-2">Request Submitted Successfully!</h2>
                            <p class="text-neutral-600 mb-6">Thank you for your interest in our services. We've received
                                your request and will contact you shortly.</p>
                            <p class="text-sm text-neutral-500 mb-4">Reference ID: {{ 'REQ-' +
                                Math.random().toString(36).substr(2, 9).toUpperCase() }}</p>
                            <div class="flex justify-center space-x-4">
                                <NuxtLink to="/"
                                    class="px-6 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50">
                                    Back to Home
                                </NuxtLink>
                                <NuxtLink to="/dashboard"
                                    class="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                                    Go to Dashboard
                                </NuxtLink>
                            </div>
                        </div>

                        <!-- Navigation buttons -->
                        <div v-if="currentStep < steps.length + 1" class="flex justify-between pt-4 border-t">
                            <button type="button" v-if="currentStep > 1" @click="goToPreviousStep"
                                class="px-6 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 transition">
                                Back
                            </button>
                            <div v-else></div>

                            <button type="submit"
                                class="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition flex items-center"
                                :disabled="isSubmitting" @click="goToNextStep">
                                <span v-if="isSubmitting">Processing...</span>
                                <span v-else-if="currentStep === steps.length">Submit Request</span>
                                <span v-else>Continue</span>
                                <ArrowRight v-if="!isSubmitting" class="h-4 w-4 ml-2" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Right column - Package summary and help -->
            <div class="space-y-6">
                <!-- Selected package summary -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-lg font-semibold text-neutral-800 mb-4">{{ businessServicePackage?.name }}
                    </h3>


                    <div class="border-t py-4">
                        <h4 class="font-medium text-neutral-800 mb-2">Included in this package:</h4>
                        <ul class="space-y-2">
                            <li v-for="feature in businessServicePackage?.packageFeatures" :key="feature.id"
                                class="flex items-start">
                                <CheckCircle class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span class="text-neutral-700 text-sm">{{ feature?.title }}</span>
                            </li>
                        </ul>
                    </div>

                    <div class="bg-neutral-50 rounded-lg p-4 mb-4">
                        <div v-if="businessServicePackage?.name !== 'Custom'"
                            class="flex justify-between items-center mb-2">
                            <h4 class="font-bold text-neutral-800">Total Price</h4>
                            <span :class="pkgColor(businessServicePackage?.name || '')">
                                {{ businessServicePackage?.name }}
                            </span>
                        </div>

                        <div class="mb-2">
                            <span class="text-xl font-bold text-neutral-800 mr-2">R{{ businessServicePackage?.price
                                }}</span>
                            <span class="text-neutral-500 text-sm">/{{
                                businessServicePackage?.billingCycle }}</span>
                        </div>

                        <p class="text-neutral-600 text-sm mt-2">{{ businessServicePackage?.description }}</p>
                    </div>

                    <div class="mt-4 pt-4 border-t">
                        <NuxtLink :to="`/services/${businessServicePackage?.businessService?.id}`"
                            class="text-primary-500 hover:text-primary-600 text-sm flex items-center">
                            <ArrowLeft class="h-4 w-4 mr-1" />
                            Change package
                        </NuxtLink>
                    </div>
                </div>

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
    ArrowLeft, ArrowRight, CheckCircle, CloudUpload, X, FileText, Image,
    File, MessageCircle, Phone, Mail, HelpCircle
} from 'lucide-vue-next';
import { useRoute, useRouter } from 'vue-router';
import ourServicePackageService from '~/services/businessServicePackageService';
import VueSanity, { email, extensions, maxSize, required, type ModelConfig } from 'vuesanity';
import { set } from 'date-fns';
import type { Timeline } from '~/components/timelineSelector.vue';
import projectService from '~/services/projectService';
import businessServicePackageService from '~/services/businessServicePackageService';

definePageMeta({
    validate(route) {
        if (!(route.params.id)) {
            return false
        } else
            return true;
    },
})

// Get route and service ID
const route = useRoute();
const router = useRouter();

const { data: businessServicePackage, status: businessServicePackageStatus, error: businessServicePackageError, refresh: businessServicePackageRefresh }
    = useAsyncData(`ourServicePackage--getting-started-${route.params.id}`, () => businessServicePackageService.getBusinessServicePackage(route.params.id as string));


// Define steps
const steps = [
    { label: 'Project Details' },
    { label: 'Attachments' },
    { label: 'Contact Info' },
];

// Form state
const currentStep = computed(() => {
    return parseInt(route.query.step as string) || 1;
});

const isSubmitting = ref(false);
const isDragging = ref(false);

const requestModel: ModelConfig = reactive({
    ourServicePackageId: { value: route.params.id },
});

const projectDetailsModel: ModelConfig = reactive({
    name: { validations: [required()] },
    description: { validations: [required()] },
    timeline: { validations: [required()] },
    targetAudience: {},
});


const allowedExtensions = [
    'PDF', 'DOC', 'DOCX', 'TXT', 'CSV', 'JSON', // Documents & Data Files
    'JPG', 'PNG', 'JPEG', 'GIF', 'SVG', 'FIG', // Graphic & UI/UX Design Files
    'HTML', 'CSS', 'JS', // Web Development Files
    'ZIP' // Archive for packaging files
];
const attachmentsModel: ModelConfig = reactive({
    files: { validations: [required(), extensions(allowedExtensions), maxSize(5)], value: [] },
    additionalNotes: {},
});

const contactInfo: ModelConfig = reactive({
    lastName: { validations: [required()] },
    firstName: { validations: [required()] },
    email: { validations: [required(), email()] },
    phoneNumber: {},
    additionalNotes: {},
    organization: {},
    acceptTerms: { validations: [required()] },
});

// Errors object
const errors = ref({});

// Color helper function
const pkgColor = (name: string) => {
    switch (name) {
        case 'Basic':
            return 'bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium';
        case 'Professional':
            return 'bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium';
        case 'Enterprise':
            return 'bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium';
        default:
            return 'bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full text-xs font-medium';
    }
};

// Format file size
const formatFileSize = (bytes: any) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Handle file drop
const handleFileDrop = (event: any) => {
    isDragging.value = false;
    const droppedFiles = event.dataTransfer.files;
    processFiles(droppedFiles);
};

// Handle file selection
const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement; // Typecast the target as HTMLInputElement
    const selectedFiles = target.files; // Get the selected files from the input element
    console.log(selectedFiles);
    if (selectedFiles) {
        processFiles(selectedFiles);
    }
};


// Process files
const processFiles = (files: FileList) => {
    attachmentsModel.files.value = [...attachmentsModel.files.value, ...Array.from(files)];
    const state = new VueSanity(attachmentsModel, false);
    return state.isValid;
};

// Remove file
const removeFile = (index: number) => {
    attachmentsModel.files.value.splice(index, 1);
};

function stepValidation() {
    switch (currentStep.value) {
        case 1:
            {
                const valid = new VueSanity(projectDetailsModel, false).isValid;
                if (valid) return Object.assign(requestModel, projectDetailsModel);
                return valid;
                break;
            }
        case 2:
            {
                const valid = new VueSanity(attachmentsModel, false).isValid;
                if (valid) return Object.assign(requestModel, attachmentsModel);
                return valid;
                break;
            }
        case 3:
            {
                const valid = new VueSanity(contactInfo, false).isValid;
                if (valid) return Object.assign(requestModel, contactInfo);
                return valid;
                break;
            }
        default:
            break;
    }
    return true;
}


// Navigation methods
const goToNextStep = () => {
    if (stepValidation()) {
        router.push({ query: { ...route.query, step: currentStep.value + 1 } });
    }
    if (currentStep.value === steps.length) {
        handleProjectSubmit();
    }
};


const goToPreviousStep = () => {
    router.push({ query: { ...route.query, step: currentStep.value - 1 } });
};

function updateTimeline(timeline: Timeline) {
    // Create an array of startDate and endDate, ignoring the timelineType
    const timelineArray = [timeline.startDate, timeline.endDate];
    projectDetailsModel.timeline.value = timelineArray;

    console.log(timelineArray);
}



// Submit form
const handleProjectSubmit = async () => {
    isSubmitting.value = true;
    try {
        const state = new VueSanity(requestModel);
        if (state.isValid) {
            console.log(state);
            await projectService.postProjectCreate(state.formData);

        }
    } catch (error) {
        console.error('Error submitting form:', error);
        isSubmitting.value = false;
    }
};

console.log(businessServicePackage.value);
onMounted(() => {
    if (!route.query.step) router.replace({ query: { ...route.query, step: 1 } })
    businessServicePackageRefresh();
})
</script>
