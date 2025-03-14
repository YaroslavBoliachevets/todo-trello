import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
// import { ChakraProvider, ThemeConfig } from '@chakra-ui/react';
// import { extendTheme } from '@chakra-ui/styled-system';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

// const customTheme = extendTheme({
//   config: {
//     initialColorMode: 'light',
//     useSystemColorMode: false,
//   } as ThemeConfig,
// });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <App />
    </ChakraProvider>
  </StrictMode>,
);
