import { Button } from '@nextui-org/react'
import type { NextPage } from 'next'
import { Layout } from '../components/layouts'
import { ReactNode } from 'react';

// title: Listado de Pokemons
const  HomePage: NextPage = () => {
  return (
      <Layout  title="Listado de Pokemon">
        <Button color="gradient">
          Hola Mundo
        </Button>
      </Layout>
  )
}

export default HomePage;