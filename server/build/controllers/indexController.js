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
exports.indexController = void 0;
const database_1 = require("../database");
class IndexController {
    indhjk(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.connect();
            const heij = req.params;
            console.log(heij);
            const indhjka = yield conn.query('SELECT * FROM portal_conformacao.ind_heijunka where area_heijunka like "2 - Conforma" and Data like "%/3/2020"');
            res.json(indhjka);
        });
    }
    indichjkunico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.connect();
            const heije = req.params.heij;
            console.log(heije);
            const indhjka = yield conn.query('SELECT * FROM portal_conformacao.ind_heijunka where area_heijunka like ? and Data like "%/2/2020"', '%' + heije + '%');
            res.json(indhjka);
        });
    }
    indopsatrasadas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const heijunka = req.params;
            const heij = heijunka.heijops;
            //const heije = req.params;
            console.log(heij);
            let allpd;
            const conn = yield database_1.connect();
            if (heij === 'Conf') {
                allpd = yield conn.query('SELECT count(ordem) as Qtd_Ops, data_saida FROM portal_conformacao.bandejax_conformacao WHERE Validacao = "OK" and data_saida < "2020-04-01" GROUP BY data_saida');
            }
            else if (heij == 'Cort') {
                allpd = yield conn.query('SELECT count(ordem) as Qtd_Ops, data_saida FROM portal_conformacao.bandejax_corte WHERE Validacao = "OK" and data_saida < "2020-06-09" GROUP BY data_saida');
            }
            else if (heij == 'Trat') {
                allpd = yield conn.query('SELECT * FROM pd080_conf');
            }
            res.json(allpd);
        });
    }
}
// Essa linha indica que está exportando toda a classe IndexController na constante indexController
exports.indexController = new IndexController();
