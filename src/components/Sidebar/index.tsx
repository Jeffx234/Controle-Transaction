import React, { useEffect } from 'react'
import { Avatar, Box, Heading, Flex, Button } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineLogout } from 'react-icons/ai'
import { ContainerMain } from './styles'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

interface ISidebarProps {
  children: React.ReactNode
}

const Links = [
  {
    id: 1,
    title: 'Janeiro',
    path: '/dashboard/january',
    value: 'january',
  },
  {
    id: 2,
    title: 'Fevereiro',
    path: '/dashboard/february',
    value: 'february',
  },
  {
    id: 3,
    title: 'Março',
    path: '/dashboard/march',
    value: 'march',
  },
  {
    id: 4,
    title: 'Abril',
    path: '/dashboard/april',
    value: 'april',
  },

  {
    id: 5,
    title: 'Maio',
    path: '/dashboard/may',
    value: 'may',
  },
  {
    id: 6,
    title: 'Junho',
    path: '/dashboard/june',
    value: 'june',
  },
  {
    id: 7,
    title: 'Julho',
    path: '/dashboard/july',
    value: 'july',
  },
  {
    id: 8,
    title: 'Agosto',
    path: '/dashboard/august',
    value: 'august',
  },
  {
    id: 9,
    title: 'Setembro',
    path: '/dashboard/september',
    value: 'september',
  },
  {
    id: 10,
    title: 'Outubro',
    path: '/dashboard/october',
    value: 'october',
  },
  {
    id: 11,
    title: 'Novembro',
    path: '/dashboard/november',
    value: 'november',
  },
  {
    id: 12,
    title: 'Dezembro',
    path: '/dashboard/december',
    value: 'december',
  },
]

export function Sidebar({ children }: ISidebarProps) {
  const { user } = useSelector((state: any) => state.user)
  const [active, setActive] = React.useState('january')
  const [activeLink, setActiveLink] = React.useState(1)
  const token = Cookies.get('transaction')
  const dispatch = useDispatch()
  const Router = useRouter()

  useEffect(() => {
    if (!token) {
      Router.push('/signin')
    }
  }, [Router, token])

  console.log(active)

  const handleActive = (value: string, id: number) => {
    setActive(value)
    setActiveLink(id)
    dispatch({
      type: 'SET_MONTH',
      payload: value,
    })
  }

  const handleLogout = async () => {
    try {
      Cookies.remove('transactions')
      dispatch({
        type: 'USER_LOGOUT',
        payload: {},
      })
      alert('Logout realizado com sucesso')
    } catch (error) {
      alert('Erro ao fazer logout')
    }
  }

  return (
    <Flex w="100%" bg="gray.900" gridGap="1rem" p="1rem" minH="100vh">
      <Flex w="20%" bg="gray.900" minH="100vh" flexDirection="column" h="auto">
        <Box
          w="100%"
          h="100%"
          bg="gray.800"
          display="flex"
          flexDirection="column"
          color="white"
          p="1rem"
          borderRadius="0.5rem"
        >
          <Flex display="flex" alignItems="center" gridGap="1rem" mb="1rem">
            <Avatar name={user?.user?.name} />

            <Heading as="h2" size="md" color="white">
              {user?.user?.name}
            </Heading>
            <Button onClick={handleLogout} colorScheme="red" size="sm">
              <AiOutlineLogout />
            </Button>
          </Flex>
          <Flex flexDirection="column" gridGap="1rem" borderRadius="0.5rem">
            {Links.map((link) => (
              <Button
                key={link.id}
                onClick={() => handleActive(link.value, link.id)}
                isActive={activeLink === link.id}
                _active={{
                  bg: 'blue.700',
                }}
                color="white"
                bg="gray.700"
                p="0.5rem"
                borderRadius="0.5rem"
                w="100%"
                _hover={{
                  bg: 'gray.600',
                }}
              >
                {link.title}
              </Button>
            ))}
          </Flex>
        </Box>
      </Flex>
      <ContainerMain>{children}</ContainerMain>
    </Flex>
  )
}
