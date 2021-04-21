import {Request, Response, Router} from "express";
import {Usuario} from "../models/ususarios.model";
import bcrypt from "bcrypt"
import Token from "../classes/token";


const userRoutes = Router();

// userRoutes.get('/prueba', (req: Request, resp: Response ) => {
//     resp.status(200).json({
//         estado: 'sucess',
//         mensaje: 'ok'
//     });
// });

userRoutes.post('/create',  async (req: Request, res: Response) => {
        const user = {
            nombre: req.body.nombre,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        };

    try {
        const resultado = await Usuario.create( user );
            res.json({
               estado: "success",
               mensaje: resultado
            });

    } catch (err) {
            res.json({
                estado: 'error',
                mensaje: err
            });
    }


    //
    // Usuario.create( user )
    //     .then(result => {
    //     res.json({
    //        estado: "sucess",
    //        mensaje: result
    //     })
    // })
    //     .catch( err => {
    //         res.json({
    //             estado: 'error',
    //             mensaje: err
    //         })
    //     });

});

userRoutes.post('/login',   (req: Request, res: Response) => {
    const { email , password } = req.body;
    Usuario.findOne({ email }, null, null, (error, result) =>
    {
        if (error){
            throw error
        }

        if(!result) {
            return res.json({
                estado: "error",
                mensaje: "Usuario o password incorrectos"
            });
        }

        if (!result.compararPassword(password)){
            return res.json({
                estado: "error",
                mensaje: "Usuario o password incorrectos"
            });
        }

        const userToken = Token.getJwtToken({
            _id: result._id,
            nombre: result.nombre,
            avatar: result.avatar

        })

        return res.json({
            estado: "success",
            token: userToken,
            mensaje: "Usuario encontrado",
            data: result

        });
    });


});


export default userRoutes;
