import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import { FC, ReactNode, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import swell from 'swell-node'

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop 

  useEffect(() => {
    document.body.classList?.remove('loading')
    swell.init('test-cms-store', 'WvjpHjyP22ieScAfCqIfIQE5sZhRIf0K', {cache: false})
    const getProducts = async () => {
      try {
        const products = await swell.get('/products');
        console.log(products);
        return products;
      } catch (e) {
        console.error(e.message)
      }
    };
    getProducts()
  }, [])

  return (
    <>
      <Head />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </>
  )
}
