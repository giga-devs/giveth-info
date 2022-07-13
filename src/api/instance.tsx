import axios from "axios";

const api = axios.create({
  baseURL: 'http://52.200.211.218/api/'
});

export default api;