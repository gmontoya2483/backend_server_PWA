import Server from "./classes/server";
import userRoutes from "./routes/usuarios";
import MySqlDb from "./classes/mysqlDb";
import MongoDb from "./classes/mongoDb";
import bodyParser from "body-parser";


const server = Server.instance;
server.start(() => {
    console.log(`Servidor corriendo en puerto: ${ server.port } y en el host: ${ server.host }`)
});

// Body parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());


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


// Conexion Mongo
const mongoDb: MongoDb = MongoDb.instance;
mongoDb.connect(((err: any) => {
    if(err){
        throw err;
    } else {
        console.log(`Conectado a MongoDb`);
    }
}));

