import axios from 'axios'
const AxiosClient = axios.create({
  baseURL: `http://127.0.0.1:90/api/`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
export const AxiosClientSchedule = axios.create({
  baseURL: `http://ec2-54-220-187-112.eu-west-1.compute.amazonaws.com:9000/api/web/reservation/`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8000/',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  },
})
export default AxiosClient
