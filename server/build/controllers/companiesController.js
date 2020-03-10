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
class CompaniesController {
    // Listar todas las empresas
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM company', (err, result) => {
                if (err) {
                    res.json({ message: "Something bad happened" });
                }
                else {
                    res.json(result);
                }
            });
        });
    }
    // Listar una empresa por su id
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('list one', req.params);
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM company WHERE com_id = ?', [id], (err, result) => {
                if (err) {
                    res.json({ message: "Something bad happened" });
                }
                else if (result.length == 1) {
                    res.json(result[0]);
                }
                else {
                    res.status(404).json({ message: 'The company does not exists' });
                }
            });
        });
    }
    // listar por categoria
    listByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { category } = req.params;
            yield database_1.default.query('SELECT * FROM company WHERE com_category = ?', [category], (err, result) => {
                if (err) {
                    res.json({ message: "Something bad happened" });
                }
                else if (result.length > 0) {
                    res.json(result);
                }
                else {
                    res.status(404).json({ message: 'The companies does not exists' });
                }
            });
        });
    }
    // listar por provincia
    listByProvince(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { province } = req.params;
            yield database_1.default.query('SELECT * FROM company WHERE com_province = ?', [province], (err, result) => {
                if (err) {
                    res.json({ message: "Something bad happened" });
                }
                else if (result.length > 0) {
                    res.json(result);
                }
                else {
                    res.status(404).json({ message: 'The companies does not exists' });
                }
            });
        });
    }
    listByCategoryAndProvince(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { category, province } = req.params;
            yield database_1.default.query('SELECT * FROM company WHERE com_category = ? AND com_province = ?', [category, province], (err, result) => {
                if (err) {
                    res.json({ message: "Something bad happened" });
                }
                else if (result.length > 0) {
                    res.json(result);
                }
                else {
                    res.status(404).json({ message: 'The companies does not exists' });
                }
            });
        });
    }
    listByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { name } = req.params;
            name = '%' + name + '%';
            yield database_1.default.query('SELECT * FROM company WHERE com_name LIKE ?', [name], (err, result) => {
                if (err) {
                    res.json({ message: "Something bad happened" });
                }
                else if (result.length > 0) {
                    res.json(result);
                }
                else {
                    res.status(404).json({ message: 'The companies does not exists' });
                }
            });
        });
    }
    listByAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { address } = req.params;
            address = '%' + address + '%';
            yield database_1.default.query('SELECT * FROM company WHERE com_address LIKE ?', [address], (err, result) => {
                if (err) {
                    res.json({ message: "Something bad happened" });
                }
                else if (result.length > 0) {
                    res.json(result);
                }
                else {
                    res.status(404).json({ message: 'The companies does not exists' });
                }
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO company SET ?', [req.body]);
            res.json({ message: 'The company was created' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM company WHERE com_id', [id], (err, result) => {
                if (err) {
                    res.json({ message: "Something bad happened" });
                }
                else {
                    res.json({ message: "The company was deleted" });
                }
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE company SET ? WHERE com_id = ?', [req.body, id], (err, result) => {
                if (err) {
                    res.json({ message: "Something bad happened" });
                }
                else {
                    res.json({ message: "The company was updated" });
                }
            });
        });
    }
}
exports.companiesController = new CompaniesController();
