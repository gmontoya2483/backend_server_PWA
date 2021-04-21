import mongoose from "mongoose";

export default class MongoDb {
    private static _instance: MongoDb;
    private _connectionURL: string = 'mongodb://localhost:27017/appCursos';

    private constructor() {
    }

    // Patron singleton
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    public connect(callback: any) {
        mongoose.connect(
            this._connectionURL,
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            },
            callback);
    }
}
