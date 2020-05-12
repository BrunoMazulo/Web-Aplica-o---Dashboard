import {Router} from 'express';
import bandejaxController from '../controllers/bandejaxController';

class BandejaxRoutes{

    public router: Router = Router(); // A variavel router recebe a rota que está ativa no momento.

    constructor(){ // Ao instanciar a classe o construtor é executado.
        this.config(); // Quando o construtor é executado, esta linha chama o método config
    }

    config(): void{
        // Ao acessar essa rota, esse método responde com um 'Hello'
        // req e res, será passada pelo Controller para ficar mais organizado.
        // this.router.get('/', (req, res) => res.send('Hello World - Games'));

        // Ao acessar essa rota, o método List da classe gamesController será executado.
        this.router.get('/', bandejaxController.List_prog);
        // Ao acessar essa rota, o método GetOne da classe gamesController será executado.
        // this.router.get('/:id', gamesController.GetOne);

    }
}

const bandejaxRoutes = new BandejaxRoutes(); // Instanciando a classe 
export default bandejaxRoutes.router; // Está exportando a variavel router declarada como publica.