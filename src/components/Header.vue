<script setup>
import { RouterView, RouterLink, useRouter } from 'vue-router';
import {
  BNavbar,
  BNavbarToggle,
  BCollapse,
  BNavbarNav,
  BNavItemDropdown,
  BDropdownItem
} from 'bootstrap-vue-next'
const router = useRouter();
function logout() {
  localStorage.removeItem("userLogin");
  router.push('/')
}
</script>
<template>
  <BNavbar toggleable variant="primary" class="text-light navbar-expand-sm">
    <BNavbarBrand href="#">ApriDev</BNavbarBrand>
    <BNavbarToggle target="navbar-toggle-collapse">
    </BNavbarToggle>
    <BCollapse id="navbar-toggle-collapse" is-nav>
      <BNavbarNav class="me-auto"></BNavbarNav>
      <BNavbarNav>
        <div id="avatar">
          <div id="avatar-img">
            <img src="@/assets/logo.svg" alt="">
          </div>
          <BNavItemDropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <span class="text-light">User</span>
            </template>
            <BDropdownItem to="/admin/user/form/1">My Profile</BDropdownItem>
            <BDropdownItem @click="logout">Sign Out</BDropdownItem>
          </BNavItemDropdown>
        </div>
      </BNavbarNav>
    </BCollapse>
  </BNavbar>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col-auto col-md-2 col-xl-2 px-sm-2 px-0 bg-dark" id="sidebar">
        <div class="d-flex flex-column align-items-center align-items-sm-start pt-2 text-white min-vh-100">

          <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            <li class="nav-item">
              <RouterLink to="/admin/" class="nav-link align-middle px-2 text-light">
                <font-awesome-icon :icon="['fas', 'dashboard']" class="icon" />
                <span class="ms-1 d-none d-sm-inline label-menu">Dashboard</span>
              </RouterLink>
              <RouterLink to="/admin/user" class="nav-link align-middle px-2 text-light">
                <font-awesome-icon :icon="['fas', 'user']" class="icon" />
                <span class="ms-1 d-none d-sm-inline label-menu">Users</span>
              </RouterLink>
            </li>

          </ul>
        </div>
      </div>
      <div class="col py-3">
        <RouterView></RouterView>
      </div>
    </div>
  </div>

</template>

<style scoped>
.icon {
  font-size: 25px;
  margin-right: 10px;
}

#avatar {
  display: flex;
}

#avatar-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  background: #083460;
}

#avatar-img img {
  width: 20px;
  height: 20px;
  margin-top: 10px;
}

@media only screen and (max-width: 774px) {
  #sidebar {
    width: 60px;
  }

  .nav-item a {
    text-align: center;
  }

  .icon {
    margin-right: 0px
  }

  .label-menu {
    display: none !important;
  }
}
</style>