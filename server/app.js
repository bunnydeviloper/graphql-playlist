const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const schema = require('./schema/schema');

const app = express();

// allow cross-origin requests
app.use(cors());

mongoose.connect('mongodb://sophie:test123@ds149414.mlab.com:49414/bookshelf-graphql', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Mlab database');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('Server is running on port 4000...');
});
