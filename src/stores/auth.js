import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import api from "@/utils/api";

export const authStore = defineStore("auth", () => {
  async function authLogin(data) {
    try {
      let res = await api("login", "post", data);
      if (res) {
        localStorage.setItem("userLogin", btoa(res.token));
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  function getAuthLogin() {
    let auth = localStorage.getItem("userLogin");
    return auth ? JSON.parse(auth) : auth;
  }

  async function create(data) {
    try {
      let res = await api("users", "post", data);
      if (res) {
        return {
          data: res,
          message: "",
        };
      }
    } catch (error) {
      return {
        data: null,
        message: error,
      };
    }
  }

  return {
    authLogin,
    getAuthLogin,
    create,
  };
});
