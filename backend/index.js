import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import { ApolloServer } from "@apollo/server";

import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import mergedTypeDefs from "./typeDefs/index.js";
import mergedResolvers from "./resolvers/index.js";
import { connectDb } from "./db/connectDb.js";
import ConnectMongoDBSession from "connect-mongodb-session";
import passport from "passport";
import { buildContext } from "graphql-passport";
import { configurePassport } from "./passport/passport.config.js";
import session from "express-session";
import path from "path";

dotenv.config();
configurePassport();

const __dirname = path.resolve();
const app = express();
const httpServer = http.createServer(app);

const MongoDBStore = ConnectMongoDBSession(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
  expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 30), // 30 days
});

store.on("error", (err) =>
  console.error(`Error connecting to MongoDB session store: ${err}`)
);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store,
  cookie: {
    maxAge: 60 * 60 * 1000 * 24 * 7, // 7 days
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },
  name: "session",
  rolling: true,
  unset: "destroy", // Automatically delete session after it's expired.
}))

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();
const corsOptions = {
  origin: process.env.NODE_ENV === "production" ? process.env.SERVER_URL : "http://localhost:3000",
  credentials: true,
};
app.use(
  "/graphql",
  cors(
    corsOptions
  ),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
  })
);

app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
});

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectDb();

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
