import {Router} from 'express';
import {certificationController} from './../controllers/certificationController';

class CertificationRoutes {
    public router: Router  = Router();

    constructor(){
        this.configRoute();
    }

    configRoute():void{
        this.router.get('/', certificationController.list);
        this.router.get('/:parameter', certificationController.listByParameter)
    }
}

const certificationRoutes = new CertificationRoutes();
export default certificationRoutes.router;