import type { AppProps } from 'next/app';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import { brandColors } from '@giveth/ui-design-system';
import GlobalStyle from '../src/styles/globalstyles';
import '../src/styles/global.css';

const theme: DefaultTheme = {
  colors: {
    primary: `${brandColors.giv[900]}`,
    secondary: `${brandColors.giv[700]}`,
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
