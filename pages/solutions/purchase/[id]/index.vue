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
                <NuxtLink :to="`/solutions/${solution?.id}`" class="hover:text-primary-500 transition">
                    {{ solution?.title }}
                </NuxtLink>
                <span class="mx-2">/</span>
                <span>Purchase</span>
            </div>
        </div>

        <!-- Main content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left column - form and inputs -->
            <div class="lg:col-span-2 space-y-6">
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h1 class="text-2xl font-bold text-neutral-800 mb-4">Get Started with {{ solution?.title }}</h1>
                    <p class="text-neutral-600 mb-6">Tell us about your project requirements to help us understand your
                        needs better.</p>

                    <!-- Progress steps -->
                    <!-- <div class="mb-8">
                        <div class="flex items-center justify-between">
                            <div v-for="(step, index) in steps" :key="index"
                                class="flex flex-col items-center w-full relative">
                                <div :class="[
                                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium z-10',
                                    currentStep > index
                                        ? 'bg-primary-500 text-white'
                                        : currentStep === index
                                            ? 'bg-primary-100 text-primary-600 border-2 border-primary-500'
                                            : 'bg-neutral-100 text-neutral-400'
                                ]">
                                    {{ index + 1 }}
                                </div>
                                <div class="text-xs mt-2 text-center"
                                    :class="currentStep >= index ? 'text-primary-600 font-medium' : 'text-neutral-500'">
                                    {{ step.label }}
                                </div>
                                <div v-if="index < steps.length - 1" :class="[
                                    'absolute top-4 w-full h-0.5 left-1/2',
                                    currentStep > index ? 'bg-primary-500' : 'bg-neutral-200'
                                ]"></div>
                            </div>
                        </div>
                    </div> -->

                    <!-- Step content -->
                    <form @submit.prevent="goToNextStep" class="space-y-6">
                        <!-- Step 1: Project Requirements -->
                        <div v-if="currentStep === 0">
                            <!-- <div class="space-y-4">
                                <div>
                                    <label for="projectName"
                                        class="block text-sm font-medium text-neutral-700 mb-1">Project Name</label>
                                    <input type="text" id="projectName" v-model="formData.projectName"
                                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                        :class="{ 'border-red-500': errors.projectName }"
                                        placeholder="Give your project a name" />
                                    <p v-if="errors.projectName" class="mt-1 text-sm text-red-600">{{ errors.projectName
                                        }}</p>
                                </div>

                                <div>
                                    <label for="projectDescription"
                                        class="block text-sm font-medium text-neutral-700 mb-1">Project
                                        Description</label>
                                    <textarea id="projectDescription" v-model="formData.projectDescription" rows="5"
                                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none resize-none"
                                        :class="{ 'border-red-500': errors.projectDescription }"
                                        placeholder="Describe your project requirements in detail"></textarea>
                                    <p v-if="errors.projectDescription" class="mt-1 text-sm text-red-600">{{
                                        errors.projectDescription }}</p>
                                </div>

                                <div>
                                    <label for="targetAudience"
                                        class="block text-sm font-medium text-neutral-700 mb-1">Target Audience</label>
                                    <input type="text" id="targetAudience" v-model="formData.targetAudience"
                                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                        placeholder="Who is your target audience?" />
                                </div>

                                <div>
                                    <label for="timeline"
                                        class="block text-sm font-medium text-neutral-700 mb-1">Desired Timeline</label>
                                    <select id="timeline" v-model="formData.timeline"
                                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none">
                                        <option value="">Select a timeline</option>
                                        <option value="urgent">Urgent (< 1 month)</option>
                                        <option value="standard">Standard (1-3 months)</option>
                                        <option value="flexible">Flexible (3-6 months)</option>
                                        <option value="longterm">Long-term (6+ months)</option>
                                    </select>
                                </div>
                            </div> -->
                        </div>

                        <!-- Step 2: File Attachments -->
                        <div v-if="currentStep === 1">
                            <div class="space-y-4">
                                <!-- <div>
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
                                            <p class="text-xs text-neutral-500">Supported file types: PDF, DOC, DOCX,
                                                JPG, PNG (Max 5MB per file)</p>
                                        </div>
                                    </div>
                                    <p v-if="errors.files" class="mt-1 text-sm text-red-600">{{ errors.files }}</p>
                                </div> -->

                                <!-- File list -->
                                <!-- <div v-if="formData.files.length > 0" class="mt-4">
                                    <h3 class="text-sm font-medium text-neutral-700 mb-2">Uploaded Files ({{
                                        formData.files.length }})</h3>
                                    <ul class="space-y-2">
                                        <li v-for="(file, index) in formData.files" :key="index"
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
                                </div> -->

                                <div>
                                    <label for="additionalNotes"
                                        class="block text-sm font-medium text-neutral-700 mb-1">Additional Notes</label>
                                    <textarea id="additionalNotes" v-model="formData.additionalNotes" rows="3"
                                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none resize-none"
                                        placeholder="Any additional information you'd like to share"></textarea>
                                </div>
                            </div>
                        </div>

                        <!-- Step 3: Contact Information -->
                        <div>
                            <div class="space-y-4">
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label for="firstName"
                                            class="block text-sm font-medium text-neutral-700 mb-1">First Name</label>
                                        <input type="text" id="firstName" v-model="formData.firstName"
                                            class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                            :class="{ 'border-red-500': errors.firstName }"
                                            placeholder="Your first name" />
                                        <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">{{ errors.firstName
                                        }}</p>
                                    </div>

                                    <div>
                                        <label for="lastName"
                                            class="block text-sm font-medium text-neutral-700 mb-1">Last Name</label>
                                        <input type="text" id="lastName" v-model="formData.lastName"
                                            class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                            :class="{ 'border-red-500': errors.lastName }"
                                            placeholder="Your last name" />
                                        <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">{{ errors.lastName
                                        }}</p>
                                    </div>
                                </div>

                                <div>
                                    <label for="email" class="block text-sm font-medium text-neutral-700 mb-1">Email
                                        Address</label>
                                    <input type="email" id="email" v-model="formData.email"
                                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                        :class="{ 'border-red-500': errors.email }" placeholder="your@email.com" />
                                    <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
                                </div>

                                <div>
                                    <label for="phone" class="block text-sm font-medium text-neutral-700 mb-1">Phone
                                        Number</label>
                                    <input type="tel" id="phone" v-model="formData.phone"
                                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                        :class="{ 'border-red-500': errors.phone }" placeholder="Your phone number" />
                                    <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
                                </div>

                                <div>
                                    <label for="company"
                                        class="block text-sm font-medium text-neutral-700 mb-1">Company/Organization</label>
                                    <input type="text" id="company" v-model="formData.company"
                                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                        placeholder="Your company or organization (if applicable)" />
                                </div>

                                <div>
                                    <label class="flex items-center">
                                        <input type="checkbox" v-model="formData.termsAccepted"
                                            class="h-4 w-4 text-primary-600 focus:ring-primary-500" />
                                        <span class="ml-2 text-sm text-neutral-700">
                                            I agree to the <a href="#" class="text-primary-600 hover:underline">Terms of
                                                Service</a> and
                                            <a href="#" class="text-primary-600 hover:underline">Privacy Policy</a>
                                        </span>
                                    </label>
                                    <p v-if="errors.termsAccepted" class="mt-1 text-sm text-red-600">{{
                                        errors.termsAccepted }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Success screen -->
                        <div v-if="currentStep === 3" class="text-center py-6">
                            <div class="flex justify-center mb-4">
                                <div class="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                                    <CheckCircle class="h-10 w-10 text-green-500" />
                                </div>
                            </div>
                            <h2 class="text-2xl font-bold text-neutral-800 mb-2">Request Submitted Successfully!</h2>
                            <p class="text-neutral-600 mb-6">Thank you for your interest in our services. We've received
                                your request and will contact you shortly.</p>
                            <p class="text-sm text-neutral-500 mb-4">Reference ID: {{ referenceId }}</p>
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
                        <div v-if="currentStep < 3" class="flex justify-between pt-4 border-t">
                            <nuxt-link :to="`/solutions/${solution?.id}`"
                                class="px-6 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 transition">
                                Back
                            </nuxt-link>
                            <button type="submit" @click="submitForm"
                                class="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition flex items-center"
                                :disabled="isSubmitting">
                                <span v-if="isSubmitting">Processing...</span>
                                <span v-else-if="currentStep === 2">Submit Request</span>
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
                    <h3 class="text-lg font-semibold text-neutral-800 mb-4">
                        {{ solution?.title }}
                    </h3>

                    <div class="border-t py-4">
                        <h4 class="font-medium text-neutral-800 mb-2">Included in this package:</h4>
                        <ul class="space-y-2">
                            <li v-for="feature in selectedPackage?.features" :key="feature.id" class="flex items-start">
                                <CheckCircle class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span class="text-neutral-700 text-sm">{{ feature?.title }}</span>
                            </li>
                        </ul>
                    </div>

                    <div class="bg-neutral-50 rounded-lg p-4 mb-4">
                        <div class="flex justify-between items-center mb-2">
                            <h4 class="font-bold text-neutral-800">{{ selectedPackage?.name }}</h4>
                            <span :class="pkgColor(selectedPackage?.name || '')">
                                {{ selectedPackage?.name }}
                            </span>
                        </div>

                        <div v-if="selectedPackage?.price !== 0" class="mb-2">
                            <span class="text-xl font-bold text-neutral-800">R{{ solution.price }}</span>
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
import { ref, computed, onMounted } from 'vue';
import {
    ArrowLeft, ArrowRight, CheckCircle, CloudUpload, X, FileText, Image,
    File, MessageCircle, Phone, Mail, HelpCircle
} from 'lucide-vue-next';
import { useRoute, useRouter } from 'vue-router';
import solutionService from '~/services/solutionService';

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
const router = useRouter();
const serviceId = route.params.id;
const packageId = route.query.pkgId;

const { data: solution, status: solutionStatus, error: solutionError, refresh: solutionRefresh } =
    useAsyncData(`solutions-solution-${route.params.id}`, () => solutionService.getSolutionAsync(route.params.id as string));


// Define steps
const steps = [
    { label: 'Project Details' },
    { label: 'Attachments' },
    { label: 'Contact Info' },
];

// Form state
const currentStep = ref(2);
const isSubmitting = ref(false);
const isDragging = ref(false);
const referenceId = ref('REQ-' + Math.random().toString(36).substr(2, 9).toUpperCase());

// Form data
const formData = ref({
    projectName: '',
    projectDescription: '',
    targetAudience: '',
    timeline: '',
    files: [],
    additionalNotes: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    termsAccepted: false
});

// Errors object
const errors = ref({});

// Mock data for demo purposes
// In a real app, these would be fetched from an API
const ourService = ref({
    id: serviceId,
    name: 'Website Development',
    packages: [
        {
            id: '1',
            name: 'Basic',
            price: 4999.99,
            billingCycle: 'once',
            description: 'Perfect for small businesses just getting started online.',
            features: [
                { id: '1-1', title: 'Responsive design' },
                { id: '1-2', title: '5 pages' },
                { id: '1-3', title: 'Contact form' },
                { id: '1-4', title: 'Basic SEO' }
            ]
        },
        {
            id: '2',
            name: 'Professional',
            price: 9999.99,
            billingCycle: 'once',
            description: 'Full-featured website for established businesses.',
            features: [
                { id: '2-1', title: 'Responsive design' },
                { id: '2-2', title: 'Up to 15 pages' },
                { id: '2-3', title: 'Contact form & booking system' },
                { id: '2-4', title: 'Advanced SEO package' },
                { id: '2-5', title: 'Content management system' }
            ]
        },
        {
            id: '3',
            name: 'Enterprise',
            price: 19999.99,
            billingCycle: 'once',
            description: 'Complete digital solution for large businesses.',
            features: [
                { id: '3-1', title: 'Custom responsive design' },
                { id: '3-2', title: 'Unlimited pages' },
                { id: '3-3', title: 'Advanced forms & integrations' },
                { id: '3-4', title: 'Enterprise SEO suite' },
                { id: '3-5', title: 'Full CMS with user roles' },
                { id: '3-6', title: '1 year maintenance included' }
            ]
        }
    ]
});

// Get selected package
const selectedPackage = computed(() => {
    return ourService.value.packages.find(pkg => pkg.id === packageId);
});

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

// // Handle file drop
// const handleFileDrop = (event: any) => {
//     isDragging.value = false;
//     const droppedFiles = event.dataTransfer.files;
//     processFiles(droppedFiles);
// };

// // Handle file selection
// const handleFileChange = (event: any) => {
//     const selectedFiles = event.target.files;
//     processFiles(selectedFiles);
// };

// // Process files
// const processFiles = (files: any) => {
//     const maxSize = 5 * 1024 * 1024; // 5MB
//     const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];

//     for (let i = 0; i < files.length; i++) {
//         const file = files[i];

//         // Validate file size
//         if (file.size > maxSize) {
//             errors.value.files = `${file.name} exceeds the 5MB size limit`;
//             continue;
//         }

//         // Validate file type
//         if (!allowedTypes.includes(file.type)) {
//             errors.value.files = `${file.name} is not a supported file type`;
//             continue;
//         }

//         // Add file to the list
//         formData.value.files.push(file);
//     }
// };

// Remove file
const removeFile = (index: number) => {
    formData.value.files.splice(index, 1);
};

// Validate current step
const validateCurrentStep = () => {
    errors.value = {};

    switch (currentStep.value) {
        case 0: // Project Details
            // if (!formData.value.projectName) {
            //     errors.value.projectName = 'Project name is required';
            // }
            // if (!formData.value.projectDescription) {
            //     errors.value.projectDescription = 'Project description is required';
            // } else if (formData.value.projectDescription.length < 50) {
            //     errors.value.projectDescription = 'Please provide a more detailed description (at least 50 characters)';
            // }
            break;

        case 2: // Contact Information
            // if (!formData.value.firstName) {
            //     errors.value.firstName = 'First name is required';
            // }
            // if (!formData.value.lastName) {
            //     errors.value.lastName = 'Last name is required';
            // }
            // if (!formData.value.email) {
            //     errors.value.email = 'Email is required';
            // } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
            //     errors.value.email = 'Please enter a valid email address';
            // }
            // if (!formData.value.phone) {
            //     errors.value.phone = 'Phone number is required';
            // }
            // if (!formData.value.termsAccepted) {
            //     errors.value.termsAccepted = 'You must accept the terms of service';
            // }
            break;
    }

    return Object.keys(errors.value).length === 0;
};

// Navigation methods
const goToNextStep = () => {
    if (validateCurrentStep()) {
        if (currentStep.value === 2) {
            // Submit form
            submitForm();
        } else {
            currentStep.value++;
        }
    }
};

const goToPreviousStep = () => {
    currentStep.value--;
};

// Submit form
const submitForm = async () => {
    isSubmitting.value = true;

    try {
        var request = {
            Email: formData.value.email,
        }
        console.log(request)
        await solutionService.purchaseSolutionsAsync(solution.value.id, request);
    } catch (error) {
        console.error('Error submitting form:', error);
    }
    isSubmitting.value = false;
};

onMounted(() => {
    console.log(solution.value);
});
</script>
