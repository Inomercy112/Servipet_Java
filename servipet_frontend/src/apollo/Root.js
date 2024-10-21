import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { useAuth } from "../AuthContext"; 
import App from '../App'; 

const Root = () => {
    const { token } = useAuth(); 

    const httpLink = createHttpLink({
        uri: 'http://localhost:8080/graphql',
    });

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        };
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    );
};

export default Root;
