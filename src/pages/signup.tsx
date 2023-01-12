import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import { api } from '../services/api'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { Message } from '../components/MessageLogin'

export default function SignUp() {
  const { register, handleSubmit, formState } = useForm()
  const router = useRouter()

  const onSubmit = async (value) => {
    try {
      await api.post('/signup', {
        email: value.email,
        password: value.password,
        name: value.name,
      })
      Message.success()
      router.push('/signin')
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Text fontSize="2xl" textAlign="center" mb="10">
            Crie sua conta
          </Text>

          <Input
            bg="gray.100"
            name="name"
            type="text"
            mb="4"
            {...register('name')}
            size="lg"
            placeholder="Nome e sobrenome"
          />

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
            Cadastrar
          </Button>

          <Text fontSize="sm" textAlign="center" mt="6">
            Já tem uma conta?{' '}
            <Text as="a" href="/signin" color="blue.500">
              Faça seu login
            </Text>
          </Text>
        </form>
      </Box>
      <ToastContainer />
    </Flex>
  )
}
