import { Request, Response} from 'express';
// Está importando a classe connect que está sendo exportada do arquivo database.ts
import {connect} from '../database';


class OnepageController {

    public async List_kpi(req: Request, res: Response){
        const gkpi = req.params.kpi;
        let kpi;
        const conn = await connect();
 
        if (gkpi === 'ader'){
            kpi = await conn.query('SELECT * FROM portal_conformacao.aderencia');
        }
        else if (gkpi == 'opat'){
            kpi = await conn.query('SELECT * FROM portal_conformacao.ops_atrasadas');
        }
        else if (gkpi == 'opcr'){
            kpi = await conn.query('SELECT * FROM portal_conformacao.n_ops_criticas');
        }
        else if (gkpi == 'hjk'){
            kpi = await conn.query('SELECT * FROM portal_conformacao.ind_heijunka');
        }
        res.json(kpi);
    }
}

// Essa linha indica que está exportando toda a classe gamesController na constante gamesController
const onepageController = new OnepageController(); // instanciando a classe
export default onepageController; // exportando a classe