import Server from "./classes/server";
import userRoutes from "./routes/usuarios";
import MySqlDb from "./classes/mysqlDb";

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
       console.error(err);
    } else {
         console.log(`Conectado a la Base de datos MySql: ${ mySqlDb.host }:${ mySqlDb.port }\\${ mySqlDb.database}`);
     }
}));

