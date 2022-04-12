import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import routes from './screens/routes';

const TOKEN = "token"

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
	localStorage.setItem(TOKEN, token);
	isLoggedInVar(true);
};
export const logUserOut = (navigate) => {
	localStorage.removeItem(TOKEN);
	isLoggedInVar(false);
	navigate(routes.home, {replace:true})
};

export const darkModeVar = makeVar(false);

export const client = new ApolloClient({
	uri: "https://nomadcoffee-backend-leafmire.herokuapp.com/graphql",
	cache: new InMemoryCache(),
});