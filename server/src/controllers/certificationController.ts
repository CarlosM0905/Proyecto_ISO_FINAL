import { Request, Response } from 'express';

import db from '../database';

class CertificationController {

    public index(req: Request, res: Response) {
        db.query('DESCRIBE company');
        res.send('Hello world from companies route');
    }

    public async list(req: Request, res: Response) {
        await db.query('SELECT com_id, com_name, com_address, com_province, com_phone, com_category, cer_id, cer_name, cer_description FROM company INNER JOIN certification ON company.com_id = certification.certif_com_id INNER JOIN certifier ON certification.certif_cer_id = certifier.cer_id', (err, result) => {
            if (err) {
                res.json({ message: "Something bad happened" });
            }
            else {
                res.json({ data: result });
            }
        })
    }

    public async listByParameter(req: Request, res: Response) {
        const { parameter } = req.params;
        if (parameter == 'provinces') {
            await db.query('SELECT DISTINCT com_province FROM company INNER JOIN certification ON company.com_id = certification.certif_com_id INNER JOIN certifier ON certification.certif_cer_id = certifier.cer_id',
                (err, result) => {
                    if (err) {
                        res.json({ message: "Something bad happened" });
                    }
                    else {
                        res.json({ data: result });
                    }
                })
        }
        else if (parameter == 'isos') {
            await db.query('SELECT * FROM certifier', (err, result) => {
                if (err) {
                    res.json({ message: "Something bad happened" });
                }
                else {
                    res.json({ data: result });
                }
            })
        }
        else if (parameter == 'categories') {
            await db.query('SELECT DISTINCT com_category FROM company INNER JOIN certification ON company.com_id = certification.certif_com_id INNER JOIN certifier ON certification.certif_cer_id = certifier.cer_id', (err, result) => {
                if (err) {
                    res.json({ message: "Something bad happened" });
                }
                else {
                    res.json({ data: result });
                }
            })
        }
        else {
            res.json({ message: "Invalid parameter" });
        }
    }

    public async listById(req: Request, res: Response) {
        const { id } = req.params;
        await db.query('SELECT com_id, com_name, com_address, com_province, com_phone, com_category, cer_id, cer_name, cer_description FROM company INNER JOIN certification ON company.com_id = certification.certif_com_id INNER JOIN certifier ON certification.certif_cer_id = certifier.cer_id WHERE com_id = ?',
            [id],
            (err, result) => {
                if (err) {
                    res.json({ message: "Something bad happened" });
                }
                else {
                    res.json({ data: result });
                }
            })
    }

    public async deleteCertification(req: Request, res: Response){
        const {cer_id,com_id} = req.params;
        await db.query('DELETE FROM certification WHERE certif_com_id = ? AND certif_cer_id = ?',[com_id, cer_id], (err,result)=>{
            if(err){
                res.json({message : "Something bad happened"});
            }
            else{
                res.json({message : "The certification was deleted"});
            }
        } )
    }

    public async updateCertificationsOfCompany(req: Request, res: Response) {

        // Arreglar bug -- Editar Certificaciones
        console.log(req.body);
        let data = req.body.data;
        let original_data = req.body.original_data;

        console.log("Data enviada", data);
        console.log("Data original", original_data);

        if (data.length == 0 && original_data.length != 0) {
            original_data.forEach(async (o_data: any) => {
                await db.query('DELETE FROM certification WHERE certif_com_id = ? AND certif_cer_id = ?', o_data, ((err, result) => {
                    if (err) {
                        console.log("Something bad happened");
                    }
                    else {
                        res.json({ message: "Delete successful!" });
                    }
                }))
            })
        }

        if (data.length != 0 && original_data.length == 0) {
            data.forEach(async (element: any) => {
                await db.query('SELECT EXISTS(SELECT * FROM certification WHERE certif_com_id = ? AND certif_cer_id = ? ) AS result', element, (async (err, result) => {
                    if (err) {
                        res.json({ message: "Something bad happened" })
                    }
                    else {
                        console.log(result[0].result);
                        if (result[0].result == 0) {
                            let data = {
                                certif_com_id: element[0],
                                certif_cer_id: element[1],
                                certif_name: null,
                                certif_year: null
                            }
                            console.log(data);
                            await db.query('INSERT INTO certification SET ?', [data]);
                        }
                    }
                }))
            });
            res.json({ message: "Insert successful!" })
        }

        if (data.length != 0 && original_data.length != 0) {
            console.log("3 opcion");
            original_data.forEach((o_data: any) => {
                db.query('DELETE FROM certification WHERE certif_com_id = ? AND certif_cer_id = ?', o_data, ((err, result) => {
                    if (err) {
                        console.log("No deleted",o_data);
                        console.log("Something bad happened");
                    }
                    else {
                        console.log("Deleted",o_data);
                        console.log("Delete successful!");
                    }
                }))
            })

            data.forEach( (element: any) => {
                console.log(element);
                 db.query('SELECT EXISTS(SELECT * FROM certification WHERE certif_com_id = ? AND certif_cer_id = ? ) AS result', element, ( async (err, result) => {
                    if (err) {
                        res.json({ message: "Something bad happened" })
                    }
                    else {
                        if (result[0].result == 0) {
                            let data = {
                                certif_com_id: element[0],
                                certif_cer_id: element[1],
                                certif_name: null,
                                certif_year: null
                            }
                        console.log("Insert",data);
                        await db.query('INSERT INTO certification SET ?', [data]);
                        }
                    }
                }))
            });
            res.json({ message: "Insert successful!" })
        }



    }

}

export const certificationController = new CertificationController();