import { ref } from "vue";

const api = async (url, type = "GET", data = null) => {
  const requestOptions = ref({
    method: type,
    headers: { "Content-Type": "application/json" },
    body: data,
  });
  let response = await fetch(BASE_API + url, requestOptions);
  return await response.json();
};

export default api;
