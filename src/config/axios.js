import axios from 'axios'

export const API_SNKRS = axios.create({
    baseURL:'https://v1-sneakers.p.rapidapi.com/v1/sneakers'
})