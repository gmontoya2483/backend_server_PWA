import Server from "./classes/server";
import userRoutes from "./routes/usuarios";
import MySqlDb from "./classes/mysqlDb";
import MongoDb from "./classes/mongoDb";


const server = Server.instance;
server.start(() => {
    console.log(`Servidor corriendo en puerto: ${ server.port } y en el host: ${ server.host }`)
});

// Rutas de la app
server.app.use('/users', userRoutes)

// Conexion mySQL
const mySqlDb: MySqlDb = MySqlDb.instance;
mySqlDb.connect(((err: any) => {
    if(err){
       throw err;
    } else {
         console.log(`Conectado a la Base de datos MySql: ${ mySqlDb.host }:${ mySqlDb.port }\\${ mySqlDb.database}`);
     }
}));


// Conexion mongoose
const mongoDb: MongoDb = MongoDb.instance;
mongoDb.connect(((err: any) => {
    if(err){
        throw err;
    } else {
        console.log(`Conectado a MongoDb`);
    }
}));

