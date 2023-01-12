import { Button } from '@chakra-ui/react'
import React from 'react'
import { Container, Content, Flex } from './styles'

interface HeaderProps {
  isOpen: () => void
}

export function Header({ isOpen }: HeaderProps) {
  return (
    <Container>
      <Content>
        <Flex>
          <img src="./assets/logo.png" alt="dt money" />
          <h2>Controle financeiro</h2>
        </Flex>
        <Button onClick={isOpen} colorScheme="blue" height="3rem">
          Nova transação
        </Button>
      </Content>
    </Container>
  )
}
