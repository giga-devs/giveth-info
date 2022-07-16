import axios from "axios";

const api = axios.create({
  baseURL: 'https://www.apigivethinfo.website/api/'
});

export default api;