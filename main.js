import "dotenv/config"

import app from "./app.js"

import "./src/config/database.config.js";

//Lancer le serveur
const PORT = process.env.PORT;
app.listen(PORT,() =>{
    console.log(`Server running at http://localhost:${PORT}`);
})