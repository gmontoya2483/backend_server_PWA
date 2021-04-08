import express from 'express';

export default class Server {
    private readonly _app: express.Application;
    private _port: number = 3000;
    private _host: string = 'localhost';
    private static _instance: Server

    get port(): number {
        return this._port
    }

    get host(): string {
        return this._host
    }

    get app(): express.Application {
        return this._app;
    }

    private constructor() {
        this._app = express();
    }

    // Patron singleton
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    start( callback: any ): void {
        this.app.listen(this._port, this._host, callback)
    }
}

