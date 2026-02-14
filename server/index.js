const express = require('express');
const Movies = require('./Movie.route')
const cors = require("cors");

const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

const Port = process.env.PORT;
app.get('/health', (req, res)=>{
  res.send("success....")
})

app.use('/api/v2', Movies);


app.listen(Port, ()=> {console.log(`server started... at ${Port}`)})