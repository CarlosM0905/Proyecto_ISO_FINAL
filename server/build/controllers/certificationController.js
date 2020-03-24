"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class CertificationController {
    index(req, res) {
        database_1.default.query('DESCRIBE company');
        res.send('Hello world from companies route');
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT com_id, com_name, com_address, com_province, com_phone, com_category, cer_id, cer_name, cer_description FROM company INNER JOIN certification ON company.com_id = certification.certif_com_id INNER JOIN certifier ON certification.certif_cer_id = certifier.cer_id', (err, result) => {
                if (err) {
                    res.json({ message: "Something bad happened" });
                }
                else {
                    res.json({ data: result });
                }
            });
        });
    }
    listByParameter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { parameter } = req.params;
            if (parameter == 'provinces') {
                yield database_1.default.query('SELECT DISTINCT com_province FROM company INNER JOIN certification ON company.com_id = certification.certif_com_id INNER JOIN certifier ON certification.certif_cer_id = certifier.cer_id', (err, result) => {
                    if (err) {
                        res.json({ message: "Something bad happened" });
                    }
                    else {
                        res.json({ data: result });
                    }
                });
            }
            else if (parameter == 'isos') {
                yield database_1.default.query('SELECT * FROM certifier', (err, result) => {
                    if (err) {
                        res.json({ message: "Something bad happened" });
                    }
                    else {
                        res.json({ data: result });
                    }
                });
            }
            else if (parameter == 'categories') {
                yield database_1.default.query('SELECT DISTINCT com_category FROM company INNER JOIN certification ON company.com_id = certification.certif_com_id INNER JOIN certifier ON certification.certif_cer_id = certifier.cer_id', (err, result) => {
                    if (err) {
                        res.json({ message: "Something bad happened" });
                    }
                    else {
                        res.json({ data: result });
                    }
                });
            }
            else {
                res.json({ message: "Invalid parameter" });
            }
        });
    }
}
exports.certificationController = new CertificationController();
