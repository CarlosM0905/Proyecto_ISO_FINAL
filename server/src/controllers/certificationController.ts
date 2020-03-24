import {Request, Response} from 'express';

import db from '../database';

class CertificationController{
 
    public index(req: Request, res: Response) {
        db.query('DESCRIBE company');
        res.send('Hello world from companies route');
    }

    public async list(req: Request, res: Response){
        await db.query('SELECT com_id, com_name, com_address, com_province, com_phone, com_category, cer_id, cer_name, cer_description FROM company INNER JOIN certification ON company.com_id = certification.certif_com_id INNER JOIN certifier ON certification.certif_cer_id = certifier.cer_id',(err, result)=>{
            if(err){
                res.json({message : "Something bad happened"});
            }
            else{
                res.json({data: result});
            }
        })
    }

    public async listByParameter(req: Request, res: Response){
        const {parameter} = req.params;
        if(parameter == 'provinces'){
            await db.query('SELECT DISTINCT com_province FROM company INNER JOIN certification ON company.com_id = certification.certif_com_id INNER JOIN certifier ON certification.certif_cer_id = certifier.cer_id',
            (err, result)=>{
                if(err){
                    res.json({message: "Something bad happened"});
                }
                else{
                    res.json({data: result});
                }
            })
        }
        else if(parameter == 'isos'){
            await db.query('SELECT * FROM certifier', (err, result)=>{
                if(err){
                    res.json({message: "Something bad happened"});
                }
                else{
                    res.json({data: result});
                }
            })
        }
        else if(parameter == 'categories'){
            await db.query('SELECT DISTINCT com_category FROM company INNER JOIN certification ON company.com_id = certification.certif_com_id INNER JOIN certifier ON certification.certif_cer_id = certifier.cer_id', (err, result)=>{
                if(err){
                    res.json({message: "Something bad happened"});
                }
                else{
                    res.json({data: result});
                }
            })
        }
        else{
            res.json({message: "Invalid parameter"});
        }
    }
}

export const certificationController = new CertificationController();