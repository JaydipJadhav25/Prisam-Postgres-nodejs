import { prisma } from "../src/lib/db.js";


const createuser = async(req, res) =>{
const{ name , email , password} =req.body;
// console.log(name , email , password )

 const user  = await prisma.user.create({
 data:{
    name,
    email,
    password
 }
 })

return res.json({
    massage :" done ",
    user

})
}



export {
    createuser
}