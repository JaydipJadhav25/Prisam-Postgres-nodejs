import e from "express";
import { prisma } from "../src/lib/db.js";
import { createHmac , randomBytes} from "node:crypto"
import jwt from "jsonwebtoken"

const sectkey = "superman@12112122"


function genretjwttoken(user){
    return jwt.sign({
        id : user.id,
        email : user.email,
        name : user.name
    
    }, sectkey);
}


function finduserbyemail(email){
    return prisma.user.findUnique({
        where :{
            email
        }
    })
}

function genreatehashpassword(password , salt){
    const hashedpassword = createHmac('sha256' , salt)
                        .update(password)
                        .digest("hex") ;
                    return hashedpassword;   
}


const createuser = async(req, res) =>{

const{ name , email , password} =req.body;
// console.log(name , email , password )
   if(!email) throw new Error("email is reqired..");

const salt = randomBytes(16).toString("hex");


const hashpassword = genreatehashpassword(password , salt);
  

 const user  = await prisma.user.create({
  data:{
    name,
    email,
    salt,
    password : hashpassword
 }
 })
 if(!user) throw new Error("somthing went wrong");

return res
.status(200)
.json({
    massage :" done ",
    user

})

}

const loginuser = async(req, res) =>{
    const { email , password} =req.body;

   if(!email) throw new Error("email is reqired..");

   const user = await finduserbyemail(email);

   if(!user) throw new Error("Email is not valiad , user not found");

   //to check password
   const usersalt = user.salt;
   const hashpassword = genreatehashpassword(password ,usersalt );

   if(hashpassword !== user.password) throw new Error("password is wrong ,  try agian..");

   //genrat token

   const token = genretjwttoken(user);
     
   return res
   .cookie("token" , token)
   .json({
    email : user.email,
    user,
       massage : "user login suceessfully.....",
       token,
       
    
   })



    

}

const logout = async (req, res) =>{
    console.log(req.user.id);

    return res
    .clearCookie("token")
    .json({
        massage : `${req.user.email } is user logout successfully.......`
    })
}

const updateinfo = async(req, res) =>{
      const userid  =  req.params.id
      const {name } = req.body;

      console.log("user id" , userid);

      await prisma.user.update({
        where:{
            id : Number(userid)
        },
        data :{
            name :name
        }

      })

      const user = await prisma.user.findUnique({
        where:{
            id : Number(userid)
        }
      })
      return res.json({
        email : user.email,
        newname : user.name,
        massage:  "update user info successfuly..."
      })
}

export {
    createuser,
    loginuser,
    logout,
    updateinfo
}