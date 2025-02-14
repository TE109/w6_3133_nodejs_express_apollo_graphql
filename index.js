const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//import ApolloServer
const {ApolloServer} = require('apollo-server-express')
const schema = require('./schema')
const resolver = require('./resolvers')


//Store sensitive information to env variables
const dotenv = require('dotenv');
dotenv.config();

//mongoDB Atlas Connection String
const mongodb_atlas_url = "mongodb+srv://admin:pass@comp3123cluster.arhm6.mongodb.net/wk6?retryWrites=true&w=majority";

//TODO - Replace you Connection String here
const connectDB = async() => {
    try{
      mongoose.connect(mongodb_atlas_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(success => {
        console.log('Success Mongodb connection')
      }).catch(err => {
        console.log('Error Mongodb connection')
      });
    } catch(error) {
        console.log(`Unable to connect to DB : ${error.message}`);
      }
  }

//Define Apollo Server
const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolver
}

)


//Define Express Server
const app = express();
app.use(express.json());
app.use('*', cors());

//Add Express app as middleware to Apollo Server
async function startApollo() {
  await server.start()
server.applyMiddleware({ app });
}

//Start listen 
app.listen({ port: process.env.PORT }, () => {  
  startApollo()
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
  connectDB()
});

