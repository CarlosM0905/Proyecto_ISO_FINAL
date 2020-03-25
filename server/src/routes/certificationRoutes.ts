import {Router} from 'express';
import {certificationController} from './../controllers/certificationController';

class CertificationRoutes {
    public router: Router  = Router();

    constructor(){
        this.configRoute();
    }

    configRoute():void{
        this.router.get('/', certificationController.list);
        this.router.get('/:parameter', certificationController.listByParameter);
        this.router.get('/list/:id', certificationController.listById);
        this.router.post('/', certificationController.updateCertificationsOfCompany);
        this.router.delete('/:cer_id/:com_id', certificationController.deleteCertification);
    }
}

const certificationRoutes = new CertificationRoutes();
export default certificationRoutes.router;