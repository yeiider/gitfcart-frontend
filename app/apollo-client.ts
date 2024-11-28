import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
    return new ApolloClient({
        uri: "http://localhost:1337/graphql",
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;