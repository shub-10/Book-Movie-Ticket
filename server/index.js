const express = require('express');
const Movies = require('./Routes/movie')
const seed = require('./Routes/seed');
const testing = require('./Routes/testing');
const getCities = require('./Routes/city')
const dbConnection = require('./utils/db');
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

app.use('/api/v2/movies', Movies);
app.use('/api/v2/cities', getCities);
app.use('/api/v2/seed', seed);
app.use('/api/v2/test', testing)


app.listen(Port, ()=> {console.log(`server started... at ${Port}`)});
dbConnection()