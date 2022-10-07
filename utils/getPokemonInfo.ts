import { pokeApi } from "../api";
import { Pokemon } from "../interfaces";

export const getPokemonInfo = async (nameOrId: string) => {


    const param = nameOrId.toLowerCase();
    try {
        const { data } = await pokeApi.get<Pokemon>(`/pokemon/${param}`);

        console.log("data: " + data);
        /* se da cuenta de que no uso toda la data que viene del endpoint y vuela lo que no uso! */
        return {
            id: data.id,
            name: data.name,
            sprites: data.sprites
        }
        
    } catch (error) {
        return null;
    }



}