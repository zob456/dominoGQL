"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
// deps fro types
const schema_1 = require("./schema");
const PORT = 5000;
const server = new apollo_server_1.ApolloServer({ typeDefs: schema_1.typeDefs, resolvers: schema_1.resolvers, introspection: true });
server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
//# sourceMappingURL=index.js.map