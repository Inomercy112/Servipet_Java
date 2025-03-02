import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React from 'react';
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const httpLink = createHttpLink({
    uri: `${backendUrl}/graphql/`,
});


const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token'); 
    return {
        headers: {
            ...headers,
            'Cache-Control': 'no-cache',
            Authorization: token ? `Bearer ${token}` : '',
        }
    };
});


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const ApolloProviderComponent = ({ children }) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderComponent;
