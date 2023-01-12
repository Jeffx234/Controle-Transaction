import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Message = {
  errors: () => {
    toast.error('Usuario ou senha incorreto!', {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  },

  success: () => {
    toast.success('Usuario Logado com sucesso', {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      type: 'success',
    })
  },
}
