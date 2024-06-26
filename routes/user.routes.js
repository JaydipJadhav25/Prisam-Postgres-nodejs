import { Router } from "express";
import { createuser, loginuser, logout, updateinfo } from "../controllers/user.controller.js";
import checkauthuser from "../middleware/auth.midd.js";

const router = Router();

router.get("/" , (req , res) =>{
    return res.send("<h1> USER routes</h1>")
})

router.route("/signup").post(createuser)
router.route("/login").post(loginuser)
router.route("/logout").get(checkauthuser, logout)
router.route("/:id").patch(checkauthuser, updateinfo)




export default router