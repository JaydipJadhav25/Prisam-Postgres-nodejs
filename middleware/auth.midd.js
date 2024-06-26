import jwt from "jsonwebtoken"

const sectkey = "superman@12112122"


const  checkauthuser = async(req , res , next) =>{
    const token = req.cookies.token;

    console.log("tokne");

    if(!token) return res.json({

        massage: " unAuthorized requset.."
    })

    const curruser = jwt.verify(token,sectkey );

    console.log("user : " , curruser);

    req.user = curruser;
    next();


}

export default checkauthuser;