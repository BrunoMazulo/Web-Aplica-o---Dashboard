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
class BandejaxController {
    List_prog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.connect();
            const bdjx = yield conn.query('SELECT carga_prog_conf.ordem, pd080_conf.ct, pd080_conf.cemb, pd080_conf.pn, pd080_conf.qtd, pd080_conf.desc, pd080_conf.oper, pd080_conf.data_flx, pd080_conf.resp_flx, pd080_conf.est_flx FROM carga_prog_conf INNER JOIN pd080_conf ON carga_prog_conf.ordem = pd080_conf.ordem WHERE (((pd080_conf.oper)<=carga_prog_conf.oper_fim))');
            res.json(bdjx);
            //const games = await pool.query('SELECT * FROM games'); // Executa está query e armazena na constante
            //res.json(games);
        });
    }
    List_all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.connect();
            const allpd = yield conn.query('SELECT * FROM pd080_conf');
            res.json(allpd);
        });
    }
    GetOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const conn = yield database_1.connect();
            const bdjx = yield conn.query('SELECT * FROM games WHERE id = ?', [id]);
            return res.json(bdjx[0]);
            // res.json({text: 'Este é o jogo' + req.params.id});
        });
    }
}
// Essa linha indica que está exportando toda a classe gamesController na constante gamesController
const bandejaxController = new BandejaxController(); // instanciando a classe
exports.default = bandejaxController; // exportando a classe
