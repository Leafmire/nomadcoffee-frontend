import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "styled-components";
import { isLoggedInVar, darkModeVar, client } from "./apollo";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import "./index.css";
import SignUp from "./screens/SignUp";
import routes from "./screens/routes";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route path={routes.home} element={isLoggedIn ?
                <Home />
                :
                <Login />
              } />
              {!isLoggedIn ? <Route path={routes.signUp} element={<SignUp />} /> : null}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
