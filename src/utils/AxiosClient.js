import axios from 'axios';

export const axiosClient=axios.create({
    baseURL:"https://zevi-server-yo5s3.ondigitalocean.app/",
    withCredentials:true,
})