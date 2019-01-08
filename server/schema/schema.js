const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
} = graphql;

// dummy data:
const books = [
  { name: 'Gone with the wind', genre: 'Fiction', id: '1', authorid: '1' },
  { name: 'Computer Programming 101', genre: 'Academic', id: '2', authorid: '2' },
  { name: 'Me Before You', genre: 'Romance', id: '3', authorid: '3' },
  { name: 'Algorithm and Data Structures', genre: 'Academic', id: '4', authorid: '2' },
  { name: 'After You', genre: 'Romance', id: '5', authorid: '3' },
  { name: 'Paris For One', genre: 'Romance', id: '6', authorid: '3' },
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
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return _.find(authors, { id: parent.authorid });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorid: parent.id });
        // use .filter instead of .find b/c result is an array of multiple items
      },
    },
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
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db/other source
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
