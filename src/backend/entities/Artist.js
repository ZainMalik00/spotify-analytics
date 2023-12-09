export const Artist = (
    id = "",
    name = "",
    images = [],
    genres = [],
    followers = 0,
    popularity = 0,
    uri = "",
    url = ""    
) => {
    return{
        id: id,
        name: name,
        images: images,
        genres: genres,
        followers: followers,
        popularity: popularity,
        uri: uri,
        url: url
    };
};