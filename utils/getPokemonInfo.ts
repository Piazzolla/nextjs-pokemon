import { pokeApi } from "../api";
import { Pokemon } from "../interfaces";

export const getPokemonInfo = async (nameOrId: string) => {


    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);


    /* se da cuenta de que no uso toda la data que viene del endpoint y vuela lo que no uso! */
    return {
        id: data.id,
        name: data.name,
        sprites: data.sprites
    }
}