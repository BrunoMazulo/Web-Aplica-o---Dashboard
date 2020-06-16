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
// Está importando a classe connect que está sendo exportada do arquivo database.ts
const database_1 = require("../database");
class OnepageController {
    List_kpi(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const gkpi = req.params.kpi;
            let kpi;
            const conn = yield database_1.connect();
            if (gkpi === 'ader') {
                kpi = yield conn.query('SELECT * FROM portal_conformacao.aderencia');
            }
            else if (gkpi == 'opat') {
                kpi = yield conn.query('SELECT * FROM portal_conformacao.ops_atrasadas');
            }
            else if (gkpi == 'opcr') {
                kpi = yield conn.query('SELECT * FROM portal_conformacao.n_ops_criticas');
            }
            else if (gkpi == 'hjk') {
                kpi = yield conn.query('SELECT * FROM portal_conformacao.ind_heijunka');
            }
            res.json(kpi);
        });
    }
}
// Essa linha indica que está exportando toda a classe gamesController na constante gamesController
const onepageController = new OnepageController(); // instanciando a classe
exports.default = onepageController; // exportando a classe
