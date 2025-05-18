<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto">
            <div class="flex items-center justify-between bg-purple-600 text-white p-4 rounded-t-lg">
                <h3 class="text-xl font-semibold">Report a Bug</h3>
                <button @click="handleClose" class="text-white hover:text-gray-200 focus:outline-none">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div v-if="isSubmitted" class="p-6 text-center">
                <svg class="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Thank You!</h3>
                <p class="text-gray-600">Your bug report has been submitted successfully.</p>
            </div>

            <form v-else @submit.prevent="handleSubmit" class="p-6">
                <div class="grid grid-cols-1 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">What happened*</label>
                        <input type="text" v-model="bugData.title"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Brief description of the issue" required />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Where did you encounter this issue?*</label>
                        <input type="text" v-model="bugData.page"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Page URL or section name" required />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Steps to Reproduce*</label>
                        <textarea v-model="bugData.steps" rows="3"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="1. Go to page X&#10;2. Click on Y&#10;3. Scroll down to Z" required></textarea>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
                        <textarea v-model="bugData.description" rows="3"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Browser version, device type, error messages, etc."></textarea>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Screenshot</label>
                        <input type="file" @change="handleFileChange" accept="image/*"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        <p class="mt-1 text-xs text-gray-500">Optional: Upload a screenshot showing the issue</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                        <input type="email" v-model="bugData.email"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Optional: For follow-up questions" />
                    </div>

                    <div class="flex justify-end gap-3 mt-2">
                        <button type="button" @click="handleClose"
                            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500">
                            Cancel
                        </button>
                        <button type="submit" :disabled="isSubmitting"
                            class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center">
                            <template v-if="isSubmitting">
                                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                Submitting...
                            </template>
                            <template v-else>Submit Report</template>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">

const emits = defineEmits(['close']);

interface BugData {
    title: string;
    description: string;
    steps: string;
    page: string;
    email: string;
    screenshot: File | null;
}
const isOpen = ref<boolean>(true);
const isSubmitting = ref<boolean>(false);
const isSubmitted = ref<boolean>(false);

const bugData = reactive<BugData>({
    title: '',
    description: '',
    steps: '',
    page: '',
    email: '',
    screenshot: null
});

const handleFileChange = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        bugData.screenshot = target.files[0];
    }
};

const handleSubmit = (): void => {
    isSubmitting.value = true;

    // Simulate API call
    setTimeout(() => {
        isSubmitting.value = false;
        isSubmitted.value = true;

        // Reset form after submission
        setTimeout(() => {
            isOpen.value = false;
            emits('close');
        }, 2000);
    }, 1500);
};

const handleClose = (): void => {
    isOpen.value = false;
    emits('close');
};
</script>