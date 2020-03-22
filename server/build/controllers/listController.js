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
class ListController {
    // Listar una empresa por segun campo
    listByParameter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('list one', req.params);
            const { parameter } = req.params;
            if (parameter === 'provinces') {
                yield database_1.default.query('SELECT DISTINCT com_province FROM company', (err, result) => {
                    if (err) {
                        res.json({ message: "Something bad happened" });
                    }
                    else {
                        res.json({ message: result });
                    }
                });
            }
            else if (parameter === 'categories') {
                yield database_1.default.query('SELECT DISTINCT com_category FROM company', (err, result) => {
                    if (err) {
                        res.json({ message: "Something bad happened" });
                    }
                    else {
                        res.json({ message: result });
                    }
                });
            }
            else {
                res.json({ message: "Invalid parameter" });
            }
        });
    }
}
exports.listController = new ListController();
