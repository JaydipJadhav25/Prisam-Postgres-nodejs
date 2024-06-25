import { config } from 'dotenv'
import 'dotenv/config'
config({
    path :"/.env"
})
import express from "express"


//import user routes
import userroutes from "./routes/user.routes.js"





const app = express()

//conf
app.use(express.json());


app.get('/', function (req, res) {
  res.send('Hello World')
})

//user routes
app.use("/user" , userroutes);


app.listen(process.env.PORT || 3000, () => console.log(`server running at port : ${process.env.PORT}`));
//confi set kelyavr access ala env cha