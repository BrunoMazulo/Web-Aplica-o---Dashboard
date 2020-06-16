"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
class IndexRoutes {
    constructor() {
        this.router = express_1.Router(); // A variavel router recebe a rota que está ativa no momento.
        this.config(); // Quando o construtor é executado, esta linha chama o método config
    }
    config() {
        // Ao acessar essa rota, esse método responde com um 'Hello'
        // this.router.get('/', (req, res) => res.send('Hello World'));
        // Ao acessar essa rota, o método index da classe indexController será executado.
        // this.router.get('/', indexController.index);
        this.router.get('/', indexController_1.indexController.indhjk);
        this.router.get('/:heij', indexController_1.indexController.indichjkunico);
        this.router.get('/ops/:heijops', indexController_1.indexController.indopsatrasadas);
    }
}
const indexRoutes = new IndexRoutes(); // Instanciando a classe 
exports.default = indexRoutes.router; // Está exportando a variavel router declarada como publica.
