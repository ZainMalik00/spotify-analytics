export const Track = (
    id = "",
    name = "",
    duration = "",
    artists = [],
    image = {},
    album = {},
    popularity = 0,
    previewURL = "",
) => {
    return{
        id: id,
        name: name,
        duration: duration,
        artists: artists,
        image: image,
        album: album,
        followers: followers,
        popularity: popularity,
        previewURL: previewURL
    };
};