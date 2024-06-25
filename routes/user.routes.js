import { Router } from "express";
import { createuser } from "../controllers/user.controller.js";

const router = Router();

router.get("/" , (req , res) =>{
    return res.send("<h1> USER routes</h1>")
})

router.route("/signup").post(createuser)



export default router