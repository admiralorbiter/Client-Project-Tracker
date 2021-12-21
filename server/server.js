const fs = require('fs');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { Kind } = require('graphql/language');
const { GraphQLScalarType } = require('graphql');

let aboutMessage = "Issue Tracker API v1.0";

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    return (ast.kind == Kind.STRING) ? new Date(ast.value) : undefined;
  },
});

const projectDB = [
  {
      id: 1, status: 'new', owner: 'Jon', effort: 5, due: new Date('2018-08-08'),
      title: 'Refactoring Code for Modularization',
  },
  {
      id: 2, status: 'assigned', owner: 'Jon', effort: 18, due: new Date('2018-08-08'),
      title: 'Standards and Style Guide',
  },
];

const resolvers = {
  Query: {
    about: () => aboutMessage,
    projectList,
  },
  Mutation: {
    setAboutMessage,
    projectAdd,
  },
};

function projectAdd(_, { project }) {
  project.id = projectDB.length + 1;
  if (project.status == undefined) project.status = 'New';
  projectDB.push(project);
  return project;
 }

function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}

function projectList(){
  return projectDB;
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
});

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, function () {
  console.log('App started on port 3000');
});