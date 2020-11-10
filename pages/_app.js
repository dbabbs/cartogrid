import App from 'next/app';
import { Provider as StyletronProvider } from 'styletron-react';
import { styletron, debug } from '../styletron';

import '../styles/globals.scss';
export default class MyApp extends App {
   render() {
      const { Component, pageProps } = this.props;
      return (
         <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
            <Component {...pageProps} />
         </StyletronProvider>
      );
   }
}
