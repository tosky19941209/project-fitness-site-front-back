import axios from 'axios'
const port = 5000
const api = axios.create({
    // baseURL:`http://localhost:${port}/api`
    baseURL:`https://node-backend-fitness.vercel.app/api`
})

export default api;