import { Box, Flex, Input, Button, Text } from '@chakra-ui/react'
import { useAuth as Auth } from '../hooks/useAuth'
import { Message } from '../components/MessageLogin'
import { ToastContainer } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Cookie from 'js-cookie'

export default function Signin() {
  const { register, handleSubmit, formState } = useForm()
  const router = useRouter()
  const dispatch = useDispatch()
  const handleSignin = async (value: any) => {
    try {
      const { data } = await Auth('signin', value)
      dispatch({ type: 'SET_USER', payload: data })
      Cookie.set('transaction', data.token)
      Message.success()
      router.push('/dashboard')
    } catch (error) {
      Message.errors()
    }
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      bg="gray.900"
      gridGap="4"
      direction="column"
    >
      <Box
        w="100%"
        display="flex"
        gridGap="4"
        maxWidth={600}
        h="auto"
        bg="gray.300"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <form onSubmit={handleSubmit(handleSignin)}>
          <Text fontSize="2xl" textAlign="center" mb="10">
            Faça seu login na plataforma
          </Text>
          <Input
            bg="gray.100"
            name="email"
            type="email"
            mb="4"
            {...register('email')}
            size="lg"
            placeholder="E-mail"
          />

          <Input
            name="password"
            type="password"
            bgColor="gray.100"
            size="lg"
            placeholder="Senha"
            {...register('password')}
          />

          <Button
            type="submit"
            mt="6"
            colorScheme="blue"
            size="lg"
            w="100%"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>

          <Text fontSize="sm" textAlign="center" mt="6">
            Não tem uma conta?{' '}
            <Text as="a" href="/signup" color="blue.500">
              Crie uma
            </Text>
          </Text>
        </form>
      </Box>
      <ToastContainer />
    </Flex>
  )
}
