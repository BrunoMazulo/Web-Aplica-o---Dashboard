
import { Request, Response} from 'express';
// Está importando a classe connect que está sendo exportada do arquivo database.ts
import {connect} from '../database';


class BandejaxController {

    public async List_prog (req: Request, res: Response){
        const conn = await connect();
        const bdjx = await conn.query(
            'SELECT carga_prog_conf.ordem, pd080_conf.ct, pd080_conf.cemb, pd080_conf.pn, pd080_conf.qtd, pd080_conf.desc, pd080_conf.oper, pd080_conf.data_flx, pd080_conf.resp_flx, pd080_conf.est_flx FROM carga_prog_conf INNER JOIN pd080_conf ON carga_prog_conf.ordem = pd080_conf.ordem WHERE (((pd080_conf.oper)<=carga_prog_conf.oper_fim))');
        res.json(bdjx);
        //const games = await pool.query('SELECT * FROM games'); // Executa está query e armazena na constante
        //res.json(games);
    }

    public async List_all(req: Request, res: Response){
        const conn = await connect();
        const allpd = await conn.query('SELECT * FROM pd080_conf');
        res.json(allpd);
    }

    public async GetOne(req: Request, res: Response){
        const id = req.params.id;
        const conn = await connect();
        const bdjx = await conn.query('SELECT * FROM games WHERE id = ?', [id]);
        return res.json(bdjx[0]);
        // res.json({text: 'Este é o jogo' + req.params.id});
    }

}

// Essa linha indica que está exportando toda a classe gamesController na constante gamesController
const bandejaxController = new BandejaxController(); // instanciando a classe

export default bandejaxController; // exportando a classe