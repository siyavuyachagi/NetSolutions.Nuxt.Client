<template>
    Purchase solution: {{ solutionStatus === 'success' ? solution.name : 'Loading...' }}
</template>

<script setup lang="ts">
import solutionService from '~/services/solutionService';

const {
    data: solution,
    status: solutionStatus,
    error: solutionError,
    refresh: solutionRefresh
} = useAsyncData('solution-purchase', () => solutionService.getSolutionAsync(useRoute().params.id as string));
</script>