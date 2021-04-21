import jwt from 'jsonwebtoken';

export default class Token {
    static seed: string = "este es el seed";
   static caducidad: string = "30d";


    public static getJwtToken(payload: any): string{
        return jwt.sign({
            usuario: payload
        }, this.seed, {expiresIn: this.caducidad});
    }

    public static comprobarToken( token: string ): Promise<any>{
        return new Promise((resolve, reject)=> {
            jwt.verify(token, this.seed, (error, decode)=> {
               if (error) {
                   return reject();
               } else {
                   return resolve(decode);
               }
            });
        });
    }

}

