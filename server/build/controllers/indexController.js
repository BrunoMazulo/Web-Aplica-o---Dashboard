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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class IndexController {
    //public index (req: Request, res: Response) {
    //   res.json({text: 'API is running'}); // Responde com um Json simples
    //}
    indhjk(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.connect();
            const indhjka = yield conn.query('SELECT * FROM portal_conformacao.ind_heijunka where area_heijunka = "2 - Conforma" and Data like "%/4/2020"');
            res.json(indhjka);
            //const games = 
        });
    }
}
// Essa linha indica que está exportando toda a classe IndexController na constante indexController
exports.indexController = new IndexController();
