import axios from "axios"
import Cookies from "universal-cookie"

export const baseURL = 'https://unifood.onrender.com'

 export const baseService = axios.create({
    baseURL: baseURL
 })

 export const cookies = new Cookies;

 export const setToken = () =>{
    baseService.defaults.headers.common.Authorization = 'Bearer ' + cookies.get("token")
 }