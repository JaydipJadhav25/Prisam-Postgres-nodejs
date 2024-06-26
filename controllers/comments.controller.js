import { prisma } from "../src/lib/db.js";


const createcomment = async(req, res) =>{

    const Postid = req.params.id;
    console.log(Postid)
    const{ content} = req.body;
    console.log("content : " , content)

    const comment = await prisma.comments.create({
      data:{
        postid : Number(Postid),
        userid : Number(req.user.id),
        content : content
      }
      
    })


    if(!comment) throw new Error("somthing went wrong..")

    // increment a count in post
    
    await prisma.post.update({
        where :{
           id : Number(Postid)
        },
        data :{
            commentscount :{
                increment :1
            }
        }
    })

    return res.json({
        comment,
        massage : "create comment successfully..."
    })  

}

const fetchcomment =async (req , res) =>{

    const totalcomments = await prisma.comments.findMany({
        include :{
            // user : true, all sathi

            // user : {
            //     select:{
            //         email:true,
            //         name :true,
            //         id :true
            //     }
            // }


            //fist find blog

            // post :{
            //     userid :true,
            //     content : true,

            //     include :{
            //         user:{
            //             id : true,
            //             email : true
                    
            //         }
            //     }
            // }

            post  :{
                select :{
                    id :true,
                    userid : true,
                    user :{
                        select:{
                            id :true,
                            email :true
                        }
                    }
                }
            }
            
        }
    })

    return res.json({
        total : totalcomments.length,
        totalcomments
    })
} 


export{
    createcomment,
    fetchcomment
}