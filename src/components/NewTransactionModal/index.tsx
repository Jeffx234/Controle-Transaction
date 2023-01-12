import React from 'react'
import { TransactionTypeContainer, RadioBox } from './styles'
import { Input, Box, Text, Select } from '@chakra-ui/react'
import { Modal } from '../Modal'

export const CategoryIcome = [
  'Salário',
  'Freela',
  'Investimentos',
  'Vendas',
  'Outros',
]
export const CategoryOutcome = [
  'Alimentação',
  'Educação',
  'Lazer',
  'Moradia',
  'Transporte',
  'Outros',
]

export function NewTransactionModal({
  isOpen,
  onClose,
  title,
  setTitle,
  amount,
  setAmount,
  category,
  setCategory,
  type,
  setType,
  children,
}: any) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova transação">
      <Input
        placeholder="Título"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        mb="4"
        p="6"
      />

      <Input
        type="number"
        placeholder="Valor"
        value={amount}
        onChange={(event) => setAmount(Number(event.target.value))}
        mb="4"
        p="6"
      />

      <TransactionTypeContainer>
        <Box display="flex" alignItems="center">
          <RadioBox
            type="button"
            onClick={() => setType('income')}
            isActive={type === 'income'}
            activeColors={'green'}
          >
            <Text>Entrada</Text>
          </RadioBox>
        </Box>

        <RadioBox
          type="button"
          onClick={() => setType('outcome')}
          isActive={type === 'outcome'}
          activeColors={'red'}
        >
          <Text>Saída</Text>
        </RadioBox>
      </TransactionTypeContainer>

      <Select
        placeholder="Categoria"
        my="8"
        value={category}
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
      {children}
    </Modal>
  )
}
