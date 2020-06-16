
import { Request, Response} from 'express';
// Está importando a classe connect que está sendo exportada do arquivo database.ts
import {connect} from '../database';


class FilaController {

    public async List_fila(req: Request, res: Response){
        //const heij = req.params.heij;
        let fila;
        const conn = await connect();
        fila = await conn.query('SELECT * FROM portal_conformacao.fila');
        res.json(fila);
    }

}

// Essa linha indica que está exportando toda a classe gamesController na constante gamesController
const filaController = new FilaController(); // instanciando a classe

export default filaController; // exportando a classe