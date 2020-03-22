import {Router} from 'express';
//const router = express.Router();
import {listController} from './../controllers/listController';

class ListRoutes {
    public router: Router  = Router();

    constructor(){
        this.configRoute();
    }

    configRoute():void{
        // Listar segun parametro
        this.router.get('/:parameter', listController.listByParameter)
    }
}

const listRoutes = new ListRoutes();
export default listRoutes.router;