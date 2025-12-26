const CLIENT_ID = "1b82855ba97c408590be267aa16378b2";
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET || "";
const SPOTIFY_AUTH = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const REDIRECT_URI_DEV = "http://127.0.0.1:3000/";
const REDIRECT_URI_PROD = "https://zainmalik00.github.io/spotify-analytics/";
const SCOPES = ["user-top-read", "user-read-recently-played"];
const TOKEN_STORAGE_KEY = "spotify_access_token";
const REFRESH_TOKEN_STORAGE_KEY = "spotify_refresh_token";

const LoginService = {
     getParamsAfterLoginRedirect: function(){
        return( 
            window.location.hash.substring(1)
            .split("&")
            .reduce((accumulator, currentParam) => {
              const [key, value] = currentParam.split("=");
              accumulator[key] = decodeURIComponent(value);
              return accumulator;
            }, {})   
        );
      },

      getQueryParams: function(){
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params.entries()) {
          result[key] = value;
        }
        return result;
      },

      exchangeCodeForToken: async function(code) {
        try {
          // Determine which redirect URI was used based on current origin
          const currentOrigin = window.location.origin + window.location.pathname;
          let redirectUri;
          if (currentOrigin.includes('127.0.0.1') || currentOrigin.includes('localhost')) {
            redirectUri = REDIRECT_URI_DEV;
          } else {
            redirectUri = REDIRECT_URI_PROD;
          }

          const response = await fetch(SPOTIFY_TOKEN_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
            },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              code: code,
              redirect_uri: redirectUri
            })
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Token exchange failed: ${errorData.error_description || errorData.error}`);
          }

          const data = await response.json();
          return {
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expires_in: data.expires_in,
            token_type: data.token_type,
            scope: data.scope
          };
        } catch (error) {
          console.error('Error exchanging code for token:', error);
          throw error;
        }
      },

      storeToken: function(tokenData) {
        if (tokenData.access_token) {
          localStorage.setItem(TOKEN_STORAGE_KEY, tokenData.access_token);
        }
        if (tokenData.refresh_token) {
          localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, tokenData.refresh_token);
        }
      },

      getStoredToken: function() {
        return localStorage.getItem(TOKEN_STORAGE_KEY) || "";
      },

      clearStoredToken: function() {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
      },
    
      loginRedirectDev: function(){
          const params = new URLSearchParams({
              client_id: CLIENT_ID,
              redirect_uri: REDIRECT_URI_DEV,
              scope: SCOPES.join(" "),
              response_type: "code",
              show_dialog: "true"
          });
          window.location = `${SPOTIFY_AUTH}?${params.toString()}`;
      },

      loginRedirectProd: function(){
          const params = new URLSearchParams({
              client_id: CLIENT_ID,
              redirect_uri: REDIRECT_URI_PROD,
              scope: SCOPES.join(" "),
              response_type: "token",
              show_dialog: "true"
          });
          window.location = `${SPOTIFY_AUTH}?${params.toString()}`;
      }

};

export default LoginService;