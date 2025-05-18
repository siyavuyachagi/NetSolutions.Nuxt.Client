<template>
    <div class="mt-8 bg-white p-6 rounded-lg border border-neutral-200"
        :class="{ 'pointer-events-none opacity-50': isSubmitting }">
        <h3 class="text-lg font-medium text-neutral-800 mb-4">Leave a Testimonial</h3>
        <form @submit.prevent="submitTestimonial" class="space-y-4">
            <!-- Personal Information -->
            <div v-if="!authStore.isAuthenticated">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="firstName" class="block text-sm font-medium text-neutral-700 mb-1">
                            First Name
                            <span v-if="personalInfoModel.firstName.errors?.length" class="text-red-400 ml-2">
                                {{ personalInfoModel.firstName.errors[0] }}
                            </span>
                        </label>
                        <input id="firstName" type="text" v-model="personalInfoModel.firstName.value"
                            class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Your first name" />
                    </div>
                    <div>
                        <label for="lastName" class="block text-sm font-medium text-neutral-700 mb-1">
                            Last Name
                            <span v-if="personalInfoModel.lastName.errors?.length" class="text-red-400 ml-2">
                                {{ personalInfoModel.lastName.errors[0] }}
                            </span>
                        </label>
                        <input id="lastName" type="text" v-model="personalInfoModel.lastName.value"
                            class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Your last name" />
                    </div>
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium text-neutral-700 mb-1">
                        Email Address
                        <span v-if="model.email.errors?.length" class="text-red-400 ml-2">
                            {{ model.email.errors[0] }}
                        </span>
                    </label>
                    <input id="email" type="email" v-model="model.email.value"
                        class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="your.email@example.com" />
                </div>
            </div>

            <div>
                <label for="rating" class="block text-sm font-medium text-neutral-700 mb-1">
                    Rating
                    <span v-if="model.rating.errors?.length" class="text-red-400 ml-2">
                        {{ model.rating.errors[0] }}
                    </span>
                </label>
                <div class="flex space-x-1">
                    <button v-for="star in 5" :key="star" type="button" @click="rating = star"
                        class="focus:outline-none">
                        <Star :class="[
                            'h-6 w-6',
                            star <= rating ? 'text-yellow-400 fill-current' : 'text-neutral-300'
                        ]" />
                    </button>
                </div>
            </div>

            <div>
                <label for="comment" class="block text-sm font-medium text-neutral-700 mb-1">
                    Your Comment
                    <span v-if="model.comment.errors?.length" class="text-red-400 ml-2">
                        {{ model.comment.errors[0] }}
                    </span>
                </label>
                <textarea id="comment" v-model="model.comment.value" rows="4"
                    class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Share your experience with this service..."></textarea>
            </div>

            <div class="flex justify-end">
                <button type="submit"
                    class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
                    :disabled="isSubmitting">
                    {{ isSubmitting ? 'Submitting...' : 'Submit Testimonial' }}
                </button>
            </div>
        </form>
    </div>
</template>


<script setup lang="ts">
import { Star } from 'lucide-vue-next';
import VueSanity, { email, required, type ModelConfig } from 'vuesanity';
import businessServiceService from '~/services/businessServiceService';
import type { BusinessService } from '~/types/response';
import toast from '~/utils/toasts';


const props = defineProps<{
    businessService: BusinessService
}>();

const emits = defineEmits(['update']);

const authStore = useAuthStore();
const isSubmitting = ref(false);
const rating = ref();


const personalInfoModel = reactive<ModelConfig>({
    lastName: {
        validations: [required()]
    },
    firstName: {
        validations: [required()]
    },
})

const model = reactive<ModelConfig>({
    email: {
        value: authStore.user?.email,
        validations: [required(), email()]
    },
    rating: {
        validations: [required()],
        value: rating
    },
    comment: {
        validations: [required()]
    }
})

const submitTestimonial = async () => {
    isSubmitting.value = true;

    let isValid = true;

    // Always validate both models for unauthenticated users
    if (!authStore.isAuthenticated) {
        const personalInfoState = new VueSanity(personalInfoModel);
        if (!personalInfoState.isValid) {
            console.error(personalInfoState)
            isValid = false;
        }
    }

    const modelState = new VueSanity(model);
    if (!modelState.isValid) {
        console.error(modelState)
        isValid = false;
    }

    // Exit early if any validation failed
    if (!isValid) {
        isSubmitting.value = false;
        return;
    }

    try {
        let payload;

        if (authStore.isAuthenticated) {
            // Authenticated: Only submit the testimonial part
            payload = VueSanity.getFormData(model);
        } else {
            // Merge the two models and submit combined form data
            const combinedModel = {
                ...personalInfoModel,
                ...model
            };
            payload = VueSanity.getFormData(combinedModel);
        }

        const result = await businessServiceService.createServiceTestimonialAsync(props.businessService.id, payload);
        if (!result.success) {
            console.log(result);
            toast.error(result.message as string);
        } else {
            toast.success(result.message as string);
            emits('update');
        }
    } catch (error) {
        console.error(error);
        toast.error("An error occurred while submitting your testimonial");
    } finally {
        isSubmitting.value = false;
    }
};
</script>