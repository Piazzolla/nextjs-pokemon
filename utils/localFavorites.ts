const toggleFavorite = ( id: number) => {
    console.log('toggle favorite llamado');

    let favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]');
    if( favorites.includes( id )) {
        favorites = favorites.filter( pokeId => pokeId !== id )
    } else {
        favorites.push( id );
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
 
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    toggleFavorite,
}