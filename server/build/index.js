"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const bandejaxRoutes_1 = __importDefault(require("./routes/bandejaxRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = express_1.default(); // app recebe express.
        this.config();
        this.routes();
    }
    config() {
        // Está setando a variavel port -> Que irá receber a porta ativa ou criar na porta 3000.
        this.app.set('port', process.env.PORT || 3000); // Envia a porta caso existe, senão cria servidor na porta 3000.
        this.app.use(morgan_1.default('dev')); // Irá mostrar as respostas e tempo de resposta no terminal do node.
        this.app.use(cors_1.default()); // Para conseguirmos fazer as requisições ao servidor.
        this.app.use(express_1.default.json()); // Para que o express nos receba/retorne um Json.
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/bandejax', bandejaxRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server is running on port', this.app.get('port'));
            // Esse console log concantena o texto com a porta que o server está rodando
        });
    }
}
const server = new Server(); // Instanciando a classe server.
server.start(); // Executa método start da classe server.
