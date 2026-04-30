import { Response, NextFunction } from "express"
import { AuthRequest } from './auth.middlewares.js'

export function AdminMiddleware(req:AuthRequest, res:Response, next:NextFunction){
    console.log('ADMIN111');
        console.log(req.tipo);
        
    if(req.tipo !=="admin"){
        res.status(304).json({error:"vc não é o adm"})
    }
}
