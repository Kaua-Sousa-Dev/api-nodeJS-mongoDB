import express from "express";
import router from "./controller/authController";
import adminController from "./controller/adminController"
import authenticate from "./middlewares/authenticate";

const authController = router
const app = express();

app.use(express.json())

app.use('/auth', authController)
app.use('/admin', authenticate , adminController)

app.listen(3001, () =>{
    console.log("Running porra")
})