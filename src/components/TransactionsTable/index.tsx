import React, { memo } from 'react'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { MdEdit } from 'react-icons/md'
import moment from 'moment'
import {
  Table,
  TableContainer,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
} from '@chakra-ui/react'

const TransactionsTable = ({
  data,
  handleEditTransaction,
  handleDeleteTransaction,
}) => {
  return (
    <TableContainer mt="2rem">
      <Table>
        <Thead>
          <Th>Título</Th>
          <Th>Valor</Th>
          <Th>Categoria</Th>
          <Th>Data</Th>
          <Th>Editar</Th>
          <Th>Excluir</Th>
        </Thead>

        <Tbody>
          {data?.map((transaction, index) => {
            return (
              <Tr key={index} color="gray.100">
                <Td>{transaction?.title}</Td>
                <Td
                  className={transaction?.type}
                  color={
                    transaction?.type === 'outcome' ? 'red.500' : 'green.500'
                  }
                >
                  {transaction?.type === 'outcome' && '-'}
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(transaction?.amount)}
                </Td>
                <Td>{transaction?.category}</Td>
                <Td>{moment(transaction?.createdAt).format('DD/MM/YYYY')}</Td>
                <Td>
                  <button
                    type="button"
                    onClick={() => handleEditTransaction(transaction?.id)}
                  >
                    <MdEdit size={20} />
                  </button>
                </Td>
                <Td>
                  <button
                    type="button"
                    onClick={() => handleDeleteTransaction(transaction?.id)}
                  >
                    <RiDeleteBin5Line size={20} />
                  </button>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default memo(TransactionsTable)
