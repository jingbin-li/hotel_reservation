import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const graphqlUri = import.meta.env.graphqlUri || "http://localhost:3000/graphql";
export class GqlClient {
  private static client: ApolloClient<NormalizedCacheObject>;

  static getApolloClient() {
    if (this.client) {
      return this.client;
    }

    const httpLink = createHttpLink({
      uri: graphqlUri
    });

    const errorLink = onError(({ graphQLErrors }) => {
      console.log(graphQLErrors);
      const deniedError = graphQLErrors?.find(
        (x) => x.message === "Access denied"
      );
      if (deniedError) {
        alert("Access denied");
      }

      const unauthorized = graphQLErrors?.find(
        (x) => x.message === "Unauthorized"
      );

      if (unauthorized) {
        alert("Unauthorized");
      }
    });

    const authLink = setContext((_, { headers }) => {
      const token = localStorage.getItem("access_token");
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });

    GqlClient.client = new ApolloClient({
      link: ApolloLink.from([authLink, errorLink, httpLink]),
      cache: new InMemoryCache(),
      connectToDevTools: true,
    });

    return this.client;
  }
}
