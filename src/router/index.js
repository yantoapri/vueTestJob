import { createRouter, createWebHistory } from "vue-router";
import middleware from "@/utils/midlleware";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      beforeEnter: () => (middleware() ? "/admin/" : true),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
      beforeEnter: () => (middleware() ? "/admin/" : true),
    },
    // admin-------------
    {
      path: "/admin/",
      name: "dashboard",
      component: () => import("../views/admin/Dahsboard/DashboardView.vue"),
      beforeEnter: () => (middleware() ? true : "/"),
    },
    {
      path: "/admin/user",
      name: "user",
      component: () => import("../views/admin/User/UserView.vue"),
      beforeEnter: () => (middleware() ? true : "/"),
    },
    {
      path: "/admin/user/form",
      name: "userForm",
      component: () => import("../views/admin/User/FormUser.vue"),
      // beforeEnter: () => middleware()?true:"/",
    },
    {
      path: "/admin/user/form/:id",
      name: "userFormEdit",
      component: () => import("../views/admin/User/FormUser.vue"),
      beforeEnter: () => (middleware() ? true : "/"),
    },
  ],
});

export default router;
