import React from 'react'
import { Container } from './styles'
import { Text } from '@chakra-ui/react'

export function Summary({ outcome, income, total }) {
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src="./assets/income.svg" alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(income)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src="./assets/outcome.svg" alt="Saídas" />
        </header>
        <strong>
          {outcome > 0 ? '-' : ''}
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(outcome)}
        </strong>
      </div>
      <div className="highligth-background">
        <header>
          <p>Total</p>
          <img src="./assets/total.svg" alt="Total" />
        </header>
        <Text
          color={total < 0 ? 'red.500' : 'white.500'}
          display="block"
          fontSize="2rem"
          lineHeight="3rem"
          mt="1rem"
        >
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(total)}
        </Text>
      </div>
    </Container>
  )
}
