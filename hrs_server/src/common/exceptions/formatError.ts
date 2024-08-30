import { GraphQLFormattedError } from 'graphql';

export const formatError = (formattedError: GraphQLFormattedError) => {
  console.log(formattedError);
  const code = formattedError.extensions?.code;
  const message =
    code === 'INTERNAL_SERVER_ERROR'
      ? 'Internal server error'
      : formattedError.message;
  return {
    name: formattedError.extensions?.name,
    path: formattedError.path,
    message,
    code,
  };
};
