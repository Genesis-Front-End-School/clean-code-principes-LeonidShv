import axios from 'axios'

const token = document.cookie
  .split('; ')
  .find((row) => row.startsWith('token='))
  ?.split('=')[1]

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_API_VERSION}`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  withCredentials: false
})
