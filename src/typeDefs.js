//@ts-check
const path = require('path');
const fs = require('fs');

const schemaFile = path.join(process.cwd(), 'src', 'schema.graphql');
const typeDefs = fs.readFileSync(schemaFile, 'utf8');

module.exports = typeDefs;
