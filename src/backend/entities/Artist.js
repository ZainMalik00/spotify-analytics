export const Artist = (
    id = "",
    name = "",
    image = {},
    genre = [],
    followers = {},
    popularity = 0    
) => {
    return{
        id: id,
        name: name,
        image: image,
        genre: genre,
        followers: followers,
        popularity: popularity
    };
};