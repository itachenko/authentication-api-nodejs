const express = require("express");
const mongo = require("mongoose");
const authRoute = require("./routes/auth");
const privateRoute = require("./routes/private");
const envVariables = require("./middleware/envVariables");

const app = express();
app.use(express.json());

app.use("/", privateRoute);
app.use("/api/user", authRoute);

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
envVariables.check([
  "PORT",
  "MONGODB_CONNECTIONSTRING",
  "JWT_SECRET",
  "JWT_TTL",
]);

mongo
  .connect(process.env.MONGODB_CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection with the database has been established"))
  .catch((error) =>
    console.log(`Could not establish connection.\nReason: ${error.message}`)
  );

app.listen(process.env.PORT, () =>
  console.log(`App is running on PORT ${process.env.PORT}`)
);
