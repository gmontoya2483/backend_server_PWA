import Token from '../classes/token'
import {NextFunction, Request, Response} from "express";

export const verificacionToken = ( req: Request, res: Response, next: NextFunction) => {
    const userToken = req.header('x-token') || '';

    Token.comprobarToken(userToken).then(
        decoded => {
            // @ts-ignore
            req.usuario = decoded._id;
            next();
        }
    )
        .catch(
            error=> {
                return res.json({
                    estado: "error",
                    mensaje: "Token incorrecto"
                })

        })

}
