import express, {Application, json} from 'express';
import indexRoutes from './routes/indexRoutes';
import bandejaxRoutes from './routes/bandejaxRoutes';
import morgan from 'morgan';
import cors from 'cors';


class Server{

    public app: Application; // Define variavel app como uma aplicação

    constructor(){ // Ao instanciar a classe o construtor é executado.
        this.app = express(); // app recebe express.
        this.config(); 
        this.routes();
    }

    config(): void{
        // Está setando a variavel port -> Que irá receber a porta ativa ou criar na porta 3000.
        this.app.set('port', process.env.PORT || 3000); // Envia a porta caso existe, senão cria servidor na porta 3000.
        this.app.use(morgan('dev')); // Irá mostrar as respostas e tempo de resposta no terminal do node.
        this.app.use(cors()); // Para conseguirmos fazer as requisições ao servidor.
        this.app.use(express.json()); // Para que o express nos receba/retorne um Json.
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void{
        this.app.use('/', indexRoutes);
        this.app.use('/api/bandejax', bandejaxRoutes); 
    }

    start(): void{ // Método criado para ficar escutando as requisições da variavel 'port'.
        this.app.listen(this.app.get('port'), () =>{
            console.log('Server is running on port', this.app.get('port'));
            // Esse console log concantena o texto com a porta que o server está rodando
        });
    }
}

const server = new Server(); // Instanciando a classe server.
server.start(); // Executa método start da classe server.