import React, { createContext, useState, ReactNode, useContext } from 'react'
import { api } from '../services/api'

interface Transaction {
  id: number
  title: string
  amount: number
  type: string
  category: string
}

interface TransactionsProviderProps {
  children: ReactNode
  onClose: () => void
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsContextData {
  transactions: any
  createTransaction: (transaction: TransactionInput) => Promise<void>
  deleteTransaction: any
  UpdateTransactions: any
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData,
)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function createTransaction({
    title,
    amount,
    type,
    category,
    token,
    url,
  }: any) {
    const response = await api.post(
      `/transactions/${url}`,
      { title, amount, type, category, token },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const transactions = await response.data
    setTransactions(transactions)
  }

  const UpdateTransactions = (id: number) => {
    api.put(`/transactions/${id}`).then((response) => {
      const newTransactions = transactions.map((transaction: any) => {
        if (transaction.id === id) {
          return {
            ...transaction,
            ...response.data.transaction,
          }
        }
        return transaction
      })
      setTransactions(newTransactions)
    })
  }

  const deleteTransaction = async (id: number, token: string) => {
    const response = await api.delete(`/transactions/${id}`)
    const transactions = await response.data
    setTransactions(transactions)
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
        deleteTransaction,
        UpdateTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)

  return context
}
