import { Router } from "express";
import { createcomment, fetchcomment } from "../controllers/comments.controller.js";


const router = Router();


router.get("/" , (req, res) =>{
    return res.send(`
        <h1 style="background-color : red">COMMENTS ROUTES</h1>
        `)
})

router.route("/createcomment/:id").post(createcomment)
router.route("/allcomment").get(fetchcomment)



export default router