import axios from "axios";
const AxiosClient = axios.create({
    baseURL: `https://www.sportsinternational.com.tr/api/`,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export default AxiosClient;
