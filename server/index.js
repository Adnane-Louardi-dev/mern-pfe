require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const connectToMongo = require("./db");
const morgan = require("morgan");
const ministere = require("./routes/espaceMinistere");
const agent = require("./routes/espaceAgent");
const entreprise = require("./routes/espaceEntreprise");
const public = require("./routes/espacePublic");
//connect to cluster
connectToMongo();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/espaceMinistere", ministere);
app.use("/espacePublic", public);
app.use("/espaceEntreprise", entreprise);
app.use("/espaceAgent", agent);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(process.env.PORT, () => {
  console.log("Server listening on port 3000");
});
