import { Request, Response} from 'express';
import { connect } from '../database';

class IndexController {

    //public index (req: Request, res: Response) {
     //   res.json({text: 'API is running'}); // Responde com um Json simples
    //}

    public async indhjk(req: Request, res: Response){
        const conn = await connect();
        const indhjka = await conn.query(
            'SELECT * FROM portal_conformacao.ind_heijunka where area_heijunka = "2 - Conforma" and Data like "%/4/2020"');
        res.json(indhjka);
        //const games = 
    }
}

// Essa linha indica que está exportando toda a classe IndexController na constante indexController
export const indexController = new IndexController(); 