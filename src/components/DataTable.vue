<script setup>

defineProps({
    item: {
        type: Array,
        required: true
    },
    header: {
        type: Array,
        required: true
    }
})

</script>

<template>
    <div class="w-100">
        <BTableSimple hover small caption-top bord></BTableSimple>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th v-for="(itm, index) in header" :key="index">{{ itm }}</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
</template>