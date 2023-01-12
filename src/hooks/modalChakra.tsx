import { useDisclosure } from '@chakra-ui/react'

export const useModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return { isOpen, onOpen, onClose }
}
