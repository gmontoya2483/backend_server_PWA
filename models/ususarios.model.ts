import {model, Schema} from 'mongoose';
import bcrypt from "bcrypt"

const usuarioSchema = new Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre es necesario']
        },
        avatar: {
            type: String,
            default: 'av-1.png'
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'El email es requerido']
        },
        password: {
            type: String,
            required: [true, 'El password es requerido']
        }
    }
);

usuarioSchema.method('compararPassword', function(password: string = ""): boolean {
    // @ts-ignore
    return bcrypt.compareSync(password, this.password);
});

interface Iusuario extends Document {
    _id: string;
    nombre: string;
    email: string;
    avatar: string;
    password: string;

    compararPassword(password:string): boolean;
}

// @ts-ignore
export const Usuario = model<Iusuario>('Usuario', usuarioSchema);
