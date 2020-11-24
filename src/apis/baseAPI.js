import axios from 'axios';
const api = axios.create({
  baseURL: 'https://7b21e1165e64.ngrok.io//',
});
export default api;
