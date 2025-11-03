import 'dotenv/config';  // import dotenv from 'dotenv';
import dbConnection from './config/db.js';
import app from './app.js'; 



const PORT = process.env.PORT;
dbConnection();


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);  
});






