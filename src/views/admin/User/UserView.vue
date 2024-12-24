<script setup>
import { onMounted, ref, inject } from 'vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import {
    BTable,
    BButton,
    BCard,
    BCardHeader,
    BCardBody,
    BPagination,
    BRow,
    BCol
} from 'bootstrap-vue-next';
import { userStore } from '../../../stores/user';

const swal = inject('$swal');
const itemBreadcrumn = [
    { text: 'User', href: '/' },
]
const store = userStore()


const fieldsTyped = [
    {
        key: 'email',
        label: 'Email',
        sortable: true,
        sortDirection: 'desc',
        thStyle: { width: "30%" },
    },
    {
        key: 'full_name',
        label: 'Full Name',
        sortable: true,
        sortDirection: 'desc',
        formatter: (_value, _key, item) =>
            item ? `${item.first_name} ${item.last_name}` : 'Something went wrong',
        sortByFormatted: true,
        filterByFormatted: true,

    },
    {
        key: 'action',
        label: 'Action',
        thStyle: { width: "20%" },
    },
]
let totalRows = ref(0)
let currentPage = ref(1)
let perPage = ref(6)
let totalPages = ref(1)
let resData = ref([])


onMounted(async () => {
    let res = await store.getAll();
    totalRows.value = res.data.total;
    currentPage.value = res.data.page;
    perPage.value = res.data.per_page;
    totalPages.value = res.data.total_pages;
    resData.value = res.data.data;
})

async function pageClick() {
    await store.getAll(currentPage.value);
}

async function destroy(id) {
    swal({
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        confirmButtonColor: '#41b882',
        cancelButtonColor: '#ff7674',
    }).then(async (res) => {
        if (res.isConfirmed) {
            let res = await store.destroy(id);
            if (res) {
                swal("User has ben deleted");

            }
        }
    })
}

</script>
<template>
    <Breadcrumb :item="itemBreadcrumn" icon="user" />
    <BCard>
        <BCardHeader>
            <h2>User</h2>
        </BCardHeader>
        <BCardBody>
            <div class="w-100 mb-3">
                <BButton variant="primary" to="/admin/user/form">
                    <font-awesome-icon :icon="['fas', 'plus']" class="icon" />
                    Add New
                </BButton>
            </div>
            <BTable :sort-internal="true" :bordered="true" :items="resData" :fields="fieldsTyped"
                :current-page="currentPage" :per-page="perPage" :responsive="false" :small="true" :multisort="true">

                <template #cell(action)="row">
                    <BButton size="sm" @click="row.toggleDetails" class="my-1">
                        Details
                    </BButton>
                    <BButton size="sm" class="mx-1 text-light my-1" variant="warning"
                        :to="'/admin/user/form/' + row.item.id">
                        <font-awesome-icon :icon="['fas', 'pencil']" class="icon" /> Edit
                    </BButton>
                    <BButton size="sm" class="mx-1 my-1" variant="danger" @click="destroy(row.item.id)">
                        <font-awesome-icon :icon="['fas', 'trash']" class="icon" /> Hapus
                    </BButton>

                </template>
                <template #row-details="row">
                    <BCard>
                        <ul>
                            <li v-for="(value, index) in row.item" :key="index">{{ index }}: {{ value }}</li>
                        </ul>
                    </BCard>
                </template>
            </BTable>
            <BRow>
                <BCol></BCol>
                <BCol cols="4">
                    <BPagination v-model="currentPage" :total-rows="totalRows" @update:model-value="pageClick($event)"
                        :per-page="perPage" :align="'fill'" size="sm" class="my-0" />
                </BCol>
            </BRow>
        </BCardBody>
    </BCard>
</template>

<style scoped>
table {
    display: block;
    overflow: auto;
}
</style>