export const Track = (
    id = "",
    name = "",
    duration = "",
    artists = [],
    images = [],
    album = {},
    popularity = 0,
    explicit = false,
    previewURL = "",
    uri = "",
    url = ""    
) => {
    return{
        id: id,
        name: name,
        duration: duration,
        artists: artists,
        images: images,
        album: album,
        popularity: popularity,
        explicit: explicit,
        previewURL: previewURL,
        uri: uri,
        url: url
    };
};