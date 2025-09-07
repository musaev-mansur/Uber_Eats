import axios from "axios"
import Cookies from "universal-cookie"

export const baseURL = 'http://localhost:8000'

export const baseService = axios.create({
  baseURL: baseURL
})

export const cookies = new Cookies()

export const setToken = () => {
  const token = cookies.get("token")
  if (token) {
    baseService.defaults.headers.common.Authorization = 'Token ' + token
  }
}
