import { Express, Request, Response, NextFunction } from "express"
import Jwt from "jsonwebtoken"
import auth from "../config/auth.json"

export = (req: Request, res: Response, next:NextFunction) =>{
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({
            error: true,
            message: "Token não providenciado"
        })
    }

    const parts = authHeader.split(" ")
    if(parts.length != 2){
        return res.status(401).json({
            error: true,
            message: "Token inválido"
        })
    }
    const [scheme, token] = parts
    if(scheme.indexOf("Bearer") != 0){
        return res.status(401).json({
            error: true,
            message: "Token mal formatado"
        })
    }
    return Jwt.verify(token, auth.secret, (err, decoded) =>{
        if(err){
            return res.status(401).json({
                error: true,
                message: "Token Inválido/Expirado"
            })
        }
        req.body.userLogged = decoded

        console.log(err)
        console.log(decoded)

        return next()
    })
}