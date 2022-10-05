import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts"
import { Pokemon } from "../../interfaces";


interface Props {
   pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({pokemon}) => {

  
  //console.log(pokemon);



  return (
    <Layout title='Algun pokemon'>
        <h1>{ pokemon.name }</h1>
    </Layout>
  )
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const pokemons151 = [...Array(151)].map( (value, index) => `${index + 1}`);

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