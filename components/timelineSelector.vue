<!-- Timeline Range Component Template -->
<template>
    <div>
        <label for="timeline" class="block text-sm font-medium text-neutral-700 mb-1">
            Desired Timeline <small class="text-error">*</small>
        </label>

        <!-- Range Slider Option -->
        <div class="mb-4">
            <div class="relative pt-5 pb-8">
                <!-- Range Slider -->
                <input type="range" v-model="sliderValue" min="1" max="180"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    @input="updateDatesFromSlider">

                <!-- Timeline Markers -->
                <div class="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Today</span>
                    <span>1 Month</span>
                    <span>3 Months</span>
                    <span>6 Months</span>
                </div>

                <!-- Selected Range Label -->
                <div class="mt-2 text-sm font-medium text-primary-600">
                    {{ timelineLabel }}
                </div>
            </div>

            <!-- Date Display -->
            <div class="flex justify-between mt-2 text-sm text-gray-700">
                <div>Start: {{ formatDate(startDate) }}</div>
                <div>End: {{ formatDate(endDate) }}</div>
            </div>
        </div>

        <!-- Manual Date Selection Option -->
        <div class="mt-6 flex flex-col md:flex-row gap-3">
            <div class="w-full md:w-1/2">
                <label for="start-date" class="text-sm text-neutral-600">Start Date</label>
                <input type="date" id="start-date" v-model="startDateISO"
                    class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                    :class="{ 'border-red-500': startDateError }" :min="todayISO" :max="maxDateISO"
                    @change="updateSliderFromDates">
                <p v-if="startDateError" class="mt-1 text-sm text-red-600">
                    {{ startDateError }}
                </p>
            </div>
            <div class="w-full md:w-1/2">
                <label for="end-date" class="text-sm text-neutral-600">End Date</label>
                <input type="date" id="end-date" v-model="endDateISO"
                    class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                    :class="{ 'border-red-500': endDateError }" :min="startDateISO" :max="maxDateISO"
                    @change="updateSliderFromDates">
                <p v-if="endDateError" class="mt-1 text-sm text-red-600">
                    {{ endDateError }}
                </p>
            </div>
        </div>

        <!-- Range Error Message -->
        <p v-if="errors?.length" class="mt-1 text-sm text-red-600">
            {{ errors[0] }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import type { ModelConfig } from 'vuesanity';

interface Timeline {
    startDate: Date | null;
    endDate: Date | null;
    timelineType: string;
}


export type { Timeline };
// Props definition
const props = defineProps<{
    modelValue?: Timeline;
    errors: string[] | undefined;
}>();

// Emit events
const emit = defineEmits<{
    (e: 'update:timeline', value: Timeline): void;
}>();

// State
const startDate = ref<Date>(new Date());
const endDate = ref<Date>(new Date());
const sliderValue = ref<number>(30); // Default to 1 month
const startDateError = ref<string>('');
const endDateError = ref<string>('');
const rangeError = ref<string>('');

// Computed properties
const todayISO = computed<string>(() => {
    return new Date().toISOString().split('T')[0];
});

const maxDate = computed<Date>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 180); // 6 months from today
    return date;
});

const maxDateISO = computed<string>(() => {
    return maxDate.value.toISOString().split('T')[0];
});

const startDateISO = computed({
    get: (): string => {
        return startDate.value.toISOString().split('T')[0];
    },
    set: (value: string): void => {
        startDate.value = new Date(value);
        validateDates();
    }
});

const endDateISO = computed({
    get: (): string => {
        return endDate.value.toISOString().split('T')[0];
    },
    set: (value: string): void => {
        endDate.value = new Date(value);
        validateDates();
    }
});

const daysDifference = computed<number>(() => {
    const diffTime = Math.abs(endDate.value.getTime() - startDate.value.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

const timelineLabel = computed<string>(() => {
    const days = daysDifference.value;

    if (days < 30) return "Urgent (< 1 month)";
    if (days < 90) return "Standard (1-3 months)";
    if (days < 180) return "Flexible (3-6 months)";
    return "Long-term (6+ months)";
});

const timelineType = computed<string>(() => {
    const days = daysDifference.value;

    if (days < 30) return "urgent";
    if (days < 90) return "standard";
    if (days < 180) return "flexible";
    return "longterm";
});

// Methods
const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const updateDatesFromSlider = (): void => {
    // Start date is always today
    startDate.value = new Date();

    // End date is today + slider value in days
    endDate.value = new Date();
    endDate.value.setDate(endDate.value.getDate() + parseInt(sliderValue.value.toString()));

    emitChange();
};

const updateSliderFromDates = (): void => {
    // Calculate the days between start and end date
    sliderValue.value = daysDifference.value;

    emitChange();
};

const validateDates = (): boolean => {
    startDateError.value = '';
    endDateError.value = '';
    rangeError.value = '';

    if (endDate.value < startDate.value) {
        endDateError.value = 'End date cannot be before start date';
        return false;
    }

    if (daysDifference.value > 180) {
        rangeError.value = 'Timeline cannot exceed 6 months';
        return false;
    }

    return true;
};

const emitChange = (): void => {
    if (validateDates()) {
        emit('update:timeline', {
            startDate: startDate.value,
            endDate: endDate.value,
            timelineType: timelineType.value
        });
    }
};

// Lifecycle hooks and watchers
onMounted(() => {
    // Initialize the end date to today + 30 days (1 month)
    endDate.value = new Date();
    endDate.value.setDate(endDate.value.getDate() + 30);

    // If there's an initial value
    if (props.modelValue?.startDate && props.modelValue?.endDate) {
        startDate.value = new Date(props.modelValue.startDate);
        endDate.value = new Date(props.modelValue.endDate);
        updateSliderFromDates();
    }

    emitChange();
});

// Watch for external changes to the modelValue
watch(() => props.modelValue, (newValue) => {
    if (newValue?.startDate && newValue?.endDate) {
        startDate.value = new Date(newValue.startDate);
        endDate.value = new Date(newValue.endDate);
        updateSliderFromDates();
    }
}, { deep: true });
</script>