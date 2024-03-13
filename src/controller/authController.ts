import express from "express";
import { User } from "../model/user";
import bycrptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import authConfig from "../config/auth.json"

const UserModel = User;
const router = express.Router();

router.post("/register", async (req, res) => {
  const { email } = req.body;

  if(await UserModel.findOne({email})){
    return res.status(400).json({
        error: true,
        message: "Email já existente! Insira um novo email vá lá pae"
    })
  }

  const UserCreat = await UserModel.create(req.body);

  UserCreat.password = typeof undefined

  const token = jwt.sign({
    id: UserCreat.id,
    name: UserCreat.name
  }, authConfig.secret , {
    expiresIn: 86400
  })

  return res.json({
    UserCreat,
    token
  })
});

router.post('/authenticate', async(req,res) =>{
  
  const { email,password } = req.body

  const user = await UserModel.findOne({email}).select("+password")

  console.log(user)

  if(!user){
    return res.status(400).json({
      error: true,
      message: "Usuario não encontrado"
    })
  }
  if(!await bycrptjs.compare(password, user.password)){
    return res.status(400).send({
      error: true,
      message: "Senha inválida"
    })
  }
  user.password = typeof undefined

  const token = jwt.sign({
    id: user.id,
    name: user.name
  }, authConfig.secret , {
    expiresIn: 86400
  })

  return res.json({
    user,
    token
  })
})

export = router;
