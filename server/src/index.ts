import express, {Application} from 'express';
// const express = require('express');
import morgan from 'morgan';
// const morgan = requiere('morgan');
import cors from 'cors';

// application routes
import companiesRoutes from './routes/companiesRoutes';
import certificationRoutes from './routes/certificationRoutes';
import listRoutes from './routes/listRoutes';

class Server {

    public app: Application;

    constructor(){
        // const app = express();
        this.app = express()
        this.configApplication();
        this.routesApplication();
    }

    configApplication(): void{
        // set the port
        this.app.set("port", process.env.PORT || 3000);
        // morgan
        this.app.use(morgan('dev'));
        this.app.use(cors());
        // json format
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    }

    routesApplication(): void{
        this.app.use('/companies', companiesRoutes);
        this.app.use('/certification', certificationRoutes);
        this.app.use('/list', listRoutes);
    }

    startApplication(): void{
        // port and callback function
        this.app.listen(this.app.get('port'), ()=>{
            console.log("Server on port", this.app.get('port'));
        });
    }
}


const newServer = new Server();
newServer.startApplication();