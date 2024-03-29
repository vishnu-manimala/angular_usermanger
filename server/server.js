const express = require("express");
const app = express();
const connect  = require('./db');
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//db connection
connect();

//routes
app.post("/",require('./roueter/router'));

app.listen(3000, () => {
  console.log(`server running at http://localhost:3000`);
});
