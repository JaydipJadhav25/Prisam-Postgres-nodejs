import { prisma } from "../src/lib/db.js";



const createpost = async(req, res) =>{

    const{title, content} = req.body;
    
    const userpost = await prisma.post.create({
        data : {
            title,
            content,
            userid : Number(req.user.id)
        }

    })

    if(!userpost) throw new Error("post is not created ....")

    return res.json({
        massage : "post create successfully.......",
        userpost

    })
}

const deletepost = async(req, res) =>{
    const postid = req.params.id

    await prisma.post.delete({
        where: {
            id : Number(postid)
        }
    })

    return res.json({
        massage : "delete post successfully..."
    })
}

const fetchpost =async (req , res) =>{

    const posts = await prisma.post.findMany({
        include :{
            // user : true, all sathi

            user : {
                select:{
                    email:true,
                    name :true,
                    id :true
                }
            }
            
        }
    })

    return res.json({
        total : posts.length,
        posts
    })
} 




export{
    createpost,
    deletepost,
    fetchpost
}