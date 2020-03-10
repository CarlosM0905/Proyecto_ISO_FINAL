import mysql from 'mysql';
import keys from './keys';

const db = mysql.createPool(keys.database);

db.getConnection((err,connection)=>{
    if(err){
        throw err;
    }
    else{
        connection.release();
        console.log('DB is connected!');
    }
})
    
export default db;