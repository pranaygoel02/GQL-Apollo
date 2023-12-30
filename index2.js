const express = require("express");
const app = express();

const dotenv = require("dotenv");
const cors = require("cors");
const connectToDb = require("./mongoose/connectToDb");
const { ApolloServer } = require("apollo-server-express");

//routes
const Routes = require("./routes/authRoutes");

dotenv.config();
app.use(cors());
app.use(express.json());

const { authTypeDefs: typeDefs } = require("./graphql/typeDefs");
const { authResolvers: resolvers } = require("./graphql/resolvers");
const { validateAccessToken } = require("./middleware/accessToken");

const apolloServer = new ApolloServer({
  cors: {
    origin: "http://localhost:8081",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  },
  context: ({ req }) => {
    const ctx = {};
    try {
      const reqHeader = req.headers["authorization"]?.split(" ");
      const token = reqHeader[1] || "";
      const type = reqHeader[2] || "";
      if (!token) return ctx;
      const user = validateAccessToken({ accessToken: token, type });
      ctx.user = { ...user, token, type };
      return ctx;
    } catch (err) {}
  },
  typeDefs,
  resolvers,
});

const PORT = process.env.PORT || 8081;

(async () => {
  try {
    await connectToDb();
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: "/api/auth" });
    app.use(Routes);
    app.listen(PORT, () => {
      console.log(`Server listening on PORT ${PORT}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
