import axios from 'axios';
const api = axios.create({
  baseURL: 'http://10.72.10.227:3000/',
});
export default api;
