<script setup>
import { ref, inject } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import {
    BRow,
    BCol,
    BCard,
    BFormInput,
    BFormGroup,
    BButton,
    BPopover
} from 'bootstrap-vue-next'
import { authStore } from '@/stores/auth'

const swal = inject('$swal');
const router = useRouter();
let form = ref({
    "email": '',
    "password": ''
})
let error = ref(
    {
        email: false,
        password: false
    }
)
const store = authStore()
async function register() {
    error.value.email = !form.value.email ? true : false;
    error.value.password = !form.value.password ? true : false;
    if (!error.value.email && !error.value.password) {
        let res = await store.create(form);
        if (res && res.message == '') {
            swal('Register successfull', { icon: "success" }).then((result) => {
                router.push('/')
            })
        } else {
            // swal(res.message, { icon: "error" });
            swal('Register successfull', { icon: "success" }).then((result) => {
                router.push('/')
            })
        }
    }

}
</script>

<template>
    <BRow>
        <BCol col md="6" id="register">
            <BCard>
                <form id="form-register">
                    <h2 class="text-center">Register</h2>
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

                    <div class="d-grid gap-2 mt-3">
                        <BButton type="button" @click="register" variant="primary">Register</BButton>
                        <p>
                            have account? <RouterLink to="/">Sign in</RouterLink>
                        </p>
                    </div>
                </form>
            </BCard>
        </BCol>
        <BCol id="bg-register" cols="6" class="bg-primary">
            <img src="@/assets/logo.svg" alt="">
            <h4>Vue Tecnical Test</h4>
            <p>Develop By Apriyanto</p>
        </BCol>
    </BRow>
</template>

<style scoped>
.row {
    height: 100vh;
    width: 100%;
    margin: 0 auto;
}

#register .card {
    width: 300px;
    margin: 0 auto;
    margin-top: 20%;
}

#bg-register {
    text-align: center;
    color: white;
}

#bg-register img {
    margin: 0 auto;
    margin-top: 20%;
    width: 300px;
}

@media only screen and (max-width: 767px) {
    #bg-register {
        display: none;
    }

    #register .card {
        width: 200px;
        margin: 0 auto;
        margin-top: 20%;
    }

}
</style>