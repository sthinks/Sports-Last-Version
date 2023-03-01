import axios from 'axios'
const AxiosClientSchedule = axios.create({
  baseURL: `http://ec2-54-220-187-112.eu-west-1.compute.amazonaws.com:9000/api/web/reservation/`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Content-Security-Policy': 'upgrade-insecure-requests',
  },
})
export default AxiosClientSchedule
