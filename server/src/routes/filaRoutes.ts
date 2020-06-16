import {Router} from 'express';
import filaController from '../controllers/filaController';

class FilaRoutes{

    public router: Router = Router(); // A variavel router recebe a rota que está ativa no momento.

    constructor(){ // Ao instanciar a classe o construtor é executado.
        this.config(); // Quando o construtor é executado, esta linha chama o método config
    }

    config(): void{
        // Ao acessar essa rota, o método List da classe gamesController será executado.
        this.router.get('/', filaController.List_fila);

    }
}
    
const filaRoutes = new FilaRoutes(); // Instanciando a classe 
        
export default filaRoutes.router; // Está exportando a variavel router declarada como publica.