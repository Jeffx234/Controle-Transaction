import React, { useEffect, useState } from 'react'
import {
  CategoryIcome,
  CategoryOutcome,
  NewTransactionModal,
} from '../../components/NewTransactionModal'
import { TransactionsProvider } from '../../hooks/useTransaction'
import { Dashboard } from '../../components/Dashboard'
import { useSelector, useDispatch } from 'react-redux'
import { GlobalStyle } from '../../../styles/globals'
import { useModal } from '../../hooks/modalChakra'
import { useForm } from 'react-hook-form'
import { Summary } from '../../components/Summary'
import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { api } from '../../services/api'
import { Box, Button, Input, Select, Text } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { Modal } from '../../components/Modal'
import Cookie from 'js-cookie'
import {
  RadioBox,
  TransactionTypeContainer,
} from '../../components/NewTransactionModal/styles'

export default function DashboardPage() {
  const { user } = useSelector((state: any) => state.user)
  const { month } = useSelector((state: any) => state.months)
  const { register, handleSubmit } = useForm()
  const [transactions, setTransactions] = useState([])
  const { onClose, isOpen, onOpen } = useModal()
  const [category, setCategory] = useState('')
  const [type, setType] = useState('deposit')
  const [outcome, setOutcome] = useState(0)
  const [income, setIncome] = useState(0)
  const [total, setTotal] = useState(0)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [id, setId] = useState(0)
  const [editTransaction, setEditTransaction] = useState(false)
  const token = Cookie.get('transaction')
  const router = useRouter()
  const dispatch = useDispatch()
  const year = '2023'

  useEffect(() => {
    if (!token) {
      dispatch({ type: 'SET_USER', payload: null })
      router.push('/signin')
    }
  }, [])

  useEffect(() => {
    async function getTransactions() {
      const { data } = await api.get(
        `/transactions/${user?.user?.id}/${month}/${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      setTransactions(data.transactions)
      setIncome(data.balance.income)
      setOutcome(data.balance.outcome)
      setTotal(data.balance.total)
    }

    getTransactions()
  }, [
    onClose,
    isOpen,
    setTransactions,
    month,
    year,
    income,
    outcome,
    total,
    user?.user?.id,
    token,
  ])

  async function createTransaction() {
    try {
      const { data } = await api.post(
        '/transactions',
        {
          title,
          amount,
          category,
          type,
          month,
          year,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const { transaction } = data

      setTransactions([...transactions, transaction])
      setTitle('')
      setAmount(0)
      setCategory('')
      setType('deposit')

      onClose()
      console.log(data)
    } catch (err) {
      alert('Erro ao cadastrar transação')
      console.log(err)
    }
  }

  async function deleteTransaction(id: number) {
    try {
      await api.delete(`/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const newTransactions = transactions.filter(
        (transaction: any) => transaction.id !== id,
      )

      setTransactions(newTransactions)
    } catch (err) {
      alert('Erro ao deletar transação')
      console.log(err)
    }
  }

  async function getEditTransaction(id: number) {
    const { data } = await api.get(`/transactions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setId(data?.id)
    setTitle(data?.title)
    setAmount(data?.amount)
    setCategory(data?.category)
    setType(data?.type)
  }

  async function editTransactionData(id: number) {
    try {
      const { data } = await api.put(
        `/transactions/${id}`,
        {
          title,
          amount,
          category,
          type,
          month,
          year,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const newTransactions = transactions.map((transaction: any) => {
        if (transaction.id === id) {
          return data.transaction
        }

        return transaction
      })

      setTransactions(newTransactions)
      setTitle('')
      setAmount(0)
      setCategory('')
      setType('deposit')
      setEditTransaction(false)
      onClose()
    } catch (err) {
      alert('Erro ao editar transação')
      console.log(err)
    }
  }

  return (
    <Sidebar>
      <TransactionsProvider onClose={onClose}>
        <Header
          isOpen={() => {
            setEditTransaction(false)
            onOpen()
          }}
        />

        <Dashboard
          data={transactions}
          handleDeleteTransaction={(id: number) => deleteTransaction(id)}
          handleEditTransaction={(id: number) => {
            setEditTransaction(true)
            getEditTransaction(id)
            onOpen()
          }}
        >
          <Summary income={income} outcome={outcome} total={total} />
        </Dashboard>
        {editTransaction ? (
          <Modal isOpen={isOpen} onClose={onClose} title="Editar transação">
            <Input
              placeholder="Título"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              mb="4"
              p="6"
              id="title"
            />

            <Input
              type="number"
              placeholder="Valor"
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
              mb="4"
              p="6"
              id="amount"
            />

            <TransactionTypeContainer>
              <Box display="flex" alignItems="center">
                <RadioBox
                  type="button"
                  onClick={() => setType('income')}
                  isActive={type === 'income'}
                  activeColors={'green'}
                  id="income"
                >
                  <Text>Entrada</Text>
                </RadioBox>
              </Box>

              <RadioBox
                type="button"
                onClick={() => setType('outcome')}
                isActive={type === 'outcome'}
                activeColors={'red'}
                id="outcome"
              >
                <Text>Saída</Text>
              </RadioBox>
            </TransactionTypeContainer>

            <Select
              placeholder="Categoria"
              my="8"
              value={category}
              id="category"
              onChange={(event) => setCategory(event.target.value)}
            >
              {type === 'income'
                ? CategoryIcome.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))
                : CategoryOutcome.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
            </Select>

            <Button
              onClick={editTransactionData(id)}
              w="100%"
              h="50px"
              type="submit"
              colorScheme="blue"
            >
              Editar
            </Button>
          </Modal>
        ) : (
          <NewTransactionModal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            setTitle={setTitle}
            amount={amount}
            setAmount={setAmount}
            category={category}
            setCategory={setCategory}
            type={type}
            setType={setType}
          >
            <Button
              onClick={createTransaction}
              w="100%"
              h="50px"
              type="submit"
              colorScheme="blue"
            >
              Cadastrar
            </Button>
          </NewTransactionModal>
        )}
        <GlobalStyle />
      </TransactionsProvider>
    </Sidebar>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { transaction: token } = req.cookies

  if (!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
