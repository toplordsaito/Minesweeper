import axios from 'axios';
const api = axios.create({
  baseURL: 'http://162.168.1.109:3000/',
});
export default api;
