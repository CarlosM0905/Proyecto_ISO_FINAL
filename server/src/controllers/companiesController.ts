import {Request, Response} from 'express';
import db from '../database';

class CompaniesController{


    // Listar todas las empresas
    public async list(req: Request, res: Response) {
        await db.query('SELECT * FROM company', (err, result)=>{
            if(err){
                res.json({message : "Something bad happened"});
            }
            else{
                res.json(result);
            }
        });
    } 


    // Listar una empresa por su id
    public async listOne(req: Request, res: Response): Promise<any>{
        console.log('list one', req.params);
        const {id} = req.params;
        await db.query('SELECT * FROM company WHERE com_id = ?', [id], (err, result)=>{
            if(err){
                res.json({message : "Something bad happened"});
            }
            else if(result.length == 1){
                res.json(result[0]);
            }
            else{
                res.status(404).json({message: 'The company does not exists'});
            }
        });
    }
    // listar por categoria
    public async listByCategory(req: Request, res: Response):Promise<any>{
        const {category} = req.params;
        await db.query('SELECT * FROM company WHERE com_category = ?',[category], (err,result)=>{
            if(err){
                res.json({message : "Something bad happened"});
            }
            else if(result.length > 0){
                res.json(result);
            }
            else{
                res.status(404).json({message: 'The companies does not exists'});
            }
        });
    }

    // listar por provincia
    public async listByProvince(req: Request, res: Response):Promise<any>{
        const {province} = req.params;
        await db.query('SELECT * FROM company WHERE com_province = ?', [province], (err,result)=>{
            if(err){
                res.json({message : "Something bad happened"});
            }
            else if(result.length > 0){
                res.json(result);
            }
            else{
                res.status(404).json({message: 'The companies does not exists'});
            }
        })
    }

    public async listByCategoryAndProvince(req: Request, res: Response){
        const {category, province} = req.params;
        await db.query('SELECT * FROM company WHERE com_category = ? AND com_province = ?',[category,province], (err,result)=>{
            if(err){
                res.json({message : "Something bad happened"});
            }
            else if (result.length > 0){
                res.json(result);
            }
            else{
                res.status(404).json({message: 'The companies does not exists'});
            }
        });
    }

    public async listByName(req: Request, res: Response): Promise<any>{
        let {name} = req.params;
        name = '%' + name + '%';
        await db.query('SELECT * FROM company WHERE com_name LIKE ?',[name], (err,result)=>{
            if(err){
                res.json({message : "Something bad happened"});
            }
            else if(result.length > 0){
                res.json(result);
            }
            else{
                res.status(404).json({message: 'The companies does not exists'});
            }
        })
    }

    public async listByAddress(req: Request, res: Response): Promise<any>{
        let {address} = req.params;
        address = '%' + address + '%';
        await db.query('SELECT * FROM company WHERE com_address LIKE ?',[address], (err,result)=>{
            if(err){
                res.json({message : "Something bad happened"});
            }
            else if(result.length > 0){
                res.json(result);
            }
            else{
                res.status(404).json({message: 'The companies does not exists'});
            }
        })
    }
    

    public async create (req: Request, res: Response): Promise<void>{
        await db.query('INSERT INTO company SET ?',[req.body]);
        res.json({message: 'The company was created'});
    }

    public async delete(req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        await db.query('DELETE FROM company WHERE com_id = ?', [id], (err, result)=>{
            if(err){
                res.json({message : "Something bad happened"});
            }
            else{
                res.json({message: "The company was deleted"});
            }
        });
        
    }

    public async update(req: Request, res: Response){
        const {id} = req.params;
        await db.query('UPDATE company SET ? WHERE com_id = ?', [req.body, id],(err,result)=>{
            if(err){
                res.json({message : "Something bad happened"}); 
            }
            else{
                res.json({message: "The company was updated"});
            }
        });
    }
}

export const companiesController = new CompaniesController();