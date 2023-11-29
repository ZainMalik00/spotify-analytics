export const Album = (
    id = "",
    name = "",
    releaseDate = "",
    type= "",
    numOfTracks = 0,
    images = [],
    genres = [],
    artists = [],
    popularity = 0,
    uri = "",
    url = ""    
) => {
    return{
        id: id,
        name: name,
        releaseDate: releaseDate,
        type: type,
        numOfTracks: numOfTracks,
        images: images,
        genres: genres,
        artists: artists,
        popularity: popularity,
        uri: uri,
        url: url
    };
};