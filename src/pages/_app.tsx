import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from 'styled-components'
import { store, persistor } from '../store'
import { theme } from '../../styles/theme'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ChakraProvider>
            <PersistGate persistor={persistor}>
              <Component {...pageProps} />
            </PersistGate>
          </ChakraProvider>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  )
}

export default MyApp
