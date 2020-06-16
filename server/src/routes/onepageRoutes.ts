import {Router} from 'express';
import onepageController from '../controllers/onepageController';

class OnepageRoutes{

    public router: Router = Router(); // A variavel router recebe a rota que está ativa no momento.

    constructor(){ // Ao instanciar a classe o construtor é executado.
        this.config(); // Quando o construtor é executado, esta linha chama o método config
    }

    config(): void{
        // Ao acessar essa rota, o método List da classe gamesController será executado.
        this.router.get('/:kpi', onepageController.List_kpi);

    }
}

const onepageRoutes = new OnepageRoutes(); // Instanciando a classe 
export default onepageRoutes.router; // Está exportando a variavel router declarada como publica.