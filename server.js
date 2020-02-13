const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { dbConnect } = require("./db/connection");
const blogRouter = require("./routes/blog");

dbConnect();
dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(
      cors({
        origin: process.env.CLIENT_URL,
        credentials: true
      })
    );
}

app.use("/blog", blogRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running on ${port}`));