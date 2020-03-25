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
    listById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT com_id, com_name, com_address, com_province, com_phone, com_category, cer_id, cer_name, cer_description FROM company INNER JOIN certification ON company.com_id = certification.certif_com_id INNER JOIN certifier ON certification.certif_cer_id = certifier.cer_id WHERE com_id = ?', [id], (err, result) => {
                if (err) {
                    res.json({ message: "Something bad happened" });
                }
                else {
                    res.json({ data: result });
                }
            });
        });
    }
    deleteCertification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cer_id, com_id } = req.params;
            yield database_1.default.query('DELETE FROM certification WHERE certif_com_id = ? AND certif_cer_id = ?', [com_id, cer_id], (err, result) => {
                if (err) {
                    res.json({ message: "Something bad happened" });
                }
                else {
                    res.json({ message: "The certification was deleted" });
                }
            });
        });
    }
    updateCertificationsOfCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Arreglar bug -- Editar Certificaciones
            console.log(req.body);
            let data = req.body.data;
            let original_data = req.body.original_data;
            console.log("Data enviada", data);
            console.log("Data original", original_data);
            if (data.length == 0 && original_data.length != 0) {
                original_data.forEach((o_data) => __awaiter(this, void 0, void 0, function* () {
                    yield database_1.default.query('DELETE FROM certification WHERE certif_com_id = ? AND certif_cer_id = ?', o_data, ((err, result) => {
                        if (err) {
                            console.log("Something bad happened");
                        }
                        else {
                            res.json({ message: "Delete successful!" });
                        }
                    }));
                }));
            }
            if (data.length != 0 && original_data.length == 0) {
                data.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield database_1.default.query('SELECT EXISTS(SELECT * FROM certification WHERE certif_com_id = ? AND certif_cer_id = ? ) AS result', element, ((err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            res.json({ message: "Something bad happened" });
                        }
                        else {
                            console.log(result[0].result);
                            if (result[0].result == 0) {
                                let data = {
                                    certif_com_id: element[0],
                                    certif_cer_id: element[1],
                                    certif_name: null,
                                    certif_year: null
                                };
                                console.log(data);
                                yield database_1.default.query('INSERT INTO certification SET ?', [data]);
                            }
                        }
                    })));
                }));
                res.json({ message: "Insert successful!" });
            }
            if (data.length != 0 && original_data.length != 0) {
                console.log("3 opcion");
                original_data.forEach((o_data) => {
                    database_1.default.query('DELETE FROM certification WHERE certif_com_id = ? AND certif_cer_id = ?', o_data, ((err, result) => {
                        if (err) {
                            console.log("No deleted", o_data);
                            console.log("Something bad happened");
                        }
                        else {
                            console.log("Deleted", o_data);
                            console.log("Delete successful!");
                        }
                    }));
                });
                data.forEach((element) => {
                    console.log(element);
                    database_1.default.query('SELECT EXISTS(SELECT * FROM certification WHERE certif_com_id = ? AND certif_cer_id = ? ) AS result', element, ((err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            res.json({ message: "Something bad happened" });
                        }
                        else {
                            if (result[0].result == 0) {
                                let data = {
                                    certif_com_id: element[0],
                                    certif_cer_id: element[1],
                                    certif_name: null,
                                    certif_year: null
                                };
                                console.log("Insert", data);
                                yield database_1.default.query('INSERT INTO certification SET ?', [data]);
                            }
                        }
                    })));
                });
                res.json({ message: "Insert successful!" });
            }
        });
    }
}
exports.certificationController = new CertificationController();
