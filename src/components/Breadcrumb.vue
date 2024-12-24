<script setup lang="ts">
import { BBreadcrumb } from 'bootstrap-vue-next'
import { ref } from 'vue'
defineProps({
    item: {
        type: Array,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
})

</script>
<template>
    <div style="display: flex;">
        <font-awesome-icon :icon="['fas', icon]" class="icon mt-1 mr-2" />
        <BBreadcrumb :items="item" class="mx-2" />
    </div>

</template>