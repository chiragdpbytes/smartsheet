import axios from 'axios';

// const API_BASE_URL = 'https://dev-dmsapi-h4tux5ulqa-uc.a.run.app/api/v1';
const API_BASE_URL = 'http://192.168.10.234:3000';

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export default apiService;
