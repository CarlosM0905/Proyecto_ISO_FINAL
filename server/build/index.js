"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const express = require('express');
const morgan_1 = __importDefault(require("morgan"));
// const morgan = requiere('morgan');
const cors_1 = __importDefault(require("cors"));
// application routes
const companiesRoutes_1 = __importDefault(require("./routes/companiesRoutes"));
const certificationRoutes_1 = __importDefault(require("./routes/certificationRoutes"));
const listRoutes_1 = __importDefault(require("./routes/listRoutes"));
class Server {
    constructor() {
        // const app = express();
        this.app = express_1.default();
        this.configApplication();
        this.routesApplication();
    }
    configApplication() {
        // set the port
        this.app.set("port", process.env.PORT || 3000);
        // morgan
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        // json format
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routesApplication() {
        this.app.use('/companies', companiesRoutes_1.default);
        this.app.use('/certification', certificationRoutes_1.default);
        this.app.use('/list', listRoutes_1.default);
    }
    startApplication() {
        // port and callback function
        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port", this.app.get('port'));
        });
    }
}
const newServer = new Server();
newServer.startApplication();
