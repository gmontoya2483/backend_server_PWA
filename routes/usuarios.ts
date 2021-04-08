import {Request, Response, Router} from "express";


const userRoutes = Router();

userRoutes.get('/prueba', (req: Request, resp: Response ) => {
    resp.status(200).json({
        estado: 'sucess',
        mensaje: 'ok'
    });
});

export default userRoutes;
