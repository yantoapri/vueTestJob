<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue';
import {
    BCard,
    BCardHeader,
    BCardBody,
} from 'bootstrap-vue-next';


const itemBreadcrumn = [
    { text: 'Dashboard', href: '/' },
]

</script>
<template>
    <Breadcrumb :item="itemBreadcrumn" icon="dashboard" />
    <BCard>
        <BCardHeader>
            <h2>Dashboard</h2>
        </BCardHeader>
        <BCardBody>
            <h3 class="text-center">Halo,selamat pagi</h3>
        </BCardBody>
    </BCard>
</template>