const express = require("express");
const router = require("./routes/index")
const cors = require("cors")
const bodyparser = require("body-parser");
const dotenv = require("dotenv")
const app = express();

dotenv.config();


app.use(cors());

app.use(bodyparser.json());

app.use("/api/v1", router)

app.get("/", (req , res) => {
   res.send("hello")
})

app.listen(3000, () => {
    console.log("Port running")
})


