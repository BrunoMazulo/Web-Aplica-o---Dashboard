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
class FilaController {
    List_fila(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const heij = req.params.heij;
            let fila;
            const conn = yield database_1.connect();
            fila = yield conn.query('SELECT * FROM portal_conformacao.fila');
            res.json(fila);
        });
    }
}
// Essa linha indica que está exportando toda a classe gamesController na constante gamesController
const filaController = new FilaController(); // instanciando a classe
exports.default = filaController; // exportando a classe
