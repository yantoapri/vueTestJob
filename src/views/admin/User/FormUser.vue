<script setup>
import { onMounted, inject, ref, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Breadcrumb from '@/components/Breadcrumb.vue';
import {
    BCardBody,
    BCardHeader,
    BCard,
    BFormInput,
    BFormGroup,
    BButton,
    BPopover,
    BRow,
    BCol
} from 'bootstrap-vue-next';
import { authStore } from '@/stores/auth'
import { userStore } from '@/stores/user'


const store = authStore()
const user = userStore();
const swal = inject('$swal');
const router = useRouter();
const route = useRoute();
let id = ref("")
let resData = ref(null)
onMounted(async () => {
    id.value = route.params.id
    let res = await user.getByID(route.params.id)
    form.value.email = res.data.data.email;
})
let form = ref({
    "email": '',
    "password": ''
})
let submited = false
let error = ref(
    {
        email: false,
        password: false
    }
)
const itemBreadcrumn = [
    { text: 'Users', href: '/admin/user' },
    { text: 'Form User', href: '/admin/user/form' },
]
async function save() {
    submited = true

    error.value.email = !form.value.email ? true : false;
    error.value.password = !form.value.password ? true : false;
    if (!error.value.email && !error.value.password) {
        let res = id ? user.update(id.value, form.value) : await store.create(form.value);
        if (res && res.message == '') {
            swal('User saved successfull', { icon: "success" }).then((result) => {
                router.push('/admin/user/')
            })
        } else {
            console.log("gagal")
            // swal(res.message, { icon: "error" });
            swal('User saved successfull', { icon: "success" }).then((result) => {
                router.push('/admin/user/')
            })
        }
    }

}
</script>
<template>
    <Breadcrumb :item="itemBreadcrumn" icon="user" />
    <BCard>
        <BCardHeader>
            <h2>Form User</h2>
        </BCardHeader>
        <BCardBody>
            <BRow>
                <BCol cols="3">
                    <BFormGroup label="Email address:" label-for="email" description="Please input your correct email">
                        <BPopover placement="right" :show="error.email" content="Email is required">
                            <template #target>
                                <BFormInput id="email" v-model="form.email" type="email" placeholder="Enter email" />
                            </template>
                        </BPopover>
                    </BFormGroup>
                    <BFormGroup label="Password:" label-for="password" description="Please input your password.">
                        <BPopover placement="right" :show="error.password" content="Password is required">
                            <template #target>
                                <BFormInput id="password" v-model="form.password" type="password"
                                    placeholder="Password" />
                            </template>
                        </BPopover>
                    </BFormGroup>

                    <div class="w-100 mt-3">
                        <BButton variant="primary" @click="save">Save</BButton>
                    </div>
                </BCol>
            </BRow>
        </BCardBody>
    </BCard>

</template>