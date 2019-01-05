const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
} = graphql;

// dummy data:
const books = [
  { name: 'Gone with the wind', genre: 'Fiction', id: '1' },
  { name: 'Computer Programming 101', genre: 'Academic', id: '2' },
  { name: 'Me Before You', genre: 'Romance', id: '3' },
];

// dummy data:
const authors = [
  { name: 'Someone really old and wise', age: 100, id: '1' },
  { name: 'A computer genious', age: 25, id: '2' },
  { name: 'Jojo Moyes', age: 39, id: '3' },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db/other source
        return _.find(books, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
