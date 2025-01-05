import axios from "axios";

let api = axios.create({ 
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "68cb6e954552fc21a2d1acba52f77681",
    }
});

export default api