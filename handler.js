//@ts-check
const serverless = require('serverless-http');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const bodyParser = require('body-parser');
const path = require('path');

const typeDefs = require('./src/typeDefs');
const resolvers = require('./src/resolvers');
const app = express();

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(bodyParser.json()); // application/json

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: {
      headerEditorEnabled: true
    }
  })
);

app.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not Found'
  });
});


module.exports.handler = serverless(app);
