require("dotenv").config();
const express = require('express')
const app = express();
const cors = require("cors");
const connection = require('./db/connection')
// Body Parser Middleware
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use('/media', express.static('upload'));



var corsOptions = {
  //add production url cors when its commuinication in production
  origin: "http://localhost:8080"
  //   origin: "http://localhost:8080"
};
app.use(cors(corsOptions));
const user = require('./routers/user.router')
const card = require('./routers/card.router')
const country = require('./routers/country.router')
const business = require('./routers/busList.router')
const notification = require('./routers/notification.router')

app.get('/', (req, res)=>{
  res.send("WELCOME TO BIX CARD API")
})
app.use('/api/', country)
app.use('/user', user)
app.use('/card', card)
app.use('/business', business)
app.use('/notification', notification)
const port = process.env.PORT || 5500;
app.listen(port, () =>
  console.log(`The server is running at http://localhost:${port}`)
);
