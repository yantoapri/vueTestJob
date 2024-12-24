<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
    BRow,
    BCol,
    BCard,
    BFormInput,
    BFormGroup,
    BButton,
    BPopover
} from 'bootstrap-vue-next'
import { authStore } from '@/stores/auth';

let form = ref({
    "email": '',
    "password": ''
})
const router = useRouter()
const store = authStore();
let error = ref(
    {
        email: false,
        password: false
    }
)
async function login() {
    error.value.email = !form.value.email ? true : false;
    error.value.password = !form.value.password ? true : false;
    if (!error.value.email && !error.value.password) {
        let res = await store.authLogin(form);
        if (res) {
            window.location.href = "/admin/"
        } else {
            // swal(res.message, { icon: "error" });
            window.location.href = "/admin/"
        }
    }
}

</script>

<template>
    <BRow>
        <BCol col md="6" id="login">
            <BCard>
                <form id="form-login">
                    <h2 class="text-center">Login</h2>
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
                        <BButton type="button" @click="login" variant="primary">Login</BButton>
                        <p>
                            Don't have account? <RouterLink to="/register">Register</RouterLink>
                        </p>
                    </div>
                </form>
            </BCard>
        </BCol>
        <BCol id="bg-login" cols="6" class="bg-primary">
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

#login .card {
    width: 300px;
    margin: 0 auto;
    margin-top: 20%;
}

#bg-login {
    text-align: center;
    color: white;
}

#bg-login img {
    margin: 0 auto;
    margin-top: 20%;
    width: 300px;
}

@media only screen and (max-width: 767px) {
    #bg-login {
        display: none;
    }

    #login .card {
        width: 200px;
        margin: 0 auto;
        margin-top: 20%;
    }

}
</style>