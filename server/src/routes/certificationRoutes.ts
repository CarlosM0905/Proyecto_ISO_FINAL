import {Router} from 'express';
import {certificationController} from './../controllers/certificationController';

class CertificationRoutes {
    public router: Router  = Router();

    constructor(){
        this.configRoute();
    }

    configRoute():void{
        this.router.get('/', certificationController.index);
    }
}

const certificationRoutes = new CertificationRoutes();
export default certificationRoutes.router;