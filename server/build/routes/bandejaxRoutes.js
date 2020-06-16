"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bandejaxController_1 = __importDefault(require("../controllers/bandejaxController"));
class BandejaxRoutes {
    constructor() {
        this.router = express_1.Router(); // A variavel router recebe a rota que está ativa no momento.
        this.config(); // Quando o construtor é executado, esta linha chama o método config
    }
    config() {
        // Ao acessar essa rota, esse método responde com um 'Hello'
        // req e res, será passada pelo Controller para ficar mais organizado.
        // this.router.get('/', (req, res) => res.send('Hello World - Games'));
        // Ao acessar essa rota, o método List da classe gamesController será executado.
        this.router.get('/', bandejaxController_1.default.List_prog);
        this.router.get('/:heij', bandejaxController_1.default.List_all);
        // Ao acessar essa rota, o método GetOne da classe gamesController será executado.
        // this.router.get('/:id', gamesController.GetOne);
    }
}
const bandejaxRoutes = new BandejaxRoutes(); // Instanciando a classe 
exports.default = bandejaxRoutes.router; // Está exportando a variavel router declarada como publica.
