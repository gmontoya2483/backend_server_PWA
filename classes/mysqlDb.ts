import mysql from "mysql";

export default class MySqlDb {
    private static _instance: MySqlDb
    private _host: string = 'localhost';
    private _user: string = 'root';
    private _password: string = '';
    private _database: string = 'test';
    private _port: number = 3306

    public get host(): string {
        return this._host
    }

    public get database(): string {
        return this._database
    }

    public get port(): number {
        return this._port
    }

    private constructor() {
    }

    // Patron singleton
    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    public connect( callback: any): void {

        const connectionMySql = mysql.createConnection({
            host: this._host,
            user: this._user,
            password: this._password,
            database: this._database,
            port: this._port
        });

        connectionMySql.connect(callback);
    }




}
