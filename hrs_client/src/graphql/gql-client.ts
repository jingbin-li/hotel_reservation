import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export class GqlClient {
  private static client: ApolloClient<NormalizedCacheObject>;

  static getApolloClient() {
    if (this.client) {
      return this.client;
    }

    const httpLink = createHttpLink({
      uri: "http://localhost:3000/graphql",
    });

    const authLink = setContext((_, { headers }) => {
      const token = localStorage.getItem("token");
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });

    GqlClient.client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
      connectToDevTools: true,
    });

    return this.client;
  }
}
