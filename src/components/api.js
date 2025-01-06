import axios from "axios";

let api = axios.create({ 
    baseURL: import.meta.env.VITE_API_BASE_URL,
});
api.interceptors.request.use(function (config) {
    config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGNiNmU5NTQ1NTJmYzIxYTJkMWFjYmE1MmY3NzY4MSIsIm5iZiI6MTczNjAzOTM5MS41MjQsInN1YiI6IjY3NzlkYmRmZjZiYzk3MTZlODcyNjE2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BEmPViWhTXWe7ijt7EJG456uy2YQQwXuVv6OddIamEQ';
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

api.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
export default api