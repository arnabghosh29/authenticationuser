import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://swarupapp.in/third/",

});
export default axiosInstance