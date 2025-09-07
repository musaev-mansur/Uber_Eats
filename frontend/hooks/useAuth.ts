import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import { setToken } from '@/lib/api'
import { userApi } from '@/store/reducers/servise/userServise'
import type { RootState } from '@/store/store'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const { isAuth, currentUser } = useAppSelector((state: RootState) => state.user)

  useEffect(() => {
    // Проверяем, есть ли токен в cookies
    const token = localStorage.getItem('token') || document.cookie.includes('token=')
    
    if (token && !isAuth) {
      // Устанавливаем токен в axios
      setToken()
      
      // Проверяем валидность токена, делая запрос к профилю
      dispatch(userApi.endpoints.getUser.initiate(currentUser.role, { forceRefetch: true }))
        .unwrap()
        .then(() => {
          // Токен валиден, пользователь авторизован
          console.log('User authenticated successfully')
        })
        .catch(() => {
          // Токен невалиден, очищаем его
          localStorage.removeItem('token')
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
          console.log('Token invalid, cleared')
        })
    }
  }, [dispatch, isAuth, currentUser.role])

  return { isAuth, currentUser }
}
