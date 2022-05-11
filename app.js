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
  origin: "https://bosskad.herokuapp.com"
  //   origin: "http://localhost:8080"
};
app.use(cors(corsOptions));
const user = require('./routers/user.router')
const card = require('./routers/card.router')
const country = require('./routers/country.router')
const chat = require('./routers/chat.router')
const board = require('./routers/board.router')
const business = require('./routers/busList.router')
const notification = require('./routers/notification.router')
const wallet = require('./routers/wallet.router')

app.get('/', (req, res)=>{
  res.send("WELCOME TO BOSSKAD BACKOFFICE")
})
app.use('/api/', country)
app.use('/user', user)
app.use('/card', card)
app.use('/chat', chat)
app.use('/board', board)
app.use('/business', business)
app.use('/notification', notification)
app.use('/wallet', wallet)
const port = process.env.PORT || 5500;
app.listen(port, () =>
  console.log(`The server is running at http://localhost:${port}`)
);
