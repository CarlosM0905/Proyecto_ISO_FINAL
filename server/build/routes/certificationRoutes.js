"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const certificationController_1 = require("./../controllers/certificationController");
class CertificationRoutes {
    constructor() {
        this.router = express_1.Router();
        this.configRoute();
    }
    configRoute() {
        this.router.get('/', certificationController_1.certificationController.list);
        this.router.get('/:parameter', certificationController_1.certificationController.listByParameter);
        this.router.get('/list/:id', certificationController_1.certificationController.listById);
        this.router.post('/', certificationController_1.certificationController.updateCertificationsOfCompany);
        this.router.delete('/:cer_id/:com_id', certificationController_1.certificationController.deleteCertification);
    }
}
const certificationRoutes = new CertificationRoutes();
exports.default = certificationRoutes.router;
