import { Request, Response} from 'express';
import { connect } from '../database';

class IndexController {

    public async indhjk(req: Request, res: Response){
        const conn = await connect();
        const heij = req.params;
        console.log(heij);
        const indhjka = await conn.query(
            'SELECT * FROM portal_conformacao.ind_heijunka where area_heijunka like "2 - Conforma" and Data like "%/3/2020"');
        res.json(indhjka);
        
    }

    public async indichjkunico(req: Request, res: Response){
        const conn = await connect();
        const heije = req.params.heij;
        console.log(heije);
        const indhjka = await conn.query(
            'SELECT * FROM portal_conformacao.ind_heijunka where area_heijunka like ? and Data like "%/2/2020"', '%' + heije + '%');
        res.json(indhjka);
    }

    public async indopsatrasadas(req: Request, res: Response){

        const heijunka = req.params;
        const heij = heijunka.heijops;
        //const heije = req.params;
        console.log(heij);
        let allpd;
        
        const conn = await connect();
 

        if (heij === 'Conf'){
            allpd = await conn.query('SELECT count(ordem) as Qtd_Ops, data_saida FROM portal_conformacao.bandejax_conformacao WHERE Validacao = "OK" and data_saida < "2020-04-01" GROUP BY data_saida');
        }
        else if (heij == 'Cort'){
            allpd = await conn.query('SELECT count(ordem) as Qtd_Ops, data_saida FROM portal_conformacao.bandejax_corte WHERE Validacao = "OK" and data_saida < "2020-06-09" GROUP BY data_saida');
        }
        else if (heij == 'Trat'){
            allpd = await conn.query('SELECT * FROM pd080_conf');
        }

        res.json(allpd);
    }
    
}

// Essa linha indica que está exportando toda a classe IndexController na constante indexController
export const indexController = new IndexController(); 