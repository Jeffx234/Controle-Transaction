import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Text,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { api } from '../../../services/api'
import Cookies from 'js-cookie'

export default function EditTransactionModal() {
  const { register, handleSubmit, setValue, formState } = useForm()
  const { isSubmitting } = formState
  const { query, push } = useRouter()
  const token = Cookies.get('transactions-project')

  useEffect(() => {
    async function getTransaction() {
      const { data } = await api.get(`/transactions/p/${query.id}`)
      setValue('title', data.title)
      setValue('amount', data.amount)
      setValue('category', data.category)
      setValue('type', data.type)
    }

    getTransaction()
  }, [register])

  async function handleEditTransaction(data: any) {
    try {
      await api.put(`/transactions/${query.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      push('/dashboard')
    } catch (error) {
      alert('Erro ao editar transação')
      console.log(error)
    }
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(handleEditTransaction)}
      bg="gray.800"
      m="auto"
      display="flex"
      flexDir="column"
      mt="8"
      justifyContent="center"
      maxW="400px"
      p="8"
      borderRadius="8"
    >
      <Heading size="lg" fontWeight="normal" color="gray.100">
        Editar transação
      </Heading>

      <Flex mt="8" direction="column">
        <Text fontWeight="bold" color="gray.400" fontSize="small">
          Título
        </Text>
        <Input
          bg="gray.100"
          type="text"
          {...register('title')}
          placeholder="Ex: Desenvolvimento de website"
        />
      </Flex>

      <Flex mt="8" direction="column">
        <Text fontWeight="bold" color="gray.400" fontSize="small">
          Valor
        </Text>
        <Input
          bg="gray.100"
          type="number"
          {...register('amount')}
          placeholder="Ex: 1200"
        />
      </Flex>

      <Flex mt="8" direction="column">
        <Text fontWeight="bold" color="gray.400" fontSize="small">
          Categoria
        </Text>
        <Input
          bg="gray.100"
          type="text"
          {...register('category')}
          placeholder="Ex: Alimentação"
        />
      </Flex>

      <Flex mt="8" direction="column">
        <Text fontWeight="bold" color="gray.400" fontSize="small" mb="2">
          Tipo
        </Text>
        <Select {...register('type')} bg="gray.100">
          <option value="deposit">Entrada</option>
          <option value="withdraw">Saída</option>
        </Select>
      </Flex>

      <Flex mt="8" w="100%" align="center">
        <Button
          w="100%"
          type="submit"
          disabled={isSubmitting}
          colorScheme="blue"
        >
          Editar
        </Button>
      </Flex>
    </Box>
  )
}
