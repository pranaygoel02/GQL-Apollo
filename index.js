const express = require("express");
const app = express();

const dotenv = require("dotenv");
const cors = require("cors");
const connectToDb = require("./mongoose/connectToDb");
const { ApolloServer } = require("apollo-server-express");

//routes
const Routes = require("./routes/index");

dotenv.config();
app.use(cors());
app.use(express.json());

const { typeDefs } = require("./graphql/typeDefs");
const { resolvers } = require("./graphql/resolvers");
const { validateAccessToken } = require("./middleware/accessToken");

const apolloServer = new ApolloServer({
  cors: {
    origin: "http://localhost:8080",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  },
  context: ({ req }) => {
    const ctx = {};
    try {
      const token = req.headers["authorization"]?.split(" ")[1] || "";
      if (!token) return ctx;
      const user = validateAccessToken({ accessToken: token });
      ctx.user = user;
      return ctx;
    } catch (err) {}
  },
  typeDefs,
  resolvers,
});

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await connectToDb();
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: "/api" });
    app.use(Routes);
    app.listen(PORT, () => {
      console.log(`Server listening on PORT ${PORT}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
