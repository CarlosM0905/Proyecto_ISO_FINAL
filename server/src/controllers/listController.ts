import {Request, Response} from 'express';
import db from '../database';

class ListController{
    // Listar una empresa por segun campo
    public async listByParameter(req: Request, res: Response): Promise<any>{
        console.log('list one', req.params);
        const {parameter} = req.params;
        if(parameter === 'provinces'){
            await db.query('SELECT DISTINCT com_province FROM company',(err, result)=>{
                if(err){
                    res.json({message : "Something bad happened"});
                }
                else{
                    res.json({message: result})
                }
            });
        }
        else if(parameter === 'categories'){
            await db.query('SELECT DISTINCT com_category FROM company',(err, result)=>{
                if(err){
                    res.json({message : "Something bad happened"});
                }
                else{
                    res.json({message: result})
                }
            });
        }
        else{
            res.json({message: "Invalid parameter"});
        }

        
    }
}

export const listController = new ListController();