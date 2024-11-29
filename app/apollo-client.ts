import {ApolloClient, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    uri: process.env.URL_BACKEND_GRAPHQL,
    cache: new InMemoryCache(),

})

export default client;