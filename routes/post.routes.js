import { Router } from "express";
import { createpost, deletepost, fetchpost } from "../controllers/post.controller.js";

const router = Router();

router.get("/" , (req, res) =>{
    return res.send(`
        <h1 style="background-color : red">POST ROUTES</h1>
        `)
})

router.route("/createpost").post(createpost)
router.route("/delete/:id").delete(deletepost)
router.route("/allposts").get(fetchpost)








export default router;