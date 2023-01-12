import React from 'react'
import { Container } from './styles'
import TransactionsTable from '../TransactionsTable'

export function Dashboard({
  data,
  children,
  handleEditTransaction,
  handleDeleteTransaction,
}) {
  return (
    <Container>
      {children}
      <TransactionsTable
        data={data}
        handleEditTransaction={handleEditTransaction}
        handleDeleteTransaction={handleDeleteTransaction}
      />
    </Container>
  )
}
