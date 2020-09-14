import { gql, ApolloError, ValidationError } from 'apollo-server'
import * as admin from 'firebase-admin';
const serviceAccount = require('../service-account.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DB_URL
});

interface Appointment {
  date: string
  doctor: string
  location: object
}

interface Medication {
  name: string
  dosage: number
  usage: string
}

interface User {
  firstName: string
  lastName: string
  appointments: Appointment[]
  medications: Medication[]
}

export const typeDefs = gql`
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

export const resolvers = {
  Query: {
    async user(_: null, args: { id: string }) {
      try {
        const userDoc = await admin
          .firestore()
          .doc(`users/${args.id}`)
          .get()
        const user = userDoc.data() as User | undefined;
        return user || new ValidationError('User ID not found');
      } catch (err) {
        throw new ApolloError(err)
      }
    }
  },
};
