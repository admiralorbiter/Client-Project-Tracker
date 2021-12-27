const fs = require('fs');
require('dotenv').config();
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { Kind } = require('graphql/language');
const { GraphQLScalarType } = require('graphql');
const {MongoClient} = require('mongodb');

const url =  process.env.DB_URL ||'mongodb://localhost/projectTracker';
const port = process.env.API_SERVER_PORT || 3000;

let db;

let aboutMessage = "Issue Tracker API v1.0";

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const dateValue = new Date(value);
    return Number.isNaN(dateValue.getTime()) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if(ast.kind == Kind.STRING){
      const value = new Date(ast.value);
      return Number.isNaN(value.getTime()) ? undefined : value;
    }
    return undefined;
  },
});

function validateProject(_, {project}){
  const errors = [];
  if(project.title.length < 3){
    errors.push("Title must be at least 3 characters long.");
  }
  if(errors.length > 0){
    throw new UserInputError("Invalid input", {errors});
  }
  console.log("Valid Project");
}

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  return result.value.current;
}

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

async function projectAdd(_, { project }) {
  // validateProject(project);
  const newProject = Object.assign({}, project);
  newProject.created = new Date();
  newProject.id = await getNextSequence('projects');
  const result = await db.collection('projects').insertOne(newProject);
  const savedProject = await db.collection('projects').findOne({ _id: result.insertedId });
  return savedProject;
 }

function setAboutMessage(_, { message }) {
  aboutMessage = message;
  return aboutMessage;
}

async function projectList(){
  const projects = await db.collection('projects').find({}).toArray();
  console.log(projects);
  return projects;
}

async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
 }

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

const app = express();

// app.use(express.static('public'));
const enableCors = (process.env.ENABLE_CORS || 'true') == 'true';
console.log('CORS setting:', enableCors);
server.applyMiddleware({ app, path: '/graphql', cors: enableCors });

(async function start(){
  try{
    await connectToDb();
    app.listen(port,  ()=> {
      console.log(`Api Server started on port ${port}`);
    });
  }catch(err){
    console.log('Error: ', err);  
  }
}());