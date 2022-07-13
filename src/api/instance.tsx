import axios from "axios";

const api = axios.create({
  baseURL: '//52.200.211.218/api/'
});

export default api;