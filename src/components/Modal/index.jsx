import {
  Modal as ModalChakra,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import React from 'react'

export function Modal({ children, isOpen, onClose, title }) {
  return (
    <ModalChakra isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w="100%" maxW="500px">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton bg="gray.50" />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalChakra>
  )
}
