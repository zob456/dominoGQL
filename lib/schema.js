"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
const admin = require("firebase-admin");
const serviceAccount = require('../service-account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DB_URL
});
exports.typeDefs = apollo_server_1.gql `
type User {
  id: ID!
  firstName: String!
  lastName: String!
  appointments: [Appointment]
  Medications: [Medication]
}

type Location {
  _latitude: Float
  _longitude: Float
}

type Appointment {
  dateTime: String
  doctor: String
  location: Location
}

type Medication {
  name: String!
  dosage: Int!
  usage: String!
}

type Query {
  user(id: String!): User
}

`;
exports.resolvers = {
    Query: {
        async user(_, args) {
            try {
                const userDoc = await admin
                    .firestore()
                    .doc(`users/${args.id}`)
                    .get();
                const user = userDoc.data();
                return user || new apollo_server_1.ValidationError('User ID not found');
            }
            catch (err) {
                throw new apollo_server_1.ApolloError(err);
            }
        }
    },
};
//# sourceMappingURL=schema.js.map