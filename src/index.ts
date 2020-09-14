import { ApolloServer } from 'apollo-server'

// deps fro types
import { typeDefs, resolvers } from './schema'

const PORT = 5000

const server = new ApolloServer({ typeDefs, resolvers, introspection: true });

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});