import axios from "axios";

const api = axios.create({
    baseURL: "https://cmms-backends.vercel.app",
    // withCredentials: true
});

export default api;
