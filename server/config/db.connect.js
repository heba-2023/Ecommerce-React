const mongoose = require('mongoose')

const ConnectDB = async () => {
    try{
         const conn = await mongoose.connect(process.env.DATABASE_URI);
         console.log(`Database Connected: ${conn.connection.host}`);
         

    }catch(err){
        console.error(`Database Error: ${err}`);
        process.exit(1);

    }
   
    
}


module.exports = ConnectDB;