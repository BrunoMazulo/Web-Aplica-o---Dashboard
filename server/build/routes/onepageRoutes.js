"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const onepageController_1 = __importDefault(require("../controllers/onepageController"));
class OnepageRoutes {
    constructor() {
        this.router = express_1.Router(); // A variavel router recebe a rota que está ativa no momento.
        this.config(); // Quando o construtor é executado, esta linha chama o método config
    }
    config() {
        // Ao acessar essa rota, o método List da classe gamesController será executado.
        this.router.get('/:kpi', onepageController_1.default.List_kpi);
    }
}
const onepageRoutes = new OnepageRoutes(); // Instanciando a classe 
exports.default = onepageRoutes.router; // Está exportando a variavel router declarada como publica.
