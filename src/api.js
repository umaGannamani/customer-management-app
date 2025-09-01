import axios from 'axios';
const api = axios.create({ baseURL: 'https://customer-management-backend-1-pvlv.onrender.com/api' });
export default api;
