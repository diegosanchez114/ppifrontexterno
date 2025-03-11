export const environment = {
    msalConfig: {
        auth: {
            clientId: 'a3736b95-abb6-4d1c-a6e0-fce9497ca775',
            authority: 'https://login.microsoftonline.com/e802a0d9-83d6-4b52-9cbc-562a04ed30b5'
        }
    },
    apiConfig: {
        scopes: ["openid", "offline_access"],
        uri: 'https://upitwebexternal-a0fcase2fud7hzaz.eastus2-01.azurewebsites.net'
    },
    endpoints: {
        api: 'https://upitapi-gdfheedffdc4b6ak.eastus2-01.azurewebsites.net/api'
    } 
};
