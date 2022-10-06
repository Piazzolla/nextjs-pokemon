import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";

import { Layout } from "../../components/layouts"
import { localFavorites } from "../../utils";
import { pokeApi } from "../../api";
import { Pokemon } from "../../interfaces";
import { useState, useEffect } from 'react';


interface Props {
  pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorites, setIsInFavorites] = useState( localFavorites.existInFavorites(pokemon.id))
 
  // console.log({ exiteWindow: typeof window});

  //esto se invoca cuando se crea el componente en el front pero no en el back
  const onToggleFavorite = () => {
    localFavorites.toggleFavorite( pokemon.id )
    setIsInFavorites( !isInFavorites ); 
  }

  return (
    <Layout title={ pokemon.name }>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width='100%'
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform="capitalize">{pokemon.name} </Text>
              <Button
                color="gradient"
                ghost={ !isInFavorites }
                onClick={ onToggleFavorite }
              >
                { isInFavorites? 'En favoritos' : 'Guardar en favoritos'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites</Text>
              <Container direction="row" display='flex' gap={ 0 }>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>

        </Grid>


      </Grid.Container>
    </Layout>
  )
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {

    paths: pokemons151.map(id => ({
      params: { id }
    })),
    /*      paths: [
              {
                  params: {id: '1'}
              },
              {
                  params: {id: '2'}
              },
              {
                  params: {id: '3'}
              },
          ],*/
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string }; /* Con esto me ahorro tipar params, 
    si yo se que voy a usar id nomas y ese id es string */

  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);
  return {
    props: {
      pokemon: data
    }
  }

}


export default PokemonPage;