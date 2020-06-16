import {Router} from 'express';
import { indexController } from '../controllers/indexController';

class IndexRoutes{

    public router: Router = Router(); // A variavel router recebe a rota que está ativa no momento.

    constructor(){ // Ao instanciar a classe o construtor é executado.
        this.config(); // Quando o construtor é executado, esta linha chama o método config
    }

    config(): void{ 
        // Ao acessar essa rota, esse método responde com um 'Hello'
       // this.router.get('/', (req, res) => res.send('Hello World'));
       
       // Ao acessar essa rota, o método index da classe indexController será executado.
      // this.router.get('/', indexController.index);
       this.router.get('/', indexController.indhjk);
       this.router.get('/:heij', indexController.indichjkunico);
       this.router.get('/ops/:heijops', indexController.indopsatrasadas);
    }
}

const indexRoutes = new IndexRoutes(); // Instanciando a classe 
export default indexRoutes.router; // Está exportando a variavel router declarada como publica.