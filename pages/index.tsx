import type { NextPage, GetStaticProps } from 'next'
import { Grid } from '@nextui-org/react';
import { Layout } from '../components/layouts'
import { pokeApi } from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces/pokemon-list';
import { PokemonCard } from '../components/pokemon';
import { useState } from 'react';


interface Props {
  pokemons: SmallPokemon[];
}


// title: Listado de Pokemons
const HomePage: NextPage<Props> = ({ pokemons }) => {

  return (
    <Layout title="Listado de Pokemon">
      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map(poke => (
            <PokemonCard pokemon={poke} key={poke.id} />
          ))
        }
      </Grid.Container>
    </Layout >
  )
}


/* getStaticProps es una funcion que solo se ejecuta del lado del servidor
y solo se ejecuta en build time. Solo lo puedo usar en una page, no en components etc
como se ejecuta del lado del servidor puedo leer fs etc */
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon`, {
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      limit: '151'
    }
  });

  const pokemons: SmallPokemon[] = data.results.map((poke, index) => ({
    ...poke,
    id: index + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`
  }))

  return {
    props: {
      pokemons: pokemons
    }
  }

}

export default HomePage;