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
      const errorMessages = [
        { message: "Access denied", alert: "Access denied" },
        { message: "Unauthorized", alert: "Unauthorized" },
        {
          message: "Context creation failed: jwt expired",
          alert: "JWT expired",
        },
      ];

      const error = graphQLErrors?.find((error) =>
        errorMessages.some((errMsg) => errMsg.message === error.message)
      );

      if (error) {
        const matchedError = errorMessages.find(
          (errMsg) => errMsg.message === error.message
        );
        if (matchedError) {
          alert(matchedError.alert); 
          window.location.href = `/login`;
        }
      }
    });

    const authLink = setContext((_, { headers }) => {
      const token = ["/login", "/sign-up"].includes(window.location.pathname)
        ? null
        : localStorage.getItem("access_token");

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
