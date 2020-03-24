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
    }
}
const certificationRoutes = new CertificationRoutes();
exports.default = certificationRoutes.router;
