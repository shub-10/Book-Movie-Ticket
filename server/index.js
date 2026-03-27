const express = require('express');
const Movies = require('./Routes/movie.routes')
const seed = require('./Routes/seed.routes');
const getCities = require('./Routes/city.routes');
const Shows = require('./Routes/shows.routes');
const Auth = require('./Routes/auth.routes');
const BookingDetails = require('./Routes/Booking.routes');
const paymentRoute = require('./Routes/payment.routes');
const dbConnection = require('./utils/db');
const lastSeeded = require('./Routes/seedDates.routes');
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
app.use('/api/v2/auth', Auth)
app.use('/api/v2/seed', seed);
app.use('/api/v2/lastseeded', lastSeeded);
app.use('/api/v2/show', Shows)
app.use('/api/v2/payment', paymentRoute);
app.use('/api/v2/booking', BookingDetails);


app.listen(Port, ()=> {console.log(`server started... at ${Port}`)});
dbConnection()

module.exports = app;