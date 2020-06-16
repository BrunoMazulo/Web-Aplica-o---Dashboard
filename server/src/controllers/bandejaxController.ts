
import { Request, Response} from 'express';
// Está importando a classe connect que está sendo exportada do arquivo database.ts
import {connect} from '../database';


class BandejaxController {

    public async List_prog (req: Request, res: Response){
        const conn = await connect();
        //const bdjx = await conn.query(
          //  'SELECT carga_prog_conf.ordem, pd080_conf.ct, pd080_conf.cemb, pd080_conf.pn, pd080_conf.qtd, pd080_conf.desc, pd080_conf.oper, pd080_conf.data_flx, pd080_conf.resp_flx, pd080_conf.est_flx FROM carga_prog_conf INNER JOIN pd080_conf ON carga_prog_conf.ordem = pd080_conf.ordem WHERE (((pd080_conf.oper)<=carga_prog_conf.oper_fim))');
          const bdjx = await conn.query(
              'SELECT * FROM portal_conformacao.bandejax_conformacao');
          res.json(bdjx);
        //const games = await pool.query('SELECT * FROM games'); // Executa está query e armazena na constante
        //res.json(games);
    }

    public async List_all(req: Request, res: Response){
        const heij = req.params.heij;
        let bandejax;
        const conn = await connect();
 
        if (heij === 'Conf'){
            bandejax = await conn.query('SELECT * FROM portal_conformacao.bandejax_conformacao');
        }
        else if (heij == 'Cort'){
            bandejax = await conn.query('SELECT * FROM portal_conformacao.bandejax_corte');
        }
        else if (heij == 'Trat'){
            bandejax = await conn.query('SELECT * FROM pd080_conf');
        }

        res.json(bandejax);

    }

    // public async GetOps_atrasadas(req: Request, res: Response){
    //     const heijunka = req.body
    //     const heij = heijunka.hjk;
    //     let allpd;
        
    //     const conn = await connect();
 

    //     if (heij === 'Conf'){
    //         allpd = await conn.query('SELECT count(ordem), data_saida FROM portal_conformacao.bandejax_conformacao WHERE data_saida < "2020-04-01" GROUP BY data_saida');
    //     }
    //     else if (heij == 'Cort'){
    //         allpd = await conn.query('SELECT count(ordem), data_saida FROM portal_conformacao.bandejax_corte WHERE data_saida < "2020-05-28" GROUP BY data_saida');
    //     }
    //     else if (heij == 'Trat'){
    //         allpd = await conn.query('SELECT * FROM pd080_conf');
    //     }

    //     res.json(allpd);
    // }

}

// Essa linha indica que está exportando toda a classe gamesController na constante gamesController
const bandejaxController = new BandejaxController(); // instanciando a classe

export default bandejaxController; // exportando a classe