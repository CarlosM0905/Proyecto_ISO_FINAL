"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//const router = express.Router();
const companiesController_1 = require("./../controllers/companiesController");
class CompaniesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.configRoute();
    }
    configRoute() {
        // Solicitar las empresas
        this.router.get('/', companiesController_1.companiesController.list);
        // Solicitar una empresa por su id
        this.router.get('/:id', companiesController_1.companiesController.listOne);
        // Solicitar empresas segun su categoria
        this.router.get('/category/:category', companiesController_1.companiesController.listByCategory);
        // Solicitar empresas segun su provincia
        this.router.get('/province/:province', companiesController_1.companiesController.listByProvince);
        // Solicitar empresas por categoria y provincia
        this.router.get('/category/province/:category/:province', companiesController_1.companiesController.listByCategoryAndProvince);
        //Solicitar empresas por su nombre
        this.router.get('/name/:name', companiesController_1.companiesController.listByName);
        // Solicitar empresas por su direccion
        this.router.get('/address/:address', companiesController_1.companiesController.listByAddress);
        // Agregar una empresa
        this.router.post('/', companiesController_1.companiesController.create);
        // Eliminar una empresa
        this.router.delete('/:id', companiesController_1.companiesController.delete);
        // Actualizar una empresa
        this.router.put('/:id', companiesController_1.companiesController.update);
    }
}
const companiesRoutes = new CompaniesRoutes();
exports.default = companiesRoutes.router;
