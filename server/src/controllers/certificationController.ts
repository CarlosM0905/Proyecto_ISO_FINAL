import {Request, Response} from 'express';

import db from '../database';

class CertificationController{
 
    public index(req: Request, res: Response) {
        db.query('DESCRIBE company');
        res.send('Hello world from companies route');
    }
}

export const certificationController = new CertificationController();