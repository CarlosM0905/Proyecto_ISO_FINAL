import {Router} from 'express';
//const router = express.Router();
import {companiesController} from './../controllers/companiesController';

class CompaniesRoutes {
    public router: Router  = Router();

    constructor(){
        this.configRoute();
    }

    configRoute():void{
        // Solicitar las empresas
        this.router.get('/', companiesController.list);
        // Solicitar una empresa por su id
        this.router.get('/:id', companiesController.listOne);
        // Solicitar empresas segun su categoria
        this.router.get('/category/:category', companiesController.listByCategory);
        // Solicitar empresas segun su provincia
        this.router.get('/province/:province', companiesController.listByProvince);
        // Solicitar empresas por categoria y provincia
        this.router.get('/category/province/:category/:province', companiesController.listByCategoryAndProvince);
        //Solicitar empresas por su nombre
        this.router.get('/name/:name',companiesController.listByName);
        // Solicitar empresas por su direccion
        this.router.get('/address/:address', companiesController.listByAddress);
        // Agregar una empresa
        this.router.post('/', companiesController.create);
        // Eliminar una empresa
        this.router.delete('/:id', companiesController.delete);
        // Actualizar una empresa
        this.router.put('/:id', companiesController.update);
    }
}

const companiesRoutes = new CompaniesRoutes();
export default companiesRoutes.router;