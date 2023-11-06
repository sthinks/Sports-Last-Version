import axios from "axios";
const AxiosClientSchedule = axios.create({
    baseURL: `https://worfact-api.com/api/web/reservation/`,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Content-Security-Policy": "upgrade-insecure-requests",
    },
});
export default AxiosClientSchedule;
