import { api } from '../services/api'

export const useAuth = (mode: 'signin' | 'signup', data: any) => {
  return api.post(`/${mode}`, data)
}

export const useAutorizationToken = (
  mode: 'logout' | 'create',
  token: any,
  data: any,
) => {
  return api.post(`${mode}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
