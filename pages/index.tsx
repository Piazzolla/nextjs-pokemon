import type { NextPage, GetStaticProps } from 'next'
import { Card, Grid, Row, Text } from '@nextui-org/react';
import { Layout } from '../components/layouts'
import { pokeApi } from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces/pokemon-list';


interface Props {
  pokemons: SmallPokemon[];
}


//https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg



// title: Listado de Pokemons
const HomePage: NextPage<Props> = ({ pokemons }) => {
  console.log(pokemons);
  // { id,   } = pokemons;
  return (
    <Layout title="Listado de Pokemon">
      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map(({ id, name, img }) => (
            <Grid xs={6} sm={3} md={2} xl={1} key={id}>
              <Card hoverable clickable>
                <Card.Body css={{ p: 1 }}>
                  <Card.Image 
                    src={ img }
                    width="100%"
                    height={ 140 }
                  />
                </Card.Body>
                <Card.Footer>
                  <Row justify='space-between'>
                    <Text transform='capitalize'>{name}</Text>
                    <Text>#{id}</Text>
                  </Row>
                </Card.Footer>
              </Card>
            </Grid>
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

  console.log(data);

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