import { CssVarsProvider } from "@mui/joy/styles";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { GqlClient } from "./graphql/gql-client.ts";
import { Provider } from "react-redux";
import store from "./store/store.ts";
const client = GqlClient.getApolloClient();

createRoot(document.getElementById("root")!).render(
  <CssVarsProvider>
    <StrictMode>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>
    </StrictMode>
  </CssVarsProvider>
);
