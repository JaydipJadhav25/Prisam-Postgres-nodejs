import { config } from 'dotenv'
import 'dotenv/config'
config({
    path :"/.env"
})
import express from "express"
import cookieParser from 'cookie-parser'
import checkauthuser from './middleware/auth.midd.js'


//import user routes
import userroutes from "./routes/user.routes.js"

// /import post routes
import postroutes from "./routes/post.routes.js"

//import comments routes
import commentroutes from "./routes/comment.routes.js"





const app = express()

//conf
app.use(express.json());
app.use(cookieParser());


app.get('/', function (req, res) {
  res.send('Hello World')
})

//user routes
app.use("/user" , userroutes);

//post route
app.use("/user/post" ,checkauthuser,  postroutes)

//comment routes
app.use("/user/comment" , checkauthuser , commentroutes);



app.listen(process.env.PORT || 3000, () => console.log(`server running at port : ${process.env.PORT}`));
//confi set kelyavr access ala env cha