const CLIENT_ID = "1b82855ba97c408590be267aa16378b2";
const SPOTIFY_AUTH = "https://accounts.spotify.com/authorize?";
const REDIRECT_URI_DEV = "http://localhost:3000/";
const REDIRECT_URI_PROD = "https://zainmalik00.github.io/spotify-analytics/";
const SPACE_DELIMITER = "%20";
const SCOPES = ["user-top-read", "user-read-recently-played"];
const SCOPES_URL = SCOPES.join(SPACE_DELIMITER);

const LoginService = {
     getParamsAfterLoginRedirect: function(){
        return( 
            window.location.hash.substring(1)
            .split("&")
            .reduce((accumulator, currentParam) => {
              const [key, value] = currentParam.split("=");
              accumulator[key] = value;
              return accumulator;
            }, {})   
        );
      },
    
      loginRedirectDev: function(){
          window.location = `${SPOTIFY_AUTH}client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI_DEV}&scope=${SCOPES_URL}&response_type=token&show_dialog=true`;
      },

      loginRedirectProd: function(){
          window.location = `${SPOTIFY_AUTH}client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI_PROD}&scope=${SCOPES_URL}&response_type=token&show_dialog=true`;
      }

};

export default LoginService;