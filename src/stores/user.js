import { ref } from "vue";
import { defineStore } from "pinia";
import api from "@/utils/api";

export const userStore = defineStore("user", () => {
  let dataUser = ref({
    data: [],
    total: 0,
    page: 0,
    per_page: 5,
    total_pages: 0,
  });
  function setDataUser(data) {
    data.data.forEach((val) => {
      let dataExist = dataUser.value.data.findIndex((x) => x.id == val.id);
      if (dataExist == -1) {
        dataUser.value.data.push(val);
      }
    });
    dataUser.value.total = data.total;
    dataUser.value.page = data.page;
    dataUser.value.per_page = data.per_page;
    dataUser.value.total_pages = data.total_pages;
  }
  async function getAll(page = "") {
    try {
      let res = await api(`users${page ? "?page=" + page : ""}`);
      if (res) {
        await setDataUser(res);

        return {
          data: dataUser.value,
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

  async function getByID(id) {
    try {
      let res = await api("users/" + id);
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

  async function update(id, data) {
    console.log("update");
    try {
      let res = await api("users/" + id, "PUT", data);
      if (res) {
        return res;
      }
    } catch (error) {
      return error;
    }
  }
  async function destroy(id) {
    try {
      let res = await api("users/" + id, "delete");
      if (res) {
        console.log("OK");
        let i = dataUser.value.data.findIndex((x) => (x.id = id));
        dataUser.value.data.splice(i, 1);
        return res;
      }
    } catch (error) {
      return error;
    }
  }
  return {
    dataUser: dataUser.value,
    getAll,
    getByID,
    update,
    destroy,
  };
});
