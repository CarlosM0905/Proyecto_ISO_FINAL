"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//const router = express.Router();
const listController_1 = require("./../controllers/listController");
class ListRoutes {
    constructor() {
        this.router = express_1.Router();
        this.configRoute();
    }
    configRoute() {
        // Listar segun parametro
        this.router.get('/:parameter', listController_1.listController.listByParameter);
    }
}
const listRoutes = new ListRoutes();
exports.default = listRoutes.router;
